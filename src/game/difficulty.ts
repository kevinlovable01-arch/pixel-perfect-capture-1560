export type Difficulty = "facil" | "media" | "dificil";

export const DIFFICULTIES: Record<Difficulty, {
  label: string;
  subtitle: string;
  interrogation: string;
  investigation: string;
}> = {
  facil: {
    label: "Fácil",
    subtitle: "Para conhecer o método dos dois investigadores.",
    interrogation: "As pessoas costumam dizer a verdade e têm dificuldade para sustentar uma versão falsa.",
    investigation: "O culpado foi desleixado. Há muitas pistas visíveis e vários caminhos para reconstruir o crime.",
  },
  media: {
    label: "Média",
    subtitle: "As pessoas sabem escolher as próprias palavras.",
    interrogation: "As pessoas tendem a dizer a verdade, mas respondem com cautela e podem conduzir você para uma pergunta equivocada.",
    investigation: "O culpado tentou apagar seus rastros. Algumas pistas permanecem, mas você precisa conectá-las.",
  },
  dificil: {
    label: "Difícil",
    subtitle: "Quase nada vem de graça.",
    interrogation: "As pessoas omitem fatos importantes e evitam respostas completas. Elas não podem inventar uma mentira impossível de refutar.",
    investigation: "O culpado foi cuidadoso. Poucas pistas permanecem e a solução depende de seguir a cadeia correta de evidências.",
  },
};

export const DIFFICULTY_ORDER: Difficulty[] = ["facil", "media", "dificil"];

function firstSentence(text: string) {
  const match = text.match(/^(.+?[.!?])(?:\s|$)/);
  return match?.[1] ?? text;
}

function firstClause(text: string) {
  const parts = text.split(/[,;:]/);
  return parts[0].trim() + (parts.length > 1 ? "." : "");
}

/**
 * Respostas permanecem verdadeiras em todas as dificuldades.
 * A diferença está na quantidade de informação que a pessoa entrega.
 */
export function answerForDifficulty(text: string, difficulty: Difficulty) {
  if (difficulty === "facil") return text;

  if (difficulty === "media") {
    const sentence = firstSentence(text);
    if (sentence === text) return text;
    return sentence + " É o que consigo afirmar com segurança.";
  }

  const sentence = firstSentence(text);
  const clause = firstClause(sentence);
  if (clause.length < 12 || clause === sentence) return sentence;
  return clause + " Não vou entrar em detalhes além disso.";
}

/**
 * Densidade de pistas para o investigador de Observação.
 * A pista decisiva nunca é removida da investigação: no difícil ela exige
 * seguir a cadeia de investigação para ficar visível.
 */
export function shouldShowInvestigationSpot(
  spotId: string,
  index: number,
  difficulty: Difficulty,
) {
  if (difficulty === "facil") return true;

  const mediumHidden = new Set([
    "lampiao", "mar", "escotilha", "fogao", "raspadeira", "rede", "janela", "cama", "corpo", "porta", "costado", "mapa", "caixas",
  ]);

  const hardHidden = new Set([
    "corpo", "janela", "cama", "lampiao", "mar", "escotilha", "fogao", "raspadeira",
    "rede", "costado", "corpo", "porta", "janela", "cama", "moldura", "chaves", "lacre", "diario", "mapa", "caixas", "mesa",
  ]);

  if (difficulty === "media") return !mediumHidden.has(spotId);

  // No difícil, pontos-chave continuam disponíveis, mas pontos de ambientação
  // e evidências secundárias desaparecem até que a cadeia correta os revele.
  const hardCore = new Set([
    "vela", "mesa", "livro", "estantes", "ferragens", "cartas", "calculos",
    "prateleira", "lanterna", "lacres", "moldura", "lacre", "diario", "chaves", "lista", "mesa",
  ]);
  return hardCore.has(spotId) || index === 0;
}

export function difficultyLabel(difficulty: Difficulty) {
  return DIFFICULTIES[difficulty].label;
}
