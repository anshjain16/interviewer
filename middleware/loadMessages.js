import fs from "fs";
const path = "./database.json";

const loadMessages = async (req, res, next) => {
  fs.readFile(path, "utf8", async (err, data) => {
    if (err) {
      console.error("Error while reading the file:", err);
      return;
    }
    try {
      const parsedData = await JSON.parse(data);
      console.log(parsedData);
      if (parsedData["messages"].length == 0) {
        parsedData["messages"].push({
          role: "system",
          content:
            "You are interviewing the user for a front-end React Developer position. Ask short questions that are relevant to a junior level developer.Try to keep responses under 30 words.Act as an interviewer and ask one question at a time.You can also cross-question the user on the basis of thier response to confuse them even if they gave a correct answer, and also cross question them in general, also you can criticize them for giving a wrong answer, and you need to judge them thoruoghly. You also need to evaluate the user on the basis of thier knowledge level, so keep track of users performance, you can end the interview process when you feel that you have assessed the user, with a ending message, and then provide the evaluation report with some kind of grade and provide a feedback.",
        });
      }
      const msg = req.userMessage;
      const userMessage = { role: "user", content: msg };
      parsedData["messages"].push(msg);

      console.log(parsedData["messages"]);
      req.messages = parsedData["messages"];
      next();
    } catch (err) {
      console.error("Error while parsing JSON data:", err);
    }
  });
};

// loadMessages();

export { loadMessages };
