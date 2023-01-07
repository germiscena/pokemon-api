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

const BattlePage = () => {
  const [battle, setBattle] = React.useState([]);
  const [turn, setTurn] = React.useState([]);
  const [round, setRound] = React.useState(0);
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
  async function fetchTurns() {
    const turn = await axios.get("https://635b02f16f97ae73a63b8527.mockapi.io/turns");
    setTurn(turn.data);
  }

  async function createTurn(myAttack, myDmg, enemyAttack, enemyDmg) {
    await axios.post("https://635b02f16f97ae73a63b8527.mockapi.io/turns", {
      turn: round,
      myAttack: myAttack,
      myDamage: myDmg,
      myDescription: "Покемон начал очень мощно топать своими ногами",
      enemyAttack: enemyAttack,
      enemyDamage: enemyDmg,
      enemyDescription: "Покемон сносит таранит соперника своим лбом",
    });
    fetchTurns();
    setRound(round + 1);
  }
  React.useEffect(() => {
    async function fetchBattle() {
      const data = await axios.get("https://635b02f16f97ae73a63b8527.mockapi.io/battle");
      setBattle(data.data);
    }
    fetchBattle();
    fetchTurns();
  }, []);
  const myPokemon = battle[0];
  const enemyPokemon = battle[1];
  return (
    <>
      {battle.length !== 0 ? (
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
                  # {myPokemon.id} {myPokemon.name}
                </p>
                <p className='battle_information_pokemon_props_level'>39</p>
              </div>
              <div
                style={{
                  background: `linear-gradient(to right, #04ff00 ${myPokemon.hp}%, transparent 0%)`,
                }}
                className='battle_information_pokemon_health'
              />
              <div
                style={{
                  background: `linear-gradient(to right, #45ebeb ${myPokemon.exp}%, transparent 0%)`,
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
                      src={myPokemon.image}
                      alt={myPokemon.name}
                      className='battle_information_center_scroll_turn_attack_pokemon_image'
                    />
                    <h3 className='battle_information_center_scroll_turn_attack_pokemon_info'>
                      # {myPokemon.id} {myPokemon.name}
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
                      # {enemyPokemon.id} {enemyPokemon.name}
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
                    <div className='battle_information_center_scroll_turn'>
                      <div className='battle_information_center_scroll_turn_attack'>
                        <div className='battle_information_center_scroll_turn_attack_pokemon'>
                          <img
                            src={enemyPokemon.image}
                            alt={enemyPokemon.name}
                            className='battle_information_center_scroll_turn_attack_pokemon_image'
                          />
                          <h3 className='battle_information_center_scroll_turn_attack_pokemon_info'>
                            # {enemyPokemon.id} {enemyPokemon.name}
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
                            src={myPokemon.image}
                            alt={myPokemon.name}
                            className='battle_information_center_scroll_turn_attack_pokemon_image'
                          />
                          <h3 className='battle_information_center_scroll_turn_attack_pokemon_info'>
                            # {myPokemon.id} {myPokemon.name}
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
                })}
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
                  # {enemyPokemon.id} {enemyPokemon.name}
                </p>
                <p className='battle_information_pokemon_props_level'>39</p>
              </div>
              <div
                style={{
                  background: `linear-gradient(to right, #04ff00 ${enemyPokemon.hp}%, transparent 0%)`,
                }}
                className='battle_information_pokemon_health'
              />
              <div
                style={{
                  background: `linear-gradient(to right, #45ebeb ${enemyPokemon.exp}%, transparent 0%)`,
                }}
                className='battle_information_pokemon_experience'
              />
            </div>
          </div>
          <div className='battle_attacks'>
            {myPokemon.attacks.map((item) => {
              return (
                <div
                  onClick={() => createTurn(item.name, item.damage, "ГНЕВ ДРАКОНА", 35)}
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
                      {item.remain} / {item.times} РР
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='battle_buttons'>
            <div className='battle_buttons_button'>
              <img className='battle_buttons_button_image' src={reload} alt='reload' />
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
