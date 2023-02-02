import React from "react";
import "./MainComponent.scss";
import battles from "../img/battles.svg";
import pokedex from "../img/pokedex.svg";
import groups from "../img/groups.svg";
import backpack from "../img/business_center.svg";
import pets from "../img/pets.svg";
import wild from "../img/wild.svg";
import wildOn from "../img/wildOn.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context";
import Pokedex from "./Pokedex";
import FindBattle from "./FindBattle";
import axios from "axios";
import MyPokemons from "./MyPokemons";

const MainComponent = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    pokedexOpen,
    setPokedexOpen,
    wildBattles,
    setWildBattles,
    backpackPokemons,
    setBackpackPokemons,
  } = React.useContext(AppContext);
  const [findBattle, setFindBattle] = React.useState(false);
  //battleAnswer - ответ из модалки
  const [battleAnswer, setBattleAnswer] = React.useState("");
  //myPokemons - запрос на получение покемонов моих
  const [myPokemons, setMyPokemons] = React.useState({});
  //battleInfo - запрос на получение данных боя
  const [battleInfo, setBattleInfo] = React.useState({});
  React.useEffect(() => {
    if (wildBattles == true) {
      setTimeout(() => {
        setFindBattle(true);
      }, 2000);
    }
  }, [wildBattles]);
  const userId = localStorage.getItem("userId");
  async function getPokemons() {
    let res = await axios
      .get("https://localhost:44337/Pokemon/get-user-pokemons?userId=" + userId)
      .then((res) => setMyPokemons(res.data[0]));
  }
  async function getBattleInfo() {
    let res = await axios
      .post("https://localhost:44337/Battle/create-local-battle?pokemonId=" + myPokemons.id)
      .then((res) => {
        setBattleInfo(res.data);
        localStorage.setItem("battleId", res.data.id);
        navigate("/battle", { state: res.data });
      });
  }
  React.useEffect(() => {
    if (battleAnswer == "accept") {
      getPokemons();
    }
  }, [battleAnswer]);

  React.useEffect(() => {
    if (myPokemons.id) {
      getBattleInfo();
    }
  }, [myPokemons]);

  return (
    <div className='main'>
      <div className='main_header'>
        <p className='main_header_title'>POKEMONAPI</p>
      </div>
      {location.pathname !== "/reg" && (
        <div>
          <div className='main_borders left'>
            <img
              className='main_borders_image'
              onClick={() => setBackpackPokemons(true)}
              src={pets}
              alt='pokemons'
            />
            <img className='main_borders_image' src={backpack} alt='inventory' />
            <img className='main_borders_image' src={groups} alt='players' />
          </div>
          <div className='main_borders right'>
            <Link to='/main'>
              {wildBattles ? (
                <img
                  className='main_borders_image'
                  onClick={() => setWildBattles(!wildBattles)}
                  src={wildOn}
                  alt='wild pokemons'
                />
              ) : (
                <img
                  className='main_borders_image'
                  onClick={() => setWildBattles(!wildBattles)}
                  src={wild}
                  alt='wild pokemons'
                />
              )}
            </Link>
            <img
              onClick={() => setPokedexOpen(true)}
              className='main_borders_image'
              src={pokedex}
              alt='pokedex'
            />
            <Link to='/battle'>
              <img className='main_borders_image' src={battles} alt='battles' />
            </Link>
          </div>
        </div>
      )}
      {children}
      {findBattle && (
        <FindBattle
          setWildBattles={(inf) => setWildBattles(inf)}
          setFindBattle={(inf) => setFindBattle(inf)}
          setBattleAnswer={(inf) => setBattleAnswer(inf)}
        />
      )}
      {pokedexOpen && <Pokedex setClose={() => setPokedexOpen(false)} />}
      {backpackPokemons && <MyPokemons setClose={() => setBackpackPokemons(false)} />}
    </div>
  );
};

export default MainComponent;
