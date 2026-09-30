export type Clue = {
  id: string;
  title: string;
  text: string;
  source: string;
  /** Nova leitura da mesma pista, liberada quando outra pista é descoberta. */
  revisit?: { requires: string; gives: string };
};

export type Spot = {
  id: string;
  label: string;
  hint: string;
  gives: string;
  requires?: string[];
};

export type Location = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  spots: Spot[];
  requires?: string;
};

export type Question = {
  id: string;
  q: string;
  a: string;
  aside?: { who: "adrian" | "samuel"; line: string };
  gives?: string;
  requires?: string[];
};

export type Suspect = {
  id: string;
  name: string;
  role: string;
  profile: string;
  questions: Question[];
};

export const CASE = {
  code: "CASO 01",
  title: "O Último Temporal",
  premise:
    "Um navio pirata atravessa uma região de tempestades violentas. A bordo, vinte pessoas. Durante o temporal, o capitão Elias Vane é encontrado morto dentro da própria cabine. A primeira hipótese é um ataque de outro navio. Mas nenhum navio deveria ter conseguido chegar perto.",
  client:
    "Contratados antes da viagem pelo próprio Elias Vane: ele suspeitava que havia um infiltrado entre a tripulação.",
};

export const CLUES: Clue[] = [
  {
    id: "corpo",
    title: "O corpo de Elias Vane",
    text: "Ferimento único na cabeça, provocado por um objeto pesado e curto. Não há sinais de uma luta longa. Elias estava de pé quando foi atingido, de frente para quem o atingiu.",
    source: "Cabine do capitão",
  },
  {
    id: "vela",
    title: "A vela apagada",
    text: "A vela sobre a mesa está apagada, mas ainda morna, e a cera escorreu para um só lado. Ninguém da tripulação mencionou isso. Adrian foi o primeiro a registrar.",
    source: "Cabine do capitão",
  },
  {
    id: "porta",
    title: "Porta sem arrombamento",
    text: "A fechadura está intacta. Quem entrou, entrou porque foi recebido ou porque tinha permissão.",
    source: "Cabine do capitão",
  },
  {
    id: "papel",
    title: "Pedaço de papel",
    text: "Um fragmento rasgado, com números anotados às pressas pela letra de Elias. Fora de contexto, não significa nada.",
    source: "Cabine do capitão",
    revisit: { requires: "registros", gives: "sequencia" },
  },
  {
    id: "sequencia",
    title: "A sequência",
    text: "1 — 6 — 3 — 1 — 2 — 3 — 2 — 4 — 2 — 1 — 1 — 5. O papel foi arrancado de um documento maior: a numeração corresponde ao sistema de registros de Miriam Locke. Elias estava marcando entradas específicas.",
    source: "Revisão — cabine do capitão",
  },
  {
    id: "corda",
    title: "Corda molhada",
    text: "Uma corda molhada, largada perto da escada interna. Não é o lugar dela.",
    source: "Corredor interno",
  },
  {
    id: "luz",
    title: "A luz no mar",
    text: "Hugo Black, o vigia, afirma ter visto uma luz durante o pior momento do temporal. Foi o que fez todos falarem de ataque.",
    source: "Posto do vigia",
  },
  {
    id: "som",
    title: "O som do disparo",
    text: "Vários tripulantes ouviram um estouro seco. Um objeto metálico solto batendo na estrutura produz exatamente o mesmo som sob vento forte.",
    source: "Convés",
  },
  {
    id: "posicao",
    title: "A posição real do navio",
    text: "Com o vento e as pedras daquele trecho, aproximar outro navio seria praticamente impossível. Um ataque externo é improvável.",
    source: "Sala de navegação",
  },
  {
    id: "rota",
    title: "Alteração na rota",
    text: "Os cálculos de rota foram corrigidos à mão, depois refeitos. Helena Graves mudou o caminho e não registrou.",
    source: "Sala de navegação",
  },
  {
    id: "sem_vestigios",
    title: "Nenhum vestígio externo",
    text: "Nenhuma marca de abordagem, nenhum destroço, nenhum ferimento de arma de fogo. Se houve ataque, ele não tocou o navio.",
    source: "Convés",
  },
  {
    id: "marcus_discussao",
    title: "A discussão de Marcus",
    text: "Marcus Rook discutiu com Elias dias antes. Queria afastar parte da tripulação. Elias recusou.",
    source: "Interrogatório — Marcus Rook",
  },
  {
    id: "marcus_carga",
    title: "Irregularidades na carga",
    text: "Marcus havia descoberto que parte da carga não correspondia ao declarado. Pretendia resolver sozinho, por isso mentiu sobre a discussão.",
    source: "Interrogatório — Marcus Rook",
  },
  {
    id: "tobias_horario",
    title: "O horário de Tobias",
    text: "Tobias diz que ficou na cozinha durante todo o temporal. Duas pessoas passaram por lá e não o viram.",
    source: "Interrogatório — Tobias Flint",
  },
  {
    id: "tobias_garrafas",
    title: "As garrafas que faltam",
    text: "Tobias desviava bebida em pequenas quantidades e vendia em terra. Saiu da cozinha para esconder o estoque. É por isso que mentiu.",
    source: "Cozinha",
  },
  {
    id: "rowan_area",
    title: "Rowan onde não devia",
    text: "Rowan Pike foi visto num setor restrito no meio do temporal, com ferramentas na mão.",
    source: "Interrogatório — Rowan Pike",
  },
  {
    id: "rowan_reparo",
    title: "O reparo escondido",
    text: "Rowan consertava às escondidas uma peça da estrutura que havia rachado sob sua responsabilidade. Temia ser culpado pela falha.",
    source: "Interrogatório — Rowan Pike",
  },
  {
    id: "registros",
    title: "O sistema de registros",
    text: "Miriam Locke mantém tudo numerado: turnos, entradas, movimentações. Cada número corresponde a uma linha de registro.",
    source: "Sala de registros",
  },
  {
    id: "registro_alterado",
    title: "Registro alterado às 17:42",
    text: "Uma entrada de turno foi raspada e reescrita. A alteração esconde a movimentação de uma pessoa entre 17:40 e 18:00.",
    source: "Sala de registros",
  },
  {
    id: "daniel_chamado",
    title: "Daniel foi chamado",
    text: "Às 17:05, Elias chamou o aprendiz Daniel Cross à cabine, discretamente. Daniel saiu vivo dali, e Elias também.",
    source: "Interrogatório — Miriam Locke",
  },
  {
    id: "daniel_vela",
    title: "\"A vela estava apagada\"",
    text: "Daniel comenta, de passagem, que a vela da cabine estava apagada. Ninguém contou isso a ele. A vela só foi descrita quando Adrian examinou a cabine.",
    source: "Interrogatório — Daniel Cross",
  },
  {
    id: "daniel_rotinas",
    title: "Rotinas que ele não deveria saber",
    text: "Daniel conhece horários de troca de turno e compartimentos que um aprendiz recém-embarcado não teria como conhecer.",
    source: "Interrogatório — Daniel Cross",
  },
  {
    id: "daniel_identidade",
    title: "O nome falso",
    text: "As entradas marcadas por Elias apontam para o embarque de Daniel: papéis inconsistentes, referências que não existem. Daniel Cross é o infiltrado — e foi ele quem alterou o registro das 17:42.",
    source: "Confronto — Daniel Cross",
  },
];

