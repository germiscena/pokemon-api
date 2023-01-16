import React from "react";
import "./Registration.scss";
import pokemon from "../img/RegPok.png";
import { useNavigate } from "react-router";
import axios from "axios";

const Registration = () => {
  const [nickName, setNickName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [newNickName, setNewNickName] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newPassword2, setNewPassword2] = React.useState("");
  const [newEmail, setNewEmail] = React.useState("");
  const [newGender, setNewGender] = React.useState("");
  
  const [token, setToken] = React.useState({})
  const [login, setLogin] = React.useState(false);
  const navigate = useNavigate();

  let submitLoggin = async (e) => {
    e.preventDefault();
    try{
      await axios.post('https://localhost:44337/Auth/login', {
        nickName: nickName,
        password: password
      }).then((res)=>setToken(res.data));
      
    }
    catch{
      console.log("pizdec");
    }
  }
  if (token.isSuccess){
    setNickName("");
    setPassword("");
    navigate("/main");
    setLogin(true);
  }
  
  let submitReggistration = async (a) => {
    a.preventDefault();
    if(newPassword === newPassword2){
      try{
        let res = await axios.post('https://localhost:44337/Auth/register', {
          nickName: newNickName,
          email: newEmail,
          password: newPassword,
          gender: newGender
        }).then((res)=>setToken(res.data));
      }
      catch{
        console.log("error");
      }
      if(token.isSuccess){
        navigate("/main");
        setLogin(true);
      }
    }
    else{
      setNewPassword("");
      setNewPassword2("");
    }

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
          <form>
            <div className='reg_form_block_input'>
              <label>Имя персонажа</label>
              <input type='text' value={newNickName} placeholder="Логин" onChange={(e) => setNewNickName(e.target.value)}></input>
            </div>
            <div className='reg_form_block_input'>
              <label>Пароль</label>
              <input type='text'value={newPassword} placeholder="Пароль" onChange={(e) => setNewPassword(e.target.value)}></input>
            </div>
            <div className='reg_form_block_input'>
              <label>Пароль ещё раз</label>
              <input type='text'value={newPassword2} placeholder="Пароль ещё раз" onChange={(e) => setNewPassword2(e.target.value)}></input>
            </div>
            <div className='reg_form_block_input'>
              <label>Электронная почта</label>
              <input type='text'value={newEmail} placeholder="Электронная почта" onChange={(e) => setNewEmail(e.target.value)}></input>
            </div>
            <div className='reg_form_block_gender'>
              <button className='reg_form_block_gender_button boy' onChange={(e) => setNewEmail(1)}>Пол мужской</button>
              <button className='reg_form_block_gender_button girl' onChange={(e) => setNewEmail(2)}>Пол женский</button>
            </div>
            <button type="submit" onSubmit={submitReggistration} className='reg_form_block_register'>Зарегистрироваться</button>
          </form>
        </div>
        <button onClick={() => navigate("/main")} className='reg_form_skip'>
          Пропустить
        </button>
      </div>
      {login && (
        <div className='reg_login'>
          <form onSubmit={submitLoggin}>
            <div className='reg_login_input'>
            <label>Имя персонажа</label>
            <input type='text' value={nickName} placeholder="Логин" onChange={(e) => setNickName(e.target.value)}></input>
          </div>
          <div className='reg_login_input'>
            <label>Пароль</label>
            <input type='text' value={password} placeholder="Пароль" onChange={(e) => setPassword(e.target.value)}></input>
          </div>
          <button type="submit" className='reg_login_button'>
            Войти
          </button>
          </form>

        </div>
      )}
    </div>
  );
};

export default Registration;
