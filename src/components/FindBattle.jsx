import React from "react";
import "./FindBattle.scss";
import findBattle from "../img/findBattle.jpg";

const FindBattle = ({ setBattleAnswer, setFindBattle, setWildBattles }) => {
  return (
    <div className='findBattle'>
      <img className='findBattle_img' src={findBattle} alt='findBattle' />
      <h2 className='findBattle_title'>На Вас напал дикий покемон!</h2>
      <div className='findBattle_buttons'>
        <button
          onClick={() => {
            setBattleAnswer("accept");
            setFindBattle(false);
            setWildBattles(false);
          }}
          className='findBattle_buttons_button'>
          Принять
        </button>
        <button
          onClick={() => {
            setBattleAnswer("decline");
            setFindBattle(false);
            setWildBattles(false);
          }}
          className='findBattle_buttons_button'>
          Сбежать
        </button>
      </div>
    </div>
  );
};

export default FindBattle;
