import React, { createContext } from "react";
import usePersistedState from "../hooks/use-persisted-state";
import useInterval from "../hooks/use-interval.hook";
export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = usePersistedState(1000, "num-cookies");
  const [purchasedItems, setPurchasedItems] = usePersistedState(
    {
      cursor: 0,
      grandma: 0,
      farm: 0,
      megacursor: 0,
    },
    "purchased-items"
  );
  const [timeClosed, setTimeClosed] = usePersistedState(
    new Date().getTime(),
    "time-closed"
  );

  const calculateCookiesPerTick = (purchased) => {
    let sum = 0;
    Object.keys(purchased).forEach((item, index) => {
      if (index !== 3) {
        sum += purchased[item] * items[index].value;
      }
    });
    return sum;
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  const items = [
    { id: "cursor", name: "Cursor", cost: 10, value: 1 },
    { id: "grandma", name: "Grandma", cost: 100, value: 10 },
    { id: "farm", name: "Farm", cost: 1000, value: 80 },
    { id: "megacursor", name: "Mega Cursor", cost: 50, value: 5 },
  ];

  return (
    <GameContext.Provider
      value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        timeClosed,
        setTimeClosed,
        items,
        cookiesPerTick: calculateCookiesPerTick(purchasedItems),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
