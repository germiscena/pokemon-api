import "./ToastComponent.scss";
import React, { useState, useEffect, useRef } from "react";
import notOkey from "../img/notOkey.svg";
import okey from "../img/Okey.svg";
import battleNotification from "../img/battleNotification.png";

const ToastComponent = ({ show, text, isOkey, setShow, canAccept }) => {
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
              <p className='toast_form_words_accept_yes'>Accept</p>
              <p className='toast_form_words_accept_no'>Close</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToastComponent;
