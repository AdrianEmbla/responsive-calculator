export const OPERATORS = ["+", "-", "*", "/"];

export function isOperator(char: string) {
  return OPERATORS.includes(char);
}

export function getLastNumberSegment(expr: string): string {
  for (let i = expr.length - 1; i >= 0; i--) {
    if (isOperator(expr[i])) {
      return expr.slice(i + 1);
    }
  }
  return expr;
}

export function safeEvaluate(expr: string): string {
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
    return String(result);
  } catch {
    return "Error";
  }
}
