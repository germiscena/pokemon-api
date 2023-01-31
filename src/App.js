import React from "react";
import { Route, Routes } from "react-router";
import MainComponent from "./components/MainComponent.jsx";
import Loading from "./pages/Loading.jsx";
import "./App.css";
import MainPage from "./pages/MainPage.jsx";
import BattlePage from "./pages/BattlePage.jsx";
import Registration from "./pages/Registration.jsx";
import AppContext from "./context.js";
function App() {
  const [pokedexOpen, setPokedexOpen] = React.useState(false);
  const [wildBattles, setWildBattles] = React.useState(false);
  return (
    <AppContext.Provider value={{ pokedexOpen, setPokedexOpen, wildBattles, setWildBattles }}>
      <MainComponent>
        <Routes>
          <Route path='/' element={<Loading />} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/battle' element={<BattlePage />} />
          <Route path='/reg' element={<Registration />} />
        </Routes>
      </MainComponent>
    </AppContext.Provider>
  );
}

export default App;