export const LOCATIONS: Location[] = [
  {
    id: "cabine",
    name: "Cabine do capitão",
    subtitle: "Onde Elias foi encontrado",
    description:
      "O ar é pesado e cheira a cera queimada. O navio range. A porta estava fechada quando encontraram o corpo.",
    spots: [
      { id: "s1", label: "O corpo", hint: "Examinar o ferimento e a posição", gives: "corpo" },
      { id: "s2", label: "A mesa", hint: "Papéis, tinteiro, cera", gives: "papel" },
      { id: "s3", label: "A vela", hint: "Ainda morna", gives: "vela" },
      { id: "s4", label: "A porta", hint: "Fechadura e batente", gives: "porta" },
      { id: "s5", label: "O chão do corredor", hint: "Algo fora do lugar", gives: "corda" },
    ],
  },
  {
    id: "conves",
    name: "Convés e posto do vigia",
    subtitle: "Onde o temporal foi mais forte",
    description:
      "Chuva lateral, madeira batendo, cordas tensas. Qualquer som aqui pode parecer outra coisa.",
    spots: [
      { id: "s1", label: "Posto do vigia", hint: "De onde Hugo dizia estar olhando", gives: "luz" },
      { id: "s2", label: "Estrutura e ferragens", hint: "Procurar a origem do estouro", gives: "som" },
      { id: "s3", label: "Costado do navio", hint: "Marcas de abordagem", gives: "sem_vestigios" },
    ],
  },
  {
    id: "navegacao",
    name: "Sala de navegação",
    subtitle: "Mapas, rota, vento",
    description: "Cartas abertas, compasso preso com um peso de ferro. Adrian gosta deste lugar.",
    spots: [
      { id: "s1", label: "Cartas de navegação", hint: "Reconstruir a posição real", gives: "posicao" },
      { id: "s2", label: "Cálculos de rota", hint: "Rasuras recentes", gives: "rota" },
    ],
  },
  {
    id: "cozinha",
    name: "Cozinha e despensa",
    subtitle: "O posto de Tobias",
    description: "Panelas atadas, prateleiras vazias em um canto específico.",
    spots: [
      {
        id: "s1",
        label: "Prateleira do fundo",
        hint: "Espaços vazios demais",
        gives: "tobias_garrafas",
        requires: ["tobias_horario"],
      },
    ],
  },
  {
    id: "registros",
    name: "Sala de registros",
    subtitle: "Os livros de Miriam Locke",
    description: "Tudo numerado, tudo datado. É o lugar mais organizado do navio.",
    spots: [
      { id: "s1", label: "Sistema de numeração", hint: "Entender como os livros funcionam", gives: "registros" },
      {
        id: "s2",
        label: "Livro de turnos",
        hint: "Comparar com a sequência de Elias",
        gives: "registro_alterado",
        requires: ["sequencia"],
      },
    ],
  },
];

