import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  const { question } = req.body;
  try {
    const model = new ChatOpenAI({
      apiKey: process.env.OPEN_AI_API_KEY, // Groq API key
      modelName: "llama-3.3-70b-versatile", // or llama3-70b-8192, etc.
      temperature: 0.7,
      configuration: {
        baseURL: "https://api.groq.com/openai/v1",
      },
    });

    const prompt = new PromptTemplate({
      template: "You are a helpful assistant. Answer the question: {question}",
      inputVariables: ["question"],
    });

    const chain = new LLMChain({ llm: model, prompt });
    const result = await chain.call({ question });

    res.json({ answer: result.text });
  } catch (err) {
    console.error("Groq API Error:", err.message);
    res.status(500).json({ error: "Failed to get answer" });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
