import mapShip from "@/assets/map-ship.jpg";
import imgCabine from "@/assets/loc-cabine.jpg";
import imgConves from "@/assets/loc-conves.jpg";
import imgTorre from "@/assets/loc-torre.jpg";
import imgNavegacao from "@/assets/loc-navegacao.jpg";
import imgCozinha from "@/assets/loc-cozinha.jpg";
import imgRegistros from "@/assets/loc-registros.jpg";
import imgPorao from "@/assets/loc-porao.jpg";
import pMarcus from "@/assets/p-marcus.jpg";
import pHelena from "@/assets/p-helena.jpg";
import pTobias from "@/assets/p-tobias.jpg";
import pRowan from "@/assets/p-rowan.jpg";
import pHugo from "@/assets/p-hugo.jpg";
import pMiriam from "@/assets/p-miriam.jpg";
import pDaniel from "@/assets/p-daniel.jpg";

export const MAP_IMAGE = mapShip;

export type Clue = {
  id: string;
  title: string;
  text: string;
  source: string;
  /** Nova leitura da mesma pista, liberada quando outra pista é descoberta. */
  revisit?: { requires: string; gives: string };
};

/** Ponto clicável dentro da ilustração de um local (coordenadas em %). */
export type Spot = {
  id: string;
  label: string;
  x: number;
  y: number;
  /** Pista entregue. Sem pista = apenas ambientação. */
  gives?: string;
  flavor?: string;
  requires?: string[];
};

export type Location = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  map: { x: number; y: number };
  /** Pista que libera o local. Sem valor = disponível desde o início. */
  unlockedBy?: string;
  unlockReason?: string;
  spots: Spot[];
};

export type Question = {
  id: string;
  q: string;
  a: string;
  asker?: "player" | "adrian" | "samuel";
  tell?: string;
  aside?: { who: "adrian" | "samuel"; line: string };
  gives?: string;
  requires?: string[];
};

export type Suspect = {
  id: string;
  name: string;
  role: string;
  profile: string;
  portrait: string;
  scene: string;
  knownBy?: string;
  interrogateBy?: string;
  reason: string;
  notes: { requires: string; label: string; text: string }[];
  questions: Question[];
};

export type CrewMember = { name: string; role: string; knownBy?: string };

export const CASE = {
  code: "CASO 01",
  title: "O Último Temporal",
  premise:
    "Um navio pirata atravessa uma região de tempestades violentas. A bordo, vinte pessoas. Durante o temporal, o capitão Elias Vane é encontrado morto dentro da própria cabine. A primeira hipótese é um ataque de outro navio. Mas nenhum navio deveria ter conseguido chegar perto.",
  client:
    "Contratados antes da viagem pelo próprio Elias Vane: ele suspeitava que havia um infiltrado entre a tripulação.",
  crewTotal: 20,
};

