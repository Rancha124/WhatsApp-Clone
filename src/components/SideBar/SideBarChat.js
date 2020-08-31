import React, { useState, useEffect } from "react";
import "./sidebarchat.css";
import { Avatar } from "@material-ui/core";
import db from "../../firebase";
import { Link } from "react-router-dom";

function SideBarChat({ id, name, addNewChat }) {
  const [messages, setMessages] = useState("");
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timeStamp", "asc")
        .onSnapshot((snapshot) => {
          //console.log("hi", snapshot);
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [id]);
  const newChat = () => {
    const roomName = prompt("Enter the room name please!");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebar__chat">
        <div className="sidebar__chat__box">
          <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} />
          <div className="chat__info">
            <h2>{name}</h2>
            <p>{messages[messages.length - 1]?.message}</p>
          </div>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebar__chat" onClick={newChat}>
      <h2>Add new Chat</h2>
    </div>
  );
}

export default SideBarChat;
