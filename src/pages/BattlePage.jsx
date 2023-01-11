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
  const [myHp, setMyHp] = React.useState(100);
  const [enemyHp, setEnemyHp] = React.useState(100);
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

  async function takeDamage(myHp, myDmg, enemyHp, enemyDmg) {
    await axios.post("https://635b02f16f97ae73a63b8527.mockapi.io/battle", {
      myHp: myHp - enemyDmg <= 0 ? 0 : myHp - enemyDmg,
      enemyHp: enemyHp - myDmg <= 0 ? 0 : enemyHp - myDmg,
    });
    setMyHp(myHp - enemyDmg <= 0 ? 0 : myHp - enemyDmg);
    setEnemyHp(enemyHp - myDmg <= 0 ? 0 : enemyHp - myDmg);
  }
  async function fetchBattle() {
    const data = await axios.get("https://635b02f16f97ae73a63b8527.mockapi.io/battle");
    setBattle(data.data);
  }

  async function createTurn(myAttack, myDmg, myHp, enemyAttack, enemyDmg, enemyHp) {
    await axios.post("https://635b02f16f97ae73a63b8527.mockapi.io/turns", {
      turn: round,
      myAttack: myAttack,
      myDamage: myDmg,
      myDescription: "Покемон начал очень мощно топать своими ногами",
      enemyAttack: enemyAttack,
      enemyDamage: enemyDmg,
      enemyDescription: "Покемон сносит таранит соперника своим лбом",
    });

    takeDamage(myHp, myDmg, enemyHp, enemyDmg);
    fetchBattle();
    fetchTurns();
    setRound(round + 1);
  }
  React.useEffect(() => {
    if (myHp == 0 || enemyHp == 0) {
      fetchBattle();
      alert(`THE WINNER IS ${myHp == 0 ? battle[0].enemyName : battle[0].name}`);
    }
  }, [myHp, enemyHp]);

  React.useEffect(() => {
    fetchBattle();
    fetchTurns();
  }, []);

  return (
    <>
      {battle.length !== 0 ? (
        <div className='battle'>
          <div className='battle_information'>
            <div className='battle_information_pokemon'>
              <img
                className='battle_information_pokemon_image'
                src={battle[0].image}
                alt={battle[0].name}
              />
              <div className='battle_information_pokemon_props'>
                <p className='battle_information_pokemon_props_name'>
                  # {battle[0].id} {battle[0].name}
                </p>
                <p className='battle_information_pokemon_props_level'>39</p>
              </div>
              <div
                style={{
                  background: `linear-gradient(to right, #04ff00 ${myHp}%, transparent 0%)`,
                }}
                className='battle_information_pokemon_health'
              />
              <div
                style={{
                  background: `linear-gradient(to right, #45ebeb ${battle[0].exp}%, transparent 0%)`,
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
                      src={battle[0].image}
                      alt={battle[0].name}
                      className='battle_information_center_scroll_turn_attack_pokemon_image'
                    />
                    <h3 className='battle_information_center_scroll_turn_attack_pokemon_info'>
                      # {battle[0].id} {battle[0].name}
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
                      src={battle[0].enemyImage}
                      alt={battle[0].enemyName}
                      className='battle_information_center_scroll_turn_attack_pokemon_image'
                    />
                    <h3 className='battle_information_center_scroll_turn_attack_pokemon_info'>
                      # {battle[0].enemyId} {battle[0].enemyName}
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
                            src={battle[0].enemyImage}
                            alt={battle[0].enemyName}
                            className='battle_information_center_scroll_turn_attack_pokemon_image'
                          />
                          <h3 className='battle_information_center_scroll_turn_attack_pokemon_info'>
                            # {battle[0].enemyId} {battle[0].enemyName}
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
                })}
              </div>
            </div>
            <div className='battle_information_pokemon'>
              <img
                className='battle_information_pokemon_image'
                src={battle[0].enemyImage}
                alt={battle[0].enemyName}
              />
              <div className='battle_information_pokemon_props'>
                <p className='battle_information_pokemon_props_name'>
                  # {battle[0].enemyId} {battle[0].enemyName}
                </p>
                <p className='battle_information_pokemon_props_level'>39</p>
              </div>
              <div
                style={{
                  background: `linear-gradient(to right, #04ff00 ${enemyHp}%, transparent 0%)`,
                }}
                className='battle_information_pokemon_health'
              />
              <div
                style={{
                  background: `linear-gradient(to right, #45ebeb ${battle[0].enemyExp}%, transparent 0%)`,
                }}
                className='battle_information_pokemon_experience'
              />
            </div>
          </div>
          <div className='battle_attacks'>
            {myHp == 0 || enemyHp == 0
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
                          battle[0].enemyDmg,
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
