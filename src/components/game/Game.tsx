import { useMemo, useState, type FormEvent } from "react";
import {
  CASE,
  CLUES,
  KEY_EVIDENCE,
  LOCATIONS,
  SUSPECTS,
  TIMELINE,
  VERDICTS,
  clueById,
  type Location,
  type Suspect,
} from "@/game/case01";
import { useGame, type PlayerCharacter } from "@/game/useGame";
import { Button } from "@/components/ui/button";
import { Case02Game } from "@/components/game/Case02Game";
import { Input } from "@/components/ui/input";
import coverAsset from "@/assets/veiloris-cover.png.asset.json";

type Tab = "investigar" | "interrogar" | "caderno" | "linha" | "concluir";

export function Game() {
  const game = useGame();
  const [selectedCase, setSelectedCase] = useState<0 | 1 | 2>(0);
  const { state } = game;

  if (selectedCase === 2) {
    return <Case02Game onBack={() => setSelectedCase(0)} />;
  }

  if (selectedCase === 0 && state.screen === "title" && game.loaded) {
    return (
      <TitleScreen
        hasSave={game.hasSave}
        onPlay={() => setSelectedCase(1)}
        onResume={() => game.resume()}
      />
    );
  }

  if (!game.loaded) return <div className="min-h-screen" />;

  if (state.screen === "title") {
    return (
      <CaseSelection
        hasSave={game.hasSave}
        onBack={() => setSelectedCase(0)}
        onCase1={() => { game.reset(); setSelectedCase(1); game.go("character"); }}
        onCase2={() => setSelectedCase(2)}
        onResume={() => game.resume()}
      />
    );
  }

  if (state.screen === "character") {
    return <CharacterCreation onComplete={game.setCharacter} onBack={() => game.go("title")} />;
  }

  if (state.screen === "briefing") {
    return <Briefing character={state.character} onStart={() => game.go("hub")} />;
  }

  if (state.screen === "verdict") {
    return <Verdict game={game} />;
  }

  return <Hub game={game} />;
}

/* ---------------------------------------------------------------- título */

function TitleScreen({ hasSave, onPlay, onResume }: { hasSave: boolean; onPlay: () => void; onResume: () => void }) {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto grid min-h-screen max-w-6xl lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="relative min-h-[68vh] overflow-hidden lg:min-h-screen">
          <img src={coverAsset.url} alt="VEILORIS — O mistério além do tempo" width={768} height={768} className="absolute inset-0 h-full w-full object-cover object-top" />
          <div className="title-vignette absolute inset-0" />
        </div>
        <div className="relative flex flex-col justify-center border-t border-primary/30 px-6 py-10 lg:border-l lg:border-t-0 lg:px-9">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Arquivo de mistérios</p>
          <h1 className="mt-2 text-4xl text-foreground">VEILORIS</h1>
          <p className="mt-3 text-sm italic leading-relaxed text-muted-foreground">Toda história esconde uma verdade. Você terá que encontrá-la.</p>
          <div className="mt-8 flex flex-col gap-3">
            <Button size="lg" className="w-full" onClick={onPlay}>Jogar</Button>
            {hasSave && <Button size="lg" variant="outline" className="w-full" onClick={onResume}>Continuar investigação</Button>}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">Escolha um caso, investigue, interrogue e tire suas próprias conclusões.</p>
        </div>
      </div>
    </main>
  );
}

function CaseSelection({ hasSave, onBack, onCase1, onCase2, onResume }: { hasSave: boolean; onBack: () => void; onCase1: () => void; onCase2: () => void; onResume: () => void }) {
  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <button className="text-xs text-muted-foreground underline underline-offset-4" onClick={onBack}>← Voltar</button>
        <p className="mt-10 text-xs uppercase tracking-[0.3em] text-primary">Arquivo de casos</p>
        <h1 className="mt-2 text-4xl sm:text-5xl">Escolha um mistério</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">Dois casos estão abertos. Cada um é uma investigação independente. Escolha onde sua investigação começa.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <button onClick={onCase1} className="panel group p-6 text-left transition-all hover:border-primary">
            <p className="text-[10px] uppercase tracking-[0.25em] text-primary">CASO 01</p>
            <h2 className="mt-2 text-2xl">O Último Temporal</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{CASE.premise}</p>
            <span className="mt-6 inline-block text-xs uppercase tracking-wider text-primary">Abrir arquivo →</span>
          </button>
          <button onClick={onCase2} className="panel group p-6 text-left transition-all hover:border-primary">
            <p className="text-[10px] uppercase tracking-[0.25em] text-primary">CASO 02</p>
            <h2 className="mt-2 text-2xl">A Última Fotografia</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Uma fotografia desaparece durante uma recepção privada. Um colecionador é encontrado inconsciente. O que parece um roubo pode esconder outra história.</p>
            <span className="mt-6 inline-block text-xs uppercase tracking-wider text-primary">Abrir arquivo →</span>
          </button>
        </div>
        {hasSave && <div className="panel mt-6 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm">Existe uma investigação em andamento.</p><p className="mt-1 text-xs text-muted-foreground">Você pode continuar exatamente de onde parou.</p></div><Button variant="outline" onClick={onResume}>Continuar investigação</Button></div>}
      </div>
    </main>
  );
}

