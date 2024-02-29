import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

async function speechToText(req, res, next) {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("./test-audio1.mp3"),
    model: "whisper-1",
  });

  console.log(transcription.text);
  const userMessage = { role: "user", content: transcription.text };
  req.userMessage = userMessage;
  next();
}

export { speechToText };
