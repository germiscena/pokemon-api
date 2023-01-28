import React from 'react';

const Message = (props) => (
    <div className='mainPage_bottom_chat_messages_single'>
        <p className='mainPage_bottom_chat_messages_single_user'>{props.time}:</p>
        <p className='mainPage_bottom_chat_messages_single_user'>{props.userName}:</p>
        <p className='mainPage_bottom_chat_messages_single_message'>{props.message}</p>
    </div>
);

export default Message;