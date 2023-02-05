import React from "react";
import "../MainPage.scss";

const Message = (props) => (
  <div className='mainPage_bottom_chat_messages_chatBlock_single'>
    <p className='mainPage_bottom_chat_messages_chatBlock_single_time'>{props.time}:</p>
    <p className='mainPage_bottom_chat_messages_chatBlock_single_user'>{props.userName}:</p>
    <p className='mainPage_bottom_chat_messages_chatBlock_single_message'>{props.message}</p>
  </div>
);

export default Message;
