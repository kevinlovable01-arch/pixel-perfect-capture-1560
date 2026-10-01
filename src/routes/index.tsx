import { createFileRoute } from "@tanstack/react-router";
import { Game } from "@/components/game/Game";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VEILORIS — O mistério além do tempo" },
      {
        name: "description",
        content:
          "Crie seu investigador em VEILORIS e desvende O Último Temporal por meio de pistas, interrogatórios e contradições.",
      },
      { property: "og:title", content: "VEILORIS — O mistério além do tempo" },
      {
        property: "og:description",
        content: "Vinte pessoas a bordo. Um capitão morto. A verdade não está escondida — está espalhada.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Game,
});
