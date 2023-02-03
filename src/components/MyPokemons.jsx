import React from "react";
import AppContext from "../context";
import "./MyPokemons.scss";
import heleolisk from "../img/Heleolisk.png";
import axios from "axios";
import { API_URL } from "../.env";
import axiosInstance from "../config/axiosInstance";

const MyPokemons = () => {
  const { backpackPokemons, setBackpackPokemons } = React.useContext(AppContext);
  const [pokemons, setPokemons] = React.useState([]);
  async function getPokemons() {
    let data = await axiosInstance
      .get(`${API_URL}/Pokemon/get-user-pokemons?userId=${localStorage.getItem(`userId`)}`)
      .then((res) => {
        setPokemons(res.data);
      });
  }
  React.useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div className='myPokemons'>
      <div className='myPokemons_inside'>
        <h3 className='myPokemons_inside_title'>Мои покемоны</h3>
        <div className='myPokemons_inside_pokemons'>
          {pokemons.map((item) => {
            return (
              <div key={item.id} className='myPokemons_inside_pokemons_single'>
                <img
                  src={heleolisk}
                  alt='pokemon'
                  className='myPokemons_inside_pokemons_single_image'
                />
                <p className='myPokemons_inside_pokemons_single_name'>
                  #00{item.pokemonRecordId} {item.name}
                </p>
                <div className='myPokemons_inside_pokemons_single_health' />
                <div className='myPokemons_inside_pokemons_single_exp' />
              </div>
            );
          })}
        </div>
      </div>
      <button onClick={() => setBackpackPokemons()} className='myPokemons_close'>
        {"<"}
      </button>
    </div>
  );
};

export default MyPokemons;
