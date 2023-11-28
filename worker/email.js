const Imap = require("imap");
const { simpleParser } = require("mailparser");
const prisma = require("@prisma/client");
const nodemailer = require("nodemailer");

//const prismaClient = new prisma.PrismaClient();

// const imapConfig = {
//   user: "contact@footape.com",
//   password: "Bbc237dd93e",
//   host: "mail.privateemail.com",
//   port: 993,
//   tls: true,
// };

// const imap = new Imap(imapConfig);
// imap.once("error", function (err) {
//   console.log(err);
// });

// imap.once("ready", () => {
//   imap.subscribeBox();
//   imap.openBox("INBOX", true, () => {
//     imap.on("mail", () => {
//       imap.sort(["-ARRIVAL"], ["NEW"], function (err, results) {
//         if (err || !results.length) return imap.end();
//         // or just fetch the only the first (guaranteed to be newest) result
//         let f = imap.fetch(results[0], { bodies: "" });
//         f.on("message", function (msg, seqno) {
//           console.log("Message #%d", seqno);
//           msg.on("body", (stream) => {
//             simpleParser(stream, async (err, parsed) => {
//               console.log(parsed);
//               console.log(parsed.from);
//               console.log(parsed.to);
//               console.log(parsed.attachments);
//               console.log(parsed.textAsHtml);
//             });
//           });
//         });
//       });
//     });
//   });
// });

// imap.connect();

function replaceMentions(html, candidate) {
  return html
    .replaceAll(
      '<span data-type="mention" class="mention" data-id="Candidate.Firstname">@Candidate.Firstname</span>',
      candidate.firstName
    )
    .replaceAll(
      '<span data-type="mention" class="mention" data-id="Candidate.Lastname">@Candidate.Lastname</span>',
      candidate.lastName
    );
}

const { Worker, RedisConnection } = require("bullmq");

const redisConnection = new RedisConnection({
  host: "localhost",
  port: 6379,
});

new Worker(
  "actionQueue",
  async (job) => {
    const transporter = nodemailer.createTransport({
      host: job.data.company.emailHost,
      port: job.data.company.emailPort,
      secure: true,
      auth: {
        user: job.data.company.emailUser,
        pass: job.data.company.emailPass,
      },
    });

    await Promise.all(
      job.data.stage.actions.map(async (action) => {
        const response = await transporter.sendMail({
          from: `"${job.data.company.name}" <${job.data.company.emailUser}>`,
          to: job.data.candidate.email,
          subject: action.emailTemplate.subject,
          html: replaceMentions(action.emailTemplate.body, job.data.candidate),
        });
        console.log(response);
      })
    );
  },
  { connection: redisConnection }
);

new Worker(
  "invitationQueue",
  async (job) => {
    const transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
      port: 465,
      secure: true,
      auth: {
        user: "contact@footape.com",
        pass: "Bbc237dd93e",
      },
    });

    await transporter.sendMail({
      from: `Atestio <contact@footape.com>`,
      to: job.data.email,
      subject: `Invitation to join ${job.data.company}`,
      html: `<p>Follow the link to join the team: <a href="http://localhost:3000/signin?i=${job.data.id}">http://localhost:3000/signup?i=${job.data.id}</a></p>`,
    });
    console.log(`Sent invitation to ${job.data.email}`);
  },
  { connection: redisConnection }
);
