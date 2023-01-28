import React from "react";
import "./Registration.scss";
import pokemon from "../img/RegPok.png";
import { useNavigate } from "react-router";
import axios from "axios";

//create form registration with axios request

const Registration = () => {
  const [nickName, setNickName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginBlock, setLoginBlock] = React.useState(true);

  const [newNickName, setNewNickName] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newPassword2, setNewPassword2] = React.useState("");
  const [newEmail, setNewEmail] = React.useState("");
  const [newGender, setNewGender] = React.useState("");

  const [token, setToken] = React.useState({});
  const [login, setLogin] = React.useState(false);
  const [blockButton, setBlockButton] = React.useState(true);
  const navigate = useNavigate();

  const nameRef = React.useRef("");
  const passRef = React.useRef("");
  const pass2Ref = React.useRef("");
  const mailRef = React.useRef("");

  const loginName = React.useRef("");
  const loginPass = React.useRef("");

  let submitLoggin = async () => {
    try {
      await axios
        .post("/api/Auth/login", {
          nickName: nickName,
          password: password,
        })
        .then((res) => {
          setToken(res.data);
          if (res.data.isSuccess) {
            setLogin(true);
            navigate("/main");
          }
        });
    } catch (error) {
      console.log("pizdec");
      console.log(error);
    }
  };
  
  async function submitRegistration() {
    try {
      await axios
        .post('/api/Auth/register', {
          nickName: newNickName,
          email: newEmail,
          password: newPassword,
          gender: newGender,
        })
        .then((res) => {
          setToken(res.data);
          if (res.data.isSuccess) {
            setLogin(true);
            navigate("/main");
          }
        });
    } catch (err) {
      console.log(err, "ВОТ АШЫБКА");
    }
  }

  const onChangeRegInput = () => {
    setNewNickName(nameRef.current.value);
    setNewPassword(passRef.current.value);
    setNewPassword2(pass2Ref.current.value);
    setNewEmail(mailRef.current.value);
    setNewGender(newGender);
  };
  const onChangeLogInput = () => {
    setNickName(loginName.current.value);
    setPassword(loginPass.current.value);
  };

  React.useEffect(() => {
    if (
      newNickName !== "" &&
      newPassword !== "" &&
      newPassword2 !== "" &&
      newPassword === newPassword2 &&
      newEmail !== "" &&
      newGender
    ) {
      setBlockButton(false);
    } else {
      setBlockButton(true);
    }
  }, [newNickName, newPassword, newPassword2, newEmail, newGender]);

  React.useEffect(() => {
    if (nickName !== "" && password !== "") {
      setLoginBlock(false);
    } else {
      setLoginBlock(true);
    }
  }, [nickName, password]);

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
            <input
              type='text'
              onChange={() => onChangeRegInput()}
              ref={nameRef}
              placeholder='Логин'></input>
          </div>
          <div className='reg_form_block_input'>
            <label>Пароль</label>
            <input
              type='text'
              onChange={() => onChangeRegInput()}
              ref={passRef}
              placeholder='Пароль'></input>
          </div>
          <div className='reg_form_block_input'>
            <label>Пароль ещё раз</label>
            <input
              type='text'
              onChange={() => onChangeRegInput()}
              ref={pass2Ref}
              placeholder='Пароль ещё раз'></input>
          </div>
          <div className='reg_form_block_input'>
            <label>Электронная почта</label>
            <input
              type='text'
              onChange={() => onChangeRegInput()}
              ref={mailRef}
              placeholder='Электронная почта'></input>
          </div>
          <div className='reg_form_block_gender'>
            <button
              className={
                newGender == "1"
                  ? "reg_form_block_gender_button boy boyActive"
                  : "reg_form_block_gender_button boy"
              }
              onClick={() => setNewGender("1")}>
              Пол мужской
            </button>
            <button
              className={
                newGender == "2"
                  ? "reg_form_block_gender_button girl girlActive"
                  : "reg_form_block_gender_button girl"
              }
              onClick={() => setNewGender("2")}>
              Пол женский
            </button>
          </div>
          <button
            onClick={() => submitRegistration()}
            className={blockButton ? "reg_form_block_register blocked" : "reg_form_block_register"}>
            Зарегистрироваться
          </button>
        </div>
        <button onClick={() => navigate("/main")} className='reg_form_skip'>
          Пропустить
        </button>
      </div>
      {login && (
        <div className='reg_login'>
          <button className='reg_login_leave' onClick={() => setLogin(false)}>
            ✖
          </button>
          <div className='reg_login_input'>
            <label>Имя персонажа</label>
            <input
              type='text'
              ref={loginName}
              placeholder='Логин'
              onChange={() => onChangeLogInput()}></input>
          </div>
          <div className='reg_login_input'>
            <label>Пароль</label>
            <input
              type='text'
              ref={loginPass}
              placeholder='Пароль'
              onChange={() => onChangeLogInput()}></input>
          </div>
          <button
            onClick={() => submitLoggin()}
            className={loginBlock ? "reg_login_button blocked" : "reg_login_button"}>
            Войти
          </button>
        </div>
      )}
    </div>
  );
};

export default Registration;
