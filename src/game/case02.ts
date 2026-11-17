import { NIRMALA_PEOPLE, NIRMALA_PLACES } from "./nirmala-world";

/** Caso 02 — As Cinzas de Nirmala. Dados puros: sem React, seguros para SSR. */

export type Domain = "campo" | "fala";
export type Specialty = "Observação" | "Persuasão";

export type N2Clue = { id: string; title: string; text: string; source: string; domain: Domain; revisit?: { requires: string; text: string } };
export type N2Spot = { id: string; label: string; x: number; y: number; gives?: string; flavor?: string; requires?: string[]; specialty?: Specialty };
export type N2Location = { id: string; name: string; subtitle: string; description: string; image: string; unlockedBy?: string; unlockHint?: string; spots: N2Spot[] };
export type N2Question = { id: string; q: string; a: string; tell?: string; gives?: string; requires?: string[]; after?: string[]; specialty?: Specialty };
export type N2Suspect = { id: string; name: string; role: string; portrait: string; profile: string; questions: N2Question[] };
export type N2Puzzle = {
  id: string; title: string; prompt: string; requires: string[]; gives: string; hint: string;
  kind: "choice" | "order";
  options: string[];
  /** choice: índice correto · order: ordem correta dos índices */
  answer: number[];
};

const place = (id: string) => NIRMALA_PLACES.find((p) => p.id === id)!.image;
const person = (id: string) => NIRMALA_PEOPLE.find((p) => p.id === id)!.image;
export const VERANDA_IMAGE = place("veranda");
export const ESTATE_IMAGE = place("estate");

export const CASE = {
  code: "CASO 02",
  title: "As Cinzas de Nirmala",
  setting: "Planalto de Java · Indonésia · Monção de 1930",
  premise:
    "A monção fechou a única estrada de Nirmala. Ao amanhecer, Bimo Sutanto foi encontrado morto no pavilhão de destilação, sufocado pela fumaça, atrás de uma porta trancada por dentro. Todos dizem que foi um acidente. Ninguém explica por que a fornalha estava fria.",
  client:
    "Bimo contratou Adrian e Samuel uma semana antes: 'Alguém em Nirmala pesa a verdade com uma balança falsa.' Ele queria apresentá-los na reunião desta manhã.",
  goal: "Descubra quem matou Bimo e quem ajudou. Há um culpado e um cúmplice.",
};

