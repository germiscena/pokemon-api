import React from "react";
import "./Registration.scss";
import pokemon from "../img/RegPok.png";
import { useNavigate } from "react-router";

const Registration = () => {
  const navigate = useNavigate();
  const [login, setLogin] = React.useState(false);
  function loggin() {
    navigate("/main");
    setLogin(false);
  }
  return (
    <div className='reg'>
      <div className={login ? "reg_info hidden" : "reg_info"}>
        <p className='reg_info_words'>
          PokemonAPI - это дипломный проект, в виде браузерной игры про покемонов.
        </p>
        <button onClick={() => setLogin(true)} className='reg_info_login'>
          Войти как тренер
        </button>
        <img src={pokemon} alt='pokemon' className='reg_info_pokemon' />
      </div>
      <div className={login ? "reg_form hidden" : "reg_form"}>
        <div className='reg_form_block'>
          <div className='reg_form_block_input'>
            <label>Имя персонажа</label>
            <input type='text'></input>
          </div>
          <div className='reg_form_block_input'>
            <label>Пароль</label>
            <input type='text'></input>
          </div>
          <div className='reg_form_block_input'>
            <label>Пароль ещё раз</label>
            <input type='text'></input>
          </div>
          <div className='reg_form_block_input'>
            <label>Электронная почта</label>
            <input type='text'></input>
          </div>
          <div className='reg_form_block_gender'>
            <button className='reg_form_block_gender_button boy'>Пол мужской</button>
            <button className='reg_form_block_gender_button girl'>Пол женский</button>
          </div>
          <button className='reg_form_block_register'>Зарегистрироваться</button>
        </div>
        <button onClick={() => navigate("/main")} className='reg_form_skip'>
          Пропустить
        </button>
      </div>
      {login && (
        <div className='reg_login'>
          <div className='reg_login_input'>
            <label>Имя персонажа</label>
            <input type='text'></input>
          </div>
          <div className='reg_login_input'>
            <label>Пароль</label>
            <input type='text'></input>
          </div>
          <button onClick={() => loggin()} className='reg_login_button'>
            Войти
          </button>
        </div>
      )}
    </div>
  );
};

export default Registration;
