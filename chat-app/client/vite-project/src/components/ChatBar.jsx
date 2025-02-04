/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function ChatBar({ socket }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket]);

  console.log("Users", users);
  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {/* <p>User 1</p>
          <p>User 2</p>
          <p>User 3</p>
          <p>User 4</p> */}
          {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatBar;