export const CLUES: N2Clue[] = [
  // ——— Campo (Samuel / Observação)
  { id: "n_rastros", domain: "campo", title: "Uma trilha de sandálias", source: "Plantação Nirmala", text: "Marcas de sandálias de sola fina vão do escritório da balança ao pavilhão, depois descem até o bosque e voltam. Uma única pessoa, três trajetos na mesma noite." },
  { id: "n_fumaca", domain: "campo", title: "A chaminé que não fumou", source: "Plantação Nirmala", text: "Os trabalhadores juram que a chaminé da destilaria não soltou fumaça depois do jantar. Mas o pavilhão estava tomado de fuligem quando arrombaram a porta.", revisit: { requires: "n_abafador", text: "Agora faz sentido: o abafador fechado prendeu a fumaça dentro do pavilhão. A chaminé não fumou porque alguém não queria que ela fumasse." } },
  { id: "n_cinzas", domain: "campo", title: "Cinzas leves demais", source: "Pavilhão de destilação", text: "As cinzas da fornalha são finas, cinzentas e voam ao sopro. Não é madeira. Entre elas, fragmentos com pautas azuis.", revisit: { requires: "n_livro", text: "As pautas azuis são idênticas às do livro de lotes. O que queimou na fornalha foram páginas de contabilidade." } },
  { id: "n_abafador", domain: "campo", title: "O abafador fechado", source: "Pavilhão de destilação", text: "O abafador da chaminé está fechado até o fim. Com fogo aceso, o pavilhão se encheria de fumaça em poucos minutos. Bimo conhecia esse forno havia trinta anos." },
  { id: "n_ferrolho", domain: "campo", title: "Um fio no ferrolho", source: "Pavilhão de destilação", text: "O ferrolho foi fechado por dentro. Na argola, um fio de linha encerada, quase invisível, cortado rente ao metal." },
  { id: "n_dreno", domain: "campo", title: "O canal sob a porta", source: "Pavilhão de destilação", text: "O canal de drenagem passa por baixo da porta e desce até as comportas do bosque. Uma fibra encerada ficou presa na grade." },
  { id: "n_xicara", domain: "campo", title: "Chá doce para um homem amargo", source: "Pavilhão de destilação", text: "Na bancada, uma xícara com resíduo escuro e amargo. Todos sabem que Bimo nunca adoçava o chá — mas o fundo está cheio de açúcar." },
  { id: "n_cobre", domain: "campo", title: "O cobre ainda morno", source: "Pavilhão de destilação", text: "O alambique conservou calor até o amanhecer. Pela temperatura, o fogo foi aceso por volta das 21:30 — muito depois do fim oficial do turno." },
  { id: "n_relogio", domain: "campo", title: "O relógio atrasado", source: "Casa das caldeiras", text: "O relógio de pêndulo, que comanda os turnos de toda a fazenda, está 40 minutos atrasado. Há marcas de dedos recentes no peso do pêndulo." },
  { id: "n_manutencao", domain: "campo", title: "Pêndulo ajustado", source: "Casa das caldeiras", text: "Livro de manutenção: 'Pêndulo ajustado — estava adiantado. A.W., 20:30.' Ninguém além de Jaya costuma tocar no relógio." },
  { id: "n_valvula", domain: "campo", title: "A válvula reprogramada", source: "Casa das caldeiras", text: "A válvula verde abre a comporta do bosque. O horário foi rasurado: onde dizia 05:00, agora diz 22:00." },
  { id: "n_tecido", domain: "campo", title: "Um pano manchado de azul", source: "Bosque de cravo", text: "Um pano de algodão abandonado sobre a pedra, perto da comporta. Está manchado de tinta azul de carimbo de lotes." },
  { id: "n_comporta", domain: "campo", title: "A linha na comporta", source: "Bosque de cravo", text: "Amarrada à estaca da comporta, a mesma linha encerada. Quando a água subiu, a correnteza puxou a linha canal acima — até a porta do pavilhão." },
  { id: "n_cestos", domain: "campo", title: "Cestos que encolhem", source: "Bosque de cravo", text: "Os cestos desta manhã pesam menos do que foi registrado ontem, embora a colheita tenha sido a mesma. Alguém ganha na diferença." },
  { id: "n_balanca", domain: "campo", title: "O peso lixado", source: "Escritório da balança", text: "Um dos pesos de latão foi lixado por baixo. A balança marca 3% a menos em cada saco." },
  { id: "n_livro", domain: "campo", title: "Páginas arrancadas", source: "Escritório da balança", text: "No livro dos lotes faltam as páginas de outubro. O papel tem as mesmas pautas azuis. As bordas foram cortadas com régua — com calma." },
  { id: "n_cofre", domain: "campo", title: "A convocação", source: "Escritório da balança", text: "No cofre, um bilhete de Bimo: 'Reunião amanhã. Auditoria dos lotes ◇. Ninguém sai da sala antes de explicar os números.'" },
  { id: "n_recibos", domain: "campo", title: "Certificados comprados", source: "Escritório da balança", text: "Recibos de Batávia: lotes ◇ vendidos como cravo de primeira, com 'certificado de pureza' assinado A.W. Cada recibo tem um valor pago à parte." },
  { id: "n_armario", domain: "campo", title: "O frasco vazio", source: "Laboratório botânico", text: "O frasco de sementes de datura — um sedativo amargo e potente — está vazio. O cadeado não foi forçado. Só Sari e o químico têm a chave." },
  { id: "n_registro_lab", domain: "campo", title: "Uma assinatura emprestada", source: "Laboratório botânico", text: "Retirada: 'Datura — comparação — 18:40', assinada como Sari. Mas o S tem o laço fechado que Anton usa em todos os seus cadernos." },
  { id: "n_anil", domain: "campo", title: "Anil no laboratório", source: "Laboratório botânico", text: "Uma tigela de anil — o pigmento usado na tinta de carimbo. Sari o prepara aqui para o escritório da balança.", revisit: { requires: "n_tecido", text: "O anil é feito no laboratório, mas só é usado no escritório da balança. Quem limpou as mãos naquele pano carimbou lotes, não estudou plantas." } },
  { id: "n_prensa", domain: "campo", title: "A etiqueta trocada", source: "Laboratório botânico", text: "Uma folha prensada com etiqueta 'Lote ◇ — primeira'. Anotação de Sari: 'Não é cravo de primeira. Alguém troca as etiquetas depois da balança.'" },
  // ——— Fala (Adrian / Persuasão)
  { id: "n_j_sino", domain: "fala", title: "O sino das dez", source: "Interrogatório — Jaya", text: "Jaya tocou o sino do bosque às 22:00 pelo seu relógio de bolso, como faz há trinta anos. Ao voltar, viu que o relógio da caldeira marcava 21:20." },
  { id: "n_j_comporta", domain: "fala", title: "A água corre às cinco", source: "Interrogatório — Jaya", text: "'Eu abro a comporta às cinco da manhã. Nunca à noite.' Às dez, porém, ele ouviu a água descer pelo canal." },
  { id: "n_j_pano", domain: "fala", title: "Juta, não algodão", source: "Interrogatório — Jaya", text: "'Os panos do bosque são de juta. Algodão fino é coisa da sede — do escritório.'" },
  { id: "n_a_briga", domain: "fala", title: "Deserdado", source: "Interrogatório — Aria", text: "Aria discutiu com o pai às 20:00. Bimo disse que ele não herdaria nada. Aria saiu batendo a porta.", revisit: { requires: "n_a_carta", text: "Aria não perderia a herança para outra pessoa: Nirmala iria para os trabalhadores. A briga era real; o motivo para matar, não." } },
  { id: "n_a_carta", domain: "fala", title: "A carta escondida", source: "Interrogatório — Aria", text: "A carta que Aria escondeu: Bimo deixaria Nirmala à cooperativa dos colhedores. 'Antes, preciso tirar da sombra os números de D. e quem os assina.'" },
  { id: "n_a_luz", domain: "fala", title: "Luz no escritório", source: "Interrogatório — Aria", text: "Bebendo na varanda, Aria viu luz no escritório da balança e alguém de sandálias descendo para o bosque com uma lanterna, depois do sino." },
  { id: "n_s_etiquetas", domain: "fala", title: "Etiquetas trocadas", source: "Interrogatório — Sari", text: "Sari contou a Bimo, na tarde do crime, que os lotes ◇ eram rotulados depois da pesagem. Ele ficou em silêncio e foi direto ao cofre." },
  { id: "n_s_chave", domain: "fala", title: "A chave de Sari", source: "Interrogatório — Sari", text: "Sari passou a tarde no bosque com Jaya. Deixou a bata — e a chave do armário no bolso — pendurada no laboratório." },
  { id: "n_s_datura", domain: "fala", title: "Como age a datura", source: "Interrogatório — Sari", text: "'Datura no chá dá sono profundo em vinte minutos. É amarga como fel — ninguém beberia sem muito açúcar.'" },
  { id: "n_an_turno", domain: "fala", title: "A saída de Anton", source: "Interrogatório — Anton", text: "Anton diz que jantou com Dewi 'das 21:00 às 22:00, pelo relógio da caldeira', diante de todos os trabalhadores." },
  { id: "n_an_pendulo", domain: "fala", title: "Um relógio 'adiantado'", source: "Interrogatório — Anton", text: "Anton admite ter mexido no pêndulo: 'Estava adiantado.' Mas o relógio de Jaya e o sino concordavam até aquela noite." },
  { id: "n_an_certificado", domain: "fala", title: "A confissão pela metade", source: "Interrogatório — Anton", text: "'Certifiquei lotes que nunca vi. Dewi pagava. Se a auditoria acontecesse, eu nunca mais assinaria um laudo em Java.'" },
  { id: "n_d_alibi", domain: "fala", title: "O álibi de Dewi", source: "Interrogatório — Dewi", text: "Dewi fechou o escritório 'às 20:30', foi jantar às 21:00 e não saiu do refeitório até a hora de dormir. Tudo pelo relógio da caldeira." },
  { id: "n_d_cha", domain: "fala", title: "O chá de todas as noites", source: "Interrogatório — Dewi", text: "'Levo chá a Bimo todas as noites às 20:30. Ontem também.' Ela diz isso com orgulho, como prova de lealdade." },
  { id: "n_d_auditoria", domain: "fala", title: "'Eu mesma sugeri'", source: "Interrogatório — Dewi", text: "Dewi afirma que foi ela quem pediu a auditoria. Mas o bilhete de Bimo diz que a reunião seria uma surpresa." },
  // ——— Deduções (puzzles)
  { id: "n_p_tempo", domain: "campo", title: "Dedução · A janela real", source: "Dedução", text: "O relógio estava 40 minutos atrasado. O chá das '20:30' foi servido às 21:10 reais, e o jantar das '21:00' começou às 21:40. Entre 21:10 e 21:40, Dewi não tinha álibi algum." },
  { id: "n_p_tranca", domain: "campo", title: "Dedução · A porta que se trancou sozinha", source: "Dedução", text: "A porta foi trancada pela água às 22:00, enquanto Dewi e Anton jantavam diante de testemunhas. O álibi deles cobria o momento errado." },
  { id: "n_p_cinzas", domain: "campo", title: "Dedução · O que ardeu na fornalha", source: "Dedução", text: "As páginas queimadas eram a auditoria de Bimo: lotes ◇ pesados a menos por D.R. e certificados por A.W. O fogo matou Bimo e destruiu a prova ao mesmo tempo." },
];

