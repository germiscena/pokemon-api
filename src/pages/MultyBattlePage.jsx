import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { HubConnectionBuilder } from "@microsoft/signalr";
import { API_URL } from "../.env";
import axiosInstance from "../config/axiosInstance";
import "../pages/MultyBattlePage.scss";

import reload from "../img/reload.svg";
import backpack from "../img/backpack.svg";
import swords from "../img/swords.svg";
import surrender from "../img/surrender.svg";
import logo from "../img/running_pikachu.gif";
import leaveBattle from "../img/leaveBattle.svg";



const MultyBattlePage = ({}) => {
  const location = useLocation();
  const [battleId, setBattleId] = useState(location.state)
  const [ battle, setBattle ] = useState({});
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  const [ connection, setConnection ] = useState(null);
  const [ myAbilities, setMyAbilities ] = useState({});
  const [ myPokemon, setMyPokemon ] = useState({});
  const [ enemyPokemon, setEnemyPokemon ] = useState({});
  const [ abilityId, setAbilityId ] = useState(1);
  const [ battleResponce, setBattleResponc ] = useState({});
  const [ battleEnded, setBattleEnded ] = useState(false);
  const [ damage, setDamage ] = useState(0);
  const [ description, setDescription ] = useState("");
  const [round, setRound] = React.useState(1);
  const [turn, setTurn] = React.useState([]);

  const createHubConnection = async () => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${API_URL}/battle`, { accessTokenFactory: () => localStorage.getItem('token') })
      .build();

    setConnection(newConnection);  
  };

  useEffect(() => {
    createHubConnection();
    getBattleInfo(battleId);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if(connection){
      connection
      .start()
        .then((result) => {
          console.log("Connected to battleHub");
          connection.on("UpdateBattle", (battleResponce) => {
            console.log("battleResponce");
            setMyPokemon(battleResponce.atackPokemon);
            setEnemyPokemon(battleResponce.defendingPokemon);
            setBattleEnded(battleResponce.battleEnded);
            setDamage(battleResponce.damageFirstPokemon);
            setDescription(battleResponce.descriptionFirstPokemon);
            setTurn([
              ...turn,
              {
                id: round,
                descFirst: battleResponce.descriptionFirstPokemon,
                descSec: battleResponce.descriptionSecondPokemon,
              },
            ]);
            setRound(round + 1);
        });
      })
      .catch((e) => console.log("Connection failed: ", e));
    }
  })

  async function getBattleInfo(battleState) {
    await axiosInstance
      .get(`${API_URL}/Battle/get-battle-info?battleId=` + battleState.battleId)
        .then((res) => {
          setBattle(res.data);
          setMyPokemon(res.data.attackPokemon);
          setEnemyPokemon(res.data.defendingPokemon);
          setMyAbilities(res.data.abilities);
        });
  }

  async function createTurn(abilityId) {
      try{
        await axiosInstance
        .post(`${API_URL}/Battle/update-battle`, {
          battleId: battleId.battleId,
          abilityId: abilityId,
        }).then((res) => {
          connection.invoke("BattleMove", res, battleId.battleId);
        })
      }
      catch (e) {
        console.log(e);
      }
    }

  return (
    <>
    {loading != true ? (
      <div className="battle">
      <div className="battle_information">
          <div className="battle_information_pokemon">
              <img className="battle_information_pokemon_image"
                  src={myPokemon.pokemonRecord.mainUrl}
                  alt={myPokemon.pokemonRecord.name}
              />
              <div className="battle_information_pokemon_props">
                  <p className='battle_information_pokemon_props_level'>{myPokemon.level}</p>
                  <p className="battle_information_pokemon_props_name">
                    # {myPokemon.pokemonRecord.id} {myPokemon.pokemonRecord.name}
                  </p>
                  <p className='battle_information_pokemon_props_level'>39</p>
              </div>
              <div
                style={{
                  background: `linear-gradient(to right, #04ff00 ${
                    (myPokemon.currentHealth / myPokemon.maxHealth) * 100
                  }%, transparent 0%)`,
                }}
              className='battle_information_pokemon_health'
              />
              <div
                style={{
                  background: `linear-gradient(to right, #45ebeb ${
                    (myPokemon.experience / myPokemon.experianceToNextLevel) * 100
                  }%, transparent 0%)`,
                }}
              className='battle_information_pokemon_experience'
            />
          </div>
              <div className="battle_information_center">
                  <div className="barrle_information_center)round">
                      <h4 className="battle_information_center_round_number">
                          Round {round}
                      </h4>
                  </div>
                  <div className="battle_information_center_scroll">
                      <div className="battle_information_center_scroll_firstTurn">
                          <div className="battle_information_center_scroll_firstTurn_start">
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
                                  защищайся!
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
                      <p className='battle_information_pokemon_props_level'>17</p>
                  </div>
                  <div
                      style={{
                        background: `linear-gradient(to right, #04ff00 ${
                          (enemyPokemon.currentHealth / enemyPokemon.maxHealth) * 100
                        }%, transparent 0%)`,
                      }}
                      className='battle_information_pokemon_health'
                  />
                  <div
                      style={{
                        background: `linear-gradient(to right, #45ebeb ${
                          (enemyPokemon.experience / enemyPokemon.experianceToNextLevel) * 100
                        }%, transparent 0%)`,
                      }}
                      className='battle_information_pokemon_experience'
                  />
              </div>
      </div>
      <div className="battle_attacks">
        {myPokemon.currentHealth <= 0 || enemyPokemon.currentHealth <= 0 ? (
                <div className='battle_attacks_leave' onClick={() => navigate("/main")}>
                  <img src={leaveBattle} className='battle_attacks_leave_img' alt='leave' />
                  <p className='battle_attacks_leave_text'>Leave</p>
                </div>
              ) : (
                myAbilities.map((item) => {
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
                })
              )}
        </div>
      <div className="battle_buttons">
      <div className='battle_buttons_button' style={{ cursor: "pointer" }}>
            <img
              className='battle_buttons_button_image'
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
        <div className='Loading'>
          <header className='Loading-header'>
            <img src={logo} className='Loading-logo' alt='logo' />
            <p className='Loading-text'>BATTLE LOADING . . .</p>
          </header>
        </div>
      )}
    </>
  );
};

export default MultyBattlePage;
