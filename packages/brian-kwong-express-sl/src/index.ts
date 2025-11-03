import serverless from "serverless-http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import Groq from "groq-sdk";

// Local Data from JSON files
import educationData from "./data/education.json";
import experienceData from "./data/experience.json";
import projectsData from "./data/projects.json";
import githubData from "./data/github.json";

dotenv.config();
const app = express();
let ollama;
const corsOptions = {
  origin: "https://brian-kwong.github.io",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

app.post("/post-contact-form", async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "One or more fields are not provided." });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_APP_TOKEN,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.FORWARDING_EMAIL,
      subject: `New Message from ${name} via Brian's Website Contact Form`,
      text:
        `You have received a new message from your website contact form.\n\n` +
        `Name: ${name}\n\n` +
        `Email: ${email}\n\n` +
        `Message: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send message." });
  }
});

app.post("/website-agent-chat", async (req, res, next) => {
  const brianCVPath =
    process.env.NODE_ENV === "production"
      ? path.join(__dirname, "data", "bkwong_cv.md")
      : "./src/data/bkwong_cv.md";
  const brianCV = fs.readFileSync(brianCVPath, "utf-8");
  const userMessage = req.body.message;
  let previousMessages = req.body.previousMessages || [];

  const prompt = `You are a Meowy, a helpful website assistant for Brian's personal website here to help visitors learn more about Brian.
  Please use the following pieces of information and the resources below ONLY to answer the question passed in by the website visitor.

  --------------------------------------------------
  Resources:

  Education: ${JSON.stringify(educationData, null, 2)}
  Experience: ${JSON.stringify(experienceData, null, 2)}
  Projects: ${JSON.stringify(projectsData, null, 2)}

  Brian's GitHub: ${JSON.stringify(githubData, null, 2)}
  Brian's LinkedIn: https://www.linkedin.com/in/brian-kwong-b68215249/
  Brian's CV (Markdown Format): ${brianCV}

  ------------------------------------------------

  You may also utilize previous messages in the conversation to provide context where relevant.
    
  When responding, you MUST adhere to the following guidelines:
  You are free to follow any links provided on the websites provided to gather further context if needed but DO NOT use any other information and under NO CIRCUMSTANCES should you make up results that are not explicitly stated in the provided resources.
  If you are unable to answer a question, error on the side of caution and indicate that you do not know the answer rather than implying an piece of information. 
  If the question provided is not relevant to Brian or his website, or if you are unable to find the answer using the provided resources, DO NOT answer it! Instead you should politely return the following response: "I'm sorry, but I am unable to assist with that question. Please rephrase your question or try using the contact form to reach out instead. Thank you for understanding."
  Please answer in a concise, professional, and friendly demeanor.
  Keep your answers brief, ideally under 150 words.

  You do not need to introduce yourself as Meowy or repeat the question. Simply provide the answer as if you were having a casual conversation with the website visitor.

  Thank you!
  `;

  const message = await ollama.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: prompt },
      ...previousMessages,
      { role: "user", content: userMessage },
    ],
    max_tokens: 200,
  });
  return res.status(200).json({
    message: message.choices[0].message.content,
  });
});

app.use((_req, res, _next) => {
  return res.status(404).json({
    error: "The requested resource was not found.",
  });
});

const server = serverless(app);

export const handler = async (event: any, context: any) => {
  ollama = new Groq({
    apiKey: process.env.GROQ_API_KEY || "",
  });
  context.callbackWaitsForEmptyEventLoop = false;
  return server(event, context);
};
