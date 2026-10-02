import { createFileRoute } from "@tanstack/react-router";

function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <div className="text-center max-w-2xl">
        <p className="text-sm uppercase tracking-[0.4em] opacity-70 mb-4">
          VEILORIS
        </p>
        <h1 className="text-5xl font-bold mb-4">Fase 2</h1>
        <p className="text-2xl mb-6 opacity-90">Coming Soon</p>
        <p className="opacity-70">
          Novas mecânicas, novos mistérios e uma experiência ainda maior estão em desenvolvimento.
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "VEILORIS — Fase 2 em breve" }],
  }),
  component: ComingSoon,
});