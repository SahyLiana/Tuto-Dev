/* eslint-disable react/prop-types */
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function ChatFooter({ socket }) {
  const [message, setMessage] = useState("");

  //TO HANDLE IF THE USER IS TYPING
  const handleTyping = () => {
    socket.emit("typing", `${localStorage.getItem("userName")}`);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log({ userName: localStorage.getItem("userName"), message });

    if (message.trim() && localStorage.getItem("userName")) {
      // eslint-disable-next-line react/prop-types
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }

    // socket.on("noTypingResponse", (data) => setTypingStatus(data));
    // setTypingStatus("");

    setMessage("");
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          //TO HANDLE IF IT IS TYPING
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
}

export default ChatFooter;
