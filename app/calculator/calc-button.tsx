type Variant = "num" | "op" | "eq" | "fn";

const variantClasses: Record<Variant, string> = {
  num: "bg-purple-900 text-white hover:bg-purple-800 active:bg-purple-700 rounded-xl text-xl md:text-2xl font-medium transition-colors min-h-[3.5rem] md:min-h-[4rem] cursor-pointer select-none",
  op: "bg-fuchsia-500 text-white hover:bg-fuchsia-600 active:bg-fuchsia-700 rounded-xl text-xl md:text-2xl font-semibold transition-colors min-h-[3.5rem] md:min-h-[4rem] cursor-pointer select-none",
  eq: "bg-gradient-to-b from-orange-500 to-yellow-400 text-white hover:from-orange-600 hover:to-yellow-500 active:from-orange-700 active:to-yellow-600 rounded-xl text-xl md:text-2xl font-semibold transition-colors min-h-[3.5rem] md:min-h-[4rem] cursor-pointer select-none row-span-2",
  fn: "bg-indigo-950 text-fuchsia-300 hover:bg-indigo-900 active:bg-indigo-800 rounded-xl text-lg md:text-xl font-semibold transition-colors min-h-[3.5rem] md:min-h-[4rem] cursor-pointer select-none",
};

interface CalcButtonProps {
  label: string;
  variant: Variant;
  onClick: () => void;
  className?: string;
}

export function CalcButton({
  label,
  variant,
  onClick,
  className,
}: CalcButtonProps) {
  return (
    <button
      className={`${variantClasses[variant]}${className ? ` ${className}` : ""}`}
      onClick={onClick}>
      {label}
    </button>
  );
}
