// Catálogo fictício do ORION+ — títulos originais, com metadados usados pela
// tela inicial, catálogo, busca, detalhes e player.
// A "arte" de cada título é gerada no cliente a partir da paleta cinematográfica.

const EPISODE_TITLES = [
  'O primeiro sinal',
  'Sombras na janela',
  'Ruído branco',
  'A promessa',
  'Tudo o que ficou',
  'Linha de fuga',
  'Água parada',
  'O quarto vazio',
  'Contraluz',
  'Ponto de ruptura',
  'Ninguém dorme',
  'A última ligação',
  'Cinzas e sal',
  'Do outro lado',
  'Sete minutos',
  'A curva do rio',
  'Fresta de luz',
  'Vozes na escada',
  'Depois do trovão',
  'O que resta do fogo',
  'Fim de linha',
  'Amanhã, talvez',
  'Vermelho profundo',
  'O silêncio',
]

const EPISODE_SYNOPSES = [
  'Uma descoberta inesperada muda o rumo de tudo e força decisões que ninguém estava pronto para tomar.',
  'Velhas alianças são testadas quando um segredo vem à tona no pior momento possível.',
  'Um encontro improvável coloca dois lados opostos frente a frente — e nada sai como planejado.',
  'O passado retorna em forma de dívida, e cada escolha cobra um preço diferente.',
  'A tensão aumenta quando a cidade descobre parte da verdade que tentavam esconder.',
  'Uma noite longa demais obriga os personagens a encarar quem realmente são.',
  'Uma pista esquecida reabre um caso que todos preferiam deixar arquivado.',
  'No limite entre lealdade e sobrevivência, alguém precisa escolher primeiro.',
]

function buildSeasons(defs) {
  return defs.map(({ number, episodes, year }) => ({
    number,
    year,
    episodes: Array.from({ length: episodes }, (_, i) => ({
      number: i + 1,
      title: EPISODE_TITLES[(i + number * 3) % EPISODE_TITLES.length],
      durationMin: 38 + ((i * 7 + number * 5) % 19),
      synopsis: EPISODE_SYNOPSES[(i + number) % EPISODE_SYNOPSES.length],
    })),
  }))
}

