# VEILORIS — investigadores 3D e novo Caso 02

## Resultado
Refazer Adrian Vale e Samuel Crowe como **personagens 3D animados**, conforme sua escolha, e substituir o Caso 02 marítimo por um mistério original numa fazenda.

## 1. Investigadores e conclusão do Caso 01
- Usar os retratos e ambientes existentes como referências de rosto humano, materiais, acabamento e iluminação cinematográfica.
- Adrian terá presença elegante e autoridade discreta; Samuel será mais atento e analítico. Manter os dois claramente distintos e consistentes entre casos.
- Colocar os dois sentados naturalmente em duas cadeiras, junto à mesma mesa, numa sala coerente com o navio do Caso 01.
- Animar respiração, olhar e gestos de conversa, alternando quem fala de acordo com as falas atuais. Não adicionar voz sintetizada nesta etapa.
- Preservar escolhas, pontuação do debate, candidatos e desfechos do Caso 01. Remover os bonecos antigos das cenas substituídas, sem apagar recursos ainda utilizados.

## 2. Novo Caso 02: O Silêncio da Colheita
**Cenário:** Fazenda Santa Bruma, isolada por uma estrada interditada depois de uma chuva intensa. Não haverá navio, embarque ou navegação.

**História:** Na noite da divisão da propriedade, o proprietário Artur Azevedo é encontrado morto no celeiro. Uma escritura desapareceu e o mecanismo da prensa foi adulterado para simular um acidente. Adrian e Samuel precisam distinguir a disputa pela terra da sabotagem que causou a morte.

- Criar cinco lugares próprios: celeiro, escritório da sede, casa de bombas, depósito de sementes e varanda da fazenda.
- Criar quatro suspeitos novos: o administrador, a agrônoma, a responsável pelos registros e a herdeira.
- Construir pistas e depoimentos sobre o mecanismo sabotado, acesso às ferramentas, horários da irrigação e a escritura desaparecida.
- Dar ao caso uma solução completa: o administrador adulterou a prensa para impedir a descoberta de desvios; a herdeira escondeu a escritura, mas não cometeu o assassinato. As evidências devem permitir separar essas ações.
- Reescrever perguntas, ramificações, conexões, cronologia e todos os desfechos, sem apenas trocar nomes no caso anterior.
- Gerar imagens novas dos cinco ambientes e dos quatro suspeitos. Ajustar os pontos investigáveis para objetos realmente presentes nas imagens.
- Usar os mesmos investigadores 3D na conclusão, agora sentados numa sala da fazenda, com iluminação própria do lugar.

## O que permanece
- Investigação, interrogatórios, caderno, especializações e progressão do jogo existente.
- Identidade do jogador e progresso do Caso 01 no estado local versionado.
- A estrutura de conversa e escolha da conclusão; no Caso 02, seu conteúdo passa a refletir o novo crime.

## Detalhes técnicos e limite importante
- Usar React Three Fiber/Three.js para personagens realmente tridimensionais, com esqueletos e animação; não simular movimento de personagens usando imagens planas ou SVG/CSS.
- **Geração de imagem não entrega modelos 3D articulados.** Primeiro localizar e validar modelos humanos adequados, com licença compatível, capazes de sustentar a qualidade visual pedida. Gerar imagens de referência e cenários não substitui essa etapa.
- Se não houver modelos adequados disponíveis, apresentar o bloqueio e os recursos necessários antes de substituir os protagonistas por algo inferior. Não prometer rostos personalizados a partir de modelos genéricos.
- Carregar modelos e texturas reais do projeto, com tratamento de carregamento e falha, sem dependência de arquivos externos em tempo de execução.
- Compartilhar a cena dos investigadores entre os casos para manter identidade, animações e comportamento consistentes; variar a ambientação.
- Não adicionar serviços de voz, contas, multiplayer ou alterações nas regras de especialização.

## Validação
- Verificar que ambos os investigadores aparecem sentados, inteiros e integrados às cadeiras/mesa, e que o movimento é perceptível.
- Conferir enquadramento e legibilidade no computador e celular, sem cobrir rostos com falas ou escolhas.
- Percorrer as conversas e conclusões dos dois casos, incluindo escolhas consistentes e incorretas.
- Conferir que o Caso 02 não conserva textos ou imagens marítimos e que sua solução corresponde às pistas e depoimentos.
- Verificar retomada do jogador e do Caso 01, carregamento de recursos e ausência de erros de execução ou compilação.
