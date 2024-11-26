const express = require("express");
const app = express();
const cors = require("cors");
require( "dotenv" ).config()

app.use(express.json());
app.use(cors());

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const p1 = "What is the new trend in technology?";

const generateText = async (prompt) => {
  try {
    const generatedResponse = await model.generateContent(prompt);
    const response = generatedResponse.response.text();
    return {
      success: true,
      response: response,
    };
  } catch (error) {
    console.error(`Error occurred ${error}`);
    return {
      success: false,
      response: error.message,
    };
  }
};

app.post("/v1/chat", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await generateText(prompt);
    res.send(response);
  } catch (error) {
    console.error(`Error in route handler: ${error}`);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});