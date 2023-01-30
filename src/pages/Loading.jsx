import React from "react";
import "./Loading.scss";
import logo from "../logo.svg";
import { useNavigate } from "react-router";

const Loading = ({ link }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    setTimeout(() => {
      link ? navigate(link) : navigate("/reg");
    }, 3000);
  }, []);
  return (
    <div className='Loading'>
      <header className='Loading-header'>
        <img src={logo} className='Loading-logo' alt='logo' />
        <p>LOADING . . .</p>
      </header>
    </div>
  );
};

export default Loading;
