import "./App.css";
import Chat from "./components/Chat";

function App() {

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">LangChain Chat</h1>
        <Chat />
      </div>
    </>
  );
}

export default App;
