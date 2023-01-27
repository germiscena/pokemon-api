import React from "react";
import "./MainPage.scss";
import sendMessageIcon from "../img/sendMessage.svg";
import dayjs from "dayjs";

const MainPage = () => {
  const [time, setTime] = React.useState("");
  const [text, setText] = React.useState("");
  const [message, setMessage] = React.useState({});
  const [messages, setMessages] = React.useState([]);
  const [id, setId] = React.useState(0);

  let d = dayjs();
  const messageRef = React.useRef();

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
    setMessage({ id: id, time: time, text: text, name: "Арсэн228" });
  }, [d.minute(), text]);
  return (
    <div className='mainPage'>
      <div className='mainPage_landscape' />
      <div className='mainPage_bottom'>
        <div className='mainPage_bottom_chat'>
          <div className='mainPage_bottom_chat_messages'>
            <div className='mainPage_bottom_chat_messages_single'>
              <p className='mainPage_bottom_chat_messages_single_time'>21:53</p>
              <p className='mainPage_bottom_chat_messages_single_name'>Арсений228:</p>
              <p className='mainPage_bottom_chat_messages_single_text'>Привет чурбан!</p>
            </div>
            {messages.map((item) => {
              return (
                <div key={item.id} className='mainPage_bottom_chat_messages_single'>
                  <p className='mainPage_bottom_chat_messages_single_time'>{item.time}</p>
                  <p className='mainPage_bottom_chat_messages_single_name'>{item.name}:</p>
                  <p className='mainPage_bottom_chat_messages_single_text'>{item.text}</p>
                </div>
              );
            })}
          </div>
          <input
            onChange={() => setText(messageRef.current.value)}
            ref={messageRef}
            className='mainPage_bottom_chat_send'
            placeholder='Сообщение...'
          />
          <img
            onClick={() => {
              setMessages([...messages, message]);
              setId(id + 1);
            }}
            src={sendMessageIcon}
            alt='send'
            className='mainPage_bottom_chat_sendImg'
          />
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
