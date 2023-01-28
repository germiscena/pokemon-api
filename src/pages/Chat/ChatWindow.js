import React from 'react';
import Message from 'D:/Study/Graduation project/Front/pokemon/pokemon-api/src/pages/Chat/ChatWindow.js';

const ChatWindow = (props) => {
    const chat = props.chat
        .map(m => <Message 
            key={Date.now() * Math.random()}
            time={m.time}
            user={m.user}
            message={m.message}/>);

    return(
        <div className='mainPage_bottom_chat_messages'>
            {chat}
        </div>
    )
};

export default ChatWindow;