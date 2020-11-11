import React, { useState, useEffect } from "react";

// const [numCookies, setNumCookies] = useState(100);
const usePersistedState = (initialValue, keyName) => {
  const [storedValue, setStoredValue] = useState(() => {
    const currentValue = localStorage.getItem(keyName);
    if (currentValue) {
      return JSON.parse(currentValue);
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(keyName, JSON.stringify(storedValue));
  }, [storedValue, keyName]);

  return [storedValue, setStoredValue];
};

export default usePersistedState;
