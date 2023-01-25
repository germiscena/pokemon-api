import React from "react";
import "./Pokedex.scss";
// import back from "../images/back.svg";
// import next from "../images/next.svg";
// import grassType from "../images/grassType.jpg";
// import poisonType from "../images/poisonType.png";
// import attack from "../images/attack.svg";
// import health from "../images/health.svg";
// import defense from "../images/defense.svg";
// import bulbasaurEvo from "../images/pokemons/bulbasaur.gif";
// import venosaurEvo from "../images/pokemons/venosaur.gif";
// import ivisaurEvo from "../images/pokemons/ivisaur.gif";
// import evoArrow from "../images/evoArrow.svg";
// import {
//   Bulbasaur,
//   Venusaur,
//   Ivysaur,
//   Charizard,
//   Charmander,
//   Charmeleon,
//   Squirtle,
//   Wartortle,
//   Blastoise,
//   Caterpie,
// } from "../images/pokemons/exports";
import close from "../img/closePokedex.svg";
import axios from "axios";
import AppContext from "../context";

const Pokedex = ({ setClose }) => {
  const [pokemon, setPokemon] = React.useState(1);
  async function getPokemon() {
    let data = await axios.get(
      `https://localhost:44337/api/Pokedex/pokemonId?id=${pokemon}`,
    );
    setPokemon(data.data);
  }

  React.useEffect(() => {
    getPokemon();
  }, []);
  const { pokedexOpen } = React.useContext(AppContext);
  // const array = [
  //   { component: Bulbasaur },
  //   { component: Ivysaur },
  //   { component: Venusaur },
  //   { component: Charmander },
  //   { component: Charmeleon },
  //   { component: Charizard },
  //   { component: Squirtle },
  //   { component: Wartortle },
  //   { component: Blastoise },
  //   { component: Caterpie },
  // ];
  console.log("POKEDEX", pokedexOpen);
  function nextPokemon() {
    pokemon == 9 ? setPokemon(0) : setPokemon(pokemon + 1);
  }

  function prevPokemon() {
    pokemon == 0 ? setPokemon(9) : setPokemon(pokemon - 1);
  }
  return (
    <>
      {pokedexOpen && (
        <div className='pokedex'>
          <div className='pokedex_find'>
            <img onClick={() => prevPokemon()} src={"back"} className='pokedex_find_button' />
            <input type='text' className='pokedex_find_input' placeholder='Найти покемона...' />
            <img onClick={() => nextPokemon()} src={"next"} className='pokedex_find_button' />
          </div>
          <div className='pokedex_pokemon'>
            <div className='pokedex_pokemon_image'>
              <img
                src={pokemon.mainUrl}
                alt='pokemon'
                className='pokedex_pokemon_image_view'
              />
              <div className='pokedex_pokemon_image_type first'>{pokemon.category}</div>
            </div>
            <div className='pokedex_pokemon_info'>
              <h1 className='pokedex_pokemon_info_name'>
                {"#00" + pokemon.pokedexId + " " + pokemon.name}
              </h1>
              <div className='pokedex_pokemon_info_stats'>
                <div className='pokedex_pokemon_info_stats_single'>
                  <img
                    src={"health"}
                    alt='health'
                    className='pokedex_pokemon_info_stats_single_icon'
                  />
                  <p className='pokedex_pokemon_info_stats_single_number'>{pokemon.baseHP}</p>
                </div>
                <div className='pokedex_pokemon_info_stats_single'>
                  <img
                    src={"attack"}
                    alt='attack'
                    className='pokedex_pokemon_info_stats_single_icon'
                  />
                  <p className='pokedex_pokemon_info_stats_single_number'>{pokemon.baseDamage}</p>
                </div>
                <div className='pokedex_pokemon_info_stats_single'>
                  <img
                    src={"defense"}
                    alt='defense'
                    className='pokedex_pokemon_info_stats_single_icon'
                  />
                  <p className='pokedex_pokemon_info_stats_single_number'>{pokemon.baseDefense}</p>
                </div>
              </div>
              <p className='pokedex_pokemon_info_description'>
                {pokemon.description}
              </p>
            </div>
          </div>
          <div className='pokedex_evolutions'>
            <div className='pokedex_evolutions_title'>
              <h2 className='pokedex_evolutions_title_wrd'>Эволюции</h2>
            </div>
            <div className='pokedex_evolutions_block'>
              <div className='pokedex_evolutions_block_evo'>
                <img
                  className='pokedex_evolutions_block_evo_pic'
                  src={pokemon.pokEvol1}
                  alt='pokemon'
                />
                <p className='pokedex_evolutions_block_evo_name'>{pokemon.name}</p>
              </div>
              <img className='pokedex_evolutions_block_arrow' src={"evoArrow"} alt='evo' />
              <div className='pokedex_evolutions_block_evo'>
                <img
                  className='pokedex_evolutions_block_evo_pic'
                  src={pokemon.pokEvol2}
                  alt='pokemon'
                />
                <p className='pokedex_evolutions_block_evo_name'>Ивизавр</p>
              </div>
              <img className='pokedex_evolutions_block_arrow' src={"evoArrow"} alt='evo' />
              <div className='pokedex_evolutions_block_evo'>
                <img
                  className='pokedex_evolutions_block_evo_pic'
                  src={pokemon.pokEvol3}
                  alt='pokemon'
                />
                <p className='pokedex_evolutions_block_evo_name'>Венозавр</p>
              </div>
            </div>
          </div>
          <div className='pokedex_close'>
            <img onClick={() => setClose()} className='pokedex_close_btn' src={close} alt='close' />
          </div>
        </div>
      )}
    </>
  );
};

export default Pokedex;