export const SUSPECTS: Suspect[] = [
  {
    id: "marcus",
    name: "Marcus Rook",
    role: "Primeiro imediato",
    profile: "Direto, impaciente. Tinha acesso à cabine e discutiu com o capitão.",
    questions: [
      {
        id: "q1",
        q: "Qual era sua relação com Elias?",
        a: "Boa. Trabalhamos juntos sete anos. Tivemos desentendimentos, como qualquer um.",
        aside: { who: "samuel", line: "Ele escolheu a palavra 'desentendimento' com cuidado." },
        gives: "marcus_discussao",
      },
      {
        id: "q2",
        q: "Pressionar sobre a discussão",
        a: "Eu queria tirar três homens da tripulação. Ele não deixou. Ponto.",
        aside: { who: "adrian", line: "Ele não disse por que queria tirá-los." },
        requires: ["marcus_discussao"],
      },
      {
        id: "q3",
        q: "Por que queria afastar aqueles três?",
        a: "...Porque a carga não fecha. Faltam volumes e sobram lacres. Eu ia resolver sozinho antes de acusar alguém.",
        aside: { who: "samuel", line: "Ele mentiu para nós. Mas não sobre o capitão." },
        gives: "marcus_carga",
        requires: ["marcus_discussao"],
      },
    ],
  },
  {
    id: "helena",
    name: "Helena Graves",
    role: "Navegadora",
    profile: "Conhece o navio melhor que quase todos. Mexeu na rota e não registrou.",
    questions: [
      {
        id: "q1",
        q: "Onde estávamos durante o temporal?",
        a: "No canal norte, como previsto. Mantive o curso.",
        aside: { who: "adrian", line: "Os cálculos na mesa dizem outra coisa." },
      },
      {
        id: "q2",
        q: "Pressionar sobre a rota alterada",
        a: "Eu desviei. Três milhas. Não registrei porque ninguém precisava saber exatamente onde estávamos.",
        aside: { who: "samuel", line: "Ela esconde um destino, não um crime." },
        requires: ["rota"],
      },
      {
        id: "q3",
        q: "Outro navio poderia ter nos alcançado?",
        a: "Com aquele vento? Nem eu conseguiria. Quem falou em ataque não olhou uma carta na vida.",
        requires: ["posicao"],
      },
    ],
  },
  {
    id: "tobias",
    name: "Tobias Flint",
    role: "Cozinheiro",
    profile: "Diz que não saiu da cozinha. Há furos no horário.",
    questions: [
      {
        id: "q1",
        q: "Onde você estava?",
        a: "Na cozinha. Segurando panela para não virar tudo.",
        aside: { who: "samuel", line: "Duas pessoas passaram pela cozinha e não viram ninguém." },
        gives: "tobias_horario",
      },
      {
        id: "q2",
        q: "Confrontar com as garrafas",
        a: "Está certo. Eu desvio bebida. Vendo em terra. Saí da cozinha para esconder as garrafas, não para matar o capitão.",
        requires: ["tobias_garrafas"],
      },
    ],
  },
  {
    id: "rowan",
    name: "Rowan Pike",
    role: "Contramestre",
    profile: "Acesso a ferramentas e áreas restritas. Visto onde não devia.",
    questions: [
      {
        id: "q1",
        q: "O que você fazia no setor restrito?",
        a: "Nada que interesse.",
        aside: { who: "samuel", line: "Essa é a resposta de quem tem medo, não de quem matou." },
        gives: "rowan_area",
      },
      {
        id: "q2",
        q: "Pressionar sobre as ferramentas",
        a: "Uma viga rachou no meu turno. Eu estava consertando antes que Elias visse e me responsabilizasse.",
        gives: "rowan_reparo",
        requires: ["rowan_area"],
      },
    ],
  },
  {
    id: "hugo",
    name: "Hugo Black",
    role: "Vigia",
    profile: "Foi quem falou da luz e iniciou a teoria do ataque.",
    questions: [
      {
        id: "q1",
        q: "Descreva a luz que você viu.",
        a: "Amarela. Baixa. Apareceu e sumiu. Achei que era lanterna de navio.",
        aside: { who: "adrian", line: "Amarela e baixa. Como uma lanterna nossa refletida na água." },
        requires: ["luz"],
      },
      {
        id: "q2",
        q: "E o disparo?",
        a: "Um estouro. Só um. Depois o vento cobriu tudo.",
        requires: ["som"],
      },
    ],
  },
  {
    id: "miriam",
    name: "Miriam Locke",
    role: "Responsável pelos registros",
    profile: "Discreta. Anota tudo, inclusive quem entra na cabine do capitão.",
    questions: [
      {
        id: "q1",
        q: "Quem entrou na cabine naquele dia?",
        a: "Marcus, de manhã. E o aprendiz, às cinco da tarde. O capitão pediu para eu não anotar o nome dele.",
        gives: "daniel_chamado",
      },
      {
        id: "q2",
        q: "Alguém mexeu nos seus livros?",
        a: "Alguém raspou uma linha de turno. Eu não escrevo com raspadeira.",
        requires: ["registro_alterado"],
      },
    ],
  },
  {
    id: "daniel",
    name: "Daniel Cross",
    role: "Aprendiz",
    profile: "Jovem, nervoso, obediente. O tipo de pessoa em quem ninguém presta atenção.",
    questions: [
      {
        id: "q1",
        q: "O capitão falou com você ontem?",
        a: "Falou. Perguntou da minha viagem anterior. Só isso. Saí e voltei ao trabalho.",
        requires: ["daniel_chamado"],
      },
      {
        id: "q2",
        q: "O que você sabe sobre a cabine?",
        a: "Nada. Só que estava escuro lá dentro... a vela estava apagada.",
        aside: { who: "samuel", line: "Como ele sabe disso? Ninguém descreveu a vela a ninguém." },
        gives: "daniel_vela",
        requires: ["vela", "daniel_chamado"],
      },
      {
        id: "q3",
        q: "Quem lhe contou da vela?",
        a: "Eu... ouvi alguém comentar. Não lembro quem.",
        aside: { who: "adrian", line: "Ele também sabe horários de turno que ninguém ensinou a ele." },
        gives: "daniel_rotinas",
        requires: ["daniel_vela"],
      },
      {
        id: "q4",
        q: "Confrontar com a sequência de Elias e o registro raspado",
        a: "(longo silêncio) Ele já sabia. Ia me expor naquela noite. Eu não embarquei para matar ninguém.",
        aside: { who: "samuel", line: "A verdade não estava escondida. Estava espalhada." },
        gives: "daniel_identidade",
        requires: ["sequencia", "registro_alterado", "daniel_rotinas"],
      },
    ],
  },
];

