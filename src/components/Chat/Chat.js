import React, { useState, useEffect } from "react";
import "./chat.css";
import { Avatar, IconButton, Button } from "@material-ui/core";
import { SearchOutlined, AttachFile, InsertEmoticon } from "@material-ui/icons";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "../../firebase";
import { useStateValue } from "../../stateProvider";
import firebase from "firebase";
import { actionTypes } from "../../reducer";

function Chat() {
    const [open, setOpen] = useState(false)
  const [inputMsg, setInputMsg] = useState("");
  const { roomID } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  const logOut = () => {
      dispatch({type: actionTypes.log_out, user: null, loginStatus: false})
      setOpen(false)
  }
 const clearChat = () => {
 setMessages([])
 setOpen(false)
  }
  const messageSend = (e) => {
    e.preventDefault();
    //console.log(inputMsg);
    db.collection("rooms").doc(roomID).collection("messages").add({
      name: user.displayName,
      message: inputMsg,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInputMsg("");
  };

  useEffect(() => {
    if (roomID) {
      db.collection("rooms")
        .doc(roomID)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
          db.collection("rooms")
            .doc(roomID)
            .collection("messages")
            .orderBy("timeStamp", "asc")
            .onSnapshot((snapshot) =>
              setMessages(snapshot.docs.map((doc) => doc.data()))
            );
        });
    }
  }, [roomID]);
  return (
    <>
      <div className="chat">
        <div className="chat__header">
          <Avatar
            src={`https://avatars.dicebear.com/api/human/${roomID}.svg`}
          />
          <div className="chat__header__info">
            <h3>{roomName}</h3>
            <p>
              Last seen{" "}
              {new Date(
                messages[messages.length - 1]?.timeStamp?.toDate()
              ).toUTCString()}
            </p>
          </div>
          <div className="chat__header__right">
            <IconButton>
              <SearchOutlined />
            </IconButton>
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton className="try">
              <MoreVertIcon    onClick={() => setOpen(!open)} />
             {open && 
              <div className="drop-down">
                    <p onClick={clearChat}>Clear chat</p>
                    <p onClick={logOut}>Log Out</p>
              </div>
                }
            </IconButton>
          </div>
        </div>
        <div className="chat__body">
          {messages.map((message) => {
            return (
              <p
                className={`chat__message  ${
                  message.name === user.displayName
                    ? "chat__receiver"
                    : "chat__message"
                }`}
              >
                <span className="chat__name">{message.name}</span>
                {message.message}
                <span className="chat__timeStamp">
                  {new Date(message.timeStamp?.toDate()).toUTCString()}
                </span>
              </p>
            );
          })}
        </div>

        <div className="chat__footer">
          <IconButton>
            <InsertEmoticon />
          </IconButton>
          <form>
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Type message here"
            />
            <button type="submit" onClick={messageSend}>
              Send a message
            </button>
          </form>
          <IconButton>
            <MicIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default Chat;
