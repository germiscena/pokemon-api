import React from 'react';
import './MainComponent.scss';
import battles from '../img/battles.svg';
import pokedex from '../img/pokedex.svg';
import groups from '../img/groups.svg';
import backpack from '../img/business_center.svg';
import pets from '../img/pets.svg';
import wild from '../img/wild.svg';
import { Link } from 'react-router-dom';

const MainComponent = ({ children }) => {
  return (
    <div className='main'>
      <div className='main_header'>
        <p className='main_header_title'>POKEMONAPI</p>
      </div>
      <div className='main_borders left'>
        <img className='main_borders_image' src={pets} alt='pokemons' />
        <img className='main_borders_image' src={backpack} alt='inventory' />
        <img className='main_borders_image' src={groups} alt='players' />
      </div>
      <div className='main_borders right'>
        <Link to='/main'>
          <img className='main_borders_image' src={wild} alt='wild pokemons' />
        </Link>
        <img className='main_borders_image' src={pokedex} alt='pokedex' />
        <Link to='/battle'>
          <img className='main_borders_image' src={battles} alt='battles' />
        </Link>
      </div>
      {children}
    </div>
  );
};

export default MainComponent;
