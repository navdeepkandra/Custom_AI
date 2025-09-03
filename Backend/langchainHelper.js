import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

export const getResponse = async (question) => {
  const model = new ChatOpenAI({
    apiKey: process.env.OPEN_AI_API_KEY, // Your Groq key
    modelName: "llama3-70b-8192",
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

  const res = await chain.call({ question });
  return res.text;
};
