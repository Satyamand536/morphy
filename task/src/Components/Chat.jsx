import { useState } from "react";
import axios from "axios";
import "./Chat.css";

function Chat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const askAI = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post("https://morphy-6hyc.onrender.com/chat", {
        prompt,
      });

      setResponse(res.data.choices[0].message.content);
      setPrompt("");
    } catch (err) {
      console.log(err);
      setResponse("❌ Something went wrong.");
    }

    setLoading(false);
  };

  const copyResponse = async () => {
    try {
      await navigator.clipboard.writeText(response);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.log("Copy failed:", err);
    }
  };

  const clearChat = () => {
    setPrompt("");
    setResponse("");
    setCopied(false);
  };

  return (
    <div className="chat-page">
      <div className="chat-card">
        {/* Header */}
        <div className="chat-header">
          <div>
            <h1>🤖 AI Assistant</h1>
            <p>Ask anything. Programming, Science, Travel, History & more.</p>
          </div>

          <button className="clear-btn" onClick={clearChat}>
            🗑️ Clear
          </button>
        </div>

        {/* Input */}
        <div className="input-area">
          <textarea
            placeholder="Ask me anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                askAI();
              }
            }}
          />

          <div className="bottom-bar">
            <span>
              Press <b>Enter</b> to Send • <b>Shift + Enter</b> for New Line
            </span>

            <button
              className="send-btn"
              onClick={askAI}
              disabled={loading}
            >
              {loading ? "⏳ Thinking..." : "🚀 Ask AI"}
            </button>
          </div>
        </div>

        {/* Response */}
        <div className="response-area">
          <div className="response-header">
            <h3>AI Response</h3>

            {response && (
              <button onClick={copyResponse}>
                {copied ? "✅ Copied" : "📋 Copy"}
              </button>
            )}
          </div>

          <div className="response-box">
            {loading ? (
              <div className="thinking">
                <div className="loader"></div>
                <p>AI is thinking...</p>
              </div>
            ) : response ? (
              <pre>{response}</pre>
            ) : (
              <div className="placeholder">
                <h2>👋 Welcome</h2>
                <p>Your AI response will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;