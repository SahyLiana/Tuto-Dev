import "./App.css";
import socketIO from "socket.io-client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ChatPage from "./components/ChatPage";
const socket = socketIO.connect("http://localhost:4000");
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