const RAW = [
  {
    id: 'cidade-de-neon',
    title: 'Cidade de Neon',
    type: 'movie',
    year: 2025,
    ageRating: '16',
    score: 8.9,
    durationMin: 132,
    genres: ['Ação', 'Ficção científica', 'Suspense'],
    cast: ['Marina Duarte', 'Caio Rezende', 'Yuki Tanaka', 'Bento Aguiar'],
    director: 'Helena Prado',
    country: 'Brasil',
    tagline: 'A luz esconde tudo o que a noite não perdoa.',
    synopsis:
      'Numa metrópole onde cada painel de LED registra quem passa, uma analista de dados descobre que o sistema de segurança da cidade foi construído para proteger um único nome. Perseguida por quem a criou, ela precisa atravessar 24 horas de neon para provar o que viu.',
    palette: ['#ff2d6f', '#2b1055'],
    badge: 'Estreia ORION',
    featured: 1,
    top10: 1,
    progress: 0.34,
  },
  {
    id: 'protocolo-aurora',
    title: 'Protocolo Aurora',
    type: 'movie',
    year: 2025,
    ageRating: '12',
    score: 8.6,
    durationMin: 141,
    genres: ['Ficção científica', 'Aventura', 'Drama'],
    cast: ['Ana Beatriz Lima', 'Ravi Chandra', 'Sofia Krammer', 'Diego Sanz'],
    director: 'Otávio Nunes',
    country: 'Brasil',
    tagline: 'O fim do mundo tem hora marcada.',
    synopsis:
      'Uma equipe de cientistas descobre que a aurora boreal passou a transmitir uma mensagem em código. Com 72 horas antes do próximo ciclo, eles correm contra governos e corporações para decifrar a origem do sinal.',
    palette: ['#2ce8c5', '#0b2b4a'],
    badge: 'Novo',
    featured: 2,
    top10: 4,
  },
  {
    id: 'imperio-de-cinzas',
    title: 'Império de Cinzas',
    type: 'series',
    year: 2025,
    ageRating: '16',
    score: 9.0,
    genres: ['Drama', 'Crime', 'Suspense'],
    cast: ['Clara Monteiro', 'Ivo Sacramento', 'Nina Barreto', 'Túlio Amaral'],
    director: 'Renata Villela',
    country: 'Brasil',
    tagline: 'Toda família tem um acordo que não pode ser quebrado.',
    synopsis:
      'Depois de três décadas controlando o porto mais lucrativo do país, uma matriarca precisa escolher entre os filhos que construíram o império e a neta que quer destruí-lo. O preço da sucessão é mais alto do que qualquer herança.',
    palette: ['#f0a92e', '#3a0f14'],
    badge: 'Nova temporada',
    featured: 3,
    top10: 2,
    seasons: buildSeasons([
      { number: 1, episodes: 8, year: 2023 },
      { number: 2, episodes: 9, year: 2024 },
      { number: 3, episodes: 8, year: 2025 },
    ]),
  },
  {
    id: 'a-casa-do-lago-negro',
    title: 'A Casa do Lago Negro',
    type: 'series',
    year: 2025,
    ageRating: '16',
    score: 8.6,
    genres: ['Mistério', 'Sobrenatural', 'Drama'],
    cast: ['Lúcia Ferraz', 'Pedro Aymoré', 'Cecília Rios'],
    director: 'Marcos Ventura',
    country: 'Brasil',
    tagline: 'A casa devolve quem ela escolhe.',
    synopsis:
      'Uma restauradora aceita recuperar um casarão à beira de um lago que não aparece em nenhum mapa recente. A cada cômodo aberto, ela encontra objetos que pertenceram a pessoas que ainda não nasceram.',
    palette: ['#6f8cff', '#0a1226'],
    badge: 'Top 10',
    top10: 5,
    progress: 0.62,
    seasons: buildSeasons([
      { number: 1, episodes: 7, year: 2024 },
      { number: 2, episodes: 8, year: 2025 },
    ]),
  },
  {
    id: 'heranca-de-vidro',
    title: 'Herança de Vidro',
    type: 'movie',
    year: 2024,
    ageRating: '16',
    score: 8.1,
    durationMin: 124,
    genres: ['Suspense', 'Mistério', 'Drama'],
    cast: ['Beatriz Sampaio', 'Henrique Lobo', 'Aya Nakamura'],
    director: 'Fernanda Klein',
    country: 'Brasil',
    tagline: 'Alguns legados só existem para serem quebrados.',
    synopsis:
      'Três irmãos se reencontram para vender a fábrica da família, mas o testamento exige que passem sete noites no prédio. A cada amanhecer, uma versão diferente do passado aparece nos vidros das janelas.',
    palette: ['#a78bfa', '#1a0f2e'],
    top10: 7,
  },
  {
    id: 'ritmo-da-noite',
    title: 'Ritmo da Noite',
    type: 'series',
    year: 2024,
    ageRating: '14',
    score: 8.4,
    genres: ['Musical', 'Drama', 'Romance'],
    cast: ['Jade Oliveira', 'Léo Cardoso', 'Samira Aziz'],
    director: 'Bruna Toledo',
    country: 'Brasil',
    tagline: 'A pista é o único lugar onde ninguém mente.',
    synopsis:
      'Uma DJ de São Paulo é convidada para comandar a noite de um clube em decadência. Entre sets que viram confessionários e um romance que não pode existir, ela descobre quem pagou para que a música não parasse.',
    palette: ['#ff6ad5', '#1b0a2a'],
    badge: 'Novo episódio',
    progress: 0.18,
    seasons: buildSeasons([
      { number: 1, episodes: 8, year: 2023 },
      { number: 2, episodes: 8, year: 2024 },
    ]),
  },
  {
    id: 'estacao-orbita',
    title: 'Estação Órbita',
    type: 'movie',
    year: 2026,
    ageRating: '12',
    score: 8.8,
    durationMin: 145,
    genres: ['Ficção científica', 'Aventura', 'Drama'],
    cast: ['Iara Sottomayor', 'Kofi Mensah', 'Vera Lindqvist', 'Rui Peixoto'],
    director: 'Daniel Arantes',
    country: 'Brasil',
    tagline: 'Do lado de fora, ninguém vai te ouvir voltar.',
    synopsis:
      'A última estação orbital tripulada recebe uma cápsula de resgate com um único passageiro — e nenhum registro de lançamento. Para voltar à Terra, a comandante terá que decidir em quem confiar dentro de uma casa de 400 metros quadrados.',
    palette: ['#4f9dff', '#050b1c'],
    badge: 'Em breve',
  },
  {
    id: 'o-ultimo-farol',
    title: 'O Último Farol',
    type: 'movie',
    year: 2024,
    ageRating: '14',
    score: 8.4,
    durationMin: 118,
    genres: ['Drama', 'Suspense', 'Aventura'],
    cast: ['Almir Costa', 'Teresa Galvão', 'Nuno Vidal'],
    director: 'Joana Reis',
    country: 'Portugal',
    tagline: 'O mar devolve tudo o que o tempo esquece.',
    synopsis:
      'O faroleiro de uma ilha isolada encontra um barco à deriva com uma criança e um diário escrito por alguém que ainda não nasceu. Quando a tempestade corta as comunicações, ele precisa decidir se conta ao mundo o que encontrou.',
    palette: ['#1f6feb', '#06213f'],
    featured: 4,
    top10: 6,
  },
  {
    id: 'codigo-iris',
    title: 'Código Íris',
    type: 'movie',
    year: 2026,
    ageRating: '14',
    score: 8.0,
    durationMin: 126,
    genres: ['Ação', 'Thriller', 'Tecnologia'],
    cast: ['Rafael Bittar', 'Amara Ndiaye', 'Ícaro Lemos'],
    director: 'Sérgio Yamada',
    country: 'Brasil',
    tagline: 'Seus olhos são a senha.',
    synopsis:
      'Um especialista em reconhecimento facial é contratado para auditar um banco, mas descobre que o sistema já sabe quem ele é — inclusive o que ainda não aconteceu. Para sair, ele precisa apagar a própria identidade.',
    palette: ['#00d4ff', '#061826'],
    badge: 'Novo',
  },
  {
    id: 'silencio-das-montanhas',
    title: 'O Silêncio das Montanhas',
    type: 'movie',
    year: 2022,
    ageRating: '12',
    score: 8.7,
    durationMin: 138,
    genres: ['Drama', 'Aventura'],
    cast: ['Eloá Martins', 'Bastião Ferreira', 'Ilsa Berg'],
    director: 'Cecília Andrade',
    country: 'Brasil',
    tagline: 'Subir é a parte fácil.',
    synopsis:
      'Uma fotógrafa e um guia mudo atravessam uma cordilheira em busca da última imagem capturada pelo pai dela. Na altitude, a única forma de conversar é a paisagem — e ela começa a responder.',
    palette: ['#9fd6c4', '#123027'],
  },
  {
    id: 'vale-das-sombras',
    title: 'Vale das Sombras',
    type: 'movie',
    year: 2024,
    ageRating: '18',
    score: 7.8,
    durationMin: 109,
    genres: ['Terror', 'Suspense', 'Mistério'],
    cast: ['Dante Ribeiro', 'Olga Prado', 'Silas Monte'],
    director: 'Isadora Braga',
    country: 'Brasil',
    tagline: 'Não olhe duas vezes.',
    synopsis:
      'Uma equipe de filmagem se perde numa estrada de terra depois que o GPS passa a apontar para o próprio carro. A cada parada, o vale devolve uma versão levemente diferente de quem eles eram.',
    palette: ['#7a1f2b', '#0b0a0d'],
  },
  {
    id: 'depois-da-chuva',
    title: 'Depois da Chuva',
    type: 'movie',
    year: 2023,
    ageRating: '12',
    score: 8.2,
    durationMin: 112,
    genres: ['Romance', 'Drama'],
    cast: ['Lia Vasconcelos', 'Tomás Assis', 'Bethânia Lira'],
    director: 'Rodrigo Pessoa',
    country: 'Brasil',
    tagline: 'Algumas histórias só começam quando o temporal passa.',
    synopsis:
      'Dois desconhecidos dividem um ponto de ônibus inundado na noite mais chuvosa do ano. Doze horas depois, o mundo está ensolarado e eles precisam decidir se o que aconteceu naquela madrugada existe de verdade.',
    palette: ['#5ec8ff', '#16233a'],
  },
  {
    id: 'sinfonia-de-aco',
    title: 'Sinfonia de Aço',
    type: 'movie',
    year: 2024,
    ageRating: '10',
    score: 8.5,
    durationMin: 121,
    genres: ['Musical', 'Drama'],
    cast: ['Vicente Duarte', 'Glória Tavares', 'Fábio Miranda'],
    director: 'Augusto Lemos',
    country: 'Brasil',
    tagline: 'Todo ruído tem uma partitura.',
    synopsis:
      'Um maestro surdo aceita reger uma orquestra formada por operários de uma siderúrgica prestes a fechar. Em vez de instrumentos tradicionais, ele compõe com o som da própria fábrica.',
    palette: ['#ffb347', '#2a1a10'],
  },
  {
    id: 'fronteira-selvagem',
    title: 'Fronteira Selvagem',
    type: 'movie',
    year: 2023,
    ageRating: '14',
    score: 7.9,
    durationMin: 135,
    genres: ['Faroeste', 'Aventura', 'Ação'],
    cast: ['Juliano Porto', 'Esperança Duval', 'Caleb Moraes'],
    director: 'Nara Fontes',
    country: 'Brasil',
    tagline: 'A lei chega a cavalo.',
    synopsis:
      'Uma mensageira percorre o sertão entregando cartas de quem não sabe ler para quem não sabe escrever. Ao carregar um envelope que vale uma guerra, ela vira a única lei de três cidades sem juiz.',
    palette: ['#e2703a', '#2b1608'],
  },
  {
    id: 'furia-dourada',
    title: 'Fúria Dourada',
    type: 'movie',
    year: 2026,
    ageRating: '14',
    score: 8.3,
    durationMin: 129,
    genres: ['Ação', 'Aventura', 'Crime'],
    cast: ['Duda Salvatti', 'Kwame Osei', 'Bianca Ferraz'],
    director: 'Murilo Terra',
    country: 'Brasil',
    tagline: 'Ela não veio roubar. Veio devolver.',
    synopsis:
      'Uma pilota de resgate aposentada descobre que o carregamento que salvou de um incêndio pertence à mesma organização que destruiu sua cidade. Com um caminhão, três dias e nenhuma bala, ela começa a devolver tudo.',
    palette: ['#ffcc33', '#3d1c00'],
    badge: 'Estreia ORION',
  },
  {
    id: 'mare-alta',
    title: 'Maré Alta',
    type: 'movie',
    year: 2025,
    ageRating: '12',
    score: 7.7,
    durationMin: 106,
    genres: ['Aventura', 'Drama', 'Família'],
    cast: ['Íris Camargo', 'Benjamin Sá', 'Nalu Ferreira'],
    director: 'Tainá Rocha',
    country: 'Brasil',
    tagline: 'O mar não espera ninguém crescer.',
    synopsis:
      'Uma menina de doze anos decide velejar sozinha até o farol onde o irmão desapareceu. Na travessia, ela encontra uma baleia encalhada e uma verdade que a família escondeu por dois anos.',
    palette: ['#3fd6c0', '#052a35'],
  },
  {
    id: 'contos-de-lisboa',
    title: 'Contos de Lisboa',
    type: 'movie',
    year: 2024,
    ageRating: '12',
    score: 8.1,
    durationMin: 117,
    genres: ['Drama', 'Romance', 'Música'],
    cast: ['Madalena Cruz', 'Afonso Belmonte', 'Carla Nogueira'],
    director: 'Miguel Faria',
    country: 'Portugal',
    tagline: 'A cidade também canta.',
    synopsis:
      'Cinco histórias se cruzam em uma noite de fado, quando o elevador de Santa Justa fica parado por três horas. Dentro dele, um compositor ouve a canção que procura há vinte anos.',
    palette: ['#e8c37a', '#241505'],
  },
  {
    id: 'protocolo-zero',
    title: 'Protocolo Zero',
    type: 'series',
    year: 2026,
    ageRating: '14',
    score: 8.2,
    genres: ['Thriller', 'Tecnologia', 'Mistério'],
    cast: ['Lorenzo Sá', 'Aisha Rahman', 'Bento Vidal'],
    director: 'Clarice Nunes',
    country: 'Brasil',
    tagline: 'Alguém apagou o começo de tudo.',
    synopsis:
      'Uma engenheira de software acorda e descobre que o mundo inteiro usa um aplicativo que ela não se lembra de ter criado. Cada atualização apaga uma memória coletiva — e a próxima está marcada para amanhã.',
    palette: ['#8b5cf6', '#0b0620'],
    badge: 'Nova série',
    seasons: buildSeasons([{ number: 1, episodes: 8, year: 2026 }]),
  },
  {
    id: 'herdeiros-do-sol',
    title: 'Herdeiros do Sol',
    type: 'series',
    year: 2023,
    ageRating: '16',
    score: 8.9,
    genres: ['Drama', 'Épica', 'História'],
    cast: ['Aurora Vasques', 'Domênico Rocha', 'Yara Sampaio', 'Ramon Alencar'],
    director: 'Beatriz Cordeiro',
    country: 'Brasil',
    tagline: 'Quatro gerações, uma única colheita.',
    synopsis:
      'De 1920 aos dias de hoje, uma família de produtores rurais transforma uma fazenda improdutiva em um dos maiores impérios do país. Cada geração herda a terra — e a dívida de quem veio antes.',
    palette: ['#f5c76b', '#2c1c05'],
    top10: 8,
    seasons: buildSeasons([
      { number: 1, episodes: 8, year: 2020 },
      { number: 2, episodes: 9, year: 2021 },
      { number: 3, episodes: 8, year: 2022 },
      { number: 4, episodes: 10, year: 2023 },
    ]),
  },
  {
    id: 'cacadores-de-auroras',
    title: 'Caçadores de Auroras',
    type: 'series',
    year: 2025,
    ageRating: 'L',
    score: 8.7,
    genres: ['Documentário', 'Natureza'],
    cast: ['Narração: Clara Monteiro'],
    director: 'Equipe ORION Documenta',
    country: 'Brasil',
    tagline: 'O céu mais bonito do mundo acontece no frio.',
    synopsis:
      'Uma equipe de cineastas passa um inverno inteiro acima do círculo polar registrando auroras boreais. O que começou como um documentário de natureza se torna um retrato sobre espera, silêncio e luz.',
    palette: ['#59f7c8', '#071b2b'],
    badge: 'Documentário',
    seasons: buildSeasons([{ number: 1, episodes: 6, year: 2025 }]),
  },
  {
    id: 'cozinha-de-bairro',
    title: 'Cozinha de Bairro',
    type: 'series',
    year: 2024,
    ageRating: 'L',
    score: 8.3,
    genres: ['Documentário', 'Gastronomia', 'Realidade'],
    cast: ['Apresentação: Túlio Amaral'],
    director: 'Sofia Meireles',
    country: 'Brasil',
    tagline: 'Toda receita tem um endereço.',
    synopsis:
      'Um chef percorre lanchonetes, biroscas e cozinhas de fundo de quintal para descobrir os pratos que só existem a três quadras de distância. Cada episódio termina com a receita nas mãos de quem a inventou.',
    palette: ['#ff8a5c', '#2a1108'],
    seasons: buildSeasons([
      { number: 1, episodes: 8, year: 2023 },
      { number: 2, episodes: 8, year: 2024 },
    ]),
  },
  {
    id: 'vozes-do-amanha',
    title: 'Vozes do Amanhã',
    type: 'series',
    year: 2026,
    ageRating: '14',
    score: 8.5,
    genres: ['Ficção científica', 'Drama', 'Mistério'],
    cast: ['Nara Bittencourt', 'Samuel Okafor', 'Lorenza Dias'],
    director: 'Vitor Hugo Sá',
    country: 'Brasil',
    tagline: 'Eles ouvem o futuro. E ele está com raiva.',
    synopsis:
      'Um grupo de adolescentes começa a receber áudios de si mesmos com cinco anos de antecedência. Quando as mensagens passam a pedir socorro, eles entendem que o futuro não está avisando: está recrutando.',
    palette: ['#7dd3fc', '#101a3a'],
    badge: 'Nova série',
    seasons: buildSeasons([{ number: 1, episodes: 8, year: 2026 }]),
  },
  {
    id: 'plantao-24',
    title: 'Plantão 24',
    type: 'series',
    year: 2024,
    ageRating: '14',
    score: 8.0,
    genres: ['Drama', 'Médico'],
    cast: ['Rita Albuquerque', 'Gustavo Pires', 'Nadia Koury'],
    director: 'Leandro Bicudo',
    country: 'Brasil',
    tagline: 'Vinte e quatro horas para errar uma vez.',
    synopsis:
      'Num hospital público de emergência, uma equipe recém-formada enfrenta o primeiro plantão sozinha. Entre corredores lotados e decisões impossíveis, cada hora custa uma escolha que não pode ser desfeita.',
    palette: ['#48d6a8', '#07231f'],
    seasons: buildSeasons([
      { number: 1, episodes: 10, year: 2022 },
      { number: 2, episodes: 10, year: 2023 },
      { number: 3, episodes: 10, year: 2024 },
    ]),
  },
  {
    id: 'o-jogo-das-sombras',
    title: 'O Jogo das Sombras',
    type: 'series',
    year: 2025,
    ageRating: '16',
    score: 8.8,
    genres: ['Suspense', 'Espionagem', 'Ação'],
    cast: ['Marco Aurélio Pinto', 'Laila Costa', 'Dimitri Vaz'],
    director: 'Renan Aguiar',
    country: 'Brasil',
    tagline: 'A melhor mentira é a que você acredita.',
    synopsis:
      'Uma tradutora de conferências descobre que as conversas que interpreta são instruções para assassinatos. Sem saber em quem confiar, ela começa a traduzir errado de propósito — e alguém percebe.',
    palette: ['#c084fc', '#12061f'],
    top10: 9,
    seasons: buildSeasons([
      { number: 1, episodes: 8, year: 2024 },
      { number: 2, episodes: 8, year: 2025 },
    ]),
  },
  {
    id: 'familia-vargas',
    title: 'Família Vargas',
    type: 'series',
    year: 2023,
    ageRating: '12',
    score: 8.1,
    genres: ['Comédia', 'Drama', 'Família'],
    cast: ['Dona Cida Vargas', 'Zeca Vargas', 'Paula Vargas', 'Téo Vargas'],
    director: 'Márcia Lopes',
    country: 'Brasil',
    tagline: 'Ninguém escolhe a família. Só o almoço de domingo.',
    synopsis:
      'Quatro gerações da mesma família dividem uma casa herdada e nenhuma conta paga. Cada domingo é uma nova tentativa de parecer normal — e um novo motivo para rir depois.',
    palette: ['#ffd166', '#26160a'],
    seasons: buildSeasons([
      { number: 1, episodes: 10, year: 2021 },
      { number: 2, episodes: 10, year: 2022 },
      { number: 3, episodes: 10, year: 2023 },
    ]),
  },
  {
    id: 'liga-dos-pequenos',
    title: 'Liga dos Pequenos',
    type: 'series',
    year: 2025,
    ageRating: 'L',
    score: 8.2,
    genres: ['Infantil', 'Aventura', 'Família'],
    cast: ['Vozes de: Bia Nunes', 'Kiko Alves', 'Malu Prado'],
    director: 'Cacá Ribas',
    country: 'Brasil',
    tagline: 'Grandes missões em corpos pequenos.',
    synopsis:
      'Cinco crianças transformam o quintal do condomínio em uma base secreta de resgate de animais. Cada missão exige invenção, coragem e a certeza de que nenhum bicho fica para trás.',
    palette: ['#6ee7b7', '#0d2b26'],
    seasons: buildSeasons([{ number: 1, episodes: 10, year: 2025 }]),
  },
  {
    id: 'noite-dos-gramados',
    title: 'Noite dos Gramados',
    type: 'movie',
    year: 2025,
    ageRating: '10',
    score: 7.9,
    durationMin: 104,
    genres: ['Comédia', 'Esporte', 'Família'],
    cast: ['Juninho Peixoto', 'Valéria Braga', 'Osvaldo Nunes'],
    director: 'Paulo Henrique Sá',
    country: 'Brasil',
    tagline: 'O time mais improvisado do campeonato.',
    synopsis:
      'Um grupo de vizinhos forma um time de futebol para salvar a quadra do bairro de uma construtora. Sem técnico, sem uniforme e com um goleiro que tem medo de bola, eles chegam à final mais improvável da cidade.',
    palette: ['#a3e635', '#14230a'],
  },
  {
    id: 'cartografia-do-medo',
    title: 'Cartografia do Medo',
    type: 'movie',
    year: 2024,
    ageRating: '16',
    score: 8.0,
    durationMin: 113,
    genres: ['Suspense', 'Mistério', 'Drama'],
    cast: ['Sara Belmonte', 'Elias Rangel', 'Mirela Coutinho'],
    director: 'Ivan Sarmento',
    country: 'Brasil',
    tagline: 'O mapa termina onde começa o medo.',
    synopsis:
      'Uma cartógrafa é enviada para mapear um distrito que nunca apareceu em nenhum censo. Ao voltar, os mapas que desenhou mostram ruas que ninguém mais consegue encontrar.',
    palette: ['#cbd5e1', '#101827'],
    badge: 'Novo',
  },
  {
    id: 'alem-do-horizonte',
    title: 'Além do Horizonte',
    type: 'movie',
    year: 2022,
    ageRating: '12',
    score: 8.6,
    durationMin: 136,
    genres: ['Aventura', 'Ficção científica', 'Família'],
    cast: ['Davi Sottomayor', 'Estela Mar', 'Ravi Prado'],
    director: 'Teresa Nogueira',
    country: 'Brasil',
    tagline: 'Toda distância é uma questão de escala.',
    synopsis:
      'Um menino constrói um radiotelescópio com sucata para tentar falar com a mãe, que trabalha em uma base no deserto do Atacama. Quando recebe resposta, ela não vem do deserto.',
    palette: ['#f472b6', '#1b0b2b'],
  },
]

