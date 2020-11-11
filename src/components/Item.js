import React from "react";
import styled from "styled-components";

const Item = ({ items, numCookies, purchasedItems, handleClickItem }) => {
  return (
    <Wrapper>
      {items.map((item, index) => {
        return (
          <ItemButton
            key={Math.random() * 10000000000}
            value={item.id}
            index={index}
            autoFocus={index === 0}
            onClick={() => handleClickItem(item)}
          >
            <InfoBlock>
              <ItemName>{item.name}</ItemName>
              {index !== 3 ? (
                <p>
                  Cost: {item.cost} cookie(s). Produces {item.value}{" "}
                  cookies/second.
                </p>
              ) : (
                <p>
                  Cost: {item.cost} cookie(s). Produces an extra {item.value}{" "}
                  cookies/click.
                </p>
              )}
            </InfoBlock>
            <AmountBlock>
              <h1>{purchasedItems[item.id]}</h1>
            </AmountBlock>
          </ItemButton>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`;

const ItemButton = styled.button`
  height: 100px;
  width: 400px;
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid gray;
  padding: 10px 10px 10px 10px;
  margin: 0;
  color: #eaeaee;
`;

const ItemName = styled.h1`
  text-align: left;
`;

const InfoBlock = styled.div``;

const AmountBlock = styled.div`
  margin-top: 10px;
  text-align: right;
`;

export default Item;
