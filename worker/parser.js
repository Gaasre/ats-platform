const { Worker } = require("bullmq");
const prisma = require("@prisma/client");
const axios = require("axios");
const pdf = require("pdf-parse");
const OpenAI = require("openai");

const prismaClient = new prisma.PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const BASE_PROMPT =
  "Summarize the text below into a JSON with exactly the following structure: {firstName, lastName, email, phone, location, portfolio(string), linkedin, github, university, educationLevel(only on of : 'BS', 'MS', 'PhD'), graduationDate(YYY-MM-DDTHH:mm:ssZ), majors(string array), workExperience: [{jobTitle, company, location, startDate(YYY-MM-DDTHH:mm:ssZ),endDate(YYY-MM-DDTHH:mm:ssZ),duration(float), jobSummary}],skills: [string], languages:[string], experienceYears(float), projects:[{name, description, url}]}";

async function getPdfTextFromUrl(pdfUrl) {
  try {
    const response = await axios.get(pdfUrl, {
      responseType: "arraybuffer",
    });

    const pdfBuffer = Buffer.from(response.data);
    const data = await pdf(pdfBuffer);
    const textContent = data.text;

    return textContent.trim();
  } catch (error) {
    console.error("Error fetching or parsing the PDF");
    return null;
  }
}

async function getParsedResume(txtResume) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: `${BASE_PROMPT} ${txtResume}` }],
    model: "gpt-3.5-turbo-1106",
  });

  return JSON.parse(completion.choices[0].message.content);
}

const worker = new Worker("parsingQueue", async (job) => {
  console.log(`Processing candidate with id[${job.data.id}] ...`);
  const candidate = await prismaClient.candidate.findFirst({
    where: {
      id: job.data.id,
    },
  });

  if (candidate) {
    if (!candidate.parsed) {
      if (candidate.resumeLink) {
        const content = await getPdfTextFromUrl(candidate.resumeLink);
        if (!content) {
          throw Error("no content");
        }
        const parsedResume = await getParsedResume(content);

        // get the filters
        const filters = await prismaClient.filter.findMany({
          where: {
            jobId: job.data.jobId,
          },
        });

        console.log(filters);

        let result = true;

        if (filters.length > 0) {
          console.log(filters);
          result = filters.every((filter) => {
            switch (filter.field) {
              case "Experience Years":
                switch (filter.operator) {
                  case "EQUAL":
                    if (filter.value == parsedResume.experienceYears) {
                      return true;
                    }
                    return false;
                  case "NOTEQUAL":
                    if (filter.value != parsedResume.experienceYears) {
                      return true;
                    }
                    return false;
                  case "HIGHER":
                    if (parsedResume.experienceYears >= filter.value) {
                      return true;
                    }
                    return false;
                  case "LOWER":
                    if (parsedResume.experienceYears <= filter.value) {
                      return true;
                    }
                    return false;
                  default:
                    return true;
                }
              case "Education level":
                switch (filter.operator) {
                  case "EQUAL":
                    if (
                      filter.value
                        .split(",")
                        .includes(parsedResume.educationLevel)
                    ) {
                      return true;
                    }
                    return false;
                  case "NOTEQUAL":
                    if (
                      !filter.value
                        .split(",")
                        .includes(parsedResume.educationLevel)
                    ) {
                      return true;
                    }
                    return false;
                  case "INCLUDES":
                    if (
                      filter.value
                        .split(",")
                        .includes(parsedResume.educationLevel)
                    ) {
                      return true;
                    }
                    return false;
                  default:
                    return true;
                }
              case "Skills":
                switch (filter.operator) {
                  case "EQUAL":
                    if (
                      parsedResume.skills.every((item) =>
                        filter.value.split(",").includes(item)
                      )
                    ) {
                      return true;
                    }
                    return false;
                  case "NOTEQUAL":
                    if (
                      !parsedResume.skills.every((item) =>
                        filter.value.split(",").includes(item)
                      )
                    ) {
                      return true;
                    }
                    return false;
                  case "INCLUDES":
                    if (
                      parsedResume.skills.every((item) =>
                        filter.value.split(",").includes(item)
                      )
                    ) {
                      return true;
                    }
                    return false;
                  default:
                    return true;
                }
              // todo language and availability
              default:
                true;
            }
          });
        }

        const updatedCandidate = await prismaClient.candidate.update({
          where: { id: job.data.id },
          data: {
            ...parsedResume,
            workExperience: {
              create: parsedResume.workExperience,
            },
            projects: {
              create: parsedResume.projects,
            },
            parsed: true,
            passedFilter: result,
          },
        });

        console.log(updatedCandidate);

        console.log(`Candidate with id[${job.data.id}] parsed.`);
      } else {
        throw new Error('WTF')
      }
    } else {
      console.log(`Candidate with id[${job.data.id}] already parsed.`);
    }
  } else {
    console.log(`Candidate with id[${job.data.id}] not found.`);
  }
});
