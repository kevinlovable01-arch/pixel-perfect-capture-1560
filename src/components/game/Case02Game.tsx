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
import { answerForDifficulty, shouldShowInvestigationSpot, type Difficulty } from "@/game/difficulty";
import type { PlayerCharacter } from "@/game/useGame";
import type { Spot } from "@/game/case01";

type Tab = "investigar" | "interrogar" | "caderno" | "linha" | "concluir";


function Case02ClueCard({ id, notes, onAddNote }: { id: string; notes: string[]; onAddNote: (note: string) => void }) {
  const clue = CLUES.find((x) => x.id === id)!;
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  return (
    <div className="dossier mt-5 p-5">
      <p className="text-[11px] uppercase tracking-[0.25em] opacity-60">Evidência encontrada</p>
      <h3 className="text-display mt-1 text-xl">{clue.title}</h3>
      <p className="mt-2 text-sm leading-relaxed">{clue.text}</p>
      <div className="mt-5 border-t border-border/60 pt-4">
        <p className="text-xs uppercase tracking-[0.2em] text-primary">Seu caderno</p>
        <p className="mt-1 text-xs text-muted-foreground">Nada é anotado automaticamente. Você decide o que merece entrar no caderno.</p>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Escreva sua própria interpretação..." className="mt-3 min-h-24 w-full rounded-sm border border-border bg-background p-3 text-sm outline-none focus:border-primary" />
        <Button size="sm" className="mt-2" disabled={!note.trim() || saved} onClick={() => { onAddNote(note.trim()); setSaved(true); setNote(""); }}>
          {saved ? "Anotação salva" : "Anotar no caderno"}
        </Button>
      </div>
    </div>
  );
}

function Notebook02({ notes }: { notes: string[] }) {
  return (
    <div className="grid gap-3">
      {notes.length ? notes.map((note, index) => (
        <div key={index} className="panel p-5">
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary">Anotação {index + 1}</p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{note}</p>
        </div>
      )) : (
        <div className="panel p-6">
          <p className="text-sm text-muted-foreground">Seu caderno está vazio. Você terá que decidir sozinho o que vale registrar.</p>
        </div>
      )}
    </div>
  );
}

