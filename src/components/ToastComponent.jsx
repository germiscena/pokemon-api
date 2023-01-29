import "./ToastComponent"
import React, { useState, useEffect, useRef } from 'react';
import notOkey from "../img/notOkey.svg";

const ToastComponent = ({ show }) => {
    const [isVisible, setIsVisible] = useState(show);

    useEffect(() => {
        setIsVisible(show);
    }, [show]);

    useEffect(() => {
        let timeoutId;
        if (show) {
          timeoutId = setTimeout(() => setIsVisible(false), 3000);
        }
        return () => clearTimeout(timeoutId);
      }, [show]);

    return(
        <div className='toast'>
            <div className='toast_form'>
                <img 
                src={notOkey}
                className='toast_form_imgNotification'/>
                <p className="toast_form_textNotification">Your Pokémon are healed.</p>
            </div>
        </div>
    )
};

export default ToastComponent;
