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
  type Spot,
} from "@/game/case01";
import { useGame, type PlayerCharacter } from "@/game/useGame";
import { Button } from "@/components/ui/button";
import { Case02Game } from "@/components/game/Case02Game";
import { Input } from "@/components/ui/input";
import { DIFFICULTIES, answerForDifficulty, shouldShowInvestigationSpot, type Difficulty } from "@/game/difficulty";
import coverAsset from "@/assets/veiloris-cover.png.asset.json";
import samuelDebate from "@/assets/samuel-debate.svg";
import samuelFullBody from "@/assets/samuel-crowe-fullbody.webp";
import adrianFullBody from "@/assets/adrian-vale-fullbody.webp";

type Tab = "investigar" | "interrogar" | "caderno" | "linha" | "concluir";

export function Game() {
  const game = useGame();
  const [selectedCase, setSelectedCase] = useState<0 | 1 | 2>(0);
  const [showCaseSelection, setShowCaseSelection] = useState(false);
  const { state } = game;

  if (selectedCase === 2 && state.screen === "hub") {
    return <Case02Game character={state.character} difficulty={state.difficulty} onBack={() => { setSelectedCase(0); game.go("title"); }} />;
  }

  if (!game.loaded) return <div className="min-h-screen" />;

  // Case selection must have priority over the title screen.
  // Otherwise the title is rendered again immediately after clicking "Jogar".
  if (showCaseSelection) {
    return (
      <CaseSelection
        hasSave={game.hasSave}
        onBack={() => setShowCaseSelection(false)}
        onCase1={() => {
          game.reset();
          setSelectedCase(1);
          setShowCaseSelection(false);
          game.go("character");
        }}
        onCase2={() => {
          game.reset();
          setSelectedCase(2);
          setShowCaseSelection(false);
          game.go("character");
        }}
        onResume={() => {
          setSelectedCase(1);
          setShowCaseSelection(false);
          game.resume();
        }}
      />
    );
  }

  if (selectedCase === 0 && state.screen === "title") {
    return (
      <TitleScreen
        hasSave={game.hasSave}
        onPlay={() => setShowCaseSelection(true)}
        onResume={() => {
          setSelectedCase(1);
          setShowCaseSelection(false);
          game.resume();
        }}
      />
    );
  }
  if (state.screen === "character") {
    return <CharacterCreation onComplete={(character) => { game.setCharacter(character); }} onBack={() => { setSelectedCase(0); game.go("title"); }} />;
  }

  if (state.screen === "difficulty") {
    return <DifficultySelection difficulty={state.difficulty} onComplete={(difficulty) => { game.setDifficulty(difficulty); if (selectedCase === 2) game.go("hub"); else game.go("briefing"); }} onBack={() => game.go("character")} />;
  }

  if (state.screen === "briefing") {
    return <Briefing character={state.character} onStart={() => game.go("hub")} />;
  }

  if (state.screen === "verdict") {
    return <Verdict game={game} />;
  }

  return <Hub game={game} onMenu={() => setSelectedCase(0)} />;
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

const INVESTIGATORS: Array<{ value: PlayerCharacter["specialty"]; name: string; role: string; description: string; quote: string }> = [
  {
    value: "Persuasão",
    name: "Adrian Vale",
    role: "O interrogador",
    description: "Lê hesitações, pressiona contradições e consegue respostas que outras pessoas não conseguem.",
    quote: "Uma pessoa pode esconder um fato. É muito mais difícil esconder uma história inteira.",
  },
  {
    value: "Observação",
    name: "Samuel Crowe",
    role: "O rastreador de pistas",
    description: "Percebe detalhes nos locais, reconstrói movimentos e encontra evidências onde ninguém procurou.",
    quote: "Todo lugar guarda alguma coisa. A questão é saber onde olhar.",
  },
];

function CharacterCreation({
  onComplete,
  onBack,
}: {
  onComplete: (character: PlayerCharacter) => void;
  onBack: () => void;
}) {
  const [selected, setSelected] = useState<PlayerCharacter["specialty"] | null>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    const investigator = INVESTIGATORS.find((item) => item.value === selected)!;
    onComplete({
      name: investigator.name,
      pronouns: investigator.value === "Persuasão" ? "ele/dele" : "ele/dele",
      specialty: investigator.value,
    });
  }

  return (
    <main className="character-screen min-h-screen px-4 py-10 sm:px-6 sm:py-16">
      <form onSubmit={submit} className="mx-auto max-w-3xl">
        <Button type="button" variant="ghost" size="sm" onClick={onBack}>← Voltar</Button>
        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-primary">Os dois investigadores</p>
        <h1 className="mt-2 text-4xl sm:text-5xl">Quem vai conduzir o caso?</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Adrian e Samuel cresceram juntos. Hoje trabalham em segredo para pessoas que não podem
          levar seus próprios problemas às autoridades. Cada um investiga de uma maneira diferente.
          Escolha apenas um para conduzir esta investigação.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {INVESTIGATORS.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setSelected(item.value)}
              className={`panel p-6 text-left transition-all hover:border-primary ${selected === item.value ? "border-primary bg-primary/10" : ""}`}
            >
              {item.value === "Persuasão" && (
                <div className="mb-5 flex h-64 items-end justify-center overflow-hidden rounded-sm border border-white/10 bg-black/20">
                  <img
                    src={adrianFullBody}
                    alt="Adrian Vale — interrogador"
                    className="h-full w-auto object-contain object-bottom drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              {item.value === "Observação" && (
                <div className="mb-5 flex h-64 items-end justify-center overflow-hidden rounded-sm border border-white/10 bg-black/20">
                  <img
                    src={samuelFullBody}
                    alt="Samuel Crowe — rastreador de pistas"
                    className="h-full w-auto object-contain object-bottom drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              <p className="text-[10px] uppercase tracking-[0.25em] text-primary">{item.role}</p>
              <h2 className="mt-2 text-3xl text-foreground">{item.name}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              <p className="mt-5 border-l-2 border-primary/50 pl-4 text-sm italic text-muted-foreground">“{item.quote}”</p>
            </button>
          ))}
        </div>

        {selected && (
          <div className="panel mt-6 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Escolha registrada</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {INVESTIGATORS.find((item) => item.value === selected)?.name} conduzirá este caso.
              O outro investigador continuará sendo seu parceiro nos bastidores.
            </p>
          </div>
        )}

        <Button type="submit" size="lg" disabled={!selected} className="mt-8 w-full sm:w-auto">
          Começar investigação
        </Button>
      </form>
    </main>
  );
}

