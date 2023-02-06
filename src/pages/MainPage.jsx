import "./MainPage.scss";
import React, { useState, useEffect, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

import ChatWindow from "../pages/Chat/ChatWindow";
import ChatInput from "../pages/Chat/ChatInput";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../config/axiosInstance";
import { API_URL } from "../.env";
import close from "../img/closeChat.svg";
import notOkey from "../img/notOkey.svg";
import okey from "../img/Okey.svg";
import battleNotification from "../img/battleNotification.png";

const MainPage = () => {
  const [showHealing, setShowHealing] = useState(false);
  const [okey, setOkey] = useState(true);
  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState([]);
  const [userMoney, setUserMoney] = useState(0);
  const [hidden, setHidden] = useState({});
  const [callFight, setCallFight] = React.useState(false);
  let userName = localStorage.getItem("nickName");
  let userId = localStorage.getItem("userId");
  const [usersArray, setUsersArray] = useState([]);
  let token = localStorage.getItem("token");
  const [ answer, setAnswer ] = useState(false);
  const [ connectionIdSecondPlayer, setConnectionIdSecondPlayer ] = useState("");
  const navigate= useNavigate ();
  const latestChat = useRef(null);
  latestChat.current = chat;

  async function healingPokemons() {
    let res = await axiosInstance
      .put(`${API_URL}/Pokemon/healing-user-pokemons?userId=` + localStorage.getItem("userId"))
      .then(setUserMoney(res.data));
  }
  const handleClick = () => {
    healingPokemons();
    setShowHealing(true);

  };
  useEffect(() =>{
    if(answer){
      console.log("use effect work, but invoke no")
      connection.invoke("ConnectPlayers", connectionIdSecondPlayer);
    }
  }, []);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${API_URL}/chat`, { accessTokenFactory: () => token })
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");
          connection.on("UserExist", () => {
            console.log("kak by slovyl, no net")
            navigate("/reg");
          })
          connection.invoke("OnConnected", userName, userId);
          connection.on("AllUsers", (users) => {
            setUsersArray(users);
          });
          connection.on("Challenge", (connectionIdEnemyPlayer) => {
            setConnectionIdSecondPlayer(connectionIdEnemyPlayer);
            setCallFight(true);
          })
          connection.on("StartBattle", (id) => {
            navigate ("/multy-battle" ,{state:{battleId: id}});
          })
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

  const sendChallenge = async (connectionId) => {
    try {
      await connection.invoke("ChallengePlayer", connectionId);
    } catch (e) {
      console.log(e);
    }
  };

  const ToastComponent = ({ show, text, isOkey, setShow, canAccept }) => {
    const navigate = useNavigate();
    useEffect(() => {
      setShow(show);
    }, [show]);
  
    useEffect(() => {
      let timeoutId;
      if (show && canAccept) {
        timeoutId = setTimeout(() => setShow(false), 10000);
      } else if (show) {
        timeoutId = setTimeout(() => setShow(false), 3000);
      }
      return () => clearTimeout(timeoutId);
    }, [show, canAccept]);
  
    async function acceptClick() {
      console.log("eto moy toast");
      connection.invoke("ConnectPlayers", connectionIdSecondPlayer);
      
    }
    const closeClick = () => {
      localStorage.setItem("answer", false);
      setCallFight(false);
    }
  
    return (
      <div className={show ? "toast show" : "toast"}>
        <div className='toast_form'>
          {isOkey === true && <img src={notOkey} className='toast_form_imgNotification' />}
          {isOkey === false && <img src={okey} className='toast_form_imgNotification' />}
  
          {isOkey == "battle" && (
            <img src={battleNotification} className='toast_form_imgNotification' />
          )}
  
          <div className='toast_form_words'>
            <p className='toast_form_words_textNotification'>{text}</p>
            {canAccept && (
              <div className='toast_form_words_accept'>
                <p className='toast_form_words_accept_yes'
                  onClick={acceptClick}>Accept</p>
                <p className='toast_form_words_accept_no'
                  onClick={closeClick}>Close</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='mainPage'>
      <div className='mainPage_landscape' />
      <div className='mainPage_bottom'>
        <div className='mainPage_bottom_chat'>
          <div className='mainPage_bottom_chat_messages'>
            <div className='mainPage_bottom_chat_messages_chatBlock'>
              <ChatWindow chat={chat} />
              <ChatInput sendMessage={sendMessage} />
            </div>
            <div className='mainPage_bottom_chat_messages_users'>
              <div className='mainPage_bottom_chat_messages_users_names'>
                {usersArray.map((item) => {
                  return (
                    <div key={item}>
                      <p
                        onClick={() => setHidden(item)}
                        className='mainPage_bottom_chat_messages_users_names_name'>
                        {item.userName}
                      </p>
                      <div
                        className={
                          hidden != item
                            ? "mainPage_bottom_chat_messages_users_names_hiddenBlock hidden"
                            : "mainPage_bottom_chat_messages_users_names_hiddenBlock"
                        }>
                        <p className='mainPage_bottom_chat_messages_users_names_hiddenBlock_text'>
                          Информация о {item.userName}
                        </p>
                        <p 
                          className='mainPage_bottom_chat_messages_users_names_hiddenBlock_text'
                          onClick={ () => sendChallenge(item.connectionId)}>
                          Вызвать на бой
                        </p>
                        <p className='mainPage_bottom_chat_messages_users_names_hiddenBlock_text'>
                          Добавить в друзья
                        </p>
                        <p className='mainPage_bottom_chat_messages_users_names_hiddenBlock_text'>
                          Открыть чат
                        </p>
                        <img
                          onClick={() => setHidden("")}
                          src={close}
                          alt='close'
                          className='mainPage_bottom_chat_messages_users_names_hiddenBlock_close'
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
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
              {showHealing && (
                <ToastComponent
                  setShow={(inf) => setShowHealing(inf)}
                  isOkey={okey}
                  show={showHealing}
                  text={"Your Pokémons are healed."}
                  canAccept={false}
                />
              )}
              <button className='mainPage_bottom_links_route_points_single'>Walk</button>
            </div>
          </div>
        </div>
      </div>
      {callFight && (
        <ToastComponent
          setShow={(inf) => setCallFight(inf)}
          show={callFight}
          text={"You are called to fight"}
          isOkey={"battle"}
          canAccept={true}
        />
      )}
    </div>
  );
};

export default MainPage;