export const clueById = (id: string) => CLUES.find((c) => c.id === id);

export const LOCATIONS: N2Location[] = [
  {
    id: "estate", name: "Plantação Nirmala", subtitle: "Onde a noite começou", image: place("estate"),
    description: "A lama da monção guardou tudo o que andou por aqui. A chaminé, a sede e as estufas olham para o mesmo caminho.",
    spots: [
      { id: "lama", label: "Marcas na lama", x: 47, y: 87, gives: "n_rastros" },
      { id: "chamine", label: "A chaminé da destilaria", x: 83, y: 26, gives: "n_fumaca" },
      { id: "sede", label: "A sede", x: 38, y: 40, flavor: "As janelas da varanda ficam de frente para o escritório da balança. Quem estivesse ali veria quem entrava e saía." },
      { id: "estufas", label: "As estufas", x: 93, y: 55, flavor: "O vidro está embaçado. As estufas levam ao laboratório botânico." },
      { id: "lanterna", label: "Lanterna do portão", x: 23, y: 58, flavor: "A lanterna foi reabastecida. Não ajuda em nada — ou ajuda a ver quem passou." },
    ],
  },
  {
    id: "distillery", name: "Pavilhão de destilação", subtitle: "A cena do crime", image: place("distillery"),
    description: "A porta foi arrombada ao amanhecer. O corpo já foi retirado, mas o pavilhão continua cheirando a fumaça e cravo.",
    spots: [
      { id: "fornalha", label: "Cinzas da fornalha", x: 47, y: 70, gives: "n_cinzas" },
      { id: "abafador", label: "O abafador", x: 36, y: 36, gives: "n_abafador" },
      { id: "ferrolho", label: "O ferrolho", x: 80, y: 43, gives: "n_ferrolho" },
      { id: "dreno", label: "Canal de drenagem", x: 87, y: 82, gives: "n_dreno" },
      { id: "xicara", label: "A bancada", x: 58, y: 46, gives: "n_xicara" },
      { id: "cobre", label: "O alambique", x: 15, y: 44, gives: "n_cobre", specialty: "Observação" },
      { id: "banco", label: "O banco", x: 28, y: 80, flavor: "Foi aqui que Bimo foi encontrado, encostado na parede, como quem adormeceu." },
      { id: "janela", label: "A janela", x: 53, y: 31, flavor: "Pregada há anos por causa das monções. Ninguém passou por aqui." },
    ],
  },
  {
    id: "boiler", name: "Casa das caldeiras", subtitle: "O tempo da fazenda", image: place("boiler"), unlockedBy: "n_cobre",
    unlockHint: "Descubra a que horas o fogo foi realmente aceso.",
    description: "Toda Nirmala acorda, almoça e dorme pelo relógio de pêndulo desta sala. As válvulas decidem para onde corre a água.",
    spots: [
      { id: "pendulo", label: "Relógio de pêndulo", x: 74, y: 26, gives: "n_relogio" },
      { id: "livro", label: "Livro de manutenção", x: 25, y: 82, gives: "n_manutencao" },
      { id: "verde", label: "Válvula verde", x: 45, y: 39, gives: "n_valvula" },
      { id: "vermelha", label: "Válvula vermelha", x: 32, y: 39, flavor: "Pressão do vapor. Nada fora do normal." },
      { id: "branca", label: "Válvula branca", x: 58, y: 38, flavor: "Abastece a estufa. Fechada desde ontem à tarde." },
      { id: "tanque", label: "Medidor do tanque", x: 92, y: 42, flavor: "O nível baixou de repente durante a noite, como se uma comporta tivesse sido aberta." },
    ],
  },
  {
    id: "grove", name: "Bosque de cravo", subtitle: "Para onde a água corre", image: place("grove"), unlockedBy: "n_dreno",
    unlockHint: "Siga o caminho por onde a água sai do pavilhão.",
    description: "Os terraços descem até a comporta de pedra. A chuva levou quase tudo — quase.",
    spots: [
      { id: "pano", label: "Pano sobre a pedra", x: 14, y: 59, gives: "n_tecido" },
      { id: "comporta", label: "A comporta", x: 86, y: 55, gives: "n_comporta" },
      { id: "cesto", label: "Os cestos", x: 28, y: 61, gives: "n_cestos", specialty: "Observação" },
      { id: "secadores", label: "Secadores", x: 39, y: 41, flavor: "Cravo secando sob lonas. Cheiro doce e forte." },
      { id: "poca", label: "Poças no caminho", x: 53, y: 75, flavor: "Pegadas apagadas pela chuva. Só restou a direção: subindo para a sede." },
    ],
  },
  {
    id: "ledgers", name: "Escritório da balança", subtitle: "O peso de cada saco", image: place("ledgers"), unlockedBy: "n_tecido",
    unlockHint: "Descubra de onde vem a tinta azul do pano.",
    description: "Sacos marcados com símbolos, livros abertos e uma balança de bronze. Dewi conhece cada grama que sai daqui.",
    spots: [
      { id: "balanca", label: "A balança", x: 67, y: 57, gives: "n_balanca" },
      { id: "livro", label: "Livro de lotes", x: 42, y: 65, gives: "n_livro" },
      { id: "cofre", label: "O cofre verde", x: 93, y: 46, gives: "n_cofre" },
      { id: "cartas", label: "Envelopes lacrados", x: 85, y: 75, gives: "n_recibos", specialty: "Observação" },
      { id: "sacos", label: "Sacos com símbolos", x: 54, y: 45, flavor: "Triângulos, círculos e losangos. Os lotes ◇ são os únicos sem data." },
      { id: "quadro", label: "Prancha botânica", x: 36, y: 28, flavor: "Uma prancha de cravo assinada por Sari, presente para Bimo." },
    ],
  },
  {
    id: "laboratory", name: "Laboratório botânico", subtitle: "O arquivo vivo", image: place("laboratory"), unlockedBy: "n_xicara",
    unlockHint: "Descubra o que havia no chá de Bimo.",
    description: "Frascos rotulados, plantas prensadas e um armário com cadeado. Aqui se sabe o que cada folha é capaz de fazer.",
    spots: [
      { id: "armario", label: "Armário trancado", x: 12, y: 42, gives: "n_armario" },
      { id: "caderno", label: "Livro de registros", x: 55, y: 85, gives: "n_registro_lab", requires: ["n_armario"] },
      { id: "anil", label: "Tigela azul", x: 30, y: 76, gives: "n_anil" },
      { id: "prensa", label: "A prensa", x: 74, y: 69, gives: "n_prensa", specialty: "Observação" },
      { id: "frascos", label: "Frascos de sementes", x: 45, y: 62, flavor: "Noz-moscada, cravo, pimenta. Nada fora do lugar." },
      { id: "microscopio", label: "Microscópio", x: 57, y: 58, flavor: "Uma lâmina com pólen de cravo. Trabalho honesto." },
    ],
  },
];

