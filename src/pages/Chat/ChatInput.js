import React, { useState } from 'react';
import sendMessageIcon from "../../img/sendMessage.svg";
import dayjs from "dayjs";

const ChatInput = (props) => {
    const [message, setMessage] = useState('');
    const [userName, setUserName ] = useState('');
    const [time, setTime] = React.useState("");
    let d = dayjs();

    const thisTime = () => {
        let minutes = d.minute();
        let hours = d.hour();
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (hours < 10) {
          hours = "0" + hours;
        }
        if (minutes === 0) {
          minutes = "00";
        }
        if (hours === 0) {
          hours = "00";
        }
        setTime(hours + ":" + minutes);
      };
    
      React.useEffect(() => {
        thisTime();

        if(!localStorage.getItem('nickName')){
            setUserName('undefined');
        }
        else{
            setUserName(localStorage.getItem('nickName'));
        }
        
      }, [d.minute()]);

    const onSubmit = (e) => {
        e.preventDefault();
        const isMessageProvided = message && message !== '';

        if (isMessageProvided) {
            console.log(userName);
            props.sendMessage(userName, message, time);
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