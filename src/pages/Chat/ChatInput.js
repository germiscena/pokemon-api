import React, { useState } from 'react';
import sendMessageIcon from "../../img/sendMessage.svg";

const ChatInput = (props) => {
    var user = localStorage.getItem('nickName');
    const [message, setMessage] = useState('');

    const onSubmit = (e) => {

        const isMessageProvided = message && message !== '';

        if (isMessageProvided) {
            props.sendMessage(user, message);
        } 
        else {
            alert('Please insert a message.');
        }
    }

    const onMessageUpdate = (e) => {
        setMessage(e.target.value);
    }

    return (
        <form 
            onSubmit={onSubmit}>
            <input 
                className='mainPage_bottom_chat_send'
                placeholder='Сообщение...'
                type="text"
                id="message"
                name="message" 
                value={message}
                onChange={onMessageUpdate} 
            />
            <img
                src={sendMessageIcon}
                alt='send'
                className='mainPage_bottom_chat_sendImg' 
                onClick={() => 
                    onSubmit(message)
                }
            />

            
        </form>
    )
};

export default ChatInput;