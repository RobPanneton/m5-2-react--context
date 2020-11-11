import React from "react";
import "./styles.css";
export default App;

const App = () => {
  React.useEffect(() => {
    window.addEventListener("keydown", (ev) => {
      console.log("You pressed: " + ev.code);
    });
    return () => {
      removeEventListener("keydown", (ev) => {});
    };
  }, []);
  return null;
};
