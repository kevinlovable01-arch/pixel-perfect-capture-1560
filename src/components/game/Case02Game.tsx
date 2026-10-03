import { useMemo, useState } from "react";
import {
  CASE,
  CLUES,
  KEY_EVIDENCE,
  LINKS,
  LOCATIONS,
  SUSPECTS,
  TIMELINE,
  VERDICTS,
} from "@/game/case02";
import { Button } from "@/components/ui/button";

type Tab = "investigar" | "interrogar" | "caderno" | "linha" | "concluir";

export function Case02Game({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<Tab>("investigar");
  const [clues, setClues] = useState<string[]>([]);
  const [location, setLocation] = useState<(typeof LOCATIONS)[number] | null>(null);
  const [suspect, setSuspect] = useState<(typeof SUSPECTS)[number] | null>(null);
  const [asked, setAsked] = useState<string[]>([]);
  const [choice, setChoice] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const add = (id?: string) => {
    if (id && !clues.includes(id)) setClues((v) => [...v, id]);
  };
  const has = (id: string) => clues.includes(id);
  const evidence = useMemo(() => KEY_EVIDENCE.filter(has).length, [clues]);

  if (finished && choice) {
    const verdict = VERDICTS[choice] ?? VERDICTS.c2_elisa;
    const correct = choice === "c2_elisa";
    return (
      <main className="mx-auto max-w-2xl px-6 py-16">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">{CASE.code}</p>
        <h1 className="mt-2 text-4xl">{verdict.title}</h1>
        <div className="panel mt-6 p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">{verdict.text}</p>
          <p className="mt-6 text-display text-lg text-primary">
            {correct
              ? evidence === KEY_EVIDENCE.length
                ? "Caso encerrado com todas as provas decisivas."
                : "Você chegou ao nome certo, mas ainda deixou provas pelo caminho."
              : "A conclusão não fecha com todas as evidências."}
          </p>
        </div>
        <div className="mt-8 flex gap-3">
          <Button onClick={onBack}>Voltar aos casos</Button>
          <Button variant="outline" onClick={() => { setFinished(false); setChoice(null); }}>Revisar investigação</Button>
        </div>
      </main>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "investigar", label: "Investigar" },
    { id: "interrogar", label: "Interrogar" },
    { id: "caderno", label: `Caderno (${clues.length})` },
    { id: "linha", label: "Linha do tempo" },
    { id: "concluir", label: "Conclusão" },
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary">{CASE.code}</p>
          <h1 className="text-2xl">{CASE.title}</h1>
          <p className="mt-1 text-xs text-muted-foreground">Nova investigação · {CASE.crewTotal} pessoas a bordo</p>
        </div>
        <button className="text-xs text-muted-foreground underline underline-offset-4" onClick={onBack}>Casos</button>
      </header>

      <div className="panel mt-6 p-5">
        <p className="text-sm leading-relaxed text-muted-foreground">{CASE.premise}</p>
        <p className="mt-3 text-xs text-primary">{CASE.client}</p>
      </div>

      <nav className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => { setTab(t.id); setLocation(null); setSuspect(null); }}
            className={`rounded-sm border px-3 py-1.5 text-xs uppercase tracking-wider ${tab === t.id ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/60"}`}>
            {t.label}
          </button>
        ))}
      </nav>

      <div className="mt-6">
        {tab === "investigar" && (location ? (
          <div>
            <button className="text-xs text-muted-foreground underline" onClick={() => setLocation(null)}>← Voltar</button>
            <div className="panel mt-3 p-6">
              <h2 className="text-2xl">{location.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{location.description}</p>
              <div className="mt-6 grid gap-2">
                {location.spots.map((spot) => {
                  const done = !!spot.gives && has(spot.gives);
                  return (
                    <button key={spot.id} disabled={done} onClick={() => add(spot.gives)}
                      className={`rounded-sm border px-4 py-3 text-left text-sm ${done ? "border-primary/40 text-muted-foreground" : "border-border hover:border-primary"}`}>
                      {spot.label}
                      <span className="block text-xs text-muted-foreground">{done ? "examinado" : (spot.flavor ?? "Examinar")}</span>
                    </button>
                  );
                })}
              </div>
              {clues.filter((id) => location.spots.some((s) => s.gives === id)).map((id) => {
                const c = CLUES.find((x) => x.id === id)!;
                return <div key={id} className="dossier mt-5 p-5"><p className="text-[11px] uppercase opacity-60">Pista registrada</p><h3 className="text-display mt-1 text-xl">{c.title}</h3><p className="mt-2 text-sm">{c.text}</p></div>;
              })}
            </div>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {LOCATIONS.map((l) => <button key={l.id} className="panel p-5 text-left hover:border-primary" onClick={() => setLocation(l)}>
              <h2 className="text-lg">{l.name}</h2><p className="mt-1 text-xs uppercase tracking-wider text-primary">{l.subtitle}</p><p className="mt-2 text-xs text-muted-foreground">{l.description}</p>
            </button>)}
          </div>
        ))}

        {tab === "interrogar" && (suspect ? (
          <div>
            <button className="text-xs text-muted-foreground underline" onClick={() => setSuspect(null)}>← Voltar</button>
            <div className="panel mt-3 p-6">
              <h2 className="text-2xl">{suspect.name}</h2><p className="text-xs uppercase text-primary">{suspect.role}</p>
              <p className="mt-3 text-sm text-muted-foreground">{suspect.profile}</p>
              <div className="mt-6 space-y-4">
                {asked.filter((id) => id.startsWith(suspect.id + ":")).map((key) => {
                  const qid = key.split(":")[1]; const q = suspect.questions.find((x) => x.id === qid)!;
                  return <div key={key} className="border-l-2 border-border pl-4"><p className="text-sm text-primary">— {q.q}</p><p className="mt-1 text-sm">"{q.a}"</p>{q.gives && <p className="mt-2 text-xs text-muted-foreground">Pista registrada: {CLUES.find((c) => c.id === q.gives)?.title}</p>}</div>;
                })}
              </div>
              <div className="mt-6 grid gap-2">
                {suspect.questions.map((q) => {
                  const key = suspect.id + ":" + q.id; const used = asked.includes(key);
                  const locked = q.requires?.some((r) => !has(r));
                  return <button key={q.id} disabled={used || locked} onClick={() => { setAsked((v) => [...v, key]); add(q.gives); }}
                    className={`rounded-sm border px-4 py-3 text-left text-sm ${used || locked ? "border-border/50 text-muted-foreground/50" : "border-border hover:border-primary"}`}>
                    {locked ? "Pergunta indisponível — falta informação." : q.q}
                  </button>;
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {SUSPECTS.filter((s) => !s.knownBy || has(s.knownBy)).map((s) => <button key={s.id} className="panel p-5 text-left hover:border-primary" onClick={() => setSuspect(s)}><h2 className="text-lg">{s.name}</h2><p className="mt-1 text-xs uppercase text-primary">{s.role}</p><p className="mt-2 text-sm text-muted-foreground">{s.profile}</p></button>)}
          </div>
        ))}

        {tab === "caderno" && <div className="grid gap-3">{clues.length ? clues.map((id) => { const c=CLUES.find(x=>x.id===id)!; return <div key={id} className="panel p-5"><h3 className="text-lg">{c.title}</h3><p className="mt-1 text-[11px] uppercase text-primary">{c.source}</p><p className="mt-2 text-sm text-muted-foreground">{c.text}</p></div>; }) : <p className="text-sm text-muted-foreground">Nenhuma pista registrada ainda.</p>}</div>}

        {tab === "linha" && <div className="panel p-6"><h2 className="text-xl">Reconstrução dos acontecimentos</h2><div className="mt-5 space-y-5 border-l border-border pl-5">{TIMELINE.map((e) => <div key={e.time}><p className="text-display text-lg text-primary">{e.time}</p><p className="mt-1 text-sm text-muted-foreground">{has(e.requires) ? e.text : "Trecho desconhecido. Falta informação."}</p></div>)}</div></div>}

        {tab === "concluir" && <div className="panel p-6"><h2 className="text-xl">Quem atacou Augusto?</h2><p className="mt-2 text-sm text-muted-foreground">Provas decisivas reunidas: {evidence} de {KEY_EVIDENCE.length}.</p><div className="mt-5 grid gap-2 sm:grid-cols-2">{SUSPECTS.map((s) => <button key={s.id} onClick={() => setChoice(s.id)} className={`rounded-sm border px-4 py-3 text-left text-sm ${choice === s.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/60"}`}>{s.name}<span className="block text-xs text-muted-foreground">{s.role}</span></button>)}</div><Button className="mt-6" size="lg" disabled={!choice} onClick={() => setFinished(true)}>Entregar conclusão</Button></div>}
      </div>
    </main>
  );
}
