import type { Route } from "./+types/home";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kalkulator" },
    { name: "description", content: "En responsiv kalkulator" },
  ];
}

export default function Home() {

}
