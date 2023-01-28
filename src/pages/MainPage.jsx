import "./MainPage.scss";
import dayjs from "dayjs";
import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

import ChatWindow from '../pages/Chat/ChatWindow';
import ChatInput from '../pages/Chat/ChatInput';

const MainPage = () => {
  const [ connection, setConnection ] = useState(null);
  const [ chat, setChat ] = useState([]);
  const latestChat = useRef(null);

  latestChat.current = chat;

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:44337/chat')
        .withAutomaticReconnect()
        .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
        connection.start()
          .then(result => {
              console.log('Connected!');

              connection.on('ReceiveMessage', message => {
                  const updatedChat = [...latestChat.current];
                  updatedChat.push(message);
              
                  setChat(updatedChat);
              });
          })
          .catch(e => console.log('Connection failed: ', e));
    }
  }, [connection]);

  const sendMessage = async (user, message) => {
    const chatMessage = {
        user: user,
        message: message
  };

  if (connection.connectionStarted) {
      try {
          await connection.send('SendMessage', chatMessage);
      }
      catch(e) {
          console.log(e);
      }
  }
  else {
      alert('No connection to server yet.');
  }
}


  return (
    <div className='mainPage'>
      <div className='mainPage_landscape' />
      <div className='mainPage_bottom'>
        <div className='mainPage_bottom_chat'>
          <div className='mainPage_bottom_chat_messages'>
            <ChatWindow chat={chat}/>
            <ChatInput sendMessage={sendMessage} />
          </div>
        </div>
        <div className='mainPage_bottom_links'>
          <div className='mainPage_bottom_links_route'>
            <h3 className='mainPage_bottom_links_route_title'>ПЕРЕХОДЫ</h3>
            <div className='mainPage_bottom_links_route_points'>
              <button className='mainPage_bottom_links_route_points_single'>
                Академия тренеров
              </button>
              <button className='mainPage_bottom_links_route_points_single'>Покецентр</button>
              <button className='mainPage_bottom_links_route_points_single'>Дикий лес</button>
            </div>
          </div>
          <div className='mainPage_bottom_links_route'>
            <h3 className='mainPage_bottom_links_route_title'>ДЕЙСТВИЯ</h3>
            <div className='mainPage_bottom_links_route_points'>
              <button className='mainPage_bottom_links_route_points_single'>Лечение</button>
              <button className='mainPage_bottom_links_route_points_single'>Прогулка</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