export const SUSPECTS: N2Suspect[] = [
  {
    id: "jaya", name: "Jaya Kusuma", role: "Encarregado da irrigação", portrait: person("jaya"),
    profile: "Trinta anos em Nirmala. Conhece cada comporta. A linha da trava saiu do seu canal.",
    questions: [
      { id: "j1", q: "Onde você estava às dez da noite?", a: "Tocando o sino do bosque, como toda noite. Pelo meu relógio de bolso — o da caldeira eu não uso.", gives: "n_j_sino" },
      { id: "j2", q: "Você abriu a comporta ontem à noite?", a: "Eu abro às cinco da manhã. Nunca à noite. Mas ouvi a água descer às dez... achei que fosse a chuva.", gives: "n_j_comporta" },
      { id: "j3", q: "Esse pano manchado é seu?", requires: ["n_tecido"], a: "Os panos do bosque são de juta. Algodão fino assim? Isso é coisa da sede. Do escritório.", gives: "n_j_pano" },
      { id: "j4", q: "Você gostava de Bimo?", a: "Ele me pagava menos do que a balança dizia que eu colhia. Mas eu nunca soube por quê.", tell: "Ressentimento real — e uma pista sobre a balança." },
      { id: "j5", q: "Quem mais mexe no relógio da caldeira?", after: ["j1"], specialty: "Persuasão", a: "Ninguém. Mas ontem o químico estava lá quando cheguei para o turno. Disse que veio ver o vapor.", tell: "Anton estava na caldeira antes do jantar." },
    ],
  },
  {
    id: "aria", name: "Aria Sutanto", role: "Filho e herdeiro", portrait: person("aria"),
    profile: "Voltou depois de meses fora. Discutiu com o pai na noite do crime e esconde uma carta.",
    questions: [
      { id: "a1", q: "Sobre o que vocês discutiram?", a: "Ele disse que eu não herdaria nada. Nada! Saí batendo a porta. Sim, eu estava com raiva.", gives: "n_a_briga" },
      { id: "a2", q: "O que você fez depois da briga?", a: "Bebi na varanda até tarde. Vi luz no escritório da balança... e alguém de sandálias descendo para o bosque com uma lanterna. Depois do sino.", gives: "n_a_luz" },
      { id: "a3", q: "Você está escondendo uma carta. Mostre-a.", after: ["a1"], specialty: "Persuasão", a: "Está bem. Ele deixaria Nirmala aos colhedores. Escreveu: 'Antes, preciso tirar da sombra os números de D. e quem os assina.' Eu escondi porque parecia um motivo para mim.", gives: "n_a_carta" },
      { id: "a4", q: "Você matou seu pai pela herança?", a: "Se eu quisesse matá-lo, não teria discutido na frente de todos.", tell: "Defensivo, mas coerente." },
      { id: "a5", q: "Quem usa sandálias de sola fina na fazenda?", requires: ["n_rastros"], a: "Os colhedores andam descalços ou de botas. Sandálias? Só a gente da sede. Dewi, Sari... eu uso botas.", tell: "A trilha aponta para a sede." },
    ],
  },
  {
    id: "sari", name: "Sari Prameswari", role: "Botânica visitante", portrait: person("sari"),
    profile: "Tem a chave do armário de onde sumiu a datura. Descobriu que as etiquetas não batiam.",
    questions: [
      { id: "s1", q: "O que você descobriu sobre os lotes?", a: "As etiquetas ◇ são trocadas depois da pesagem. Contei a Bimo ontem à tarde. Ele ficou pálido e foi direto ao cofre.", gives: "n_s_etiquetas" },
      { id: "s2", q: "Onde estava sua chave do armário?", a: "No bolso da minha bata, pendurada no laboratório. Passei a tarde no bosque com Jaya.", gives: "n_s_chave" },
      { id: "s3", q: "O que a datura faz com uma pessoa?", requires: ["n_armario"], a: "Sono profundo em vinte minutos. É amarga como fel. Ninguém a beberia sem muito açúcar.", gives: "n_s_datura" },
      { id: "s4", q: "Você assinou a retirada da datura às 18:40?", requires: ["n_registro_lab"], a: "Às 18:40 eu estava com Jaya na comporta. Olhe o S — eu não fecho o laço. Quem fecha é Anton.", tell: "A assinatura foi imitada." },
      { id: "s5", q: "Você preparou o anil desta semana?", after: ["s1"], specialty: "Persuasão", a: "Preparo e entrego ao escritório. Só Dewi carimba os lotes. Ela pediu o dobro este mês.", tell: "Mais carimbos, mais lotes ◇." },
    ],
  },
  {
    id: "anton", name: "Anton Wiryono", role: "Químico consultor", portrait: person("anton"),
    profile: "Conhece cada etapa da destilação. Assina os laudos de pureza dos óleos de Nirmala.",
    questions: [
      { id: "an1", q: "Onde você estava ontem à noite?", a: "Jantei com Dewi das 21:00 às 22:00, pelo relógio da caldeira. Todos os trabalhadores nos viram.", gives: "n_an_turno" },
      { id: "an2", q: "Você mexeu no relógio da caldeira?", requires: ["n_manutencao"], a: "Ajustei o pêndulo. Estava adiantado. Um químico gosta de precisão.", gives: "n_an_pendulo", tell: "O relógio estava certo até ele mexer." },
      { id: "an3", q: "Os certificados dos lotes ◇ são seus?", requires: ["n_recibos"], specialty: "Persuasão", a: "...Certifiquei lotes que nunca vi. Dewi pagava. Se a auditoria acontecesse, eu nunca mais assinaria um laudo em Java. Mas eu não matei ninguém.", gives: "n_an_certificado" },
      { id: "an4", q: "Você tem a chave do armário de datura?", a: "Tenho. E não a usei. Pergunte à botânica — a chave dela anda pendurada por aí.", tell: "Ele empurra a suspeita para Sari." },
      { id: "an5", q: "Por que o fogo foi aceso tão tarde?", requires: ["n_cobre"], a: "Bimo gostava de destilar de madrugada. Um velho teimoso. O abafador... ele deve ter esquecido.", tell: "Bimo conhecia aquele forno havia trinta anos." },
    ],
  },
  {
    id: "dewi", name: "Dewi Rahayu", role: "Supervisora dos registros", portrait: person("dewi"),
    profile: "Controla balança, lotes e pagamentos. Leva chá a Bimo todas as noites.",
    questions: [
      { id: "d1", q: "Como foi a sua noite?", a: "Fechei o escritório às 20:30, jantei às 21:00 e fiquei no refeitório até a hora de dormir. Pelo relógio da caldeira, como todos.", gives: "n_d_alibi" },
      { id: "d2", q: "Você esteve com Bimo ontem?", a: "Levo chá a ele todas as noites às 20:30. Ontem também. Ele estava bem, trabalhando no pavilhão.", gives: "n_d_cha" },
      { id: "d3", q: "Sabia da auditoria?", after: ["d2"], specialty: "Persuasão", a: "Eu mesma sugeri! Os números de Nirmala são os mais limpos de Java.", gives: "n_d_auditoria", tell: "Sorriso rápido demais." },
      { id: "d4", q: "Você pôs açúcar no chá?", requires: ["n_xicara"], a: "Açúcar? Bimo nunca... talvez eu tenha posto por engano. Era tarde.", tell: "'Era tarde.' Mas ela disse 20:30." },
      { id: "d5", q: "Este pano com tinta azul é seu?", requires: ["n_tecido"], a: "Todo mundo carimba sacos nesta fazenda.", tell: "Só ela carimba os lotes." },
    ],
  },
];

