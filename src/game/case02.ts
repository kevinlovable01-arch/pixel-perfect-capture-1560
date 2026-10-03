import imgCabine from "@/assets/loc-cabine.jpg";
import imgConves from "@/assets/loc-conves.jpg";
import imgNavegacao from "@/assets/loc-navegacao.jpg";
import imgRegistros from "@/assets/loc-registros.jpg";
import imgPorao from "@/assets/loc-porao.jpg";
import pMarcus from "@/assets/p-marcus.jpg";
import pHelena from "@/assets/p-helena.jpg";
import pMiriam from "@/assets/p-miriam.jpg";
import pRowan from "@/assets/p-rowan.jpg";
import type { Clue, Location, Question, Suspect, CrewMember } from "./case01";

export const CASE = {
  code: "CASO 02",
  title: "A Última Fotografia",
  premise:
    "Uma fotografia desaparece durante uma recepção privada a bordo do navio Aurora. Minutos depois, o colecionador Augusto Bell é encontrado desacordado em sua cabine. A fotografia não vale apenas dinheiro: ela registra algo que alguém faria qualquer coisa para esconder.",
  client:
    "Contratada pela família Bell para descobrir quem levou a fotografia e quem atacou Augusto antes que a embarcação chegue ao porto.",
  crewTotal: 16,
};

export const CLUES: Clue[] = [
  { id: "c2_corpo", title: "Augusto ainda respira", text: "Augusto foi atingido por trás por um objeto pesado. O golpe o deixou inconsciente, mas não houve tentativa de matá-lo.", source: "Cabine de Augusto" },
  { id: "c2_moldura", title: "A moldura vazia", text: "A fotografia desapareceu da moldura sem que o vidro fosse quebrado. Quem a retirou teve tempo e cuidado.", source: "Cabine de Augusto" },
  { id: "c2_cera", title: "Cera azul", text: "Uma pequena gota de cera azul ficou presa na madeira da moldura. É a mesma cera usada para lacrar documentos privados.", source: "Cabine de Augusto" },
  { id: "c2_chave", title: "A chave duplicada", text: "A fechadura não foi forçada. Há uma segunda chave da cabine, guardada na sala de registros.", source: "Cabine de Augusto" },
  { id: "c2_lista", title: "Lista de convidados", text: "A lista oficial foi alterada à mão. Um nome foi acrescentado depois que a recepção começou.", source: "Sala de registros" },
  { id: "c2_foto", title: "O reflexo na fotografia", text: "Uma cópia antiga revela, no reflexo de uma janela, uma pessoa que não deveria estar naquela parte do navio.", source: "Arquivo fotográfico" },
  { id: "c2_lacre", title: "O lacre azul", text: "Documentos guardados por Miriam usam a mesma cera azul encontrada na moldura.", source: "Sala de registros" },
  { id: "c2_helena", title: "O álibi de Helena", text: "Helena afirma ter permanecido na navegação. O registro de rota confirma apenas parte do horário.", source: "Sala de navegação" },
  { id: "c2_rota", title: "A rota interrompida", text: "Por onze minutos, o diário de navegação ficou sem atualização. Nesse intervalo alguém poderia ter atravessado o corredor das cabines.", source: "Sala de navegação" },
  { id: "c2_marcus", title: "A discussão no salão", text: "Marcus discutiu com Augusto sobre a venda da fotografia. Ele queria impedir que a peça deixasse o país.", source: "Interrogatório — Marcus" },
  { id: "c2_pagamento", title: "O pagamento escondido", text: "Marcus recebeu dinheiro para entregar uma cópia da fotografia, mas afirma que não sabia do ataque.", source: "Interrogatório — Marcus" },
  { id: "c2_miriam", title: "O registro da chave", text: "Miriam anotou que uma chave duplicada foi retirada às 21:18 e devolvida às 21:31.", source: "Sala de registros" },
  { id: "c2_nome", title: "O nome acrescentado", text: "O nome adicionado à lista foi 'Elisa Voss'. Não existe cabine registrada para ela.", source: "Sala de registros" },
  { id: "c2_elisa", title: "A identidade de Elisa Voss", text: "Elisa Voss usou outro nome para embarcar. Ela procurava a fotografia porque ela mostra seu pai em uma operação ilegal anos antes.", source: "Confronto — Elisa" },
  { id: "c2_culpa", title: "A verdade sobre o ataque", text: "Elisa retirou a fotografia, mas não atacou Augusto. O golpe foi dado por alguém que queria recuperar a prova antes que ela fosse revelada.", source: "Confronto — Elisa" },
];

