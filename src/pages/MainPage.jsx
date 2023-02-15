import "./MainPage.scss";
import React, { useState, useEffect, useRef, useContext } from "react";
import { ConnectionContext } from "../components/ConnectionProvider.jsx";
import { API_URL } from "../.env";
import { useNavigate } from "react-router-dom";

import ChatWindow from "../pages/Chat/ChatWindow";
import ChatInput from "../pages/Chat/ChatInput";
import axiosInstance from "../config/axiosInstance";
import close from "../img/closeChat.svg";
import notOkey from "../img/notOkey.svg";
import okey from "../img/Okey.svg";
import battleNotification from "../img/battleNotification.png";
import Loading from "./Loading";
import load from "../img/loadingGif.gif";

const MainPage = ({}) => {
  const [showHealing, setShowHealing] = useState(false);
  const [okey, setOkey] = useState(true);
  const [userMoney, setUserMoney] = useState(0);
  const [hidden, setHidden] = useState({});
  const [callFight, setCallFight] = React.useState(false);
  const [usersArray, setUsersArray] = useState([]);
  const [loadingConnection, setLoadingConnection] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [chat, setChat] = useState([]);
  const [connectionIdSecondPlayer, setConnectionIdSecondPlayer] = useState("");
  var userName = localStorage.getItem("nickName");
  let userId = localStorage.getItem("userId");
  let token = localStorage.getItem("token");
  const { connection } = useContext(ConnectionContext);
  const [queue, setQueue] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoadingConnection(false);
    }, 1000);
  }, [connection]);

  const navigate = useNavigate();
  const latestChat = useRef(null);

  latestChat.current = chat;

  async function healingPokemons() {
    let res = await axiosInstance
      .put(
        `${API_URL}/Pokemon/healing-user-pokemons?userId=` +
          localStorage.getItem("userId")
      )
      .then((res) => setUserMoney(res.data));
  }
  const handleClick = () => {
    healingPokemons();
    setShowHealing(true);
  };
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
  useEffect(() => {
    if (loadingConnection !== true) {
      try {
        if (connection) {
          connection.invoke("OnConnected", userName, userId);

          connection.on("AllUsers", (users) => {
            setUsersArray(users);
          });

          connection.on("Challenge", (connectionIdEnemyPlayer) => {
            setConnectionIdSecondPlayer(connectionIdEnemyPlayer);
            setCallFight(true);
          });

          connection.on("ReceiveMessage", (message) => {
            const updatedChat = [...latestChat.current];
            updatedChat.push(message);

            setChat(updatedChat);
          });

          connection.on("StartBattle", (id) => {
            navigate("/multy-battle", {
              state: { battleId: id, queue: queue },
            });
          });
        }
      } catch (e) {
        console.log("Chtoto ne tak v signalr: ", e);
      }
    }
  }, [loadingConnection]);

  const sendChallenge = async (connectionId) => {
    try {
      await connection.invoke("ChallengePlayer", connectionId).then(() => {
        setQueue(true);
      });
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
      console.log(connectionIdSecondPlayer);
      connection.invoke("ConnectPlayers", connectionIdSecondPlayer);
    }
    const closeClick = () => {
      localStorage.setItem("answer", false);
      setCallFight(false);
    };

    return (
      <div className={show ? "toast show" : "toast"}>
        <div className="toast_form">
          {isOkey === true && (
            <img src={notOkey} className="toast_form_imgNotification" />
          )}
          {isOkey === false && (
            <img src={okey} className="toast_form_imgNotification" />
          )}

          {isOkey == "battle" && (
            <img
              src={battleNotification}
              className="toast_form_imgNotification"
            />
          )}

          <div className="toast_form_words">
            <p className="toast_form_words_textNotification">{text}</p>
            {canAccept && (
              <div className="toast_form_words_accept">
                <p
                  className="toast_form_words_accept_yes"
                  onClick={acceptClick}
                >
                  Accept
                </p>
                <p className="toast_form_words_accept_no" onClick={closeClick}>
                  Close
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mainPage">
      <div className="mainPage_landscape" />
      <div className="mainPage_bottom">
        {loadingConnection == false ? (
          <div className="mainPage_bottom_chat">
            <div className="mainPage_bottom_chat_messages">
              <div className="mainPage_bottom_chat_messages_chatBlock">
                <ChatWindow chat={chat} />
                <ChatInput sendMessage={sendMessage} />
              </div>
              <div className="mainPage_bottom_chat_messages_users">
                <div className="mainPage_bottom_chat_messages_users_names">
                  {usersArray.map((item) => {
                    return (
                      <div key={item.connectionId}>
                        <p
                          onClick={() => setHidden(item)}
                          className="mainPage_bottom_chat_messages_users_names_name"
                        >
                          {item.userName}
                        </p>
                        <div
                          className={
                            hidden != item
                              ? "mainPage_bottom_chat_messages_users_names_hiddenBlock hidden"
                              : "mainPage_bottom_chat_messages_users_names_hiddenBlock"
                          }
                        >
                          <p className="mainPage_bottom_chat_messages_users_names_hiddenBlock_text">
                            Информация о {item.userName}
                          </p>
                          <p
                            className={
                              item.userName == localStorage.getItem("nickName")
                                ? "mainPage_bottom_chat_messages_users_names_hiddenBlock_text hidden"
                                : "mainPage_bottom_chat_messages_users_names_hiddenBlock_text"
                            }
                            onClick={() => sendChallenge(item.connectionId)}
                          >
                            Вызвать на бой
                          </p>
                          <p
                            className={
                              item.userName == localStorage.getItem("nickName")
                                ? "mainPage_bottom_chat_messages_users_names_hiddenBlock_text hidden"
                                : "mainPage_bottom_chat_messages_users_names_hiddenBlock_text"
                            }
                          >
                            Добавить в друзья
                          </p>
                          <p
                            className={
                              item.userName == localStorage.getItem("nickName")
                                ? "mainPage_bottom_chat_messages_users_names_hiddenBlock_text hidden"
                                : "mainPage_bottom_chat_messages_users_names_hiddenBlock_text"
                            }
                          >
                            Открыть чат
                          </p>
                          <img
                            onClick={() => setHidden("")}
                            src={close}
                            alt="close"
                            className="mainPage_bottom_chat_messages_users_names_hiddenBlock_close"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <img src={load} />
        )}
        <div className="mainPage_bottom_links">
          <div className="mainPage_bottom_links_route">
            <h3 className="mainPage_bottom_links_route_title">LOCATION</h3>
            <div className="mainPage_bottom_links_route_points">
              <button className="mainPage_bottom_links_route_points_single">
                Academy of trainers
              </button>
              <button className="mainPage_bottom_links_route_points_single">
                PokeCenter
              </button>
              <button className="mainPage_bottom_links_route_points_single">
                Wild Forest
              </button>
            </div>
          </div>
          <div className="mainPage_bottom_links_route">
            <h3 className="mainPage_bottom_links_route_title">ACTIONS</h3>
            <div className="mainPage_bottom_links_route_points">
              <button
                className="mainPage_bottom_links_route_points_single"
                onClick={() => handleClick()}
              >
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
              <button className="mainPage_bottom_links_route_points_single">
                Walk
              </button>
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
      {showNotification && (
        <ToastComponent ///TODO
          setShow={(inf) => setShowNotification(inf)}
          show={callFight}
          text={"You use more than two accounts"}
          isOkey={"battle"}
          canAccept={false}
        />
      )}
    </div>
  );
};

export default MainPage;