export const PUZZLES: N2Puzzle[] = [
  {
    id: "p_tempo", title: "O relógio que mente", kind: "choice", gives: "n_p_tempo",
    requires: ["n_relogio", "n_j_sino", "n_d_cha", "n_an_turno"],
    prompt: "Quando o sino tocou às 22:00 reais, o relógio da caldeira marcava 21:20. Dewi serviu o chá às '20:30' e foi jantar com Anton às '21:00' — horários do relógio da caldeira. Em que janela REAL Dewi ficou sem testemunhas depois de servir o chá?",
    options: ["20:30 – 21:00", "21:10 – 21:40", "21:40 – 22:40", "Ela nunca ficou sem testemunhas"],
    answer: [1],
    hint: "Some a diferença entre o sino e o relógio a cada horário que Dewi deu.",
  },
  {
    id: "p_tranca", title: "A porta que se trancou sozinha", kind: "order", gives: "n_p_tranca",
    requires: ["n_ferrolho", "n_dreno", "n_comporta", "n_valvula"],
    prompt: "Coloque o mecanismo do quarto fechado na ordem em que aconteceu.",
    options: [
      "A válvula da comporta é reprogramada de 05:00 para 22:00",
      "Uma linha encerada é amarrada ao ferrolho e passada pelo canal de drenagem",
      "A linha é presa à estaca da comporta, no bosque",
      "Às 22:00 a água desce, puxa a linha e o ferrolho se fecha por dentro",
    ],
    answer: [0, 1, 2, 3],
    hint: "Algo precisa ser preparado antes do jantar, longe do pavilhão.",
  },
  {
    id: "p_cinzas", title: "O que ardeu na fornalha", kind: "order", gives: "n_p_cinzas",
    requires: ["n_cinzas", "n_livro", "n_cofre", "n_recibos"],
    prompt: "Fragmentos meio queimados foram achados nas cinzas. Reconstrua a última frase da auditoria de Bimo.",
    options: ["…certificados por A.W.", "Os lotes ◇…", "…pesados a menos por D.R.…", "…foram vendidos como primeira,…"],
    answer: [1, 2, 3, 0],
    hint: "Primeiro o que, depois quem pesou, o que aconteceu, e quem assinou.",
  },
];