function withDerived(title) {
  const episodesCount = title.seasons
    ? title.seasons.reduce((total, season) => total + season.episodes.length, 0)
    : 0
  return {
    ...title,
    episodesCount,
    durationLabel:
      title.type === 'movie'
        ? `${title.durationMin} min`
        : `${title.seasons.length} ${title.seasons.length > 1 ? 'temporadas' : 'temporada'}`,
    yearLabel: title.type === 'movie' ? String(title.year) : `${title.year}–`,
  }
}

export const titles = RAW.map(withDerived)

export const genres = [...new Set(titles.flatMap((title) => title.genres))].sort((a, b) =>
  a.localeCompare(b, 'pt-BR'),
)

export function cardOf(title) {
  return {
    id: title.id,
    title: title.title,
    type: title.type,
    year: title.year,
    yearLabel: title.yearLabel,
    ageRating: title.ageRating,
    score: title.score,
    genres: title.genres,
    palette: title.palette,
    tagline: title.tagline,
    durationLabel: title.durationLabel,
    badge: title.badge ?? null,
    top10: title.top10 ?? null,
    progress: title.progress ?? null,
  }
}

export function detailOf(title) {
  return {
    ...cardOf(title),
    synopsis: title.synopsis,
    cast: title.cast,
    director: title.director,
    country: title.country,
    durationMin: title.durationMin ?? null,
    seasons: title.seasons ?? [],
    episodesCount: title.episodesCount,
  }
}

