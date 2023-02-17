import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../.env";
import axiosInstance from "../config/axiosInstance";
import "../pages/MultyBattlePage.scss";

import reload from "../img/reload.svg";
import backpack from "../img/backpack.svg";
import swords from "../img/swords.svg";
import surrender from "../img/surrender.svg";
import logo from "../img/running_pikachu.gif";
import leaveBattle from "../img/leaveBattle.svg";
import { ConnectionContext } from "../components/ConnectionProvider.jsx";

const MultyBattlePage = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [battleId, setBattleId] = useState(location.state.battleId);
  const [queue, setQueue] = useState(true);
  const [battle, setBattle] = useState({});
  const [loading, setLoading] = React.useState(true);

  const [timer, setTimer] = useState(60);
  const [isTimer, setIsTimer] = useState(false);

  const [myAbilities, setMyAbilities] = useState({});
  const [myPokemon, setMyPokemon] = useState({});
  const [enemyPokemon, setEnemyPokemon] = useState({});
  const [ability, setAbility] = useState({});
  const [battleResponce, setBattleResponce] = useState({});
  const [battleEnded, setBattleEnded] = useState(false);
  const [round, setRound] = React.useState(1);
  const [turn, setTurn] = React.useState([]);

  const connection = useContext(ConnectionContext);
  const [loadingConnection, setLoadingConnection] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadingConnection(false);
    }, 1000);
  }, [connection]);
  useEffect(() => {
    if (isTimer == false) {
      if (timer == 0) {
        setIsTimer(true);
        changeQueue();
      } else {
        const intervalId = setInterval(() => {
          setTimer((prevSeconds) => prevSeconds - 1);
        }, 1000);

        return () => {
          clearInterval(intervalId);
        };
      }
    }
  }, [timer]);
  useEffect(() => {
    setBattleId(location.state.battleId);
    if (battleId) {
      getBattleInfo(battleId);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [location]);
  useEffect(() => {
    if (loadingConnection !== true) {
      try {
        if (connection) {
          connection.connection.on(
            "UpdateBattle",
            (battleResponce, pokemon) => {
              if (battleResponce.atackPokemon.id === myPokemon.id) {
                setMyPokemon(battleResponce.atackPokemon);
                setEnemyPokemon(battleResponce.defendingPokemon);
              } else {
                setMyPokemon(battleResponce.defendingPokemon);
                setEnemyPokemon(battleResponce.atackPokemon);
              }
              setRound(round + 1);
              setTurn([
                ...turn,
                {
                  id: round,
                  pokemon: pokemon,
                  desc: battleResponce.descriptionFirstPokemon,
                  ability: battleResponce.nameAbilityFirstPokemon,
                  damage: battleResponce.damageFirstPokemon,
                },
              ]);
              setBattleEnded(battleResponce.battleEnded);
              changeQueue();
            }
          );
        }
      } catch (e) {
        console.log("Chtoto ne tak v signalr: ", e);
      }
    }
  });

  async function getBattleInfo(battleState) {
    await axiosInstance
      .get(
        `${API_URL}/Battle/get-battle-info?battleId=` +
          battleId +
          "&userId=" +
          localStorage.getItem("userId")
      )
      .then((res) => {
        setBattle(res.data);
        setMyPokemon(res.data.userPokemon);
        setEnemyPokemon(res.data.enemyPokemon);
        setMyAbilities(res.data.userPokemonAbilities);
        setQueue(res.data.queue);
      });
  }

  async function createTurn(ability) {
    try {
      const { data } = await axiosInstance.post(
        `${API_URL}/Battle/update-battle`,
        {
          battleId: battleId,
          abilityId: ability.id,
        }
      );
      connection.connection.invoke("BattleMove", data, battleId, myPokemon);
    } catch (e) {
      console.log(e);
    } finally {
      setTimer(60);
    }
  }

  function changeQueue() {
    queue ? setQueue(false) : setQueue(true);
  }

  return (
    <>
      {loadingConnection != true ? (
        <div className="battle">
          <div className="battle_information">
            <div className="battle_information_pokemon">
              <img
                className="battle_information_pokemon_image"
                src={myPokemon.pokemonRecord.mainUrl}
                alt={myPokemon.pokemonRecord.name}
              />
              <div className="battle_information_pokemon_props">
                <p className="battle_information_pokemon_props_level">
                  {myPokemon.level}
                </p>
                <p className="battle_information_pokemon_props_name">
                  # {myPokemon.pokemonRecord.id} {myPokemon.pokemonRecord.name}
                </p>
                <p className="battle_information_pokemon_props_level">
                  {myPokemon.currentLevel}
                </p>
              </div>
              <div
                style={{
                  background: `linear-gradient(to right, #04ff00 ${
                    (myPokemon.currentHealth / myPokemon.maxHealth) * 100
                  }%, transparent 0%)`,
                }}
                className="battle_information_pokemon_health"
              />
              <div
                style={{
                  background: `linear-gradient(to right, #45ebeb ${
                    (myPokemon.experience / myPokemon.experianceToNextLevel) *
                    100
                  }%, transparent 0%)`,
                }}
                className="battle_information_pokemon_experience"
              />
            </div>
            <div className="battle_information_center">
              <div className="barrle_information_center)round">
                <h4 className="battle_information_center_round_number">
                  Turn {round}
                </h4>
              </div>
              <div className="battle_information_center_scroll">
                <div className="battle_information_center_scroll_firstTurn">
                  <div className="battle_information_center_scroll_firstTurn_start">
                    <img
                      src={myPokemon.pokemonRecord.mainUrl}
                      alt={myPokemon.pokemonRecord.name}
                      className="battle_information_center_scroll_turn_attack_pokemon_image"
                    />
                    <h3 className="battle_information_center_scroll_turn_attack_pokemon_info">
                      # {myPokemon.pokemonRecord.id}{" "}
                      {myPokemon.pokemonRecord.name}
                    </h3>
                    <span
                      style={{
                        fontWeight: "500",
                        fontSize: "9px",
                        color: "#26D222",
                        marginTop: "7px",
                        marginLeft: "3px",
                      }}
                    >
                      в бой!
                    </span>
                  </div>
                  <div className="battle_information_center_scroll_firstTurn_start">
                    <img
                      src={enemyPokemon.pokemonRecord.mainUrl}
                      alt={enemyPokemon.pokemonRecord.name}
                      className="battle_information_center_scroll_turn_attack_pokemon_image"
                    />
                    <h3 className="battle_information_center_scroll_turn_attack_pokemon_info">
                      # {enemyPokemon.pokemonRecord.id}{" "}
                      {enemyPokemon.pokemonRecord.name}
                    </h3>
                    <span
                      style={{
                        fontWeight: "500",
                        fontSize: "9px",
                        color: "#26D222",
                        marginTop: "7px",
                        marginLeft: "3px",
                      }}
                    >
                      защищайся!
                    </span>
                  </div>
                </div>
                {turn.map((item) => {
                  return (
                    <div
                      key={Math.random() * 10000}
                      className="battle_information_center_scroll_turn"
                    >
                      <div className="battle_information_center_scroll_turn_attack">
                        <div className="battle_information_center_scroll_turn_attack_pokemon">
                          <img
                            src={item.pokemon.pokemonRecord.mainUrl}
                            alt={item.pokemon.pokemonRecord.name}
                            className="battle_information_center_scroll_turn_attack_pokemon_image"
                          />
                          <h3 className="battle_information_center_scroll_turn_attack_pokemon_info">
                            # {item.pokemon.pokemonRecord.id}{" "}
                            {item.pokemon.pokemonRecord.name}
                          </h3>
                          <span style={{ textDecoration: "none" }}>→</span>
                          <span
                            style={{
                              fontWeight: "600",
                              fontSize: "8px",
                              color: "#A80E0E",
                              marginTop: "7px",
                              marginLeft: "3px",
                            }}
                          >
                            {item.ability}
                          </span>
                        </div>
                        <h4 className="battle_information_center_scroll_turn_attack_properties">
                          {item.desc}:
                          <span style={{ color: "#A80E0E", fontWeight: "700" }}>
                            {item.damage}
                          </span>
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="battle_information_pokemon">
              <img
                className="battle_information_pokemon_image"
                src={enemyPokemon.pokemonRecord.mainUrl}
                alt={enemyPokemon.pokemonRecord.name}
              />
              <div className="battle_information_pokemon_props">
                <p className="battle_information_pokemon_props_name">
                  # {enemyPokemon.pokemonRecord.id}{" "}
                  {enemyPokemon.pokemonRecord.name}
                </p>
                <p className="battle_information_pokemon_props_level">
                  {enemyPokemon.level}
                </p>
              </div>
              <div
                style={{
                  background: `linear-gradient(to right, #04ff00 ${
                    (enemyPokemon.currentHealth / enemyPokemon.maxHealth) * 100
                  }%, transparent 0%)`,
                }}
                className="battle_information_pokemon_health"
              />
              <div
                style={{
                  background: `linear-gradient(to right, #45ebeb ${
                    (enemyPokemon.experience /
                      enemyPokemon.experianceToNextLevel) *
                    100
                  }%, transparent 0%)`,
                }}
                className="battle_information_pokemon_experience"
              />
            </div>
          </div>
          <div className="battle_attacks">
            {battleEnded ? (
              <div
                className="battle_attacks_leave"
                onClick={() => navigate("/main")}
              >
                <img
                  src={leaveBattle}
                  className="battle_attacks_leave_img"
                  alt="leave"
                />
                <p className="battle_attacks_leave_text">Leave</p>
              </div>
            ) : queue == false ? (
              <p>{timer} seconds</p>
            ) : (
              myAbilities.map((item) => {
                return (
                  <div
                    onClick={() => createTurn(item)}
                    key={Math.random() * 10000}
                    className="battle_attacks_attack"
                  >
                    <img
                      className="battle_attacks_attack_type"
                      src={item.imageUrl}
                      alt={item.name}
                    />
                    <div className="battle_attacks_attack_info">
                      <p className="battle_attacks_attack_info_name">
                        {item.name}
                      </p>
                      <p
                        style={{
                          color: "#9b9b9b",
                          fontSize: "10px",
                          marginLeft: "2px",
                        }}
                      >
                        35 / 35 РР
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="battle_buttons">
            <div
              className="battle_buttons_button"
              style={{ cursor: "pointer" }}
            >
              <img
                className="battle_buttons_button_image"
                src={reload}
                alt="reload"
              />
            </div>
            <div className="battle_buttons_button">
              <img
                className="battle_buttons_button_image"
                src={backpack}
                alt="backpack"
              />
            </div>
            <div className="battle_buttons_button">
              <img
                className="battle_buttons_button_image"
                src={swords}
                alt="battle"
              />
            </div>
            <div className="battle_buttons_button">
              <img
                className="battle_buttons_button_image"
                src={surrender}
                alt="surrender"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="Loading">
          <header className="Loading-header">
            <img src={logo} className="Loading-logo" alt="logo" />
            <p className="Loading-text">BATTLE LOADING . . .</p>
          </header>
        </div>
      )}
    </>
  );
};

export default MultyBattlePage;
