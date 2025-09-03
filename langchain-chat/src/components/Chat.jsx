import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://custom-ai-ym08.onrender.com/ask", { question });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("Error fetching answer.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>
      {answer && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
};

export default Chat;