export const TIMELINE: { time: string; text: string; requires: string }[] = [
  { time: "16:40", text: "O temporal começa a se formar. Elias reforça sua suspeita de um infiltrado.", requires: "corpo" },
  { time: "17:05", text: "Elias chama Daniel Cross à cabine, discretamente. Os dois conversam. Daniel sai.", requires: "daniel_chamado" },
  { time: "17:30", text: "A tempestade piora. Visibilidade baixa, barulho alto, todos em seus postos.", requires: "som" },
  { time: "17:42", text: "Uma entrada de turno é raspada e reescrita nos livros de Miriam.", requires: "registro_alterado" },
  { time: "17:48", text: "Hugo vê uma luz baixa e amarela. A teoria do ataque nasce aqui.", requires: "luz" },
  { time: "17:51", text: "Alguém volta à cabine. A porta não é forçada.", requires: "porta" },
  { time: "17:54", text: "Elias é atingido de frente, de pé. A vela se apaga e a cera escorre para um lado.", requires: "vela" },
  { time: "18:10", text: "O corpo é encontrado. Ninguém descreve a vela. Daniel, depois, descreve.", requires: "daniel_vela" },
];

export const KEY_EVIDENCE = ["vela", "daniel_vela", "sequencia", "registro_alterado", "daniel_identidade"];

