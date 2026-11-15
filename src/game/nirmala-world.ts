import estate from "@/assets/nirmala-estate.jpg";
import distillery from "@/assets/nirmala-distillery.jpg";
import boiler from "@/assets/nirmala-boiler.jpg";
import ledgers from "@/assets/nirmala-ledgers.jpg";
import laboratory from "@/assets/nirmala-laboratory.jpg";
import grove from "@/assets/nirmala-grove.jpg";
import veranda from "@/assets/nirmala-veranda.jpg";
import anton from "@/assets/nirmala-anton.jpg";
import dewi from "@/assets/nirmala-dewi.jpg";
import aria from "@/assets/nirmala-aria.jpg";
import sari from "@/assets/nirmala-sari.jpg";
import jaya from "@/assets/nirmala-jaya.jpg";
import bimo from "@/assets/nirmala-bimo.jpg";

export const NIRMALA = {
  title: "As Cinzas de Nirmala",
  setting: "Interior de Java · Indonésia · 1930",
  premise: "A monção fechou a única estrada de Nirmala. No pavilhão de destilação, Bimo Sutanto foi encontrado morto atrás de uma porta trancada por dentro. A fazenda continua trabalhando. Seus relógios, porém, já não contam a mesma história.",
};

export const NIRMALA_PLACES = [
  { id: "estate", name: "Plantação Nirmala", detail: "A propriedade", image: estate, description: "Entre encostas vulcânicas e árvores de cravo, a sede, a estufa e o pavilhão dividem a mesma fonte de água. A estrada de terra desaparece sob o deslizamento da última chuva." },
  { id: "distillery", name: "Pavilhão de destilação", detail: "O recinto fechado", image: distillery, description: "O cobre guarda o calor por mais tempo que a pedra. A fornalha está fria, as cinzas permanecem no chão e o ferrolho da porta está ao alcance de um pequeno canal de drenagem." },
  { id: "boiler", name: "Casa das caldeiras", detail: "Água, pressão e tempo", image: boiler, description: "Três válvulas alimentam a produção. Um reservatório, um livro de manutenção e um relógio de pêndulo deveriam registrar a mesma rotina — mas alguém interrompeu essa concordância." },
  { id: "ledgers", name: "Escritório da balança", detail: "O peso de uma assinatura", image: ledgers, description: "Os sacos trazem símbolos de lote, não nomes. Entre os livros e a balança, pequenas diferenças de peso podem representar muito mais que uma colheita ruim." },
  { id: "laboratory", name: "Laboratório botânico", detail: "O arquivo vivo", image: laboratory, description: "Folhas prensadas, desenhos e amostras documentam anos de pesquisa. No armário fechado, a história de cada planta depende de quem escreveu sua identificação." },
  { id: "grove", name: "Bosque de cravo", detail: "O caminho da água", image: grove, description: "A água atravessa os terraços antes de chegar aos edifícios. Um tecido abandonado, os cestos e as comportas conservam vestígios que a chuva ainda não levou." },
  { id: "veranda", name: "Varanda da sede", detail: "A mesa dos investigadores", image: veranda, description: "Duas cadeiras, uma mesa e a fazenda inteira à vista. É aqui que Adrian Vale e Samuel Crowe reunirão versões diferentes da mesma noite." },
];

export const NIRMALA_PEOPLE = [
  { id: "bimo", name: "Bimo Sutanto", role: "Proprietário · a vítima", image: bimo, age: "64 anos", description: "Transformou uma pequena propriedade numa referência em óleos de especiarias. Reservado e exigente, convocou uma reunião para anunciar uma decisão que ninguém queria ouvir.", quote: "Uma assinatura pode mudar o destino de uma colheita inteira." },
  { id: "anton", name: "Anton Wiryono", role: "Químico consultor", image: anton, age: "48 anos", description: "Conhece cada etapa da destilação e insiste em distinguir conhecimento de responsabilidade. Seu caderno de amostras raramente sai de suas mãos.", quote: "Um resíduo conta o que aconteceu. Não conta quem estava lá." },
  { id: "dewi", name: "Dewi Rahayu", role: "Supervisora dos registros", image: dewi, age: "40 anos", description: "Controla os lotes, a balança e os pagamentos. Há anos, nada deixa Nirmala sem passar por seus livros. Ela confia mais num número escrito do que numa lembrança.", quote: "Memórias mudam. Os livros permanecem." },
  { id: "aria", name: "Aria Sutanto", role: "Filho e herdeiro", image: aria, age: "27 anos", description: "Voltou à fazenda depois de meses longe. A relação com o pai é tensa, e uma carta que deveria ter sido entregue continua escondida entre seus pertences.", quote: "Voltar para casa não significa querer ficar." },
  { id: "sari", name: "Sari Prameswari", role: "Botânica visitante", image: sari, age: "33 anos", description: "Veio catalogar as variedades da plantação, mas encontrou diferenças entre as plantas e as fichas antigas. Prefere observar antes de aceitar uma explicação.", quote: "Uma etiqueta não transforma uma planta em outra." },
  { id: "jaya", name: "Jaya Kusuma", role: "Encarregado da irrigação", image: jaya, age: "56 anos", description: "Conhece os caminhos da água melhor que os corredores da sede. Trabalha em Nirmala há três décadas e mede o tempo pelos turnos, pelas chuvas e pelo trabalho que ainda falta.", quote: "A água segue a inclinação. As pessoas, nem sempre." },
];