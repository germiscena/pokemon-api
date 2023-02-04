import "./MainPage.scss";
import React, { useState, useEffect, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

import ChatWindow from "../pages/Chat/ChatWindow";
import ChatInput from "../pages/Chat/ChatInput";
import ToastComponent from "../components/ToastComponent.jsx";
import axiosInstance from "../config/axiosInstance";
import { API_URL } from "../.env";

const MainPage = () => {
  const [welcome, setWelcome] = useState(false);
  const [show, setShow] = useState(false);
  const [okey, setOkey] = useState(true);
  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState([]);
  const [userMoney, setUserMoney ] = useState(0);
  let token = localStorage.getItem('token');

  const latestChat = useRef(null);
  latestChat.current = chat;

  async function healingPokemons(){
    let res = await axiosInstance.put(`${API_URL}/Pokemon/healing-user-pokemons?userId=` + localStorage.getItem('userId'))
      .then(setUserMoney(res.data));
  }
  const handleClick = () => {
    healingPokemons();
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 30000);
  };

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${API_URL}/chat`, { accessTokenFactory: () => token })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");
          connection.on("ReceiveMessage", (message) => {
            const updatedChat = [...latestChat.current];
            updatedChat.push(message);

            setChat(updatedChat);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);
  const sendMessage = async (user, message, time) => {
    const chatMessage = {
      userName: user,
      message: message,
      time: time,
    };
    try {
      await connection.send("SendMessage", chatMessage);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='mainPage'>
      <div className='mainPage_landscape' />
      <div className='mainPage_bottom'>
        <div className='mainPage_bottom_chat'>
          <div className='mainPage_bottom_chat_messages'>
            <ChatWindow chat={chat} />
            <ChatInput sendMessage={sendMessage} />
          </div>
        </div>
        <div className='mainPage_bottom_links'>
          <div className='mainPage_bottom_links_route'>
            <h3 className='mainPage_bottom_links_route_title'>LOCATION</h3>
            <div className='mainPage_bottom_links_route_points'>
              <button className='mainPage_bottom_links_route_points_single'>
                Academy of trainers
              </button>
              <button className='mainPage_bottom_links_route_points_single'>PokeCenter</button>
              <button className='mainPage_bottom_links_route_points_single'>Wild Forest</button>
            </div>
          </div>
          <div className='mainPage_bottom_links_route'>
            <h3 className='mainPage_bottom_links_route_title'>ACTIONS</h3>
            <div className='mainPage_bottom_links_route_points'>
              <button
                className='mainPage_bottom_links_route_points_single'
                onClick={() => handleClick()}>
                Healing
              </button>
              {show && (
                <ToastComponent
                  setShow={(inf) => setShow(inf)}
                  isOkey={okey}
                  show={show}
                  text={"Your Pokémons are healed."}
                />
              )}
              <button className='mainPage_bottom_links_route_points_single'>Walk</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