export const LINKS = [
  { a: "c2_moldura", b: "c2_cera", text: "A fotografia foi retirada com cuidado e deixou a mesma cera azul usada nos documentos." },
  { a: "c2_chave", b: "c2_miriam", text: "A chave duplicada foi retirada no exato intervalo em que o corredor ficou sem vigilância." },
  { a: "c2_lista", b: "c2_nome", text: "O nome acrescentado depois da recepção explica por que a presença de Elisa não aparece no mapa de cabines." },
  { a: "c2_foto", b: "c2_elisa", text: "O reflexo identifica a pessoa que embarcou usando identidade falsa." },
  { a: "c2_pagamento", b: "c2_culpa", text: "Marcus participou da negociação, mas a agressão teve outro objetivo." },
];

export const KEY_EVIDENCE = ["c2_moldura", "c2_cera", "c2_miriam", "c2_elisa", "c2_culpa"];

export const LOCATIONS: Location[] = [
  {
    id: "c2_cabine",
    name: "Cabine de Augusto",
    subtitle: "Onde ocorreu o ataque",
    description: "A cabine está quase intacta. A fotografia sumiu, mas o restante do quarto parece cuidadosamente preservado.",
    image: imgCabine,
    map: { x: 78, y: 48 },
    spots: [
      { id: "corpo", label: "Augusto", x: 50, y: 72, gives: "c2_corpo" },
      { id: "moldura", label: "A moldura", x: 25, y: 38, gives: "c2_moldura" },
      { id: "mesa", label: "A mesa", x: 68, y: 55, gives: "c2_cera" },
      { id: "porta", label: "A fechadura", x: 88, y: 45, gives: "c2_chave" },
    ],
  },
  {
    id: "c2_registros",
    name: "Sala de registros",
    subtitle: "Chaves e documentos",
    description: "Livros de bordo, listas e envelopes lacrados. Nada aqui parece ter sido deixado ao acaso.",
    image: imgRegistros,
    map: { x: 50, y: 60 },
    spots: [
      { id: "lista", label: "Lista de convidados", x: 30, y: 50, gives: "c2_lista" },
      { id: "chaves", label: "Livro de chaves", x: 64, y: 70, gives: "c2_miriam" },
      { id: "lacre", label: "Caixa de documentos", x: 82, y: 35, gives: "c2_lacre" },
    ],
  },
  {
    id: "c2_navegacao",
    name: "Sala de navegação",
    subtitle: "O álibi de Helena",
    description: "O diário de bordo tem uma interrupção estranha justamente no horário do ataque.",
    image: imgNavegacao,
    map: { x: 80, y: 28 },
    spots: [
      { id: "diario", label: "Diário de bordo", x: 42, y: 62, gives: "c2_rota" },
      { id: "mapa", label: "Mapa da rota", x: 78, y: 70, gives: "c2_helena" },
    ],
  },
  {
    id: "c2_porao",
    name: "Arquivo fotográfico",
    subtitle: "O que Augusto colecionava",
    description: "Caixas antigas guardam cópias de fotografias, negativos e documentos de viagens passadas.",
    image: imgPorao,
    map: { x: 55, y: 82 },
    spots: [
      { id: "caixas", label: "Caixas de negativos", x: 45, y: 60, gives: "c2_foto" },
    ],
  },
  {
    id: "c2_conves",
    name: "Salão da recepção",
    subtitle: "Onde todos estavam reunidos",
    description: "Taças ainda estão sobre as mesas. Foi aqui que a lista de convidados circulou antes do ataque.",
    image: imgConves,
    map: { x: 38, y: 45 },
    spots: [
      { id: "mesa", label: "Mesa principal", x: 52, y: 55, flavor: "Há marcas de várias taças, mas ninguém parece ter derrubado nada." },
    ],
  },
];

