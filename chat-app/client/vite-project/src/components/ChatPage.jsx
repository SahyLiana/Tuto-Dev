/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

// eslint-disable-next-line react/prop-types
function ChatPage({ socket }) {
  const [messages, setMessages] = useState([]);

  const [typingStatus, setTypingStatus] = useState("");

  //AUTO SCROLL AT BOTTOM
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    //scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
    // setTimeout(() => {
    console.log("NotypingResonseTriggered");
    socket.on("noTypingResponse", (data) => {
      console.log("DataNO", data);
      setTypingStatus(data);
    });
    // }, 5000);
  }, [messages, socket]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          lastMessageRef={lastMessageRef}
          typingStatus={typingStatus}
          socket={socket}
        />
        <ChatFooter socket={socket} setTypingStatus={setTypingStatus} />
      </div>
    </div>
  );
}

export default ChatPage;
