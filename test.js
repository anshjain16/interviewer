import OpenAI from "openai";
import express from "express";
import { loadMessages } from "./middleware/loadMessages.js";
import { generateQuestion } from "./middleware/generateQuestion.js";
import { textToSpeech } from "./controllers/textToSpeech.js";
import { speechToText } from "./middleware/speechToText.js";
const openai = new OpenAI();

const app = express();

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
