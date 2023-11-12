const Queue = require("bull");
const prisma = require("@prisma/client");
const axios = require("axios");
const pdf = require("pdf-parse");
const OpenAI = require("openai");

const parsingQueue = new Queue("parsing-queue");
const prismaClient = new prisma.PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const BASE_PROMPT =
  "Summarize the text below into a JSON with exactly the following structure {firstName, lastName, email, phoneNumber, location, portfolio, linkedin, github, university, educationLevel (BS, MS, or PhD), graduationDate, majors, work_experience: [{jobTitle, company, location, startDate,endDate,duration(float), jobSummary}],skills: [string], languages:[string], experienceYears(float), projects:[{name, description, url}]}";

const main = async () => {
  await parsingQueue.add({ id: "clomz5on20007ume80cwq9du5" });
};

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
    console.error("Error fetching or parsing the PDF:", error);
    return null;
  }
}

async function getParsedResume(txtResume) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: `${BASE_PROMPT} ${txtResume}` }],
    model: "gpt-3.5-turbo",
  });

  return JSON.parse(completion.choices[0].message.content);
}

parsingQueue.process(async (job, done) => {
  const candidate = await prismaClient.candidate.findFirst({
    where: {
      id: job.data.id,
    },
  });
  const content = await getPdfTextFromUrl(candidate.resumeLink);
  const parsedResume = await getParsedResume(content);
  console.log(parsedResume);
  done();
});

main().catch(console.error);
