import React from 'react';
import './BattlePage.scss';
import torterra from '../img/torterra.png';
import heleolisk from '../img/Heleolisk.png';
import battle1 from '../img/battle1.png';
import battle2 from '../img/battle2.png';
import earth from '../img/earth.png';
import grass from '../img/grass.png';
import water from '../img/water.png';
import ground from '../img/ground.png';
import surrender from '../img/surrender.svg';
import reload from '../img/reload.svg';
import backpack from '../img/backpack.svg';
import swords from '../img/swords.svg';

const BattlePage = () => {
  return (
    <div className='battle'>
      <div className='battle_information'>
        <div className='battle_information_pokemon'>
          <img className='battle_information_pokemon_image' src={torterra} alt='torterra' />
          <div className='battle_information_pokemon_props'>
            <p className='battle_information_pokemon_props_name'>#389 Тортерра</p>
            <p className='battle_information_pokemon_props_level'>39</p>
          </div>
          <div
            style={{ background: `linear-gradient(to right, #04ff00 ${40}%, transparent 0%)` }}
            className='battle_information_pokemon_health'
          />
          <div
            style={{ background: `linear-gradient(to right, #45ebeb ${60}%, transparent 0%)` }}
            className='battle_information_pokemon_experience'
          />
        </div>
        <div className='battle_information_center'>
          <div className='battle_information_center_round'>
            <h4 className='battle_information_center_round_number'>Раунд 1</h4>
          </div>
          <div className='battle_information_center_turn'>
            <div className='battle_information_center_turn_attack'>
              <div className='battle_information_center_turn_attack_pokemon'>
                <img
                  src={battle2}
                  alt='first pokemon'
                  className='battle_information_center_turn_attack_pokemon_image'
                />
                <h3 className='battle_information_center_turn_attack_pokemon_info'>
                  #695 Гелиолиск
                </h3>
                <span style={{ textDecoration: 'none' }}>→</span>
                <span
                  style={{
                    fontWeight: '600',
                    fontSize: '8px',
                    color: '#92b6ed',
                    marginTop: '7px',
                    marginLeft: '3px',
                  }}>
                  Режущий ветер
                </span>
              </div>
              <h4 className='battle_information_center_turn_attack_properties'>
                Покемон начал создавать мощный вихрь
              </h4>
            </div>
            <div className='battle_information_center_turn_attack'>
              <div className='battle_information_center_turn_attack_pokemon'>
                <img
                  src={battle1}
                  alt='first pokemon'
                  className='battle_information_center_turn_attack_pokemon_image'
                />
                <h3 className='battle_information_center_turn_attack_pokemon_info'>
                  #389 Тортерра
                </h3>
                <span style={{ textDecoration: 'none' }}>→</span>
                <span
                  style={{
                    fontWeight: '600',
                    fontSize: '8px',
                    color: '#A80E0E',
                    marginTop: '7px',
                    marginLeft: '3px',
                  }}>
                  Лобовая атака
                </span>
              </div>
              <h4 className='battle_information_center_turn_attack_properties'>
                Атака наносит урон:
                <span style={{ color: '#A80E0E', fontWeight: '700' }}>-57HP</span>
              </h4>
            </div>
          </div>
          <div className='battle_information_center_firstTurn'>
            <div className='battle_information_center_firstTurn_start'>
              <img
                src={battle1}
                alt='first pokemon'
                className='battle_information_center_turn_attack_pokemon_image'
              />
              <h3 className='battle_information_center_turn_attack_pokemon_info'>#389 Тортерра</h3>
              <span
                style={{
                  fontWeight: '500',
                  fontSize: '9px',
                  color: '#26D222',
                  marginTop: '7px',
                  marginLeft: '3px',
                }}>
                в бой!
              </span>
            </div>
            <div className='battle_information_center_firstTurn_start'>
              <img
                src={battle2}
                alt='first pokemon'
                className='battle_information_center_turn_attack_pokemon_image'
              />
              <h3 className='battle_information_center_turn_attack_pokemon_info'>#695 Гелиолис</h3>
              <span
                style={{
                  fontWeight: '500',
                  fontSize: '9px',
                  color: '#26D222',
                  marginTop: '7px',
                  marginLeft: '3px',
                }}>
                нападает на Вас!
              </span>
            </div>
          </div>
        </div>
        <div className='battle_information_pokemon'>
          <img className='battle_information_pokemon_image' src={heleolisk} alt='torterra' />
          <div className='battle_information_pokemon_props'>
            <p className='battle_information_pokemon_props_name'>#695 Гелиолиск</p>
            <p className='battle_information_pokemon_props_level'>39</p>
          </div>
          <div
            style={{ background: `linear-gradient(to right, #04ff00 ${60}%, transparent 0%)` }}
            className='battle_information_pokemon_health'
          />
          <div
            style={{ background: `linear-gradient(to right, #45ebeb ${60}%, transparent 0%)` }}
            className='battle_information_pokemon_experience'
          />
        </div>
      </div>
      <div className='battle_attacks'>
        <div className='battle_attacks_attack'>
          <img className='battle_attacks_attack_type' src={earth} alt='earth' />
          <div className='battle_attacks_attack_info'>
            <p className='battle_attacks_attack_info_name'>Землетрясение</p>
            <p style={{ color: '#9b9b9b', fontSize: '10px', marginLeft: '2px' }}>34/35 РР</p>
          </div>
        </div>
        <div className='battle_attacks_attack'>
          <img className='battle_attacks_attack_type' src={water} alt='earth' />
          <div className='battle_attacks_attack_info'>
            <p className='battle_attacks_attack_info_name'>Каменный панцирь</p>
            <p style={{ color: '#9b9b9b', fontSize: '10px', marginLeft: '2px' }}>34/35 РР</p>
          </div>
        </div>
        <div className='battle_attacks_attack'>
          <img className='battle_attacks_attack_type' src={grass} alt='earth' />
          <div className='battle_attacks_attack_info'>
            <p className='battle_attacks_attack_info_name'>Режущий лист</p>
            <p style={{ color: '#9b9b9b', fontSize: '10px', marginLeft: '2px' }}>34/35 РР</p>
          </div>
        </div>
        <div className='battle_attacks_attack'>
          <img className='battle_attacks_attack_type' src={ground} alt='earth' />
          <div className='battle_attacks_attack_info'>
            <p className='battle_attacks_attack_info_name'>Лобовая атака</p>
            <p style={{ color: '#9b9b9b', fontSize: '10px', marginLeft: '2px' }}>34/35 РР</p>
          </div>
        </div>
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
  );
};

export default BattlePage;