export const CLUES: Clue[] = [
  { id: "corpo", title: "O corpo de Elias Vane", text: "Ferimento único na cabeça, provocado por um objeto pesado e curto. Não há sinais de uma luta longa. Elias estava de pé quando foi atingido, de frente para quem o atingiu.", source: "Cabine do capitão" },
  { id: "vela", title: "A vela apagada", text: "A vela sobre a mesa está apagada, mas ainda morna, e a cera escorreu para um só lado. Ninguém da tripulação mencionou isso.", source: "Cabine do capitão" },
  { id: "porta", title: "Porta sem arrombamento", text: "A fechadura está intacta. Quem entrou, entrou porque foi recebido ou porque tinha permissão.", source: "Cabine do capitão" },
  { id: "papel", title: "Pedaço de papel", text: "Um fragmento rasgado, com números anotados às pressas pela letra de Elias. Fora de contexto, não significa nada.", source: "Cabine do capitão", revisit: { requires: "registros", gives: "sequencia" } },
  { id: "sequencia", title: "A sequência", text: "1 — 6 — 3 — 1 — 2 — 3 — 2 — 4 — 2 — 1 — 1 — 5. O papel foi arrancado de um documento maior: a numeração corresponde ao sistema de registros de Miriam Locke. Elias estava marcando entradas específicas.", source: "Revisão — cabine do capitão" },
  { id: "corda", title: "Corda molhada", text: "Uma corda que não parece estar onde deveria. O material ainda está úmido — veio do convés, durante a tempestade.", source: "Cabine do capitão" },
  { id: "luz", title: "A luz no mar", text: "Hugo Black, o vigia, afirma ter visto uma luz amarela e baixa durante o pior momento do temporal. Foi o que fez todos falarem de ataque.", source: "Interrogatório — Hugo Black" },
  { id: "lanterna", title: "A lanterna do mastro", text: "Uma lanterna do próprio navio, pendurada baixa, balançando sobre a água. O reflexo é amarelo e aparece e some com as ondas.", source: "Torre de vigia" },
  { id: "som", title: "O som do disparo", text: "Vários tripulantes ouviram um estouro seco. Uma ferragem solta batendo na estrutura produz exatamente o mesmo som sob vento forte.", source: "Convés" },
  { id: "posicao", title: "A posição real do navio", text: "Com o vento e as pedras daquele trecho, aproximar outro navio seria praticamente impossível. Um ataque externo é improvável.", source: "Sala de navegação" },
  { id: "rota", title: "Alteração na rota", text: "Os cálculos de rota foram corrigidos à mão, depois refeitos. Helena Graves mudou o caminho e não registrou.", source: "Sala de navegação" },
  { id: "sem_vestigios", title: "Nenhum vestígio externo", text: "Nenhuma marca de abordagem, nenhum destroço. Se houve ataque, ele não tocou o navio. Alguém a bordo está mentindo sobre onde estava.", source: "Convés" },
  { id: "marcus_discussao", title: "A discussão de Marcus", text: "Marcus Rook discutiu com Elias dias antes. Queria afastar parte da tripulação. Elias recusou.", source: "Interrogatório — Marcus Rook" },
  { id: "marcus_carga", title: "Irregularidades na carga", text: "Marcus havia descoberto que parte da carga não correspondia ao declarado. Pretendia resolver sozinho, por isso mentiu sobre a discussão.", source: "Interrogatório — Marcus Rook" },
  { id: "lacres", title: "Lacres rompidos", text: "Caixas com lacres refeitos às pressas. Faltam volumes. É um crime — mas um crime de contrabando, não de sangue.", source: "Porão de carga" },
  { id: "tobias_horario", title: "O horário de Tobias", text: "Tobias diz que ficou na cozinha durante todo o temporal. Duas pessoas passaram por lá e não o viram.", source: "Interrogatório — Tobias Flint" },
  { id: "tobias_garrafas", title: "As garrafas que faltam", text: "Tobias desviava bebida em pequenas quantidades e vendia em terra. Saiu da cozinha para esconder o estoque. É por isso que mentiu.", source: "Cozinha" },
  { id: "rowan_area", title: "Rowan onde não devia", text: "Rowan Pike foi visto num setor restrito no meio do temporal, com ferramentas na mão.", source: "Interrogatório — Rowan Pike" },
  { id: "rowan_reparo", title: "O reparo escondido", text: "Rowan consertava às escondidas uma peça da estrutura que havia rachado sob sua responsabilidade. Temia ser culpado pela falha.", source: "Interrogatório — Rowan Pike" },
  { id: "registros", title: "O sistema de registros", text: "Miriam Locke mantém tudo numerado: turnos, entradas, movimentações. Cada número corresponde a uma linha de registro.", source: "Sala de registros" },
  { id: "registro_alterado", title: "Registro alterado às 17:42", text: "Uma entrada de turno foi raspada e reescrita. A alteração esconde a movimentação de uma pessoa entre 17:40 e 18:00.", source: "Sala de registros" },
  { id: "daniel_chamado", title: "Daniel foi chamado", text: "Às 17:05, Elias chamou o aprendiz Daniel Cross à cabine, discretamente. Daniel saiu vivo dali, e Elias também.", source: "Interrogatório — Miriam Locke" },
  { id: "daniel_vela", title: "\"A vela estava apagada\"", text: "Daniel comenta, de passagem, que a vela da cabine estava apagada. Ninguém contou isso a ele.", source: "Interrogatório — Daniel Cross" },
  { id: "daniel_rotinas", title: "Rotinas que ele não deveria saber", text: "Daniel conhece horários de troca de turno e compartimentos que um aprendiz recém-embarcado não teria como conhecer.", source: "Interrogatório — Daniel Cross" },
  { id: "daniel_identidade", title: "O nome falso", text: "As entradas marcadas por Elias apontam para o embarque de Daniel: papéis inconsistentes, referências que não existem. Daniel Cross é o infiltrado — e foi ele quem alterou o registro das 17:42.", source: "Confronto — Daniel Cross" },
];

