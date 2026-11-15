import { createFileRoute } from "@tanstack/react-router";
import { NirmalaWorld } from "@/components/game/NirmalaWorld";

export const Route = createFileRoute("/caso-02")({
  head: () => ({ meta: [
    { title: "VEILORIS — As Cinzas de Nirmala" },
    { name: "description", content: "Conheça a Plantação Nirmala, seus sete lugares e seis personagens no interior de Java, cenário do novo Caso 02 de VEILORIS." },
    { property: "og:title", content: "VEILORIS — As Cinzas de Nirmala" },
    { property: "og:description", content: "Uma fazenda isolada pela monção. Uma porta trancada. Conheça o mundo do novo mistério de VEILORIS." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: NirmalaWorld,
});