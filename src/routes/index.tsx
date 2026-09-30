import { createFileRoute } from "@tanstack/react-router";
import { Game } from "@/components/game/Game";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "O Último Temporal — Caso 01" },
      {
        name: "description",
        content:
          "Investigue a morte do capitão Elias Vane durante uma tempestade: pistas, interrogatórios, contradições e um infiltrado a bordo.",
      },
      { property: "og:title", content: "O Último Temporal — Caso 01" },
      {
        property: "og:description",
        content: "Vinte pessoas a bordo. Um capitão morto. A verdade não está escondida — está espalhada.",
      },
    ],
  }),
  component: Game,
});
