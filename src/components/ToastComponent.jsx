import "./ToastComponent.scss";
import React, { useState, useEffect, useRef } from "react";
import notOkey from "../img/notOkey.svg";
import okey from "../img/Okey.svg";

const ToastComponent = ({ show, text, isOkey, setShow }) => {
  useEffect(() => {
    setShow(show);
  }, [show]);

  useEffect(() => {
    let timeoutId;
    if (show) {
      timeoutId = setTimeout(() => setShow(false), 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [show]);

  return (
    <div className={show ? "toast show" : "toast"}>
      <div className='toast_form'>
        {isOkey ? (
          <img src={notOkey} className='toast_form_imgNotification' />
        ) : (
          <img src={okey} className='toast_form_imgNotification' />
        )}
        <p className='toast_form_textNotification'>{text}</p>
      </div>
    </div>
  );
};

export default ToastComponent;
