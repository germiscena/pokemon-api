import React from 'react';
import { Route, Routes } from 'react-router';
import MainComponent from './components/MainComponent.jsx';
import Loading from './pages/Loading.jsx';
import './App.css';
import MainPage from './pages/MainPage.jsx';
import BattlePage from './pages/BattlePage.jsx';
import axios from 'axios';

function App() {
  return (
    <MainComponent>
      <Routes>
        <Route path='/' element={<Loading />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='/battle' element={<BattlePage />} />
      </Routes>
    </MainComponent>
  );
}

export default App;
