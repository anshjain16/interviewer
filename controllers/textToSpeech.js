import fs from "fs";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI();
const msgPath = "./database.json";
const speechFile = path.resolve("./speech.mp3");

async function textToSpeech(req, res) {
  const input = req.gptResponse;
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "nova",
    input: input,
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
  fs.writeFile(
    msgPath,
    JSON.stringify({ messages: req.messages }),
    function (err) {
      if (err) throw err;
      console.log("complete");
      res.sendFile(speechFile);
    }
  );
}

export { textToSpeech };
