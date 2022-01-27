import React, { useState } from "react";
import { useTheme } from "../Context/ThemeContext";

const Calculator = () => {
  const { theme, switchTheme } = useTheme();

  //States
  const [currentValue, setCurrentValue] = useState("");
  const [previousValue, setPreviousValue] = useState("");
  const [operator, setOperator] = useState("");
  const [scientificMode, setScientificMode] = useState(true);

  //Functions
  const inputNumber = (e) => {
    const number = e.target.name;
    setCurrentValue(currentValue + number);
  };
  const reset = () => {
    setCurrentValue("");
    setPreviousValue("");
    setOperator("");
  };

  const signChange = () => {
    let value = currentValue.toString();
    const removeMinus = value.charAt(0) === "-";
    if (removeMinus) {
      setCurrentValue(value.substring(1));
    } else {
      setCurrentValue("-" + currentValue);
    }
  };

  const squareNumber = () => {
    let currentNumber = parseInt(currentValue);
    setCurrentValue(currentNumber * currentNumber);
  };

  const squareRootResult = () => {
    setCurrentValue(Math.sqrt(currentValue));
  };
  const operation = (e) => {
    const operationType = e.target.name;
    setOperator(operationType);

    if (currentValue === "") return;
    if (previousValue !== "") {
      let value = compute();
      setPreviousValue(value);
    } else {
      setPreviousValue(currentValue);
    }
    setCurrentValue("");
    setOperator(operationType);
  };

  const equals = () => {
    let value = compute();
    if (value === undefined || value === null) return;

    setCurrentValue(value);
    setPreviousValue("");
    setOperator("");
  };
  const compute = () => {
    let result;
    let previousNumber = parseInt(previousValue);
    let currentNumber = parseInt(currentValue);

    //incase previous number or current is not a number check.
    if (isNaN(previousNumber) || isNaN(currentNumber)) return;

    switch (operator) {
      case "+":
        result = previousNumber + currentNumber;
        break;
      case "-":
        result = previousNumber - currentNumber;
        break;
      case "*":
        result = previousNumber * currentNumber;
        break;
      case "/":
        result = previousNumber / currentNumber;
        break;

      default:
        break;
    }
    return result;
  };

  return (
    <div className="container" data-theme={theme}>
      <button onClick={switchTheme}>
        {theme === "light" ? "Lights OFF" : "Lights ON"}
      </button>
      <div className="result">
        {previousValue}
        <div> {operator}</div>
        <div>{currentValue}</div>
      </div>
      <div className="row">
        <button name="1" onClick={inputNumber}>
          1{" "}
        </button>
        <button name="2" onClick={inputNumber}>
          2
        </button>
        <button name="3" onClick={inputNumber}>
          3
        </button>
        <button name="+" onClick={operation}>
          Add (+)
        </button>
      </div>
      <div className="row">
        <button name="4" onClick={inputNumber}>
          4
        </button>
        <button name="5" onClick={inputNumber}>
          5
        </button>
        <button name="6" onClick={inputNumber}>
          6
        </button>
        <button name="-" onClick={operation}>
          Subtract (-)
        </button>
      </div>
      <div className="row">
        <button name="7" onClick={inputNumber}>
          7
        </button>

        <button name="8" onClick={inputNumber}>
          8
        </button>
        <button name="9" onClick={inputNumber}>
          9
        </button>
        <button name="*" onClick={operation}>
          Multiply (*)
        </button>
      </div>
      <div className="row">
        <button onClick={reset}>Clear</button>
        <button name="0" onClick={inputNumber}>
          0
        </button>
        <button onClick={equals}> =</button>
        <button name="/" onClick={operation}>
          Divide (/)
        </button>
      </div>
      <div className="scientific__mode">
        <button onClick={() => setScientificMode(!scientificMode)}>
          Scientific Mode - {scientificMode ? "ON" : "OFF"}
        </button>
      </div>
      {scientificMode && (
        <div className="row">
          <button onClick={signChange}>-/+</button>
          <button onClick={squareNumber}>Sqaure </button>
          <button onClick={squareRootResult}>Root √</button>
        </div>
      )}
    </div>
  );
};

export default Calculator;
