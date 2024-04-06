import fs from "fs";
import OpenAI from "openai";
import Download from "node-remote-file-save";

const openai = new OpenAI();

let res1 = Download.download({
  url: "https://voiceage.com/wbsamples/in_mono/Conference.wav",
  dir: "../uploads",
});

let recordingPath;
await res1.then((res1) => {
  console.log(res1);
  recordingPath = res1.data.filePath;
});

async function speechToText(req, res, next) {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(recordingPath),
    model: "whisper-1",
  });

  console.log(transcription.text);
  const userMessage = { role: "user", content: transcription.text };
  req.userMessage = userMessage;
  next();
}

export { speechToText };