/** Conexões entre pistas — aparecem no caderno quando as duas pontas são conhecidas. */
export const LINKS: { a: string; b: string; text: string }[] = [
  { a: "vela", b: "daniel_vela", text: "Daniel mencionou a vela durante o interrogatório, embora não tivesse sido informado sobre ela." },
  { a: "papel", b: "registros", text: "Os números do papel seguem a numeração dos livros de Miriam." },
  { a: "luz", b: "lanterna", text: "A luz que Hugo viu era o reflexo de uma lanterna do próprio navio." },
  { a: "som", b: "rowan_reparo", text: "O estouro veio da estrutura que Rowan tentava consertar." },
  { a: "marcus_carga", b: "lacres", text: "A mentira de Marcus protegia a investigação da carga, não um assassinato." },
  { a: "registro_alterado", b: "daniel_chamado", text: "A linha raspada cobre justamente o intervalo em que Daniel voltaria à cabine." },
];

export const KEY_EVIDENCE = ["vela", "daniel_vela", "sequencia", "registro_alterado", "daniel_identidade"];

export const LOCATIONS: Location[] = [
  {
    id: "cabine",
    name: "Cabine do capitão",
    subtitle: "Local do crime",
    description: "O ar é pesado e cheira a cera queimada. O navio range. A porta estava fechada quando encontraram o corpo.",
    image: imgCabine,
    map: { x: 83, y: 47 },
    spots: [
      { id: "corpo", label: "O corpo", x: 52, y: 74, gives: "corpo" },
      { id: "mesa", label: "A mesa", x: 18, y: 58, gives: "papel" },
      { id: "vela", label: "A vela", x: 33, y: 40, gives: "vela" },
      { id: "porta", label: "A porta", x: 91, y: 42, gives: "porta" },
      { id: "chao", label: "O chão", x: 80, y: 86, gives: "corda" },
      { id: "janela", label: "A janela", x: 40, y: 24, flavor: "Chuva intensa contra o vidro. Nada do lado de fora além de ondas e escuridão." },
      { id: "cama", label: "A cama", x: 70, y: 40, flavor: "Arrumada. Elias não chegou a se deitar naquela noite." },
    ],
  },
  {
    id: "conves",
    name: "Convés",
    subtitle: "Onde o temporal foi mais forte",
    description: "Chuva lateral, madeira batendo, cordas tensas. Qualquer som aqui pode parecer outra coisa.",
    image: imgConves,
    map: { x: 40, y: 44 },
    unlockedBy: "corda",
    unlockReason: "A corda molhada veio do convés.",
    spots: [
      { id: "ferragens", label: "Ferragens soltas", x: 22, y: 40, gives: "som" },
      { id: "costado", label: "O costado", x: 78, y: 66, gives: "sem_vestigios" },
      { id: "lampiao", label: "Lampião", x: 35, y: 55, flavor: "Preso firme. Ainda aceso, apesar do vento." },
    ],
  },
  {
    id: "torre",
    name: "Torre de vigia",
    subtitle: "O posto de Hugo Black",
    description: "Lá em cima, o navio inteiro balança como um pêndulo. A chuva corta de lado.",
    image: imgTorre,
    map: { x: 47, y: 7 },
    unlockedBy: "luz",
    unlockReason: "Hugo diz ter visto uma luz daqui de cima.",
    spots: [
      { id: "lanterna", label: "A lanterna", x: 51, y: 70, gives: "lanterna" },
      { id: "mar", label: "O mar", x: 78, y: 40, flavor: "Nenhum casco, nenhum mastro no horizonte. Só ondas." },
    ],
  },
  {
    id: "navegacao",
    name: "Sala de navegação",
    subtitle: "Mapas, rota, vento",
    description: "Cartas abertas, compasso preso com um peso de ferro. Adrian gosta deste lugar.",
    image: imgNavegacao,
    map: { x: 83, y: 29 },
    unlockedBy: "luz",
    unlockReason: "Se houve um navio lá fora, as cartas dirão se era possível.",
    spots: [
      { id: "cartas", label: "Cartas de navegação", x: 42, y: 62, gives: "posicao" },
      { id: "calculos", label: "Cálculos de rota", x: 82, y: 76, gives: "rota" },
      { id: "escotilha", label: "A escotilha", x: 80, y: 20, flavor: "Ondas enormes. Nenhum navio se aproximaria com esse mar." },
    ],
  },
  {
    id: "cozinha",
    name: "Cozinha",
    subtitle: "O posto de Tobias",
    description: "Panelas atadas, o fogão ainda quente, prateleiras vazias em um canto específico.",
    image: imgCozinha,
    map: { x: 22, y: 60 },
    unlockedBy: "tobias_horario",
    unlockReason: "Tobias diz que nunca saiu daqui.",
    spots: [
      { id: "prateleira", label: "Prateleira do fundo", x: 80, y: 36, gives: "tobias_garrafas" },
      { id: "fogao", label: "O fogão", x: 56, y: 62, flavor: "Quente. Mas não há comida sendo feita." },
    ],
  },
  {
    id: "registros",
    name: "Sala de registros",
    subtitle: "Os livros de Miriam Locke",
    description: "Tudo numerado, tudo datado. É o lugar mais organizado do navio.",
    image: imgRegistros,
    map: { x: 50, y: 60 },
    unlockedBy: "daniel_chamado",
    unlockReason: "Miriam mencionou seus livros de registro.",
    spots: [
      { id: "estantes", label: "Estantes numeradas", x: 18, y: 45, gives: "registros" },
      { id: "livro", label: "Livro de turnos", x: 55, y: 72, gives: "registro_alterado", requires: ["sequencia"] },
      { id: "raspadeira", label: "Uma lâmina", x: 82, y: 86, flavor: "Uma raspadeira de pergaminho. Miriam jura que não a usa." },
    ],
  },
  {
    id: "porao",
    name: "Porão de carga",
    subtitle: "Onde Marcus fazia as contas",
    description: "Caixas, barris e uma goteira constante. O cheiro é de madeira molhada e cera vermelha.",
    image: imgPorao,
    map: { x: 55, y: 81 },
    unlockedBy: "marcus_carga",
    unlockReason: "Marcus diz que a carga não fecha.",
    spots: [
      { id: "lacres", label: "Caixas lacradas", x: 42, y: 66, gives: "lacres" },
      { id: "rede", label: "A rede de carga", x: 35, y: 15, flavor: "Pesada, encharcada. Ninguém mexeu nela esta noite." },
    ],
  },
];

