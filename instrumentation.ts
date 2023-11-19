// export async function register() {
//   const { default: axios } = await import("axios");
//   const { default: Redis } = await import("ioredis");
//   const { default: pdf } = await import("pdf-parse");
//   const { default: OpenAI } = await import("openai");

//   const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//   });

//   const BASE_PROMPT =
//     "Summarize the text below into a JSON with exactly the following structure, all dates should be ISO-8601 DateTime format: {firstName, lastName, email, phone, location, portfolio(string), linkedin, github, university, educationLevel (BS, MS, or PhD), graduationDate, majors, workExperience: [{jobTitle, company, location, startDate,endDate,duration(float), jobSummary}],skills: [string], languages:[string], experienceYears(float), projects:[{name, description, url}]}";

//   async function getPdfTextFromUrl(pdfUrl: string) {
//     try {
//       const response = await axios.get(pdfUrl, {
//         responseType: "arraybuffer",
//       });

//       const pdfBuffer = Buffer.from(response.data);
//       const data = await pdf(pdfBuffer);
//       const textContent = data.text;

//       return textContent.trim();
//     } catch (error) {
//       console.error("Error fetching or parsing the PDF:", error);
//       return null;
//     }
//   }

//   async function getParsedResume(txtResume: string) {
//     const completion = await openai.chat.completions.create({
//       messages: [{ role: "user", content: `${BASE_PROMPT} ${txtResume}` }],
//       model: "gpt-3.5-turbo-1106",
//     });

//     return JSON.parse(completion.choices[0].message.content!);
//   }

//   const { Worker } = await import("bullmq");

//   const connection = new Redis(process.env.REDIS_URL!);
//   console.log(connection);

//   new Worker(
//     "parsingQueue",
//     async (job) => {
//       const data = job?.data;
//       const candidate = await prisma.candidate.findFirst({
//         where: {
//           id: job.data.id,
//         },
//       });

//       if (candidate) {
//         if (!candidate.parsed) {
//           const content = await getPdfTextFromUrl(candidate.resumeLink);
//           const parsedResume = await getParsedResume(content!);
//           console.log(parsedResume);
//           const resume = await prisma.candidate.update({
//             where: { id: job.data.id },
//             data: {
//               ...parsedResume,
//               workExperience: {
//                 create: parsedResume.workExperience,
//               },
//               projects: {
//                 create: parsedResume.projects,
//               },
//               parsed: true,
//             },
//           });
//           console.log(resume);
//         } else {
//           console.log(`Candidate with id[${job.data.id}] already parsed.`);
//         }
//       } else {
//         console.log(`Candidate with id[${job.data.id}] not found.`);
//       }
//     },
//     {
//       connection,
//       concurrency: 5,
//       removeOnComplete: { count: 1000 },
//       removeOnFail: { count: 5000 },
//     }
//   );
// }
