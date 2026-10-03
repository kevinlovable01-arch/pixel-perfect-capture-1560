import { createFileRoute } from "@tanstack/react-router";
import { Game } from "@/components/game/Game";

function GameWithPhase2Banner() {
  return <Game />;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VEILORIS — O mistério além do tempo" },
      {
        name: "description",
        content:
          "Crie seu investigador em VEILORIS e desvende O Último Temporal por meio de pistas, interrogatórios e contradições.",
      },
    ],
  }),
  component: GameWithPhase2Banner,
});