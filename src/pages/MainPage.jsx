import React from 'react';
import './MainPage.scss';

const MainPage = () => {
  return (
    <div className='mainPage'>
      <div className='mainPage_landscape' />
      <div className='mainPage_links'>
        <div className='mainPage_links_route'>
          <h3 className='mainPage_links_route_title'>ПЕРЕХОДЫ</h3>
          <div className='mainPage_links_route_points'>
            <button className='mainPage_links_route_points_single'>Академия тренеров</button>
            <button className='mainPage_links_route_points_single'>Покецентр</button>
            <button className='mainPage_links_route_points_single'>Дикий лес</button>
          </div>
        </div>
        <div className='mainPage_links_route'>
          <h3 className='mainPage_links_route_title'>ПЕРСОНАЖИ</h3>
          <div className='mainPage_links_route_points'>
            <button className='mainPage_links_route_points_single'>Сестра Джой</button>
            <button className='mainPage_links_route_points_single'>Продавец</button>
          </div>
        </div>
        <div className='mainPage_links_route'>
          <h3 className='mainPage_links_route_title'>ДЕЙСТВИЯ</h3>
          <div className='mainPage_links_route_points'>
            <button className='mainPage_links_route_points_single'>Лечение</button>
            <button className='mainPage_links_route_points_single'>Прогулка</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
