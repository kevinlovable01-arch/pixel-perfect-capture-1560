import { createFileRoute } from "@tanstack/react-router";
import { Game } from "@/components/game/Game";

function GameWithPhase2Banner() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 text-white text-center py-2 text-sm">
        🚀 Fase 2 em desenvolvimento — Coming Soon
      </div>
      <Game />
    </>
  );
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