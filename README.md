# Responsive Calculator

A responsive web calculator built with React, React Router 7, and Tailwind CSS 4. Supports building and evaluating mathematical expressions with the four basic arithmetic operations.

## Features

- **Expression-based input** — type full expressions like `10+5*2` and evaluate them
- **Basic operations** — addition, subtraction, multiplication, division
- **Decimal support** — one decimal point per number segment
- **Clear (C)** — reset display to `0`
- **Delete (DEL)** — remove the last character
- **Error handling** — displays "Error" for invalid expressions
- **Keyboard support** — numpad, operators, Enter (=), Backspace (DEL)
- **Responsive layout** — CSS Grid with touch-friendly buttons, scales from mobile to desktop

## Tech Stack

- [React](https://react.dev/) 19
- [React Router](https://reactrouter.com/) 7 (SSR)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Vite](https://vite.dev/) 7
- TypeScript 5

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Serve production build |
| `npm run typecheck` | Run TypeScript type checking |

## Project Structure

```
app/
├── calculator/
│   ├── evaluate.ts        # Pure math utilities (isOperator, safeEvaluate)
│   ├── useCalculator.ts   # Custom hook (state, handlers, keyboard listener)
│   ├── calc-button.tsx    # Reusable button component with variants
│   └── calculator.tsx     # Main calculator layout
├── routes/
│   └── home.tsx           # Home route rendering the calculator
├── root.tsx               # Root layout and error boundary
├── routes.ts              # Route configuration
└── app.css                # Global styles and Tailwind config
```
