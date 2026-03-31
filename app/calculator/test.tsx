import { useState, useCallback, useEffect } from "react";

const OPERATORS = ["+", "-", "*", "/"];

function isOperator(char: string) {
  return OPERATORS.includes(char);
}

function getLastNumberSegment(expr: string): string {
  for (let i = expr.length - 1; i >= 0; i--) {
    if (isOperator(expr[i])) {
      return expr.slice(i + 1);
    }
  }
  return expr;
}

function safeEvaluate(expr: string): string {
  try {
    if (expr.length === 0) return "0";
    const lastChar = expr[expr.length - 1];
    if (isOperator(lastChar) || lastChar === ".") {
      return "Error";
    }
    const result = new Function("return (" + expr + ")")();
    if (result === undefined || result === null || isNaN(result)) {
      return "Error";
    }
    if (!isFinite(result)) {
      return "Error";
    }
    const str = String(result);
    return str;
  } catch {
    return "Error";
  }
}

export function Calculator() {
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
      else if (e.key === "Escape") handleClear();
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

  const numClass =
    "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-600 rounded-xl text-xl md:text-2xl font-medium transition-colors min-h-[3.5rem] md:min-h-[4rem] cursor-pointer select-none";
  const opClass =
    "bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 rounded-xl text-xl md:text-2xl font-semibold transition-colors min-h-[3.5rem] md:min-h-[4rem] cursor-pointer select-none";
  const eqClass =
    "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 rounded-xl text-xl md:text-2xl font-semibold transition-colors min-h-[3.5rem] md:min-h-[4rem] cursor-pointer select-none row-span-2";
  const fnClass =
    "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 active:bg-gray-500 dark:active:bg-gray-500 rounded-xl text-lg md:text-xl font-semibold transition-colors min-h-[3.5rem] md:min-h-[4rem] cursor-pointer select-none";

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-[22rem] md:max-w-[26rem] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 md:p-6 space-y-4">
        <input
          type="text"
          readOnly
          value={display}
          className="w-full bg-gray-50 dark:bg-gray-800 text-right text-3xl md:text-4xl lg:text-5xl font-mono text-gray-900 dark:text-gray-100 px-4 py-3 md:py-4 rounded-xl border border-gray-200 dark:border-gray-700 outline-none overflow-x-auto"
        />

        <div className="grid grid-cols-4 gap-2 md:gap-3">
          {/* Row 1: C  DEL  /  * */}
          <button className={fnClass} onClick={handleClear}>
            C
          </button>
          <button className={fnClass} onClick={handleDelete}>
            DEL
          </button>
          <button className={opClass} onClick={() => handleOperator("/")}>
            /
          </button>
          <button className={opClass} onClick={() => handleOperator("*")}>
            ×
          </button>

          {/* Row 2: 7  8  9  - */}
          <button className={numClass} onClick={() => handleNumber("7")}>
            7
          </button>
          <button className={numClass} onClick={() => handleNumber("8")}>
            8
          </button>
          <button className={numClass} onClick={() => handleNumber("9")}>
            9
          </button>
          <button className={opClass} onClick={() => handleOperator("-")}>
            −
          </button>

          {/* Row 3: 4  5  6  + */}
          <button className={numClass} onClick={() => handleNumber("4")}>
            4
          </button>
          <button className={numClass} onClick={() => handleNumber("5")}>
            5
          </button>
          <button className={numClass} onClick={() => handleNumber("6")}>
            6
          </button>
          <button className={opClass} onClick={() => handleOperator("+")}>
            +
          </button>

          {/* Row 4: 1  2  3  = (spans 2 rows) */}
          <button className={numClass} onClick={() => handleNumber("1")}>
            1
          </button>
          <button className={numClass} onClick={() => handleNumber("2")}>
            2
          </button>
          <button className={numClass} onClick={() => handleNumber("3")}>
            3
          </button>
          <button className={eqClass} onClick={handleEquals}>
            =
          </button>

          {/* Row 5: 0 (spans 2 cols)  . */}
          <button
            className={`${numClass} col-span-2`}
            onClick={() => handleNumber("0")}>
            0
          </button>
          <button className={numClass} onClick={handleDecimal}>
            .
          </button>
        </div>
      </div>
    </div>
  );
}
