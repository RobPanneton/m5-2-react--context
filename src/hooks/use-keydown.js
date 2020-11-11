import React, { useEffect } from "react";

const useKeydown = (callback, key) => {
  useEffect(() => {
    const processSpace = () => {
      if (key === "Space") {
        callback();
      }
    };
    window.addEventListener("keydown", processSpace);

    return () => {
      window.removeEventListener("keydown", processSpace);
    };
  });
};

export default useKeydown;
