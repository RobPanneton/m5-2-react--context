import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import { GameContext } from "./GameContext";

function App() {
  const {
    numCookies,
    setNumCookies,
    timeClosed,
    setTimeClosed,
    cookiesPerTick,
  } = useContext(GameContext);

  window.addEventListener("beforeunload", () => {
    setTimeClosed(new Date().getTime());
  });

  window.addEventListener("load", () => {
    const timeOpened = new Date().getTime();
    const timeDifference = Math.floor((timeOpened - timeClosed) / 1000);
    const addedWhileAwayCookies = timeDifference * cookiesPerTick;
    setNumCookies(numCookies + addedWhileAwayCookies);
  });

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Router>
    </>
  );
}

export default App;