export const byId = new Map(titles.map((title) => [title.id, title]))

export const heroTitles = titles
  .filter((title) => title.featured)
  .sort((a, b) => a.featured - b.featured)
  .slice(0, 4)

const top10 = titles
  .filter((title) => title.top10)
  .sort((a, b) => a.top10 - b.top10)
  .slice(0, 10)

const trending = titles.filter((title) => title.top10).sort((a, b) => b.score - a.score).slice(0, 12)

const newReleases = titles
  .filter((title) => title.year >= 2025)
  .sort((a, b) => b.year - a.year || b.score - a.score)

const continueWatching = titles
  .filter((title) => typeof title.progress === 'number')
  .sort((a, b) => b.progress - a.progress)

function withGenre(genre) {
  return titles.filter((title) => title.genres.includes(genre))
}

export function homePayload() {
  const rows = [
    {
      id: 'continue',
      title: 'Continuar assistindo',
      subtitle: 'Retome de onde parou',
      link: '/minha-lista',
      items: continueWatching.map(cardOf),
    },
    {
      id: 'trending',
      title: 'Em alta agora',
      subtitle: 'O que todo mundo está assistindo',
      link: '/catalogo?ordenar=score',
      items: trending.map(cardOf),
    },
    {
      id: 'top10',
      title: 'Top 10 no Brasil hoje',
      subtitle: 'Ranking atualizado diariamente',
      link: '/catalogo?ordenar=score',
      ranked: true,
      items: top10.map(cardOf),
    },
    {
      id: 'series',
      title: 'Séries ORION premiadas',
      subtitle: 'Histórias longas para maratonar',
      link: '/series',
      items: titles
        .filter((title) => title.type === 'series')
        .sort((a, b) => b.score - a.score)
        .map(cardOf),
    },
    {
      id: 'movies',
      title: 'Filmes para a sessão da noite',
      subtitle: 'Escolhidos pela curadoria ORION',
      link: '/filmes',
      items: titles
        .filter((title) => title.type === 'movie')
        .sort((a, b) => b.score - a.score)
        .map(cardOf),
    },
    {
      id: 'scifi',
      title: 'Ficção científica e futuros possíveis',
      link: '/catalogo?genero=Fic%C3%A7%C3%A3o%20cient%C3%ADfica',
      items: withGenre('Ficção científica').map(cardOf),
    },
    {
      id: 'new',
      title: 'Novidades da semana',
      subtitle: 'Chegou agora no catálogo',
      link: '/catalogo?ordenar=year',
      items: newReleases.map(cardOf),
    },
    {
      id: 'suspense',
      title: 'Suspense e mistério',
      subtitle: 'Para quem gosta de descobrir junto',
      link: '/catalogo?genero=Suspense',
      items: withGenre('Suspense').map(cardOf),
    },
    {
      id: 'family',
      title: 'Para assistir com a família',
      link: '/catalogo?genero=Fam%C3%ADlia',
      items: titles
        .filter((title) => ['L', '10', '12'].includes(title.ageRating))
        .sort((a, b) => b.score - a.score)
        .map(cardOf),
    },
  ].filter((row) => row.items.length > 0)

  return {
    hero: heroTitles.map(detailOf),
    continueWatching: continueWatching.map(cardOf),
    rows,
    genres,
    total: titles.length,
  }
}

