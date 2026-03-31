import { useCalculator } from "./useCalculator";
import { CalcButton } from "./calc-button";

export function Calculator() {
  const {
    display,
    handleNumber,
    handleOperator,
    handleDecimal,
    handleEquals,
    handleClear,
    handleDelete,
  } = useCalculator();

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-[22rem] md:max-w-[26rem] bg-white dark:bg-white rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.4)] p-4 md:p-6 space-y-4">
        <input
          type="text"
          readOnly
          value={display}
          className="w-full bg-indigo-950 text-right text-3xl md:text-4xl lg:text-5xl font-mono text-fuchsia-200 px-4 py-3 md:py-4 rounded-xl border border-purple-700 outline-none overflow-x-auto"
        />

        <div className="grid grid-cols-4 gap-2 md:gap-3">
          <CalcButton label="C" variant="fn" onClick={handleClear} />
          <CalcButton label="DEL" variant="fn" onClick={handleDelete} />
          <CalcButton
            label="/"
            variant="op"
            onClick={() => handleOperator("/")}
          />
          <CalcButton
            label="*"
            variant="op"
            onClick={() => handleOperator("*")}
          />

          <CalcButton
            label="7"
            variant="num"
            onClick={() => handleNumber("7")}
          />
          <CalcButton
            label="8"
            variant="num"
            onClick={() => handleNumber("8")}
          />
          <CalcButton
            label="9"
            variant="num"
            onClick={() => handleNumber("9")}
          />
          <CalcButton
            label="-"
            variant="op"
            onClick={() => handleOperator("-")}
          />

          <CalcButton
            label="4"
            variant="num"
            onClick={() => handleNumber("4")}
          />
          <CalcButton
            label="5"
            variant="num"
            onClick={() => handleNumber("5")}
          />
          <CalcButton
            label="6"
            variant="num"
            onClick={() => handleNumber("6")}
          />
          <CalcButton
            label="+"
            variant="op"
            onClick={() => handleOperator("+")}
          />

          <CalcButton
            label="1"
            variant="num"
            onClick={() => handleNumber("1")}
          />
          <CalcButton
            label="2"
            variant="num"
            onClick={() => handleNumber("2")}
          />
          <CalcButton
            label="3"
            variant="num"
            onClick={() => handleNumber("3")}
          />
          <CalcButton label="=" variant="eq" onClick={handleEquals} />

          <CalcButton
            label="0"
            variant="num"
            onClick={() => handleNumber("0")}
            className="col-span-2"
          />
          <CalcButton label="." variant="num" onClick={handleDecimal} />
        </div>
      </div>
    </div>
  );
}