function DifficultySelection({
  difficulty,
  onComplete,
  onBack,
}: {
  difficulty: Difficulty;
  onComplete: (difficulty: Difficulty) => void;
  onBack: () => void;
}) {
  const [selected, setSelected] = useState<Difficulty>(difficulty ?? "media");

  return (
    <main className="character-screen min-h-screen px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <Button type="button" variant="ghost" size="sm" onClick={onBack}>← Voltar</Button>
        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-primary">Nível da investigação</p>
        <h1 className="mt-2 text-4xl sm:text-5xl">Quanto você quer que o caso esconda?</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          A dificuldade muda o comportamento das pessoas e a quantidade de pistas que permanecem visíveis.
          A verdade do caso não muda: o que muda é quanto trabalho você terá para encontrá-la.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {(Object.keys(DIFFICULTIES) as Difficulty[]).map((level) => {
            const item = DIFFICULTIES[level];
            return (
              <button
                key={level}
                type="button"
                onClick={() => setSelected(level)}
                className={`panel p-6 text-left transition-all hover:border-primary ${selected === level ? "border-primary bg-primary/10" : ""}`}
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary">{item.label}</p>
                <h2 className="mt-2 text-2xl">{item.subtitle}</h2>
                <p className="mt-5 text-xs uppercase tracking-wider text-primary">Interrogatório</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.interrogation}</p>
                <p className="mt-5 text-xs uppercase tracking-wider text-primary">Investigação</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.investigation}</p>
              </button>
            );
          })}
        </div>

        <div className="panel mt-6 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Dificuldade escolhida</p>
          <p className="mt-2 text-sm text-muted-foreground">{DIFFICULTIES[selected].label}: {DIFFICULTIES[selected].subtitle}</p>
        </div>

        <Button size="lg" className="mt-8 w-full sm:w-auto" onClick={() => onComplete(selected)}>
          Confirmar dificuldade
        </Button>
      </div>
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