/* ------------------------------------------------------- caracterização */

const PRONOUNS: PlayerCharacter["pronouns"][] = ["ela/dela", "ele/dele", "elu/delu"];
const SPECIALTIES: Array<{ value: PlayerCharacter["specialty"]; description: string }> = [
  { value: "Observação", description: "Percebe detalhes que passam despercebidos." },
  { value: "Dedução", description: "Conecta fatos e desmonta contradições." },
  { value: "Persuasão", description: "Consegue respostas onde há silêncio." },
];

function CharacterCreation({
  onComplete,
  onBack,
}: {
  onComplete: (character: PlayerCharacter) => void;
  onBack: () => void;
}) {
  const [name, setName] = useState("");
  const [pronouns, setPronouns] = useState<PlayerCharacter["pronouns"]>("ela/dela");
  const [specialty, setSpecialty] = useState<PlayerCharacter["specialty"]>("Observação");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) return;
    onComplete({ name: cleanName, pronouns, specialty });
  }

  return (
    <main className="character-screen min-h-screen px-4 py-10 sm:px-6 sm:py-16">
      <form onSubmit={submit} className="mx-auto max-w-2xl">
        <Button type="button" variant="ghost" size="sm" onClick={onBack}>
          ← Voltar
        </Button>
        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-primary">Arquivo do viajante</p>
        <h1 className="mt-2 text-4xl sm:text-5xl">Quem atravessa o véu?</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Toda investigação começa com uma identidade. Defina como seu nome será registrado nos
          arquivos de VEILORIS.
        </p>

        <div className="mt-10 border-y border-border py-7">
          <label htmlFor="character-name" className="text-display text-lg text-foreground">
            Nome do investigador
          </label>
          <Input
            id="character-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Digite seu nome"
            maxLength={32}
            autoFocus
            className="mt-3 h-12 bg-card/60 text-base"
          />
        </div>

        <fieldset className="mt-7">
          <legend className="text-display text-lg">Forma de tratamento</legend>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {PRONOUNS.map((value) => (
              <Button
                key={value}
                type="button"
                variant={pronouns === value ? "default" : "outline"}
                onClick={() => setPronouns(value)}
              >
                {value}
              </Button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-8">
          <legend className="text-display text-lg">Especialidade</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {SPECIALTIES.map((option) => (
              <Button
                key={option.value}
                type="button"
                variant="outline"
                onClick={() => setSpecialty(option.value)}
                className={`h-auto min-h-24 whitespace-normal px-4 py-4 text-left ${
                  specialty === option.value ? "border-primary bg-primary/10" : ""
                }`}
              >
                <span>
                  <strong className="text-display block text-base text-foreground">{option.value}</strong>
                  <span className="mt-1 block text-xs font-normal leading-relaxed text-muted-foreground">
                    {option.description}
                  </span>
                </span>
              </Button>
            ))}
          </div>
        </fieldset>

        <Button type="submit" size="lg" disabled={!name.trim()} className="mt-10 w-full sm:w-auto">
          Entrar em VEILORIS
        </Button>
      </form>
    </main>
  );
}

/* ------------------------------------------------------------- briefing */

function Briefing({ character, onStart }: { character: PlayerCharacter | null; onStart: () => void }) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-primary">{CASE.code}</p>
      <h1 className="mt-2 text-4xl">{CASE.title}</h1>
      {character && (
        <p className="mt-3 text-sm text-muted-foreground">
          Arquivo de <span className="text-foreground">{character.name}</span> · {character.specialty} · {character.pronouns}
        </p>
      )}

      <div className="panel mt-8 p-6">
        <h2 className="text-xl">Premissa</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{CASE.premise}</p>
        <h2 className="mt-6 text-xl">Cliente</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{CASE.client}</p>
      </div>

      <div className="panel mt-6 space-y-4 p-6">
        <Dialogue who="samuel" line="Vinte pessoas a bordo. Uma delas mente melhor que as outras." />
        <Dialogue who="adrian" line="Todas mentem. Só uma mente sobre o capitão." />
      </div>

      <Button className="mt-8" size="lg" onClick={onStart}>
        Começar
      </Button>
    </main>
  );
}

