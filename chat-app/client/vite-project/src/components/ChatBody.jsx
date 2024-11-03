/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

function ChatBody({ messages, lastMessageRef, typingStatus }) {
  const navigate = useNavigate();

  const handleLeaveCHat = () => {
    localStorage.removeItem("userName");

    navigate("/");
    //WHEN IT REFRESHES THE PAGE, IT FIRST GOES TO socket.on("disconnect") which will filter the users array
    //AND IT WILL EMIT THE users ARRAY, WILL DISCONNECT using socket.disconnect()
    //AFTER THE REFRESH,IT WILL THEN RECONNECT USING A NEW SOCKETID
    //THIS IS THE EXPLANATION OF WHY WE USED THE NEXT LINE
    window.location.reload();
  };
  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveCHat}>
          LEAVE CHAT
        </button>
      </header>

      {/** This shows messages sent from you */}
      {/* <div className="message__chats">
          <p className="sender__name">You</p>
          <div className="message__sender">
            <p>Hello there</p>
          </div>
        </div> */}
      <div className="message__container">
        {messages.map((message) =>
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p style={{ textAlign: "left" }} className="">
                {message.name}
              </p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        {/**This shows messages received by you */}

        {/* <div className="message__chats">
          <p>Other</p>
          <div className="message__recipient">
            <p>Hey, I'm good, you?</p>
          </div>
        </div> */}

        {/**This is triggered when a user is typing */}

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
      </div>
      <div ref={lastMessageRef}></div>
    </>
  );
}

export default ChatBody;
