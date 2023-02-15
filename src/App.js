import React, { createContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import MainComponent from "./components/MainComponent.jsx";
import Loading from "./pages/Loading.jsx";
import "./App.css";
import MainPage from "./pages/MainPage.jsx";
import BattlePage from "./pages/BattlePage.jsx";
import Registration from "./pages/Registration.jsx";
import AppContext from "./context.js";
import MultyBattlePage from "./pages/MultyBattlePage.jsx";
import ConnectionProvider, {
  ConnectionContext,
} from "./components/ConnectionProvider.jsx";

function App() {
  const [pokedexOpen, setPokedexOpen] = React.useState(false);
  const [wildBattles, setWildBattles] = React.useState(false);
  const [backpackPokemons, setBackpackPokemons] = React.useState(false);
  const [connectState, setConnectState] = React.useState(null);

  return (
    <AppContext.Provider
      value={{
        pokedexOpen,
        setPokedexOpen,
        wildBattles,
        setWildBattles,
        backpackPokemons,
        setBackpackPokemons,
        connectState,
        setConnectState,
      }}
    >
      <MainComponent>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route
            path="/main"
            element={
              <ConnectionProvider>
                <MainPage />
              </ConnectionProvider>
            }
          />
          <Route path="/battle" element={<BattlePage />} />
          <Route
            path="/reg"
            element={
              <ConnectionProvider>
                <Registration />
              </ConnectionProvider>
            }
          />
          <Route
            path="/multy-battle"
            element={
              <ConnectionProvider>
                <MultyBattlePage />
              </ConnectionProvider>
            }
          />
        </Routes>
      </MainComponent>
    </AppContext.Provider>
  );
}

export default App;