function Dialogue({ who, line }: { who: "adrian" | "samuel"; line: string }) {
  const name = who === "adrian" ? "Adrian Vale" : "Samuel Crowe";
  return (
    <p className="border-l-2 border-primary/60 pl-4 text-sm leading-relaxed">
      <span className="text-display block text-primary">{name}</span>
      <span className="text-muted-foreground italic">"{line}"</span>
    </p>
  );
}

/* ------------------------------------------------------------------ hub */

type GameApi = ReturnType<typeof useGame>;

function Hub({ game }: { game: GameApi }) {
  const [tab, setTab] = useState<Tab>("investigar");
  const [location, setLocation] = useState<Location | null>(null);
  const [suspect, setSuspect] = useState<Suspect | null>(null);

  const tabs: { id: Tab; label: string }[] = [
    { id: "investigar", label: "Investigar" },
    { id: "interrogar", label: "Interrogar" },
    { id: "caderno", label: `Caderno (${game.state.notes.length})` },
    { id: "linha", label: "Linha do tempo" },
    { id: "concluir", label: "Conclusão" },
  ];

  const revisits = useMemo(
    () =>
      CLUES.filter(
        (c) =>
          c.revisit &&
          game.has(c.id) &&
          game.has(c.revisit.requires) &&
          !game.has(c.revisit.gives),
      ),
    [game],
  );

  return (
    <main className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary">{CASE.code}</p>
          <h1 className="text-2xl">{CASE.title}</h1>
          {game.state.character && (
            <p className="mt-1 text-xs text-muted-foreground">
              {game.state.character.name} · {game.state.character.specialty}
            </p>
          )}
        </div>
        <button
          className="text-xs text-muted-foreground underline underline-offset-4"
          onClick={() => game.go("title")}
        >
          Menu
        </button>
      </header>

      <nav className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTab(t.id);
              setLocation(null);
              setSuspect(null);
            }}
            className={`rounded-sm border px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
              tab === t.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {revisits.length > 0 && (
        <div className="panel mt-6 border-primary/50 p-4">
          <p className="text-display text-primary">Nova informação descoberta</p>
          {revisits.map((c) => (
            <p key={c.id} className="mt-1 text-sm text-muted-foreground">
              Uma descoberta recente pode alterar o significado de uma pista anterior. Revisar:{" "}
              <span className="text-foreground">{c.title}</span> — em {c.source}.
            </p>
          ))}
        </div>
      )}

      <div className="mt-6">
        {tab === "investigar" &&
          (location ? (
            <LocationView game={game} location={location} onBack={() => setLocation(null)} />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {LOCATIONS.map((l) => (
                <button key={l.id} className="panel p-5 text-left" onClick={() => setLocation(l)}>
                  <h2 className="text-lg">{l.name}</h2>
                  <p className="mt-1 text-xs uppercase tracking-wider text-primary">{l.subtitle}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {l.spots.filter((s) => s.gives && game.has(s.gives)).length}/{l.spots.filter((s) => s.gives).length} pistas
                  </p>
                </button>
              ))}
            </div>
          ))}

        {tab === "interrogar" &&
          (suspect ? (
            <SuspectView game={game} suspect={suspect} onBack={() => setSuspect(null)} />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {SUSPECTS.map((s) => (
                <button key={s.id} className="panel p-5 text-left" onClick={() => setSuspect(s)}>
                  <h2 className="text-lg">{s.name}</h2>
                  <p className="mt-1 text-xs uppercase tracking-wider text-primary">{s.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{s.profile}</p>
                </button>
              ))}
            </div>
          ))}

        {tab === "caderno" && <Notebook game={game} />}
        {tab === "linha" && <Timeline game={game} />}
        {tab === "concluir" && <Conclusion game={game} />}
      </div>
    </main>
  );
}

/* ------------------------------------------------------------ investigar */

function LocationView({
  game,
  location,
  onBack,
}: {
  game: GameApi;
  location: Location;
  onBack: () => void;
}) {
  const [found, setFound] = useState<string | null>(null);

  const pendingRevisit = CLUES.filter(
    (c) =>
      c.revisit &&
      location.spots.some((s) => s.gives === c.id) &&
      game.has(c.id) &&
      game.has(c.revisit!.requires) &&
      !game.has(c.revisit!.gives),
  );

  return (
    <div>
      <button className="text-xs text-muted-foreground underline underline-offset-4" onClick={onBack}>
        ← Voltar
      </button>
      <div className="panel mt-3 p-6">
        <h2 className="text-2xl">{location.name}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{location.description}</p>

        <p className="mt-6 text-xs uppercase tracking-[0.25em] text-primary">Onde procurar?</p>
        <div className="mt-3 grid gap-2">
          {location.spots.map((spot) => {
            const locked = !game.hasAll(spot.requires);
            const done = !!spot.gives && game.has(spot.gives);
            return (
              <button
                key={spot.id}
                disabled={locked}
                onClick={() => {
                  if (!spot.gives) return;
                  game.addClue(spot.gives);
                  setFound(spot.gives);
                }}
                className={`flex items-center justify-between rounded-sm border px-4 py-3 text-left text-sm transition-colors ${
                  locked
                    ? "cursor-not-allowed border-border/60 text-muted-foreground/50"
                    : "border-border hover:border-primary"
                }`}
              >
                <span>
                  {spot.label}
                  <span className="block text-xs text-muted-foreground">
                    {locked ? "Você ainda não sabe o que procurar aqui." : (spot.flavor ?? "Examinar")}
                  </span>
                </span>
                {done && <span className="text-xs text-primary">examinado</span>}
              </button>
            );
          })}
        </div>

        {pendingRevisit.map((c) => (
          <div key={c.id} className="mt-4 rounded-sm border border-primary/50 p-4">
            <p className="text-display text-primary">Revisar: {c.title}</p>
            <Button
              size="sm"
              className="mt-3"
              onClick={() => {
                game.addClue(c.revisit!.gives);
                setFound(c.revisit!.gives);
              }}
            >
              Examinar novamente
            </Button>
          </div>
        ))}

        {found && <ClueCard id={found} game={game} />}
      </div>
    </div>
  );
}

function ClueCard({ id, game }: { id: string; game?: GameApi }) {
  const clue = clueById(id);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  return (
    <div className="dossier mt-6 p-5">
      <p className="text-[11px] uppercase tracking-[0.25em] opacity-60">Descoberta</p>
      <h3 className="text-display mt-1 text-xl">{clue.title}</h3>
      <p className="mt-2 text-sm leading-relaxed">{clue.text}</p>
      {game && (
        <div className="mt-5 border-t border-border/60 pt-4">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Seu caderno</p>
          <p className="mt-1 text-xs text-muted-foreground">A pista não será anotada automaticamente. Escreva o que você considera importante.</p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ex.: A porta não foi arrombada. Alguém entrou com permissão."
            className="mt-3 min-h-24 w-full rounded-sm border border-border bg-background p-3 text-sm outline-none focus:border-primary"
          />
          <Button size="sm" className="mt-2" disabled={!note.trim() || saved} onClick={() => { game.addNote(note); setSaved(true); setNote(""); }}>
            {saved ? "Anotação salva" : "Anotar no caderno"}
          </Button>
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------- interrogar */

function SuspectView({
  game,
  suspect,
  onBack,
}: {
  game: GameApi;
  suspect: Suspect;
  onBack: () => void;
}) {
  const [log, setLog] = useState<string[]>([]);
  const scene = LOCATIONS.find((l) => l.id === suspect.scene);

  const askedHere = log;
  const availableQuestions = suspect.questions.filter((q) => {
    const clueReady = game.hasAll(q.requires);
    const questionReady = (q.requiresQuestions ?? []).every((id) => askedHere.includes(id));
    return clueReady && questionReady && !askedHere.includes(q.id);
  });

  const hasLockedQuestions = suspect.questions.some((q) => {
    if (askedHere.includes(q.id)) return false;
    const clueReady = game.hasAll(q.requires);
    const questionReady = (q.requiresQuestions ?? []).every((id) => askedHere.includes(id));
    return !clueReady || !questionReady;
  });

  return (
    <div>
      <button className="text-xs text-muted-foreground underline underline-offset-4" onClick={onBack}>
        ← Voltar aos interrogatórios
      </button>

      <div className="relative mt-3 min-h-[720px] overflow-hidden rounded-sm border border-primary/30 bg-black">
        {scene && (
          <>
            <img
              src={scene.image}
              alt={scene.name}
              className="absolute inset-0 h-full w-full object-cover opacity-55"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-background" />
          </>
        )}

        <div className="relative flex min-h-[720px] flex-col">
          <div className="flex-1 px-4 pb-5 pt-5 sm:px-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Sala de interrogatório · {scene?.name ?? "A bordo"}</p>
                <p className="mt-1 text-xs text-white/60">A pessoa está diante de você. Observe antes de perguntar.</p>
              </div>
              <span className="rounded-sm border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-wider text-white/70">
                {log.length} perguntas feitas
              </span>
            </div>

            <div className="mx-auto mt-10 max-w-2xl">
              <div className="relative mx-auto max-w-md">
                <div className="absolute bottom-0 left-1/2 h-28 w-64 -translate-x-1/2 rounded-t-[45%] border border-primary/30 bg-black/50 shadow-2xl" />
                <div className="relative mx-auto flex min-h-[360px] items-end justify-center overflow-hidden rounded-sm border border-white/20 bg-black/30 p-5">
                  <img
                    src={suspect.portrait}
                    alt={suspect.name}
                    className="h-[330px] w-full max-w-[260px] object-cover object-top drop-shadow-2xl"
                  />
                </div>
              </div>

              <div className="mx-auto mt-3 max-w-xl rounded-sm border border-white/15 bg-black/65 px-5 py-4 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.22em] text-primary">{suspect.role}</p>
                <h2 className="mt-1 text-2xl text-white">{suspect.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{suspect.profile}</p>
              </div>
            </div>

            {log.length > 0 && (
              <div className="mx-auto mt-6 max-h-44 max-w-xl overflow-y-auto rounded-sm border border-white/10 bg-black/55 p-4 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary">Depoimento</p>
                <div className="mt-3 space-y-4">
                  {log.map((qid, index) => {
                    const q = suspect.questions.find((x) => x.id === qid);
                    if (!q) return null;
                    return (
                      <div key={qid} className="border-l border-primary/50 pl-3">
                        <p className="text-xs text-white/50">Pergunta {index + 1}</p>
                        <p className="mt-1 text-sm text-primary">Você: {q.q}</p>
                        <p className="mt-1 text-sm leading-relaxed text-white/90">"{q.a}"</p>
                        {q.tell && <p className="mt-2 text-xs italic text-white/55">{q.tell}</p>}
                        {q.aside && (
                          <p className="mt-2 text-xs italic text-white/55">
                            {q.aside.who === "adrian" ? "Adrian" : "Samuel"}: "{q.aside.line}"
                          </p>
                        )}
                        {q.gives && (
                          <p className="mt-2 text-[11px] uppercase tracking-wider text-primary">
                            Nova pista descoberta — não foi anotada automaticamente.
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-white/15 bg-background/95 px-4 py-5 backdrop-blur-md sm:px-8">
            <div className="mx-auto max-w-2xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-primary">O que você pergunta?</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Cada resposta pode abrir um novo caminho.
                  </p>
                </div>
                {availableQuestions.length > 0 && (
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {availableQuestions.length} caminho{availableQuestions.length === 1 ? "" : "s"} disponível{availableQuestions.length === 1 ? "" : "eis"}
                  </span>
                )}
              </div>

              <div className="mt-4 grid gap-2">
                {availableQuestions.map((q, index) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      setLog((l) => [...l, q.id]);
                      game.markAsked(`${suspect.id}:${q.id}`);
                      if (q.gives) game.addClue(q.gives);
                    }}
                    className="group rounded-sm border border-border bg-card px-4 py-3 text-left transition-all hover:border-primary hover:bg-primary/5"
                  >
                    <span className="mr-2 text-[10px] text-primary">[{String(index + 1).padStart(2, "0")}]</span>
                    <span className="text-sm">{q.q}</span>
                    {(q.requiresQuestions?.length ?? 0) > 0 && (
                      <span className="mt-1 block text-[10px] uppercase tracking-wider text-muted-foreground">
                        Pergunta de seguimento
                      </span>
                    )}
                  </button>
                ))}

                {availableQuestions.length === 0 && log.length === 0 && (
                  <p className="rounded-sm border border-border/60 px-4 py-4 text-sm text-muted-foreground">
                    Ainda não há perguntas liberadas. Investigue mais antes de iniciar este interrogatório.
                  </p>
                )}

                {availableQuestions.length === 0 && log.length > 0 && (
                  <p className="rounded-sm border border-border/60 px-4 py-4 text-sm text-muted-foreground">
                    Você esgotou as perguntas disponíveis por enquanto. Volte à investigação: novas pistas podem abrir outro caminho.
                  </p>
                )}

                {hasLockedQuestions && availableQuestions.length > 0 && (
                  <p className="pt-1 text-[10px] uppercase tracking-wider text-muted-foreground/70">
                    Existem outros caminhos ainda bloqueados por pistas ou respostas anteriores.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- caderno */

function Notebook({ game }: { game: GameApi }) {
  const [note, setNote] = useState("");
  return (
    <div>
      <div className="panel p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-primary">Caderno do investigador</p>
        <p className="mt-2 text-sm text-muted-foreground">Aqui ficam somente as anotações que você decidiu escrever. As descobertas do jogo não entram automaticamente.</p>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Escreva uma hipótese, conexão, horário ou detalhe..." className="mt-4 min-h-28 w-full rounded-sm border border-border bg-background p-3 text-sm outline-none focus:border-primary" />
        <Button className="mt-2" size="sm" disabled={!note.trim()} onClick={() => { game.addNote(note); setNote(""); }}>Adicionar anotação</Button>
      </div>
      <div className="mt-5 grid gap-3">
        {game.state.notes.length === 0 ? <p className="text-sm text-muted-foreground">Seu caderno está vazio.</p> : game.state.notes.map((n, i) => <div key={i} className="panel p-5"><p className="text-xs uppercase tracking-wider text-primary">Anotação {i + 1}</p><p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{n}</p></div>)}
      </div>
    </div>
  );
}

/* --------------------------------------------------------- linha tempo */

function Timeline({ game }: { game: GameApi }) {
  return (
    <div className="panel p-6">
      <h2 className="text-xl">Reconstrução dos acontecimentos</h2>
      <div className="mt-5 space-y-5 border-l border-border pl-5">
        {TIMELINE.map((e) => {
          const known = game.has(e.requires);
          return (
            <div key={e.time} className="relative">
              <span
                className={`absolute -left-[26px] top-1.5 h-2 w-2 rounded-full ${
                  known ? "bg-primary" : "bg-border"
                }`}
              />
              <p className="text-display text-lg text-primary">{e.time}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {known ? e.text : "Trecho desconhecido. Falta informação."}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ conclusão */

function Conclusion({ game }: { game: GameApi }) {
  const [choice, setChoice] = useState<string | null>(null);
  const evidence = KEY_EVIDENCE.filter((id) => game.has(id));

  return (
    <div className="panel p-6">
      <h2 className="text-xl">Quem é o infiltrado?</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Você entregará um nome ao cliente. Provas decisivas reunidas: {evidence.length} de{" "}
        {KEY_EVIDENCE.length}.
      </p>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {SUSPECTS.map((s) => (
          <button
            key={s.id}
            onClick={() => setChoice(s.id)}
            className={`rounded-sm border px-4 py-3 text-left text-sm transition-colors ${
              choice === s.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/60"
            }`}
          >
            {s.name}
            <span className="block text-xs text-muted-foreground">{s.role}</span>
          </button>
        ))}
      </div>

      <Button className="mt-6" size="lg" disabled={!choice} onClick={() => game.accuse(choice!)}>
        Entregar a conclusão
      </Button>
    </div>
  );
}

function Verdict({ game }: { game: GameApi }) {
  const accused = game.state.accused!;
  const verdict = VERDICTS[accused] ?? VERDICTS["daniel"]!;
  const correct = accused === "daniel";
  const complete = KEY_EVIDENCE.every((id) => game.has(id));

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-primary">Conclusão do caso</p>
      <h1 className="mt-2 text-4xl">{verdict.title}</h1>
      <div className="panel mt-6 p-6">
        <p className="text-sm leading-relaxed text-muted-foreground">{verdict.text}</p>
        <p className="mt-6 text-display text-lg text-primary">
          {correct
            ? complete
              ? "Caso encerrado com provas completas."
              : "Nome correto — mas sua conclusão se apoia mais em intuição que em provas."
            : "Conclusão equivocada."}
        </p>
        {!correct && (
          <p className="mt-2 text-sm text-muted-foreground italic">
            Samuel: "Ele mentiu. Só não era sobre isso."
          </p>
        )}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={() => game.go("hub")}>Voltar à investigação</Button>
        <Button
          variant="outline"
          onClick={() => {
            game.reset();
          }}
        >
          Recomeçar o caso
        </Button>
      </div>
    </main>
  );
}
