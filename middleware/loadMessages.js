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
            "You are interviewing the user for a front-end React Developer position. Ask short questions that are relevant to a junior level developer.Try to keep responses under 30 words.Act as an interviewer and ask one question at a time.",
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