/** Relatórios do parceiro, liberados conforme o jogador avança na própria função. */
export const PARTNER_REPORTS: Record<Domain, { at: number; line: string; clues: string[] }[]> = {
  fala: [
    { at: 2, line: "Falei com Jaya e com o rapaz, Aria. Os dois têm raiva de Bimo — e os dois me pareceram sinceros.", clues: ["n_j_sino", "n_j_comporta", "n_a_briga", "n_a_luz"] },
    { at: 5, line: "Dewi e Anton contam a mesma noite, minuto por minuto. Ensaiada demais para o meu gosto.", clues: ["n_d_alibi", "n_d_cha", "n_an_turno"] },
    { at: 8, line: "A botânica me deu algo útil — e Aria finalmente me mostrou a carta.", clues: ["n_s_etiquetas", "n_s_chave", "n_s_datura", "n_a_carta", "n_j_pano"] },
    { at: 11, line: "Encostei Anton contra a parede com os recibos. Ele cedeu pela metade.", clues: ["n_an_pendulo", "n_an_certificado", "n_d_auditoria"] },
  ],
  campo: [
    { at: 2, line: "Percorri o pavilhão. A porta, o chá, o fogo — nada aqui é acidente.", clues: ["n_cinzas", "n_abafador", "n_ferrolho", "n_xicara", "n_rastros"] },
    { at: 5, line: "Segui a água até o bosque e o calor até a caldeira. O relógio de Nirmala está errado.", clues: ["n_dreno", "n_comporta", "n_tecido", "n_cobre", "n_relogio", "n_valvula"] },
    { at: 8, line: "O laboratório e o escritório da balança contam a mesma história com palavras diferentes.", clues: ["n_armario", "n_registro_lab", "n_livro", "n_cofre", "n_manutencao"] },
    { at: 11, line: "Achei os recibos de Batávia. Quem pesa e quem assina estão de acordo.", clues: ["n_recibos", "n_balanca"] },
  ],
};

