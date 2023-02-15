import React, { createContext, useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { API_URL } from "../.env";

export const ConnectionContext = createContext();

const ConnectionProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);
  let token = localStorage.getItem("token");

  useEffect(() => {
    const startConnection = async () => {
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${API_URL}/pokemonHub`, { accessTokenFactory: () => token })
        .build();

      try {
        await newConnection.start();
        console.log("connected");
        setConnection(newConnection);
      } catch (err) {
        console.log(err);
      }
    };
    startConnection();
  }, []);

  return (
    <ConnectionContext.Provider value={{ connection }}>
      {children}
    </ConnectionContext.Provider>
  );
};

export default ConnectionProvider;
