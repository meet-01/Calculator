import { useContext, useEffect, useState } from "react";
import "./App.css";
import Calculator from "./components/Calculator";

function App() {
  // const [themeMode, setThemeMode] = useContext(ContextTheme);
  // const [theme, setTheme] = useState("#000");
  // useEffect(() => {
  //   document.body.style.backgroundColor = theme;
  // });

  return (
    <div className="App">
      <Calculator />
    </div>
  );
}

export default App;
