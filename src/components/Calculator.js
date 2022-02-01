import React, { useState } from "react";
import { useTheme } from "../Context/ThemeContext";

const Calculator = () => {
  //Global Context states
  const { theme, themes, switchTheme } = useTheme();

  //States
  const [currentValue, setCurrentValue] = useState("");
  const [previousValue, setPreviousValue] = useState("");
  const [operator, setOperator] = useState("");
  const [scientificMode, setScientificMode] = useState(false);

  //Functions
  const inputNumber = (e) => {
    const number = e.target.name;
    //Concat
    setCurrentValue(currentValue + number);
  };

  const reset = () => {
    setCurrentValue("");
    setPreviousValue("");
    setOperator("");
  };

  const signChange = () => {
    let value = currentValue.toString();
    const isNegativeNumber = value.charAt(0) === "-";
    if (isNegativeNumber) {
      setCurrentValue(value.substring(1));
    } else {
      setCurrentValue("-" + currentValue);
    }
  };

  const squareNumber = () => {
    let currentNumber = parseInt(currentValue);
    setCurrentValue(currentNumber * currentNumber);
  };

  const squareRootResultNumber = () => {
    setCurrentValue(Math.sqrt(currentValue));
  };

  const operation = (e) => {
    if (currentValue === "") return;
    const operationType = e.target.name;
    setOperator(operationType);

    if (previousValue !== "") {
      let value = compute();
      setPreviousValue(value);
    } else {
      setPreviousValue(currentValue);
    }
    setCurrentValue("");
  };

  const equals = () => {
    let value = compute();
    // if (value === undefined || value === null) return;
    // https://262.ecma-international.org/5.1/#sec-11.9.3
    if (value == null) return;
    setCurrentValue(value);
    setPreviousValue("");
    setOperator("");
  };

  const compute = () => {
    let result;
    const previousNumber = parseInt(previousValue);
    const currentNumber = parseInt(currentValue);

    //incase Previous value or Current value is not a number check.
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
        if (currentNumber === 0) {
          alert("you can't divide by 0");
          setCurrentValue("");
          break;
        } else {
          result = previousNumber / currentNumber;
          break;
        }
      default:
        break;
    }
    return result;
  };

  return (
    <div className="container">
      <button className="btn__themeswitch" onClick={switchTheme}>
        {theme === themes.light ? "Lights OFF" : "Lights ON"}
      </button>
      <div className="result">
        {previousValue}
        <div> {operator}</div>
        <div>{currentValue}</div>
      </div>
      <div className="row">
        <button name="1" onClick={inputNumber}>
          1
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
          Scientific Mode - {scientificMode ? "OFF" : "ON"}
        </button>
      </div>
      {scientificMode && (
        <div className="row">
          <button onClick={signChange}>-/+</button>
          <button onClick={squareNumber}>Sqaure </button>
          <button onClick={squareRootResultNumber}>Root √</button>
        </div>
      )}
    </div>
  );
};

export default Calculator;