export const SUSPECTS: Suspect[] = [
  {
    id: "c2_marcus",
    name: "Marcus Rook",
    role: "Intermediário de antiguidades",
    profile: "Conhecia o valor da fotografia e discutiu com Augusto durante a recepção.",
    portrait: pMarcus,
    scene: "c2_conves",
    interrogateBy: "c2_marcus",
    reason: "Tinha interesse financeiro direto na fotografia.",
    notes: [{ requires: "c2_marcus", label: "Negociação", text: "Queria vender uma cópia da fotografia." }, { requires: "c2_pagamento", label: "Dinheiro", text: "Recebeu pagamento por uma entrega." }],
    questions: [
      { id: "q1", q: "Por que discutiu com Augusto?", a: "Ele se recusou a vender a fotografia para o meu cliente.", gives: "c2_marcus" },
      { id: "q2", q: "Recebeu dinheiro pela fotografia?", requiresQuestions: ["q1"], a: "Recebi. Mas era pela cópia. Eu não toquei na original.", gives: "c2_pagamento", requires: ["c2_marcus"] },
    ],
  },
  {
    id: "c2_helena",
    name: "Helena Graves",
    role: "Navegadora convidada",
    profile: "Afirma que estava trabalhando na sala de navegação.",
    portrait: pHelena,
    scene: "c2_navegacao",
    interrogateBy: "c2_helena",
    reason: "Seu álibi depende de um diário com um intervalo sem registros.",
    questions: [
      { id: "q1", q: "Você saiu da navegação?", a: "Não durante o horário do ataque.", gives: "c2_helena" },
      { id: "q2", q: "O que aconteceu durante os onze minutos?", requiresQuestions: ["q1"], a: "O navio mudou de direção e eu precisei resolver uma correção manual.", gives: "c2_rota", requires: ["c2_helena"] },
    ],
  },
  {
    id: "c2_miriam",
    name: "Miriam Locke",
    role: "Responsável pelos registros",
    profile: "Controla as chaves, listas e documentos da embarcação.",
    portrait: pMiriam,
    scene: "c2_registros",
    interrogateBy: "c2_miriam",
    reason: "Somente ela controla o livro de chaves.",
    questions: [
      { id: "q1", q: "Quem retirou a chave duplicada?", a: "Não vi o rosto. Registrei a retirada às 21:18.", gives: "c2_miriam" },
      { id: "q2", q: "Quem foi acrescentado à lista?", requiresQuestions: ["q1"], a: "Elisa Voss. O nome apareceu depois do início da recepção.", gives: "c2_nome", requires: ["c2_lista"] },
    ],
  },
  {
    id: "c2_elisa",
    name: "Elisa Voss",
    role: "Convidada com identidade falsa",
    profile: "O nome dela apareceu na lista depois que a recepção começou.",
    portrait: pRowan,
    scene: "c2_cabine",
    knownBy: "c2_nome",
    interrogateBy: "c2_nome",
    reason: "Entrou usando outro nome e tinha um motivo para querer a fotografia.",
    notes: [{ requires: "c2_elisa", label: "Identidade", text: "Embarcou usando outro nome." }, { requires: "c2_culpa", label: "O ataque", text: "Retirou a fotografia, mas não atacou Augusto." }],
    questions: [
      { id: "q1", q: "Quem é você?", a: "Elisa Voss. O nome usado no embarque não era meu.", gives: "c2_elisa" },
      { id: "q2", q: "Você pegou a fotografia?", requiresQuestions: ["q1"], a: "Sim. Eu precisava dela. Mas quando cheguei, Augusto já estava caído. Eu não o ataquei.", gives: "c2_culpa", requires: ["c2_elisa"] },
    ],
  },
];

export const TIMELINE = [
  { time: "20:50", text: "A recepção começa.", requires: "c2_lista" },
  { time: "21:05", text: "O nome de Elisa é acrescentado à lista.", requires: "c2_nome" },
  { time: "21:18", text: "A chave duplicada é retirada da sala de registros.", requires: "c2_miriam" },
  { time: "21:20", text: "O diário de navegação fica onze minutos sem atualização.", requires: "c2_rota" },
  { time: "21:31", text: "A chave é devolvida.", requires: "c2_miriam" },
  { time: "21:34", text: "Augusto é encontrado inconsciente e a fotografia desaparece.", requires: "c2_moldura" },
];

export const VERDICTS: Record<string, { title: string; text: string }> = {
  c2_elisa: { title: "Elisa Voss", text: "Elisa usou identidade falsa e retirou a fotografia, mas as evidências mostram que ela chegou depois do ataque. A fotografia era uma prova contra alguém de seu passado, não o motivo do golpe." },
  c2_marcus: { title: "Marcus Rook", text: "Marcus recebeu dinheiro e queria a fotografia, mas sua negociação foi pela cópia. Ele não explica a chave retirada nem o ataque." },
  c2_helena: { title: "Helena Graves", text: "Helena escondeu uma alteração na rota, mas o intervalo de navegação não prova que ela entrou na cabine." },
  c2_miriam: { title: "Miriam Locke", text: "Miriam controlava as chaves, porém o registro prova que ela documentou a retirada e devolução. A pessoa que usou a chave continua sem nome." },
};

export const clueById = (id: string) => CLUES.find((c) => c.id === id)!;
