import React, { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { API_URL } from "../.env";

import firstPokemonImg from "../img/Graveler.png";
import secondPokemonImg from "../img/scyther.avif";
import reload from "../img/reload.svg";
import backpack from "../img/backpack.svg";
import swords from "../img/swords.svg";
import surrender from "../img/surrender.svg";

const MultyBattlePage = ({}) => {
  const [ hubConnection, setHubConnection ] = useState(null);
  const [ myAbilities, setMyAbilities ] = useState({});
  const [ myPokemon, setMyPokemon ] = useState({});
  const [ enemyPokemon, setEnemyPokemon ] = useState({});
  const [ abilityId, setAbilityId ] = useState(1);
  const [ battleResponce, setBattleResponc ] = useState({});
  const [ battle, setBattleEnded ] = useState(false);
  const [ damage, setDamage ] = useState(0);
  const [ description, setDescription ] = useState("");
  let battleId = "f69b6f76-c7d5-4a5c-1c88-08db0704b3f9";

  const createHubConnection = async () => {
    const connection = new HubConnectionBuilder()
      .withUrl(`${API_URL}/battleHub`, { accessTokenFactory: () => localStorage.getItem('tokem') })
      .build();

    setHubConnection(connection);

    connection.on("UpdateBattle", (battleResponce) => {
        console.log(battleResponce);
        // setMyPokemon(battleResponce.AtackPokemon);
        // setEnemyPokemon(battleResponce.DefendingPokemon);
        // setBattleEnded(battleResponce.BattleEnded);
        // setDamage(battleResponce.DamageFirstPokemon);
        // setDescription(battleResponce.DescriptionFirstPokemon);
    })
    await connection.start();
  };

  useEffect(() => {
    createHubConnection();
  }, []);

  const battleMove = async () => {
    try{
        console.log("vse okey");
        await hubConnection.invoke("BattleMove", battleId, abilityId);
    }
    catch (e) {
        console.log(e);
    }
  };

//   const renderSquare = (index) => {
//     return (
//       <button
//         className="square"
//         onClick={() => handleClick(index)}
//       >
//         {board[index]}
//       </button>
//     );
//   };

  return (
    <div className="battle">
        <div className="battle_information">
            <div className="battle_information_pokemon">
                <img className="battle_information_pokemon_image"
                    src={firstPokemonImg}
                    alt="Graveler"
                />
                <div className="battle_information_pokemon_props">
                    <p className="battle_information_pokemon_props_name">
                        #074 Гравелер
                    </p>
                    <p className='battle_information_pokemon_props_level'>39</p>
                </div>
                <div
                style={{
                  background: `linear-gradient(to right, #04ff00 ${100}%, transparent 0%)`,
                }}
                className='battle_information_pokemon_health'
                />
                <div
                style={{
                  background: `linear-gradient(to right, #45ebeb ${
                    1000 / 100
                  }%, transparent 0%)`,
                }}
                className='battle_information_pokemon_experience'
              />
            </div>
                <div className="battle_information_center">
                    <div className="barrle_information_center)round">
                        <h4 className="battle_information_center_round_number">
                            Round X
                        </h4>
                    </div>
                    <div className="battle_information_center_scroll">
                        <div className="battle_information_center_scroll_firstTurn">
                            <div className="battle_information_center_scroll_firstTurn_start">
                                <img
                                    src={firstPokemonImg}
                                    alt="graveler"
                                    className='battle_information_center_scroll_turn_attack_pokemon_image'
                                />
                                <h3 className='battle_information_center_scroll_turn_attack_pokemon_info'>
                                    # 075 Гравелер
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
                                    src={secondPokemonImg}
                                    alt="scyther"
                                    className='battle_information_center_scroll_turn_attack_pokemon_image'
                                />
                                <h3 className='battle_information_center_scroll_turn_attack_pokemon_info'>
                                    # 123 Сайтер
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
                        {}
                    </div>
                </div>
            <div className='battle_information_pokemon'>
                    <img
                        className='battle_information_pokemon_image'
                        src={secondPokemonImg}
                        alt="scyther"
                    />
                    <div className='battle_information_pokemon_props'>
                        <p className='battle_information_pokemon_props_name'>
                        # 123 Скутер
                        </p>
                        <p className='battle_information_pokemon_props_level'>17</p>
                    </div>
                    <div
                        style={{
                        background: `linear-gradient(to right, #04ff00 ${80}%, transparent 0%)`,
                        }}
                        className='battle_information_pokemon_health'
                    />
                    <div
                        style={{
                        background: `linear-gradient(to right, #45ebeb ${
                            1000 / 100
                        }%, transparent 0%)`,
                        }}
                        className='battle_information_pokemon_experience'
                    />
                </div>
        </div>
        <div className="battle_attacks">
            {/* ataku */}
        </div>
        <div className="battle_buttons">
        <div className='battle_buttons_button' style={{ cursor: "pointer" }}>
              <img
                className='battle_buttons_button_image'
                onClick={() => battleMove()}
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
  );
};

export default MultyBattlePage;
