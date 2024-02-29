import OpenAI from "openai";

const openai = new OpenAI();

async function generateQuestion(req, res, next) {
  const messages = req.messages;
  const completion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
  messages.push(completion.choices[0]["message"]);
  req.gptResponse = completion.choices[0]["message"]["content"];

  next();
}
// generateQuestion();

export { generateQuestion };
