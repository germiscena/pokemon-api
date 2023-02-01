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

const BattlePage = () => {
  const location = useLocation();
  const [battleState, setBattleState] = React.useState(location.state);
  const [myPokemon, setMyPokemon] = React.useState({});
  const [enemyPokemon, setEnemyPokemon] = React.useState({});
  console.log(battleState);
  function typeSelection(name) {
    if (name == "ground") {
      return ground;
    }
    if (name == "water") {
      return water;
    }
    if (name == "grass") {
      return grass;
    }
    if (name == "earth") {
      return earth;
    }
  }
  console.log("MY", myPokemon);
  console.log("ENEMY", enemyPokemon);
  async function fetchPokeInfo() {
    await axios
      .get("https://localhost:44337/Pokemon/get-pokemon?Id=" + battleState.attackPokemon)
      .then((res) => {
        setMyPokemon(res.data);
      });
    await axios
      .get("https://localhost:44337/Pokemon/get-pokemon?Id=" + battleState.defendingPokemon)
      .then((res) => {
        setEnemyPokemon(res.data);
      });
  }
  React.useState(() => {
    fetchPokeInfo();
  }, []);

  return (
    <>
      {battleState ? (
        <div className='battle'>
          <div className='battle_information'>
            <div className='battle_information_pokemon'>
              <img
                className='battle_information_pokemon_image'
                src={myPokemon.image}
                alt={myPokemon.name}
              />
              <div className='battle_information_pokemon_props'>
                <p className='battle_information_pokemon_props_name'>
                  # {myPokemon.pokemonRecordId} {myPokemon.name}
                </p>
                <p className='battle_information_pokemon_props_level'>39</p>
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
                    myPokemon.experience / 10
                  }%, transparent 0%)`,
                }}
                className='battle_information_pokemon_experience'
              />
            </div>
            <div className='battle_information_center'>
              <div className='battle_information_center_round'>
                <h4 className='battle_information_center_round_number'>
                  Раунд {battleState.queue}
                </h4>
              </div>
              <div className='battle_information_center_scroll'>
                <div className='battle_information_center_scroll_firstTurn'>
                  <div className='battle_information_center_scroll_firstTurn_start'>
                    <img
                      src={myPokemon.image}
                      alt={myPokemon.name}
                      className='battle_information_center_scroll_turn_attack_pokemon_image'
                    />
                    <h3 className='battle_information_center_scroll_turn_attack_pokemon_info'>
                      # {myPokemon.pokemonRecordId} {myPokemon.name}
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
                      src={enemyPokemon.image}
                      alt={enemyPokemon.name}
                      className='battle_information_center_scroll_turn_attack_pokemon_image'
                    />
                    <h3 className='battle_information_center_scroll_turn_attack_pokemon_info'>
                      # {enemyPokemon.pokemonRecordId} {enemyPokemon.name}
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
                {/* {turn.map((item) => {
                  return (
                    <div key={item.id} className='battle_information_center_scroll_turn'>
                      <div className='battle_information_center_scroll_turn_attack'>
                        <div className='battle_information_center_scroll_turn_attack_pokemon'>
                          <img
                            src={enemyPokemon.Image}
                            alt={enemyPokemon.Name}
                            className='battle_information_center_scroll_turn_attack_pokemon_image'
                          />
                          <h3 className='battle_information_center_scroll_turn_attack_pokemon_info'>
                            # {enemyPokemon.Id} {enemyPokemon.Name}
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
                            {item.enemyAttack}
                          </span>
                        </div>
                        <h4 className='battle_information_center_scroll_turn_attack_properties'>
                          {item.enemyDescription} :
                          <span style={{ color: "#A80E0E", fontWeight: "700" }}>
                            -{item.enemyDamage}HP
                          </span>
                        </h4>
                      </div>
                      <div className='battle_information_center_scroll_turn_attack'>
                        <div className='battle_information_center_scroll_turn_attack_pokemon'>
                          <img
                            src={battle[0].image}
                            alt={battle[0].name}
                            className='battle_information_center_scroll_turn_attack_pokemon_image'
                          />
                          <h3 className='battle_information_center_scroll_turn_attack_pokemon_info'>
                            # {battle[0].id} {battle[0].name}
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
                            {item.myAttack}
                          </span>
                        </div>
                        <h4 className='battle_information_center_scroll_turn_attack_properties'>
                          {item.myDescription}:
                          <span style={{ color: "#A80E0E", fontWeight: "700" }}>
                            -{item.myDamage}HP
                          </span>
                        </h4>
                      </div>
                    </div>
                  );
                })} */}
              </div>
            </div>
            <div className='battle_information_pokemon'>
              <img
                className='battle_information_pokemon_image'
                src={enemyPokemon.image}
                alt={enemyPokemon.name}
              />
              <div className='battle_information_pokemon_props'>
                <p className='battle_information_pokemon_props_name'>
                  # {enemyPokemon.pokemonRecordId} {enemyPokemon.name}
                </p>
                <p className='battle_information_pokemon_props_level'>39</p>
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
                    enemyPokemon.experience / 10
                  }%, transparent 0%)`,
                }}
                className='battle_information_pokemon_experience'
              />
            </div>
          </div>
          {/* <div className='battle_attacks'>
            {myPokemon.hp == 0 || enemyPokemon.hp == 0
              ? ""
              : battle[0].atk.map((item) => {
                  return (
                    <div
                      onClick={() =>
                        createTurn(
                          item.name,
                          item.dmg,
                          myHp,
                          "ГНЕВ ДРАКОНА",
                          enemyPokemon.Dmg,
                          enemyHp,
                        )
                      }
                      key={item.name}
                      className='battle_attacks_attack'>
                      <img
                        className='battle_attacks_attack_type'
                        src={typeSelection(item.type)}
                        alt={item.type}
                      />
                      <div className='battle_attacks_attack_info'>
                        <p className='battle_attacks_attack_info_name'>{item.name}</p>
                        <p style={{ color: "#9b9b9b", fontSize: "10px", marginLeft: "2px" }}>
                          {item.remain} / 35 РР
                        </p>
                      </div>
                    </div>
                  );
                })}
          </div> */}
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