export function searchTitles({ q = '', type = 'all', genre = 'all', sort = 'relevance' } = {}) {
  const term = q.trim().toLowerCase()
  const normalized = (value) =>
    value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

  let result = titles.filter((title) => {
    if (type !== 'all' && title.type !== type) return false
    if (genre !== 'all' && !title.genres.includes(genre)) return false
    if (!term) return true
    const haystack = normalized(
      [title.title, title.tagline, title.synopsis, title.genres.join(' '), title.cast.join(' '), title.director].join(
        ' ',
      ),
    )
    return haystack.includes(normalized(term))
  })

  if (sort === 'score') result = [...result].sort((a, b) => b.score - a.score)
  if (sort === 'year') result = [...result].sort((a, b) => b.year - a.year)
  if (sort === 'az') result = [...result].sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'))
  if (sort === 'relevance' && term) {
    result = [...result].sort((a, b) => {
      const aStarts = normalized(a.title).startsWith(normalized(term)) ? 0 : 1
      const bStarts = normalized(b.title).startsWith(normalized(term)) ? 0 : 1
      return aStarts - bStarts || b.score - a.score
    })
  }

  return result
}

export function similarTo(title) {
  return titles
    .filter((candidate) => candidate.id !== title.id)
    .map((candidate) => ({
      candidate,
      weight: candidate.genres.filter((genre) => title.genres.includes(genre)).length * 2 +
        (candidate.type === title.type ? 1 : 0),
    }))
    .filter((entry) => entry.weight > 1)
    .sort((a, b) => b.weight - a.weight || b.candidate.score - a.candidate.score)
    .slice(0, 8)
    .map((entry) => cardOf(entry.candidate))
}
