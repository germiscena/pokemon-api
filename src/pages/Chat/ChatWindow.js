import React from 'react';
import Message from 'D:/Study/Graduation project/Front/pokemon/pokemon-api/src/pages/Chat/Message.js';

const ChatWindow = (props) => {
    const chat = props.chat
        .map(m => <Message 
            key={Date.now() * Math.random()}
            user={m.user}
            message={m.message}/>);

    return(
        <div className='mainPage_bottom_chat_messages'>
            {chat}
        </div>
    )
};

export default ChatWindow;