import React from "react";
import Message from "./Message";
import "../MainPage.scss";

const ChatWindow = (props) => {
  const chat = props.chat.map((m) => (
    <Message
      key={Date.now() * Math.random()}
      time={m.time}
      userName={m.userName}
      message={m.message}
    />
  ));

  return <div className='mainPage_bottom_chat_chatBlock_messages'>{chat}</div>;
};

export default ChatWindow;