function Hub({ game, onMenu }: { game: GameApi; onMenu?: () => void }) {
  const canInvestigate = game.state.character?.specialty === "Observação";
  const canInterrogate = game.state.character?.specialty === "Persuasão";
  const [tab, setTab] = useState<Tab>(canInvestigate ? "investigar" : "interrogar");
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
              {game.state.character.name} · {game.state.character.specialty} · {game.state.difficulty === "facil" ? "Fácil" : game.state.difficulty === "media" ? "Média" : "Difícil"}
            </p>
          )}
        </div>
        <button
          className="text-xs text-muted-foreground underline underline-offset-4"
          onClick={() => { onMenu?.(); game.reset(); }}
        >
          Menu
        </button>
      </header>

      <nav className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const locked =
            (t.id === "investigar" && !canInvestigate) ||
            (t.id === "interrogar" && !canInterrogate);
          return (
            <button
              key={t.id}
              disabled={locked}
              onClick={() => {
                if (locked) return;
                setTab(t.id);
                setLocation(null);
                setSuspect(null);
              }}
              title={
                locked
                  ? canInvestigate
                    ? "Bloqueado: esta investigação é conduzida por Samuel."
                    : "Bloqueado: esta investigação é conduzida por Adrian."
                  : undefined
              }
              className={`rounded-sm border px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                locked
                  ? "cursor-not-allowed border-border/50 text-muted-foreground/35"
                  : tab === t.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
              }`}
            >
              {locked ? "🔒 " : ""}{t.label}
            </button>
          );
        })}
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
              {canInvestigate ? LOCATIONS.map((l) => (
                <button key={l.id} className="panel p-5 text-left hover:border-primary" onClick={() => setLocation(l)}>
                  <h2 className="text-lg">{l.name}</h2>
                  <p className="mt-1 text-xs uppercase tracking-wider text-primary">{l.subtitle}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {l.spots.filter((s) => s.gives && game.has(s.gives)).length}/{l.spots.filter((s) => s.gives).length} pistas
                  </p>
                </button>
              )) : (
                <LockedMode
                  title="Investigação visual bloqueada"
                  text="Você escolheu Adrian Vale. A busca física por pistas fica com Samuel Crowe. Você só pode avançar por interrogatórios."
                />
              )}
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
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [found, setFound] = useState<string | null>(null);

  const visibleSpots = location.spots.filter((spot, index) =>
    shouldShowInvestigationSpot(spot.id, index, game.state.difficulty),
  );

  const examine = (spot: Spot) => {
    if (!game.hasAll(spot.requires)) return;

    let clueId = spot.gives;
    if (spot.gives) {
      const clue = clueById(spot.gives);
      if (clue.revisit && game.has(clue.revisit.requires) && !game.has(clue.revisit.gives)) {
        clueId = clue.revisit.gives;
      }
      if (clueId && !game.has(clueId)) game.addClue(clueId);
    }

    setSelectedSpot(spot);
    setFound(clueId ?? null);
  };

  const selectedClue = found ? clueById(found) : null;
  const selectedBaseClue = selectedSpot?.gives ? clueById(selectedSpot.gives) : null;
  const locked = selectedSpot ? !game.hasAll(selectedSpot.requires) : false;

  return (
    <div>
      <button className="text-xs text-muted-foreground underline underline-offset-4" onClick={onBack}>
        ← Voltar
      </button>

      <div className="panel mt-3 overflow-hidden p-3 sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl">{location.name}</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{location.description}</p>
          </div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-primary">
            Examine a cena
          </p>
        </div>

        <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-sm border border-primary/30 bg-black">
          <img src={location.image} alt={location.name} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 pointer-events-none" />

          {visibleSpots.map((spot) => {
            const isDone = !!spot.gives && game.has(spot.gives);
            const isLocked = !game.hasAll(spot.requires);
            const radius = spot.radius ?? 5;
            return (
              <button
                key={spot.id}
                type="button"
                aria-label="Examinar detalhe da cena"
                disabled={isLocked}
                onClick={() => examine(spot)}
                className="absolute rounded-full border border-transparent bg-transparent transition-all duration-200 hover:border-primary/80 hover:bg-primary/10 focus-visible:border-primary focus-visible:bg-primary/15 disabled:cursor-default disabled:border-transparent disabled:bg-transparent"
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  width: `${radius * 2}%`,
                  height: `${radius * 2}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {isDone && (
                  <span className="absolute inset-1 rounded-full border border-primary/55 opacity-70" />
                )}
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
              <button
                type="button"
                className="text-xs text-muted-foreground underline"
                onClick={() => { setSelectedSpot(null); setFound(null); }}
              >
                Fechar
              </button>
            </div>

            {locked ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Ainda não há contexto suficiente para interpretar este detalhe.
              </p>
            ) : selectedClue ? (
              <ClueCard id={selectedClue.id} game={game} />
            ) : (
              <div className="mt-4 border-t border-border/60 pt-4">
                <p className="text-sm text-muted-foreground">
                  {selectedSpot.flavor ?? "Nada conclusivo foi encontrado aqui."}
                </p>
                {selectedBaseClue?.revisit && game.has(selectedBaseClue.revisit.requires) && (
                  <p className="mt-3 text-xs uppercase tracking-wider text-primary">
                    Este detalhe merece uma nova leitura.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
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
    const specialtyReady = !q.specialty || q.specialty === game.state.character?.specialty;
    return clueReady && questionReady && specialtyReady && !askedHere.includes(q.id);
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
                <p className="mt-1 text-xs text-white/60">{game.state.character?.specialty === "Persuasão" ? "Você percebe hesitações e pode pressionar contradições." : "Você observa detalhes que podem abrir caminhos que outros não percebem."}</p>
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
                        <p className="mt-1 text-sm leading-relaxed text-white/90">"{answerForDifficulty(q.a, game.state.difficulty)}"</p>
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

function LockedMode({ title, text }: { title: string; text: string }) {
  return (
    <div className="panel col-span-full flex min-h-56 flex-col items-center justify-center p-8 text-center opacity-75">
      <div className="text-3xl">🔒</div>
      <p className="mt-4 text-xs uppercase tracking-[0.25em] text-primary">{title}</p>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

function Conclusion({ game }: { game: GameApi }) {
  type DebateStep = "arrival" | "evidence" | "connection" | "candidates";
  const [step, setStep] = useState<DebateStep>("arrival");
  const [debateScore, setDebateScore] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [debateSceneId, setDebateSceneId] = useState<string | null>(null);

  const evidence = KEY_EVIDENCE.filter((id) => game.has(id));
  const completeEvidence = evidence.length === KEY_EVIDENCE.length;
  const debateSceneIds = ["conves", "registros", "ignicao", "porao", "cozinha", "navegacao"];
  const debateScenes = debateSceneIds
    .map((id) => LOCATIONS.find((location) => location.id === id))
    .filter(Boolean) as Location[];
  const scene = debateScenes.find((location) => location.id === debateSceneId) ?? debateScenes[0] ?? LOCATIONS[0]!;

  const advance = (correct: boolean) => {
    if (correct) setDebateScore((score) => score + 1);
    setStep((current) =>
      current === "arrival" ? "evidence" : current === "evidence" ? "connection" : "candidates",
    );
  };

  if (step === "arrival") {
    return (
      <div className="relative min-h-[680px] overflow-hidden rounded-sm border border-primary/30 bg-black" style={{ animation: "veilFade .45s ease-out both" }}>
        <style>{`@keyframes veilFade { from { opacity: 0; transform: scale(.985); } to { opacity: 1; transform: scale(1); } }`}</style>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-black" />
        <div className="relative flex min-h-[680px] flex-col p-5 sm:p-8">
          <div className="mx-auto w-full max-w-4xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Conselho dos dois</p>
            <h2 className="mt-2 text-3xl sm:text-4xl">Onde vocês vão juntar as peças?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Adrian e Samuel deixam o resto da tripulação para trás. Você escolhe o lugar onde a conversa acontece.
              O cenário não muda as provas — muda a atmosfera em que vocês vão reconstruir o caso.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {debateScenes.map((location) => (
                <button
                  key={location.id}
                  type="button"
                  onClick={() => setDebateSceneId(location.id)}
                  className={`group overflow-hidden rounded-sm border text-left transition-all ${debateSceneId === location.id ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/60"}`}
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={location.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <p className="absolute bottom-3 left-3 text-sm font-medium text-white">{location.name}</p>
                  </div>
                  <p className="px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-primary">{location.subtitle}</p>
                </button>
              ))}
            </div>

            {debateSceneId && (
              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-primary">Local escolhido</p>
                  <p className="mt-1 text-sm text-foreground">{scene.name}</p>
                </div>
                <Button size="lg" onClick={() => setStep("evidence")}>Entrar na cena e começar</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (step === "evidence") {
    const partnerHint = game.state.character?.specialty === "Observação"
      ? "Adrian coloca os depoimentos sobre a mesa. Ele lembra que algumas respostas pareciam convincentes, mas não explicavam o horário do confronto."
      : "Samuel abre o caderno sobre a mesa. Ele lembra onde encontrou cada detalhe e quais marcas não combinavam com a história contada pela tripulação.";

    return (
      <DebateScene
        scene={scene}
        speaker={game.state.character?.specialty === "Observação" ? "Adrian Vale" : "Samuel Crowe"}
        line={partnerHint}
        options={[
          { label: "Separar o que foi visto do que foi apenas dito.", correct: true },
          { label: "Começar pelo suspeito que mais parecia ter motivo.", correct: false },
        ]}
        onChoose={advance}
      />
    );
  }

  if (step === "connection") {
    return (
      <DebateScene
        scene={scene}
        speaker={game.state.character?.specialty === "Observação" ? "Adrian Vale" : "Samuel Crowe"}
        line={completeEvidence
          ? "Os horários, o acesso e as inconsistências formam uma sequência. Agora precisamos decidir qual conexão realmente fecha o caso."
          : "Eu trouxe as peças que você não conseguiu ver. Agora precisamos separar a hipótese da conexão que realmente fecha o caso."}
        options={[
          { label: "Cruzar horários, acesso e as pistas decisivas.", correct: true },
          { label: "Escolher quem tinha o motivo mais óbvio.", correct: false },
        ]}
        onChoose={advance}
      />
    );
  }

  const cleanDebate = debateScore >= 2;
  const candidates = cleanDebate
    ? ["daniel", "marcus"]
    : debateScore >= 1
      ? ["marcus", "rowan"]
      : ["hugo", "tobias"];
  const candidatePeople = candidates.map((id) => SUSPECTS.find((s) => s.id === id)).filter(Boolean) as Suspect[];

  return (
    <div className="relative min-h-[680px] overflow-hidden rounded-sm border border-primary/30 bg-black" style={{ animation: "veilFade .45s ease-out both" }}>
      <style>{`@keyframes veilFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <img src={scene.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/55 to-background" />
      <div className="relative flex min-h-[680px] flex-col p-5 sm:p-8">
        <div className="mx-auto w-full max-w-4xl">
          <DebateCharacters speaker={null} />
          <div className="mt-2 rounded-sm border border-white/15 bg-black/75 p-5 backdrop-blur-sm">
            <p className="text-[10px] uppercase tracking-[0.25em] text-primary">Debate encerrado</p>
            <h2 className="mt-2 text-3xl text-white">Dois nomes ficaram de pé.</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65">
              Vocês podem estar certos. Também podem ter construído uma leitura errada.
              O jogo não vai corrigir vocês antes da escolha.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {candidatePeople.map((s) => (
              <button
                key={s.id}
                onClick={() => setChoice(s.id)}
                className={`rounded-sm border border-white/15 bg-black/65 p-5 text-left text-white transition-all hover:border-primary ${choice === s.id ? "border-primary bg-primary/10" : ""}`}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-primary">{s.role}</p>
                <h3 className="mt-1 text-xl">{s.name}</h3>
                <p className="mt-2 text-xs text-white/55">Hipótese formada durante o debate.</p>
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
            <p className="text-xs text-white/50">Pistas decisivas: {evidence.length}/{KEY_EVIDENCE.length} · Debate consistente: {debateScore}/2</p>
            <Button size="lg" disabled={!choice} onClick={() => game.accuse(choice!)}>Escolher este nome</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DebateCharacters({ speaker }: { speaker: "Adrian Vale" | "Samuel Crowe" | null }) {
  return (
    <div
      className="relative mx-auto h-[430px] max-w-4xl overflow-hidden rounded-sm"
      style={{ perspective: "1200px" }}
    >
      {/* The scene behind this component remains the actual location image.
          Characters are transparent cutouts: no artificial black card, no fake room,
          no second table. This makes them inherit the scene's light and atmosphere. */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-5 left-[14%] h-7 w-[30%] rounded-[50%] bg-black/45 blur-xl pointer-events-none" />
      <div className="absolute bottom-5 right-[14%] h-7 w-[30%] rounded-[50%] bg-black/45 blur-xl pointer-events-none" />

      <div
        className={`absolute bottom-[-34px] left-[0%] w-[55%] max-w-[410px] origin-bottom transition-all duration-500 ${speaker === "Adrian Vale" ? "-translate-y-3 scale-[1.025] brightness-110" : "brightness-[.94]"}`}
        style={{ filter: "drop-shadow(0 18px 18px rgba(0,0,0,.58)) saturate(.88) contrast(1.04)" }}
      >
        <img src={adrianDebate} alt="Adrian Vale" className="block w-full h-auto" />
      </div>

      <div
        className={`absolute bottom-[-34px] right-[0%] w-[55%] max-w-[410px] origin-bottom transition-all duration-500 ${speaker === "Samuel Crowe" ? "-translate-y-3 scale-[1.025] brightness-110" : "brightness-[.94]"}`}
        style={{ filter: "drop-shadow(0 18px 18px rgba(0,0,0,.58)) saturate(.88) contrast(1.04)" }}
      >
        <img src={samuelDebate} alt="Samuel Crowe" className="block w-full h-auto" />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/10 via-transparent to-black/15 mix-blend-multiply" />
      <div className="absolute inset-x-0 bottom-0 pointer-events-none border-b border-white/10" />
    </div>
  );
}

function DebateScene({
  scene,
  speaker,
  line,
  options,
  onChoose,
}: {
  scene: Location;
  speaker: string;
  line: string;
  options: Array<{ label: string; correct: boolean }>;
  onChoose: (correct: boolean) => void;
}) {
  return (
    <div className="relative min-h-[680px] overflow-hidden rounded-sm border border-primary/30 bg-black" style={{ animation: "veilFade .45s ease-out both" }}>
      <style>{`@keyframes veilFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <img src={scene.image} alt={scene.name} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-background/95" />
      <div className="relative flex min-h-[680px] flex-col justify-end p-4 sm:p-8">
        <div className="mx-auto w-full max-w-4xl">
          <DebateCharacters speaker={speaker as "Adrian Vale" | "Samuel Crowe" | null} />
          <div className="relative z-10 mt-[-22px] rounded-sm border border-white/15 bg-black/80 p-5 shadow-2xl backdrop-blur-md">
            <p className="text-[10px] uppercase tracking-[0.25em] text-primary">{speaker}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/90">"{line}"</p>
            <div className="mt-4 grid gap-2">
              {options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => onChoose(option.correct)}
                  className="rounded-sm border border-white/15 bg-black/65 px-4 py-3 text-left text-sm text-white transition-all hover:border-primary hover:bg-primary/10"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
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
            window.location.reload();
          }}
        >
          Recomeçar o caso
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            game.reset();
            window.location.reload();
          }}
        >
          Voltar ao menu
        </Button>
      </div>
    </main>
  );
}
