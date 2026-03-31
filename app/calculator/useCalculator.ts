import { useState, useCallback, useEffect } from "react";
import {
  OPERATORS,
  isOperator,
  getLastNumberSegment,
  safeEvaluate,
} from "./evaluate";

export function useCalculator() {
  const [display, setDisplay] = useState("0");

  const handleNumber = useCallback((digit: string) => {
    setDisplay((prev) => {
      if (prev === "0" || prev === "Error") return digit;
      return prev + digit;
    });
  }, []);

  const handleOperator = useCallback((op: string) => {
    setDisplay((prev) => {
      if (prev === "Error") return "0";
      const lastChar = prev[prev.length - 1];
      if (isOperator(lastChar)) return prev;
      return prev + op;
    });
  }, []);

  const handleDecimal = useCallback(() => {
    setDisplay((prev) => {
      if (prev === "Error") return "0.";
      const lastSegment = getLastNumberSegment(prev);
      if (lastSegment.includes(".")) return prev;
      return prev + ".";
    });
  }, []);

  const handleEquals = useCallback(() => {
    setDisplay((prev) => safeEvaluate(prev));
  }, []);

  const handleClear = useCallback(() => {
    setDisplay("0");
  }, []);

  const handleDelete = useCallback(() => {
    setDisplay((prev) => {
      if (prev === "Error") return "0";
      const next = prev.slice(0, -1);
      return next.length === 0 ? "0" : next;
    });
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key >= "0" && e.key <= "9") handleNumber(e.key);
      else if (OPERATORS.includes(e.key)) handleOperator(e.key);
      else if (e.key === ".") handleDecimal();
      else if (e.key === "Enter" || e.key === "=") handleEquals();
      else if (e.key === "Backspace") handleDelete();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    handleNumber,
    handleOperator,
    handleDecimal,
    handleEquals,
    handleClear,
    handleDelete,
  ]);

  return {
    display,
    handleNumber,
    handleOperator,
    handleDecimal,
    handleEquals,
    handleClear,
    handleDelete,
  };
}
