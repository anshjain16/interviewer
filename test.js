import OpenAI from "openai";
import express from "express";
import { loadMessages } from "./middleware/loadMessages.js";
import { generateQuestion } from "./middleware/generateQuestion.js";
import { textToSpeech } from "./controllers/textToSpeech.js";
import { speechToText } from "./middleware/speechToText.js";
const openai = new OpenAI();

const app = express();

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content:
//           "You will act as an interviewer for the role of react frontend developer.",
//       },
//       { role: "user", content: "Start asking questions" },
//     ],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0]);
// }
// main();

// take input from user

app.use(express.static("uploads"));

app.post(
  "/interview",
  speechToText,
  loadMessages,
  generateQuestion,
  textToSpeech
);
// generate question

// store history

app.get("/", (req, res) => {
  res.send("hello there");
});

app.listen(8000, () => {
  console.log("server is running");
});
