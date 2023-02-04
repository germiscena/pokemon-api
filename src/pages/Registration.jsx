import React from "react";
import "./Registration.scss";
import pokemon from "../img/RegPok.png";
import { useNavigate } from "react-router";
import axios from "axios";
import ToastComponent from "../components/ToastComponent";
import Loading from "./Loading";
import { API_URL } from "../.env";

//create form registration with axios request

const Registration = () => {
  const [show, setShow] = React.useState(false);
  const [text, setText] = React.useState("");
  const [okey, setOkey] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [nickName, setNickName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginBlock, setLoginBlock] = React.useState(true);

  const [newNickName, setNewNickName] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newPassword2, setNewPassword2] = React.useState("");
  const [newEmail, setNewEmail] = React.useState("");
  const [newGender, setNewGender] = React.useState("");

  const [userId, setUserId] = React.useState("");
  const [token, setToken] = React.useState("");
  const [resfreshToken, setRefreshToken] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [roles, setRoles] = React.useState("");

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
        .post(`${API_URL}/Auth/login`, {
          nickName: nickName,
          password: password,
        })
        .then((res) => {
          setUserId(res.data.result.userId);
          setToken(res.data.result.accessToken);
          setRefreshToken(res.data.result.resfreshToken);
          setUserName(res.data.result.nickName);
          setRoles(res.data.result.roles);
        });
    } catch (error) {
      console.log("pizdec");
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (userId) {
      setOkey(true);
      setText("Добро пожаловать, тренер!");
      setShow(true);
      setLogin(false);
      setLoading(true);
      localStorage.setItem("nickName", nickName);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("refresh_token", resfreshToken);
      localStorage.setItem("role", roles);
      setTimeout(() => {
        navigate("/main");
        setLoading(false);
      }, 3000);
    }
  }, [userId]);
  async function submitRegistration() {
    console.log("click");
    try {
      await axios
        .post(`${API_URL}}/Auth/register`, {
          nickName: newNickName,
          email: newEmail,
          password: newPassword,
          gender: newGender,
        })
        .then((res) => {
          setToken(res.data);
        });
    } catch (err) {
      console.log(err, "ВОТ АШЫБКА");
    }
  }
  React.useEffect(() => {
    if (token) {
      if (token.errorMessages) {
        setOkey(false);
        setText("Такой логин или электронная почта уже используется.");
        setShow(true);
      } else if (token.isSuccess) {
        setOkey(true);
        setText(
          "Ваш аккаунт успешно создан! Вы можете войти в него, нажав на кнопку:'Войти как тренер'.",
        );
        setShow(true);
      }
    }
  }, [token]);
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
      <div className={login || loading ? "reg_info hidden" : "reg_info"}>
        <p className='reg_info_words'>
          Pokemon World - это дипломный проект, в виде браузерной игры про покемонов.
        </p>
        <button onClick={() => setLogin(true)} className='reg_info_login'>
          Войти как тренер
        </button>
        <img src={pokemon} alt='pokemon' className='reg_info_pokemon' />
      </div>
      <div className={login || loading ? "reg_form hidden" : "reg_form"}>
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
              type='password'
              onChange={() => onChangeRegInput()}
              ref={passRef}
              placeholder='Пароль'></input>
          </div>
          <div className='reg_form_block_input'>
            <label>Пароль ещё раз</label>
            <input
              type='password'
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
                newGender === "1"
                  ? "reg_form_block_gender_button boy boyActive"
                  : "reg_form_block_gender_button boy"
              }
              onClick={() => setNewGender("1")}>
              Пол мужской
            </button>
            <button
              className={
                newGender === "2"
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
      {show && (
        <ToastComponent setShow={(inf) => setShow(inf)} show={show} text={text} isOkey={okey} />
      )}
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
              type='password'
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
      {loading && <Loading link={"/main"} />}
    </div>
  );
};

export default Registration;
