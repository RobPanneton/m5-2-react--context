import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from "./Item";

import useKeydown from "../hooks/use-keydown";
import useDocumentTitle from "../hooks/use-document-title";
import { GameContext } from "./GameContext";
import cookieSrc from "../cookie.svg";

const Game = () => {
  const {
    items,
    numCookies,
    setNumCookies,
    purchasedItems,
    setPurchasedItems,
  } = useContext(GameContext);

  const handleClickItem = (item) => {
    if (item.cost > numCookies) {
      return;
    } else {
      setNumCookies(numCookies - item.cost);

      item.cost += Math.round(item.cost * 0.2);
      setPurchasedItems((purchasedItems) => {
        return { ...purchasedItems, [item.id]: purchasedItems[item.id] + 1 };
      });
    }
  };

  const cookieClick = () => {
    const extraClicks = items[3].value * purchasedItems.megacursor;
    setNumCookies(numCookies + 1 + extraClicks);
  };

  useDocumentTitle(`${numCookies} - Cookie Clicker !`, "Cookie Clicker !");
  useKeydown(cookieClick, "Space");

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>
            {purchasedItems.cursor * items[0].value +
              purchasedItems.grandma * items[1].value +
              purchasedItems.farm * items[2].value}
          </strong>{" "}
          cookies per second
        </Indicator>
        <Button onClick={cookieClick}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        <Item
          items={items}
          numCookies={numCookies}
          purchasedItems={purchasedItems}
          handleClickItem={handleClickItem}
        />
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
