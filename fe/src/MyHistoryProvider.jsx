import React, { createContext, useContext, useState } from 'react';

// https://stackoverflow.com/questions/74840909/how-to-get-previous-url-in-react-router-v6
const myHistoryContext = createContext();

export function MyHistoryProvider({ children }) {
  const [myHistory, setMyHistory] = useState([]);

  const push = (location) => setMyHistory([...myHistory, location]);

  return (
    <myHistoryContext.Provider value={{ myHistory, push }}>{children}</myHistoryContext.Provider>
  );
}

export const useMyHistory = () => useContext(myHistoryContext);
