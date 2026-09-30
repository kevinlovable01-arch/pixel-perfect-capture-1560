import { useCallback, useEffect, useState } from "react";

export type Screen = "title" | "briefing" | "hub" | "verdict";

export type GameState = {
  started: boolean;
  screen: Screen;
  clues: string[];
  asked: string[];
  accused: string | null;
};

const STORAGE_KEY = "ultimo-temporal-save-v1";

const initialState: GameState = {
  started: false,
  screen: "title",
  clues: [],
  asked: [],
  accused: null,
};

export function useGame() {
  const [state, setState] = useState<GameState>(initialState);
  const [loaded, setLoaded] = useState(false);
  const [hasSave, setHasSave] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as GameState;
        setHasSave(parsed.started === true);
      }
    } catch {
      /* ignora */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded || !state.started) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignora */
    }
  }, [state, loaded]);

  const resume = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw) as GameState);
    } catch {
      /* ignora */
    }
  }, []);

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignora */
    }
    setHasSave(false);
    setState(initialState);
  }, []);

  const go = useCallback((screen: Screen) => {
    setState((s) => ({ ...s, started: true, screen }));
  }, []);

  const addClue = useCallback((id: string) => {
    let isNew = false;
    setState((s) => {
      if (s.clues.includes(id)) return s;
      isNew = true;
      return { ...s, clues: [...s.clues, id] };
    });
    return isNew;
  }, []);

  const markAsked = useCallback((id: string) => {
    setState((s) => (s.asked.includes(id) ? s : { ...s, asked: [...s.asked, id] }));
  }, []);

  const accuse = useCallback((id: string) => {
    setState((s) => ({ ...s, accused: id, screen: "verdict" }));
  }, []);

  const has = useCallback((id: string) => state.clues.includes(id), [state.clues]);
  const hasAll = useCallback(
    (ids?: string[]) => !ids || ids.every((i) => state.clues.includes(i)),
    [state.clues],
  );

  return { state, loaded, hasSave, resume, reset, go, addClue, markAsked, accuse, has, hasAll };
}
