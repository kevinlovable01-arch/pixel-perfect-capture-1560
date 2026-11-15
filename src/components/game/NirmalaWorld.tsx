import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NIRMALA, NIRMALA_PEOPLE, NIRMALA_PLACES } from "@/game/nirmala-world";

export function NirmalaWorld() {
  const [tab, setTab] = useState<"places" | "people">("places");
  const [placeId, setPlaceId] = useState("estate");
  const [personId, setPersonId] = useState("bimo");
  const place = NIRMALA_PLACES.find((item) => item.id === placeId) ?? NIRMALA_PLACES[0];
  const person = NIRMALA_PEOPLE.find((item) => item.id === personId) ?? NIRMALA_PEOPLE[0];
  if (!place || !person) return null;

  return (
    <main className="min-h-screen bg-background pb-12">
      <header className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-8">
        <Button asChild variant="ghost" size="sm"><Link to="/"><ArrowLeft /> Arquivo de casos</Link></Button>
        <p className="text-xs uppercase text-primary">VEILORIS · Caso 02 · Arquivo preliminar</p>
      </header>
      <section className="relative h-[62svh] min-h-[360px] max-h-[690px] overflow-hidden">
        <img src={NIRMALA_PLACES[0]?.image} alt="Plantação Nirmala, entre os campos de especiarias e as montanhas de Java" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover" />
        <div className="nirmala-cover-shade absolute inset-0" />
        <div className="relative mx-auto flex h-full max-w-7xl items-end px-5 pb-8 sm:px-8 sm:pb-12">
          <div className="max-w-xl">
            <p className="text-xs uppercase text-primary">{NIRMALA.setting}</p>
            <h1 className="mt-3 text-4xl leading-tight sm:text-6xl">{NIRMALA.title}</h1>
            <p className="mt-4 text-sm leading-relaxed text-foreground sm:text-base">{NIRMALA.premise}</p>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <nav aria-label="Arquivo de Nirmala" className="flex gap-3 border-b border-border py-5">
          <Button variant={tab === "places" ? "default" : "ghost"} aria-pressed={tab === "places"} onClick={() => setTab("places")}><MapPin /> Lugares</Button>
          <Button variant={tab === "people" ? "default" : "ghost"} aria-pressed={tab === "people"} onClick={() => setTab("people")}><Users /> Pessoas</Button>
        </nav>
        {tab === "places" ? (
          <section className="mt-7 grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
            <div>
              <p className="mb-3 text-xs uppercase text-muted-foreground">A propriedade · 7 lugares</p>
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-1">
                {NIRMALA_PLACES.map((item, index) => <Button key={item.id} variant="ghost" aria-pressed={place.id === item.id} onClick={() => setPlaceId(item.id)} className={`h-auto min-h-16 justify-start whitespace-normal border-l-2 px-3 py-3 text-left ${place.id === item.id ? "border-primary bg-secondary" : "border-transparent"}`}><span className="text-xs text-primary">{String(index + 1).padStart(2, "0")}</span><span className="flex-1">{item.name}<span className="mt-1 block text-xs font-normal text-muted-foreground">{item.detail}</span></span>{place.id === item.id && <ArrowRight />}</Button>)}
              </div>
            </div>
            <div className="min-w-0" aria-live="polite">
              <img key={place.id} src={place.image} alt={place.name} loading="lazy" width={1536} height={1024} className="aspect-[3/2] w-full object-cover" />
              <p className="mt-5 text-xs uppercase text-primary">{place.detail}</p>
              <h2 className="mt-1 text-3xl">{place.name}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{place.description}</p>
            </div>
          </section>
        ) : (
          <section className="mt-7">
            <p className="mb-4 text-xs uppercase text-muted-foreground">Uma vítima · cinco pessoas a ouvir</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {NIRMALA_PEOPLE.map((item) => <Button key={item.id} variant="ghost" aria-pressed={person.id === item.id} onClick={() => setPersonId(item.id)} className={`group h-auto flex-col items-stretch gap-0 overflow-hidden whitespace-normal border p-0 text-left ${person.id === item.id ? "border-primary bg-secondary" : "border-border"}`}><img src={item.image} alt={item.name} loading="lazy" width={768} height={1024} className="aspect-[3/4] w-full object-cover" /><span className="p-3"><span className="block font-display text-xl">{item.name}</span><span className="mt-1 block text-xs font-normal text-muted-foreground">{item.role}</span></span></Button>)}
            </div>
            <div className="mt-8 grid gap-6 border-t border-border pt-7 sm:grid-cols-[minmax(0,260px)_minmax(0,1fr)]" aria-live="polite">
              <img src={person.image} alt={`Retrato de ${person.name}`} loading="lazy" width={768} height={1024} className="mx-auto aspect-[3/4] w-full max-w-[260px] object-cover" />
              <div className="self-center">
                <p className="text-xs uppercase text-primary">{person.role} · {person.age}</p>
                <h2 className="mt-2 text-4xl">{person.name}</h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{person.description}</p>
                <blockquote className="mt-6 max-w-xl border-l-2 border-primary pl-5 font-display text-2xl italic">“{person.quote}”</blockquote>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}