export function Case02Game({ character, difficulty, onBack }: { character: PlayerCharacter | null; difficulty: Difficulty; onBack: () => void }) {
  const [tab, setTab] = useState<Tab>("investigar");
  const [clues, setClues] = useState<string[]>([]);
  const [location, setLocation] = useState<(typeof LOCATIONS)[number] | null>(null);
  const [suspect, setSuspect] = useState<(typeof SUSPECTS)[number] | null>(null);
  const [asked, setAsked] = useState<string[]>([]);
  const [choice, setChoice] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [notes, setNotes] = useState<string[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

  const add = (id?: string) => {
    if (id && !clues.includes(id)) setClues((v) => [...v, id]);
  };
  const has = (id: string) => clues.includes(id);
  const evidence = useMemo(() => KEY_EVIDENCE.filter(has).length, [clues]);

  if (finished && choice) {
    const verdict = VERDICTS[choice] ?? VERDICTS["c2_elisa"]!;
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
    { id: "caderno", label: `Caderno (${notes.length})` },
    { id: "linha", label: "Linha do tempo" },
    { id: "concluir", label: "Conclusão" },
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary">{CASE.code}</p>
          <h1 className="text-2xl">{CASE.title}</h1>
          <p className="mt-1 text-xs text-muted-foreground">Nova investigação · {CASE.crewTotal} pessoas a bordo · Dificuldade {difficulty === "facil" ? "Fácil" : difficulty === "media" ? "Média" : "Difícil"}</p>
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
            <button className="text-xs text-muted-foreground underline" onClick={() => { setLocation(null); setSelectedSpot(null); }}>← Voltar</button>
            <div className="panel mt-3 overflow-hidden p-3 sm:p-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-2xl">{location.name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{location.description}</p>
                </div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary">Examine a cena</p>
              </div>

              <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-sm border border-primary/30 bg-black">
                <img src={location.image} alt={location.name} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 pointer-events-none" />
                {location.spots.map((spot, index) => {
                  if (!shouldShowInvestigationSpot(spot.id, index, difficulty)) return null;
                  const locked = !spot.requires || spot.requires.every((id) => clues.includes(id));
                  const done = !!spot.gives && has(spot.gives);
                  const radius = spot.radius ?? 5;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      aria-label="Examinar detalhe da cena"
                      disabled={!locked}
                      onClick={() => {
                        if (!locked) return;
                        setSelectedSpot(spot);
                        if (spot.gives) add(spot.gives);
                      }}
                      className="absolute rounded-full border border-transparent bg-transparent transition-all duration-200 hover:border-primary/80 hover:bg-primary/10 focus-visible:border-primary disabled:border-transparent disabled:bg-transparent"
                      style={{ left: `${spot.x}%`, top: `${spot.y}%`, width: `${radius * 2}%`, height: `${radius * 2}%`, transform: "translate(-50%, -50%)" }}
                    >
                      {done && <span className="absolute inset-1 rounded-full border border-primary/55 opacity-70" />}
                    </button>
                  );
                })}
                <div className="absolute bottom-3 left-3 rounded-sm border border-white/15 bg-black/65 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white/70 backdrop-blur-sm">
                  Clique onde quiser investigar
                </div>
              </div>

              {selectedSpot && (
                <div className="mt-4 rounded-sm border border-primary/35 bg-background/95 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-primary">Examinando</p>
                      <h3 className="text-display mt-1 text-xl">{selectedSpot.label}</h3>
                    </div>
                    <button type="button" className="text-xs text-muted-foreground underline" onClick={() => setSelectedSpot(null)}>Fechar</button>
                  </div>
                  {selectedSpot.gives ? (
                    <Case02ClueCard id={selectedSpot.gives} notes={notes} onAddNote={(note) => setNotes((v) => [...v, note])} />
                  ) : (
                    <p className="mt-4 border-t border-border/60 pt-4 text-sm text-muted-foreground">
                      {selectedSpot.flavor ?? "Nada conclusivo foi encontrado aqui."}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {LOCATIONS.map((l) => (
              <button key={l.id} className="panel p-5 text-left hover:border-primary" onClick={() => { setLocation(l); setSelectedSpot(null); }}>
                <h2 className="text-lg">{l.name}</h2>
                <p className="mt-1 text-xs uppercase tracking-wider text-primary">{l.subtitle}</p>
                <p className="mt-2 text-xs text-muted-foreground">{l.spots.filter((s) => s.gives && has(s.gives)).length}/{l.spots.filter((s) => s.gives).length} evidências encontradas</p>
              </button>
            ))}
          </div>
        ))}

        {tab === "interrogar" && (suspect ? (
          <div>
            <button className="text-xs text-muted-foreground underline" onClick={() => setSuspect(null)}>← Voltar aos interrogatórios</button>
            <div className="relative mt-3 min-h-[720px] overflow-hidden rounded-sm border border-primary/30 bg-black">
              <img src={LOCATIONS.find((l) => l.id === suspect.scene)?.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-background" />
              <div className="relative flex min-h-[720px] flex-col">
                <div className="flex-1 px-4 pb-5 pt-5 sm:px-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Interrogatório · {LOCATIONS.find((l) => l.id === suspect.scene)?.name ?? "A bordo"}</p>
                      <p className="mt-1 text-xs text-white/60">Observe a pessoa antes de escolher sua próxima pergunta.</p>
                    </div>
                    <span className="rounded-sm border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-wider text-white/70">{asked.filter((id) => id.startsWith(suspect.id + ":")).length} perguntas</span>
                  </div>

                  <div className="mx-auto mt-10 max-w-md">
                    <div className="relative">
                      <div className="absolute bottom-0 left-1/2 h-28 w-64 -translate-x-1/2 rounded-t-[45%] border border-primary/30 bg-black/50 shadow-2xl" />
                      <div className="relative flex min-h-[360px] items-end justify-center overflow-hidden rounded-sm border border-white/20 bg-black/30 p-5">
                        <img src={suspect.portrait} alt={suspect.name} className="h-[330px] w-full max-w-[260px] object-cover object-top drop-shadow-2xl" />
                      </div>
                    </div>
                    <div className="mt-3 rounded-sm border border-white/15 bg-black/65 px-5 py-4 backdrop-blur-sm">
                      <p className="text-xs uppercase tracking-[0.22em] text-primary">{suspect.role}</p>
                      <h2 className="mt-1 text-2xl text-white">{suspect.name}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">{suspect.profile}</p>
                    </div>
                  </div>

                  {asked.filter((id) => id.startsWith(suspect.id + ":")).length > 0 && (
                    <div className="mx-auto mt-6 max-h-44 max-w-xl overflow-y-auto rounded-sm border border-white/10 bg-black/55 p-4 backdrop-blur-sm">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-primary">Depoimento</p>
                      <div className="mt-3 space-y-4">
                        {asked.filter((id) => id.startsWith(suspect.id + ":")).map((key, index) => {
                          const qid = key.split(":")[1]; const q = suspect.questions.find((x) => x.id === qid)!;
                          return <div key={key} className="border-l border-primary/50 pl-3"><p className="text-xs text-white/50">Pergunta {index + 1}</p><p className="mt-1 text-sm text-primary">Você: {q.q}</p><p className="mt-1 text-sm leading-relaxed text-white/90">"{answerForDifficulty(q.a, difficulty)}"</p>{q.tell && <p className="mt-2 text-xs italic text-white/55">{q.tell}</p>}</div>;
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-white/15 bg-background/95 px-4 py-5 backdrop-blur-md sm:px-8">
                  <div className="mx-auto max-w-2xl">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-primary">O que você pergunta?</p>
                    <p className="mt-1 text-xs text-muted-foreground">Cada resposta pode abrir uma nova pergunta ou outro caminho.</p>
                    <div className="mt-4 grid gap-2">
                      {suspect.questions.filter((q) => {
                        const key = suspect.id + ":" + q.id;
                        const used = asked.includes(key);
                        const clueReady = !q.requires?.some((r) => !has(r));
                        const questionReady = (q.requiresQuestions ?? []).every((id) => asked.includes(suspect.id + ":" + id));
                        const specialtyReady = !q.specialty || q.specialty === character?.specialty;
                        return !used && clueReady && questionReady && specialtyReady;
                      }).map((q, index) => (
                        <button key={q.id} onClick={() => { setAsked((v) => [...v, suspect.id + ":" + q.id]); add(q.gives); }}
                          className="group rounded-sm border border-border bg-card px-4 py-3 text-left text-sm transition-all hover:border-primary hover:bg-primary/5">
                          <span className="mr-2 text-[10px] text-primary">[{String(index + 1).padStart(2, "0")}]</span>{q.q}
                          {(q.requiresQuestions?.length ?? 0) > 0 && <span className="mt-1 block text-[10px] uppercase tracking-wider text-muted-foreground">Pergunta de seguimento</span>}
                        </button>
                      ))}
                      <p className="pt-1 text-[10px] uppercase tracking-wider text-muted-foreground/70">Perguntas bloqueadas podem ser abertas ao investigar novas pistas ou seguir outro ramo da conversa.</p>
                    </div>
                  </div>
                </div>
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
