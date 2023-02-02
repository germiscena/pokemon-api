import React from "react";
import AppContext from "../context";
import "./MyPokemons.scss";
import heleolisk from "../img/Heleolisk.png";

const MyPokemons = () => {
  const { backpackPokemons, setBackpackPokemons } = React.useContext(AppContext);
  return (
    <div className='myPokemons'>
      <div className='myPokemons_inside'>
        <h3 className='myPokemons_inside_title'>Мои покемоны</h3>
        <div className='myPokemons_inside_pokemons'>
          <div className='myPokemons_inside_pokemons_single'>
            <img
              src={heleolisk}
              alt='pokemon'
              className='myPokemons_inside_pokemons_single_image'
            />
            <p className='myPokemons_inside_pokemons_single_name'>#695 Гелиолиск</p>
            <div className='myPokemons_inside_pokemons_single_health' />
            <div className='myPokemons_inside_pokemons_single_exp' />
          </div>
          <div className='myPokemons_inside_pokemons_single'>
            <img
              src={heleolisk}
              alt='pokemon'
              className='myPokemons_inside_pokemons_single_image'
            />
            <p className='myPokemons_inside_pokemons_single_name'>#695 Гелиолиск</p>
            <div className='myPokemons_inside_pokemons_single_health' />
            <div className='myPokemons_inside_pokemons_single_exp' />
          </div>
          <div className='myPokemons_inside_pokemons_single'>
            <img
              src={heleolisk}
              alt='pokemon'
              className='myPokemons_inside_pokemons_single_image'
            />
            <p className='myPokemons_inside_pokemons_single_name'>#695 Гелиолиск</p>
            <div className='myPokemons_inside_pokemons_single_health' />
            <div className='myPokemons_inside_pokemons_single_exp' />
          </div>
          <div className='myPokemons_inside_pokemons_single'>
            <img
              src={heleolisk}
              alt='pokemon'
              className='myPokemons_inside_pokemons_single_image'
            />
            <p className='myPokemons_inside_pokemons_single_name'>#695 Гелиолиск</p>
            <div className='myPokemons_inside_pokemons_single_health' />
            <div className='myPokemons_inside_pokemons_single_exp' />
          </div>
          <div className='myPokemons_inside_pokemons_single'>
            <img
              src={heleolisk}
              alt='pokemon'
              className='myPokemons_inside_pokemons_single_image'
            />
            <p className='myPokemons_inside_pokemons_single_name'>#695 Гелиолиск</p>
            <div className='myPokemons_inside_pokemons_single_health' />
            <div className='myPokemons_inside_pokemons_single_exp' />
          </div>
          <div className='myPokemons_inside_pokemons_single'>
            <img
              src={heleolisk}
              alt='pokemon'
              className='myPokemons_inside_pokemons_single_image'
            />
            <p className='myPokemons_inside_pokemons_single_name'>#695 Гелиолиск</p>
            <div className='myPokemons_inside_pokemons_single_health' />
            <div className='myPokemons_inside_pokemons_single_exp' />
          </div>
          <div className='myPokemons_inside_pokemons_single'>
            <img
              src={heleolisk}
              alt='pokemon'
              className='myPokemons_inside_pokemons_single_image'
            />
            <p className='myPokemons_inside_pokemons_single_name'>#695 Гелиолиск</p>
            <div className='myPokemons_inside_pokemons_single_health' />
            <div className='myPokemons_inside_pokemons_single_exp' />
          </div>
          <div className='myPokemons_inside_pokemons_single'>
            <img
              src={heleolisk}
              alt='pokemon'
              className='myPokemons_inside_pokemons_single_image'
            />
            <p className='myPokemons_inside_pokemons_single_name'>#695 Гелиолиск</p>
            <div className='myPokemons_inside_pokemons_single_health' />
            <div className='myPokemons_inside_pokemons_single_exp' />
          </div>
        </div>
      </div>
      <button onClick={() => setBackpackPokemons()} className='myPokemons_close'>
        {"<"}
      </button>
    </div>
  );
};

export default MyPokemons;
