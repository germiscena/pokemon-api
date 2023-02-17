import "./ToastComponent.scss";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import notOkey from "../img/notOkey.svg";
import okey from "../img/Okey.svg";
import battleNotification from "../img/battleNotification.png";
import axiosInstance from "../config/axiosInstance";
import { API_URL } from "../.env";

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
    navigate("/multy-battle");
    let battle = await axiosInstance.post(`${API_URL}/Battle/create-battle`, {
      attackPokemon: "B89FBA95-8C1B-413B-D359-08DB07B10A0B",
      defendingPokemon: "692C9EF3-8483-44DD-AE01-08D80107551D",
    });
  }
  const closeClick = () => {
    localStorage.setItem("answer", false);
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
              <p className="toast_form_words_accept_yes" onClick={acceptClick}>
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

export default ToastComponent;
