import React from "react";
import "./Loading.scss";
import logo from "../img/running_pikachu.gif";
import { useNavigate } from "react-router";

const Loading = ({ link }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    setTimeout(() => {
      link ? navigate(link) : navigate("/reg");
    }, 1000);
  }, []);
  return (
    <div className='Loading'>
      <header className='Loading-header'>
        <img src={logo} className='Loading-logo' alt='logo' />
        <p className='Loading-text'>GAME WORLD LOADING . . .</p>
      </header>
    </div>
  );
};

export default Loading;