export const SUSPECTS: Suspect[] = [
  {
    id: "marcus",
    name: "Marcus Rook",
    role: "Primeiro imediato",
    profile: "Foi quem encontrou o corpo. Direto, impaciente.",
    portrait: pMarcus,
    scene: "porao",
    interrogateBy: "porta",
    reason: "A porta não foi forçada — e Marcus tinha a chave da cabine.",
    notes: [
      { requires: "marcus_discussao", label: "Observações", text: "Discutiu com Elias dias antes." },
      { requires: "marcus_carga", label: "Motivo real", text: "Escondia irregularidades na carga." },
    ],
    questions: [
      { id: "q1", q: "Qual era sua relação com Elias?", a: "Boa. Trabalhamos juntos sete anos. Tivemos desentendimentos, como qualquer um.", tell: "Escolheu a palavra 'desentendimento' com cuidado.", aside: { who: "samuel", line: "Ele está medindo o que pode dizer." }, gives: "marcus_discussao" },
      { id: "q2", q: "Que desentendimento?", asker: "samuel", a: "Eu queria tirar três homens da tripulação. Ele não deixou. Ponto.", tell: "Cruzou os braços. Defensivo.", aside: { who: "adrian", line: "Ele não disse por que queria tirá-los." }, requires: ["marcus_discussao"] },
      { id: "q3", q: "Por que queria afastar aqueles três?", a: "...Porque a carga não fecha. Faltam volumes e sobram lacres. Eu ia resolver sozinho antes de acusar alguém.", tell: "O tom baixou. Parece aliviado em falar.", aside: { who: "samuel", line: "Ele mentiu para nós. Mas não sobre o capitão." }, gives: "marcus_carga", requires: ["marcus_discussao"] },
    ],
  },
  {
    id: "hugo",
    name: "Hugo Black",
    role: "Vigia",
    profile: "Estava de serviço durante a tempestade.",
    portrait: pHugo,
    scene: "conves",
    knownBy: "corda",
    interrogateBy: "corda",
    reason: "A corda veio do convés, e Hugo estava de serviço lá em cima durante a tempestade.",
    notes: [
      { requires: "luz", label: "Testemunho", text: "Viu uma luz baixa e amarela. Iniciou a teoria do ataque." },
      { requires: "lanterna", label: "Observações", text: "Viu algo real e interpretou errado." },
    ],
    questions: [
      { id: "q1", q: "O que você viu durante o temporal?", a: "Uma luz. Amarela. Baixa. Apareceu e sumiu. Achei que era lanterna de navio.", tell: "Responde rápido, sem desviar o olhar.", aside: { who: "adrian", line: "Amarela e baixa. Como uma lanterna nossa refletida na água." }, gives: "luz" },
      { id: "q2", q: "E o disparo?", a: "Um estouro. Só um. Depois o vento cobriu tudo.", tell: "Hesita. Não tem certeza do que ouviu.", requires: ["som"] },
    ],
  },
  {
    id: "rowan",
    name: "Rowan Pike",
    role: "Contramestre",
    profile: "Acesso a ferramentas e áreas restritas.",
    portrait: pRowan,
    scene: "conves",
    knownBy: "corda",
    interrogateBy: "som",
    reason: "O estouro veio das ferragens — e a manutenção delas é responsabilidade do contramestre.",
    notes: [
      { requires: "rowan_area", label: "Última localização conhecida", text: "Setor restrito, com ferramentas na mão." },
      { requires: "rowan_reparo", label: "Motivo real", text: "Consertava escondido uma viga rachada." },
    ],
    questions: [
      { id: "q1", q: "O que você fazia no setor restrito?", a: "Nada que interesse.", tell: "Esconde as mãos. Incomodado.", aside: { who: "samuel", line: "Essa é a resposta de quem tem medo, não de quem matou." }, gives: "rowan_area" },
      { id: "q2", q: "Pressionar sobre as ferramentas", asker: "samuel", a: "Uma viga rachou no meu turno. Eu estava consertando antes que Elias visse e me responsabilizasse.", tell: "Os ombros caem. Nervoso, mas sincero.", gives: "rowan_reparo", requires: ["rowan_area"] },
    ],
  },
  {
    id: "tobias",
    name: "Tobias Flint",
    role: "Cozinheiro",
    profile: "Diz que não saiu da cozinha.",
    portrait: pTobias,
    scene: "cozinha",
    knownBy: "sem_vestigios",
    interrogateBy: "sem_vestigios",
    reason: "Se não houve ataque, alguém a bordo mente sobre onde estava. Tobias foi visto fora do posto.",
    notes: [
      { requires: "tobias_horario", label: "Observações", text: "Apresentou inconsistência sobre o horário." },
      { requires: "tobias_garrafas", label: "Motivo real", text: "Desvia bebida e vende em terra." },
    ],
    questions: [
      { id: "q1", q: "Onde você estava?", a: "Na cozinha. Segurando panela para não virar tudo.", tell: "Sorri demais para a situação.", aside: { who: "samuel", line: "Duas pessoas passaram pela cozinha e não viram ninguém." }, gives: "tobias_horario" },
      { id: "q2", q: "Confrontar com as garrafas", a: "Está certo. Eu desvio bebida. Vendo em terra. Saí da cozinha para esconder as garrafas, não para matar o capitão.", tell: "O sorriso some. Envergonhado, não assustado.", requires: ["tobias_garrafas"] },
    ],
  },
  {
    id: "helena",
    name: "Helena Graves",
    role: "Navegadora",
    profile: "Conhece o navio melhor que quase todos.",
    portrait: pHelena,
    scene: "navegacao",
    knownBy: "luz",
    interrogateBy: "rota",
    reason: "Os cálculos de rota foram refeitos à mão — e só Helena mexe neles.",
    notes: [
      { requires: "rota", label: "Observações", text: "Mudou a rota e não registrou." },
      { requires: "posicao", label: "Avaliação", text: "Confirma que nenhum navio poderia ter se aproximado." },
    ],
    questions: [
      { id: "q1", q: "Onde estávamos durante o temporal?", a: "No canal norte, como previsto. Mantive o curso.", tell: "Controlada. Olha direto nos olhos.", aside: { who: "adrian", line: "Os cálculos na mesa dizem outra coisa." } },
      { id: "q2", q: "Pressionar sobre a rota alterada", asker: "adrian", a: "Eu desviei. Três milhas. Não registrei porque ninguém precisava saber exatamente onde estávamos.", tell: "Pausa longa antes de responder.", aside: { who: "samuel", line: "Ela esconde um destino, não um crime." }, requires: ["rota"] },
      { id: "q3", q: "Outro navio poderia ter nos alcançado?", a: "Com aquele vento? Nem eu conseguiria. Quem falou em ataque não olhou uma carta na vida.", requires: ["posicao"] },
    ],
  },
  {
    id: "miriam",
    name: "Miriam Locke",
    role: "Responsável pelos registros",
    profile: "Discreta. Anota tudo.",
    portrait: pMiriam,
    scene: "registros",
    knownBy: "papel",
    interrogateBy: "papel",
    reason: "Os números no papel de Elias lembram a numeração dos livros de Miriam.",
    notes: [
      { requires: "daniel_chamado", label: "Testemunho", text: "Registrou quem entrou na cabine — inclusive o aprendiz." },
      { requires: "registro_alterado", label: "Observações", text: "Alguém raspou uma linha de seus livros." },
    ],
    questions: [
      { id: "q1", q: "Quem entrou na cabine naquele dia?", a: "Marcus, de manhã. E o aprendiz, às cinco da tarde. O capitão pediu para eu não anotar o nome dele.", tell: "Responde como quem lê uma lista. Controlada.", gives: "daniel_chamado" },
      { id: "q2", q: "Alguém mexeu nos seus livros?", a: "Alguém raspou uma linha de turno. Eu não escrevo com raspadeira.", tell: "Pela primeira vez, irritada.", requires: ["registro_alterado"] },
    ],
  },
  {
    id: "daniel",
    name: "Daniel Cross",
    role: "Aprendiz",
    profile: "Entrou para a tripulação recentemente.",
    portrait: pDaniel,
    scene: "conves",
    knownBy: "daniel_chamado",
    interrogateBy: "daniel_chamado",
    reason: "Elias chamou Daniel à cabine em segredo, horas antes de morrer.",
    notes: [
      { requires: "daniel_chamado", label: "Conhecido por", text: "Auxiliar tarefas gerais do navio. Chamado à cabine às 17:05." },
      { requires: "daniel_vela", label: "Observações", text: "Sabia da vela apagada sem ter sido informado." },
      { requires: "daniel_rotinas", label: "Observações", text: "Conhece rotinas que um aprendiz não deveria conhecer." },
      { requires: "daniel_identidade", label: "Identidade", text: "Nome falso. O infiltrado." },
    ],
    questions: [
      { id: "q1", q: "O capitão falou com você ontem?", a: "Falou. Perguntou da minha viagem anterior. Só isso. Saí e voltei ao trabalho.", tell: "Resposta pronta demais." },
      { id: "q2", q: "O que você sabe sobre a cabine?", a: "Nada. Só que estava escuro lá dentro... a vela estava apagada.", tell: "Desviou o olhar ao terminar a frase.", aside: { who: "samuel", line: "Como ele sabe disso? Ninguém descreveu a vela a ninguém." }, gives: "daniel_vela", requires: ["vela"] },
      { id: "q3", q: "Quem lhe contou da vela?", asker: "samuel", a: "Eu... ouvi alguém comentar. Não lembro quem.", tell: "As mãos param de se mexer. Nervoso.", aside: { who: "adrian", line: "Ele também sabe horários de turno que ninguém ensinou a ele." }, gives: "daniel_rotinas", requires: ["daniel_vela"] },
      { id: "q4", q: "Confrontar com a sequência de Elias e o registro raspado", a: "(longo silêncio) Ele já sabia. Ia me expor naquela noite. Eu não embarquei para matar ninguém.", tell: "Pela primeira vez, a voz não é a de um aprendiz.", aside: { who: "samuel", line: "A verdade não estava escondida. Estava espalhada." }, gives: "daniel_identidade", requires: ["sequencia", "registro_alterado", "daniel_rotinas"] },
    ],
  },
];

