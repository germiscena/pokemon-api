import React from "react";
import "./BattlePage.scss";
import earth from "../img/earth.png";
import grass from "../img/grass.png";
import water from "../img/water.png";
import ground from "../img/ground.png";
import surrender from "../img/surrender.svg";
import reload from "../img/reload.svg";
import backpack from "../img/backpack.svg";
import swords from "../img/swords.svg";
import axios from "axios";
import { useLocation } from "react-router";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { API_URL } from "../.env";
import axiosInstance from "../config/axiosInstance";

const BattlePage = () => {
  const location = useLocation();
  const [battleState, setBattleState] = React.useState(location.state);
  const [myPokemon, setMyPokemon] = React.useState({});
  const [enemyPokemon, setEnemyPokemon] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [myAbilities, setMyAbilities] = React.useState({});
  const [turn, setTurn] = React.useState([]);
  const [round, setRound] = React.useState(1);
  const [connection, setConnection] = React.useState();
  React.useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${API_URL}/battle`, { accessTokenFactory: () => localStorage.getItem("token") })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  React.useEffect(() => {
    if (connection != null) {
      connection
        .start()
        .then(function () {
          console.log("Connected to the game hub");
        })
        .catch(function (err) {
          return console.error(err.toString());
        });

      connection.invoke("joinGroup", battleState.id).catch(function (err) {
        return console.error(err.toString());
      });
    }
  }, [connection]);

  async function fetchPokeInfo() {
    await axiosInstance
      .get(`${API_URL}/Pokemon/get-pokemon-ability-and-category?id=` + battleState.attackPokemon)
      .then((res) => {
        setMyPokemon(res.data.pokemon);
        setMyAbilities(res.data.abilities);
      });
    await axiosInstance
      .get(`${API_URL}/Pokemon/get-pokemon-ability-and-category?id=` + battleState.defendingPokemon)
      .then((res) => {
        setEnemyPokemon(res.data.pokemon);
      });
  }
  React.useEffect(() => {
    fetchPokeInfo();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  async function createTurn(id) {
    await axiosInstance
      .post(`${API_URL}/Battle/update-battle`, {
        battleId: localStorage.getItem("battleId"),
        abilityId: id,
      })
      .then((res) => {
        setMyPokemon(res.data.atackPokemon);
        setEnemyPokemon(res.data.defendingPokemon);
        setTurn([
          ...turn,
          {
            id: round,
            descFirst: res.data.descriptionFirstPokemon,
            descSec: res.data.descriptionSecondPokemon,
          },
        ]);
        setRound(round + 1);
      });
  }
  console.log("MY", myPokemon);
  console.log("ENEMY", enemyPokemon);
  return (
    <>
      {loading != true ? (
        <div className='battle'>
          <div className='battle_information'>
            <div className='battle_information_pokemon'>
              <img
                className='battle_information_pokemon_image'
                src={myPokemon.pokemonRecord.mainUrl}
                alt={myPokemon.pokemonRecord.name}
              />
              <div className='battle_information_pokemon_props'>
                <p className='battle_information_pokemon_props_name'>
                  # {myPokemon.pokemonRecord.id} {myPokemon.pokemonRecord.name}
                </p>
                <p className='battle_information_pokemon_props_level'>{myPokemon.level}</p>
              </div>
              <div
                style={{
                  background: `linear-gradient(to right, #04ff00 ${myPokemon.currentHealth}%, transparent 0%)`,
                }}
                className='battle_information_pokemon_health'
              />
              <div
                style={{
                  background: `linear-gradient(to right, #45ebeb ${
                    myPokemon.experience / 100
                  }%, transparent 0%)`,
                }}
                className='battle_information_pokemon_experience'
              />
            </div>
            <div className='battle_information_center'>
              <div className='battle_information_center_round'>
                <h4 className='battle_information_center_round_number'>Раунд {round}</h4>
              </div>
              <div className='battle_information_center_scroll'>
                <div className='battle_information_center_scroll_firstTurn'>
                  <div className='battle_information_center_scroll_firstTurn_start'>
                    <img
                      src={myPokemon.pokemonRecord.mainUrl}
                      alt={myPokemon.pokemonRecord.name}
                      className='battle_information_center_scroll_turn_attack_pokemon_image'
                    />
                    <h3 className='battle_information_center_scroll_turn_attack_pokemon_info'>
                      # {myPokemon.pokemonRecord.id} {myPokemon.pokemonRecord.name}
                    </h3>
                    <span
                      style={{
                        fontWeight: "500",
                        fontSize: "9px",
                        color: "#26D222",
                        marginTop: "7px",
                        marginLeft: "3px",
                      }}>
                      в бой!
                    </span>
                  </div>
                  <div className='battle_information_center_scroll_firstTurn_start'>
                    <img
                      src={enemyPokemon.pokemonRecord.mainUrl}
                      alt={enemyPokemon.pokemonRecord.name}
                      className='battle_information_center_scroll_turn_attack_pokemon_image'
                    />
                    <h3 className='battle_information_center_scroll_turn_attack_pokemon_info'>
                      # {enemyPokemon.pokemonRecord.id} {enemyPokemon.pokemonRecord.name}
                    </h3>
                    <span
                      style={{
                        fontWeight: "500",
                        fontSize: "9px",
                        color: "#26D222",
                        marginTop: "7px",
                        marginLeft: "3px",
                      }}>
                      нападает на Вас!
                    </span>
                  </div>
                </div>
                {turn.map((item) => {
                  return (
                    <div key={item.id} className='battle_information_center_scroll_turn'>
                      <div className='battle_information_center_scroll_turn_attack'>
                        <div className='battle_information_center_scroll_turn_attack_pokemon'>
                          <img
                            src={enemyPokemon.pokemonRecord.mainUrl}
                            alt={enemyPokemon.pokemonRecord.name}
                            className='battle_information_center_scroll_turn_attack_pokemon_image'
                          />
                          <h3 className='battle_information_center_scroll_turn_attack_pokemon_info'>
                            # {enemyPokemon.pokemonRecord.id} {enemyPokemon.pokemonRecord.name}
                          </h3>
                          <span style={{ textDecoration: "none" }}>→</span>
                          <span
                            style={{
                              fontWeight: "600",
                              fontSize: "8px",
                              color: "#92b6ed",
                              marginTop: "7px",
                              marginLeft: "3px",
                            }}>
                            АТАКА ДЭБИЛА
                          </span>
                        </div>
                        <h4 className='battle_information_center_scroll_turn_attack_properties'>
                          {item.descSec} :
                          <span style={{ color: "#A80E0E", fontWeight: "700" }}>
                            {item.damageFirstPokemon}
                          </span>
                        </h4>
                      </div>
                      <div className='battle_information_center_scroll_turn_attack'>
                        <div className='battle_information_center_scroll_turn_attack_pokemon'>
                          <img
                            src={myPokemon.pokemonRecord.mainUrl}
                            alt={myPokemon.pokemonRecord.name}
                            className='battle_information_center_scroll_turn_attack_pokemon_image'
                          />
                          <h3 className='battle_information_center_scroll_turn_attack_pokemon_info'>
                            # {myPokemon.pokemonRecord.id} {myPokemon.pokemonRecord.name}
                          </h3>
                          <span style={{ textDecoration: "none" }}>→</span>
                          <span
                            style={{
                              fontWeight: "600",
                              fontSize: "8px",
                              color: "#A80E0E",
                              marginTop: "7px",
                              marginLeft: "3px",
                            }}>
                            АТАКА МУЖИКА
                          </span>
                        </div>
                        <h4 className='battle_information_center_scroll_turn_attack_properties'>
                          {item.descFirst}:
                          <span style={{ color: "#A80E0E", fontWeight: "700" }}>-40000HP</span>
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className='battle_information_pokemon'>
              <img
                className='battle_information_pokemon_image'
                src={enemyPokemon.pokemonRecord.mainUrl}
                alt={enemyPokemon.pokemonRecord.name}
              />
              <div className='battle_information_pokemon_props'>
                <p className='battle_information_pokemon_props_name'>
                  # {enemyPokemon.pokemonRecord.id} {enemyPokemon.pokemonRecord.name}
                </p>
                <p className='battle_information_pokemon_props_level'>{enemyPokemon.level}</p>
              </div>
              <div
                style={{
                  background: `linear-gradient(to right, #04ff00 ${enemyPokemon.currentHealth}%, transparent 0%)`,
                }}
                className='battle_information_pokemon_health'
              />
              <div
                style={{
                  background: `linear-gradient(to right, #45ebeb ${
                    enemyPokemon.experience / 100
                  }%, transparent 0%)`,
                }}
                className='battle_information_pokemon_experience'
              />
            </div>
          </div>
          <div className='battle_attacks'>
            {myPokemon.currentHealth <= 0 || enemyPokemon.currentHealth <= 0
              ? ""
              : myAbilities.map((item) => {
                  return (
                    <div
                      onClick={() => createTurn(item.id)}
                      key={item.id}
                      className='battle_attacks_attack'>
                      <img
                        className='battle_attacks_attack_type'
                        src={item.imageUrl}
                        alt={item.name}
                      />
                      <div className='battle_attacks_attack_info'>
                        <p className='battle_attacks_attack_info_name'>{item.name}</p>
                        <p style={{ color: "#9b9b9b", fontSize: "10px", marginLeft: "2px" }}>
                          35 / 35 РР
                        </p>
                      </div>
                    </div>
                  );
                })}
          </div>
          <div className='battle_buttons'>
            <div className='battle_buttons_button' style={{ cursor: "pointer" }}>
              <img
                className='battle_buttons_button_image'
                // onClick={() => restartBattle(turn.length)}
                src={reload}
                alt='reload'
              />
            </div>
            <div className='battle_buttons_button'>
              <img className='battle_buttons_button_image' src={backpack} alt='backpack' />
            </div>
            <div className='battle_buttons_button'>
              <img className='battle_buttons_button_image' src={swords} alt='battle' />
            </div>
            <div className='battle_buttons_button'>
              <img className='battle_buttons_button_image' src={surrender} alt='surrender' />
            </div>
          </div>
        </div>
      ) : (
        <h1 style={{ width: "100%", textAlign: "center", marginTop: "100px", fontSize: "80px" }}>
          ЗАГРУЗКА...
        </h1>
      )}
    </>
  );
};

export default BattlePage;