export const VERDICTS: Record<string, { title: string; text: string }> = {
  daniel: {
    title: "Daniel Cross",
    text: "Daniel embarcou com nome falso para acompanhar a movimentação do navio. Elias percebeu pequenas inconsistências, marcou as entradas dos registros e o chamou às 17:05. Às 17:51 Daniel voltou — recebido, sem arrombar nada — e o confronto terminou em violência. Depois, bastou deixar a tempestade contar a história errada.",
  },
  marcus: {
    title: "Marcus Rook",
    text: "Marcus mentiu, discutiu com o capitão e tinha acesso à cabine. Mas o que ele escondia era a carga irregular. O infiltrado continuou a bordo.",
  },
  helena: {
    title: "Helena Graves",
    text: "Helena realmente desviou a rota e ocultou isso. Por um motivo particular, não por assassinato. O infiltrado continuou a bordo.",
  },
  tobias: {
    title: "Tobias Flint",
    text: "Tobias mentiu sobre o horário porque escondia garrafas desviadas. O infiltrado continuou a bordo.",
  },
  rowan: {
    title: "Rowan Pike",
    text: "Rowan estava consertando uma viga rachada, com medo de ser responsabilizado. O infiltrado continuou a bordo.",
  },
  hugo: {
    title: "Hugo Black",
    text: "Hugo viu algo real e interpretou errado. Testemunha equivocada não é assassino. O infiltrado continuou a bordo.",
  },
  miriam: {
    title: "Miriam Locke",
    text: "Miriam anotou tudo, inclusive o que o capitão pediu para não anotar. Quem raspou o livro foi outra pessoa. O infiltrado continuou a bordo.",
  },
};

export const clueById = (id: string) => CLUES.find((c) => c.id === id)!;