/** Tripulantes sem ligação direta com o caso — vão sendo identificados. */
export const CREW: CrewMember[] = [
  { name: "Clara Wynn", role: "Marinheira", knownBy: "corpo" },
  { name: "Silas Reed", role: "Marinheiro", knownBy: "corda" },
  { name: "Nora Hale", role: "Remendadora de velas", knownBy: "sem_vestigios" },
  { name: "Gideon Marsh", role: "Artilheiro", knownBy: "som" },
  { name: "Ezra Quill", role: "Timoneiro", knownBy: "posicao" },
  { name: "Ivo Brandt", role: "Marinheiro", knownBy: "lanterna" },
  { name: "Lena Marlow", role: "Ajudante de cozinha", knownBy: "tobias_garrafas" },
  { name: "Otto Fenn", role: "Carpinteiro", knownBy: "rowan_reparo" },
  { name: "Bram Holt", role: "Estivador", knownBy: "lacres" },
  { name: "Wes Carrow", role: "Estivador", knownBy: "marcus_carga" },
  { name: "Juno Ash", role: "Grumete", knownBy: "registros" },
  { name: "Petra Vale", role: "Marinheira", knownBy: "registro_alterado" },
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

export const VERDICTS: Record<string, { title: string; text: string }> = {
  daniel: { title: "Daniel Cross", text: "Daniel embarcou com nome falso para acompanhar a movimentação do navio. Elias percebeu pequenas inconsistências, marcou as entradas dos registros e o chamou às 17:05. Às 17:51 Daniel voltou — recebido, sem arrombar nada — e o confronto terminou em violência. Depois, bastou deixar a tempestade contar a história errada." },
  marcus: { title: "Marcus Rook", text: "Marcus mentiu, discutiu com o capitão e tinha acesso à cabine. Mas o que ele escondia era a carga irregular. O infiltrado continuou a bordo." },
  helena: { title: "Helena Graves", text: "Helena realmente desviou a rota e ocultou isso. Por um motivo particular, não por assassinato. O infiltrado continuou a bordo." },
  tobias: { title: "Tobias Flint", text: "Tobias mentiu sobre o horário porque escondia garrafas desviadas. O infiltrado continuou a bordo." },
  rowan: { title: "Rowan Pike", text: "Rowan estava consertando uma viga rachada, com medo de ser responsabilizado. O infiltrado continuou a bordo." },
  hugo: { title: "Hugo Black", text: "Hugo viu algo real e interpretou errado. Testemunha equivocada não é assassino. O infiltrado continuou a bordo." },
  miriam: { title: "Miriam Locke", text: "Miriam anotou tudo, inclusive o que o capitão pediu para não anotar. Quem raspou o livro foi outra pessoa. O infiltrado continuou a bordo." },
};

export const clueById = (id: string) => CLUES.find((c) => c.id === id)!;
export const locationById = (id: string) => LOCATIONS.find((l) => l.id === id)!;

/* ------------------------------------------------ regras de progressão */

const has = (clues: string[], id?: string) => !id || clues.includes(id);

export const isLocationOpen = (l: Location, clues: string[]) => has(clues, l.unlockedBy);
export const isSuspectKnown = (s: Suspect, clues: string[]) => has(clues, s.knownBy);
export const canInterrogate = (s: Suspect, clues: string[]) => has(clues, s.interrogateBy);
export const activeLinks = (clues: string[]) => LINKS.filter((k) => clues.includes(k.a) && clues.includes(k.b));

/** Pista que ganhou nova leitura e espera o jogador voltar ao local. */
export const pendingRevisits = (clues: string[]) =>
  CLUES.filter((c) => c.revisit && clues.includes(c.id) && clues.includes(c.revisit.requires) && !clues.includes(c.revisit.gives));

/** Onde uma pista foi encontrada, para mostrá-la visualmente. */
export function clueVisual(id: string): { image: string; x?: number; y?: number; portrait?: boolean } | null {
  for (const l of LOCATIONS) {
    const spot = l.spots.find((s) => s.gives === id);
    if (spot) return { image: l.image, x: spot.x, y: spot.y };
  }
  const revisitOf = CLUES.find((c) => c.revisit?.gives === id);
  if (revisitOf) return clueVisual(revisitOf.id);
  for (const s of SUSPECTS) {
    if (s.questions.some((q) => q.gives === id)) return { image: s.portrait, portrait: true };
  }
  return null;
}

/** Hora fictícia de registro no caderno, pela ordem de descoberta. */
export function discoveryTime(index: number) {
  const minutes = 20 * 60 + 30 + index * 9;
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