export const LINKS = [
  { a: "n_cinzas", b: "n_livro", text: "O fogo queimou as páginas arrancadas do livro de lotes." },
  { a: "n_ferrolho", b: "n_comporta", text: "A mesma linha encerada liga o ferrolho à comporta: a porta foi fechada pela água." },
  { a: "n_xicara", b: "n_s_datura", text: "O açúcar escondia o amargor da datura. Bimo dormiu antes da fumaça." },
  { a: "n_relogio", b: "n_j_sino", text: "O relógio da caldeira atrasava 40 minutos — todos os álibis estão deslocados." },
  { a: "n_tecido", b: "n_j_pano", text: "O pano não é do bosque: é algodão da sede, manchado com tinta de carimbo." },
  { a: "n_registro_lab", b: "n_an_pendulo", text: "Anton tocou na datura e no relógio na mesma tarde." },
  { a: "n_cofre", b: "n_a_carta", text: "D. é Dewi. A auditoria e a carta apontam para a mesma pessoa." },
  { a: "n_balanca", b: "n_cestos", text: "O peso lixado explica os cestos que encolhem: Dewi lucrava na diferença." },
];

export const TIMELINE = [
  { time: "≈16:00", text: "Sari conta a Bimo sobre as etiquetas trocadas.", requires: "n_s_etiquetas" },
  { time: "18:40", text: "A datura é retirada do armário com a assinatura de Sari imitada.", requires: "n_registro_lab" },
  { time: "20:00", text: "Bimo discute com Aria e anuncia que a fazenda irá aos colhedores.", requires: "n_a_briga" },
  { time: "20:30", text: "Anton atrasa o relógio da caldeira em 40 minutos e reprograma a comporta.", requires: "n_manutencao" },
  { time: "21:10", text: "Dewi serve o chá adoçado com datura — '20:30' no relógio falso.", requires: "n_p_tempo" },
  { time: "21:30", text: "Com Bimo adormecido, as páginas da auditoria ardem e o abafador é fechado.", requires: "n_p_cinzas" },
  { time: "21:40", text: "Dewi e Anton jantam diante de todos — '21:00' no relógio falso.", requires: "n_an_turno" },
  { time: "22:00", text: "A água desce, puxa a linha e o ferrolho se fecha sozinho.", requires: "n_p_tranca" },
  { time: "22:10", text: "Alguém de sandálias desce ao bosque para recolher a linha e abandona o pano.", requires: "n_a_luz" },
];

export const KEY_EVIDENCE = ["n_p_tempo", "n_p_tranca", "n_p_cinzas", "n_registro_lab", "n_tecido", "n_an_certificado"];

export const METHODS = [
  { id: "fumaca", label: "Sedado com datura e sufocado pela fumaça do abafador fechado; porta trancada pela água." },
  { id: "acidente", label: "Acidente: Bimo esqueceu o abafador fechado e trancou a porta por dentro." },
  { id: "veneno", label: "Envenenado com datura e trancado por alguém que saiu pela janela." },
];

export const SOLUTION = { culprit: "dewi", accomplice: "anton", method: "fumaca" };

export const TRUTH =
  "Dewi Rahayu roubava Nirmala havia anos: lixou um peso da balança e trocava as etiquetas dos lotes ◇, que Anton Wiryono certificava como cravo de primeira em troca de dinheiro. Quando Sari revelou as etiquetas, Bimo preparou uma auditoria. Anton retirou a datura com a assinatura de Sari imitada, atrasou o relógio da caldeira e reprogramou a comporta. Dewi serviu o chá adoçado, queimou as páginas da auditoria na fornalha com o abafador fechado e amarrou o ferrolho a uma linha que corria pelo canal. Às 22:00, enquanto os dois jantavam diante de todos, a água trancou a porta por eles.";
