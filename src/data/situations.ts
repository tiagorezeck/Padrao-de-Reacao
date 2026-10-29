/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Situation } from '../types/comet';

export const SITUATIONS: Situation[] = [
  {
    id: 1,
    themeNumber: 1,
    themeTopic: 'Receber uma crítica',
    category: 'Crítica e Avaliação',
    title: 'Crítica direta ao seu trabalho recém-entregue',
    context: 'Você finalizou uma tarefa importante após horas de dedicação e, logo na primeira avaliação, alguém aponta falhas e diz que o resultado não atendeu ao esperado.',
    alternatives: [
      {
        id: 'A',
        text: 'Contesto prontamente os pontos levantados e defendo a qualidade do que fiz.',
        primaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Reação imediata de defesa assertiva e contragolpe à crítica recebida.'
      },
      {
        id: 'B',
        text: 'Respiro fundo, ouço sem interromper e peço exemplos claros do que ficou abaixo do esperado antes de responder.',
        primaryDimension: 'regulacao_antes_resposta',
        secondaryDimension: 'flexibilidade_resposta',
        weight: 1,
        conceptualRationale: 'Criação de intervalo consciente para validar fatos antes de reagir.'
      },
      {
        id: 'C',
        text: 'Fico desanimado e começo a questionar minha própria competência para a função.',
        primaryDimension: 'autodirecionamento_reacao',
        weight: 1,
        conceptualRationale: 'Internalização e autocrítica punitiva imediata.'
      },
      {
        id: 'D',
        text: 'Deixo a conversa de lado naquele momento para evitar qualquer atrito e sigo com o resto do dia.',
        primaryDimension: 'retraimento_evitacao',
        weight: 1,
        conceptualRationale: 'Esquiva do desconforto interpessoal da crítica.'
      }
    ]
  },
  {
    id: 2,
    themeNumber: 2,
    themeTopic: 'Ser contrariado em uma decisão',
    category: 'Contrariedade e Discordância',
    title: 'Decisão estruturada sendo rejeitada pelo grupo',
    context: 'Você apresentou uma solução planejada em detalhes, mas os colegas decidem adotar outro caminho com o qual você discorda abertamente.',
    alternatives: [
      {
        id: 'A',
        text: 'Alertando que os outros serão responsáveis caso a escolha deles dê errado, me descomprometo com o plano.',
        primaryDimension: 'externalizacao_responsabilidade',
        weight: 1,
        conceptualRationale: 'Transferência antecipada da responsabilidade por eventuais falhas.'
      },
      {
        id: 'B',
        text: 'Insisto veementemente nos meus argumentos e mostro por que a ideia deles é arriscada.',
        primaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Contestação insistente contra a decisão que contrariou sua proposta.'
      },
      {
        id: 'C',
        text: 'Aceito a decisão da maioria e concentro minha energia em adaptar minha parte para fazer o plano escolhido funcionar.',
        primaryDimension: 'reorganizacao_solucao',
        secondaryDimension: 'flexibilidade_resposta',
        weight: 1,
        conceptualRationale: 'Pragmatismo voltado à execução e adaptação às condições reais.'
      },
      {
        id: 'D',
        text: 'Fico em silêncio durante o restante da discussão e evito opinar dali em diante.',
        primaryDimension: 'retraimento_evitacao',
        weight: 1,
        conceptualRationale: 'Recuo do envolvimento após a contrariedade.'
      }
    ]
  },
  {
    id: 3,
    themeNumber: 3,
    themeTopic: 'Cometer um erro diante de outras pessoas',
    category: 'Crítica e Avaliação',
    title: 'Equívoco evidente exposto em público',
    context: 'Durante uma apresentação ou reunião, você comete um equívoco técnico ou de dados que é imediatamente notado e corrigido por alguém presente.',
    alternatives: [
      {
        id: 'A',
        text: 'Reconheço a correção com tranquilidade, ajusto o dado na hora e dou continuidade ao assunto.',
        primaryDimension: 'flexibilidade_resposta',
        secondaryDimension: 'regulacao_antes_resposta',
        weight: 1,
        conceptualRationale: 'Maturidade de ajuste comportamental sem perda de rumo.'
      },
      {
        id: 'B',
        text: 'Sinto um constrangimento intenso e fico remoendo a cena mesmo horas depois de terminada a reunião.',
        primaryDimension: 'autodirecionamento_reacao',
        secondaryDimension: 'foco_obstaculo',
        weight: 1,
        conceptualRationale: 'Focalização no erro e ruminação sobre a própria imagem.'
      },
      {
        id: 'C',
        text: 'Justifico que a informação que me passaram estava incorreta ou desatualizada.',
        primaryDimension: 'externalizacao_responsabilidade',
        weight: 1,
        conceptualRationale: 'Atribuição da falha a fontes externas ou terceiros.'
      },
      {
        id: 'D',
        text: 'Reajo com rispidez ao modo como a pessoa me corrigiu na frente dos outros.',
        primaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Deslocamento da resposta para a forma da interrupção pública.'
      }
    ]
  },
  {
    id: 4,
    themeNumber: 4,
    themeTopic: 'Ter um plano interrompido',
    category: 'Controle e Imprevistos',
    title: 'Cancelamento repentino de uma atividade programada',
    context: 'Um compromisso ou projeto pessoal muito aguardado é cancelado de última hora por fatores fora do seu controle.',
    alternatives: [
      {
        id: 'A',
        text: 'Fico fixado no tempo e esforço perdidos com os preparativos, sentindo profunda irritação com o cancelamento.',
        primaryDimension: 'foco_obstaculo',
        weight: 1,
        conceptualRationale: 'Ancoragem na perda e no desperdício do esforço empenhado.'
      },
      {
        id: 'B',
        text: 'Aproveito imediatamente o tempo livre para adiantar outras pendências úteis ou descansar.',
        primaryDimension: 'reorganizacao_solucao',
        secondaryDimension: 'flexibilidade_resposta',
        weight: 1,
        conceptualRationale: 'Redirecionamento prático de recursos de tempo.'
      },
      {
        id: 'C',
        text: 'Expresso minha frustração com vigor para quem me deu a notícia, cobrando explicações.',
        primaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Externalização de insatisfação imediata.'
      },
      {
        id: 'D',
        text: 'Me fecho no meu canto, sem vontade de fazer mais nada pelo restante do dia.',
        primaryDimension: 'retraimento_evitacao',
        weight: 1,
        conceptualRationale: 'Desengajamento comportamental após a quebra do plano.'
      }
    ]
  },
  {
    id: 5,
    themeNumber: 5,
    themeTopic: 'Enfrentar um atraso inesperado',
    category: 'Obstáculos e Prazos',
    title: 'Atraso de terceiros que afeta sua programação',
    context: 'Você precisa de um retorno ou documento de outra pessoa para concluir sua parte, mas a entrega não acontece no horário combinado e ela não atende.',
    alternatives: [
      {
        id: 'A',
        text: 'Mantenho a calma, procuro saber se houve algum imprevisto grave e reestipulo o prazo de forma realista.',
        primaryDimension: 'regulacao_antes_resposta',
        secondaryDimension: 'flexibilidade_resposta',
        weight: 1,
        conceptualRationale: 'Controle de impulso com busca de contextualização prévia.'
      },
      {
        id: 'B',
        text: 'Envio mensagens frequentes cobrando a entrega e demonstrando claramente minha insatisfação com a falta de palavra.',
        primaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Pressão direta e cobrança enfática perante o atraso.'
      },
      {
        id: 'C',
        text: 'Passo a pensar em planos alternativos para seguir em frente sem depender daquele retorno imediato.',
        primaryDimension: 'reorganizacao_solucao',
        weight: 1,
        conceptualRationale: 'Foco na autonomia de contingência e busca de alternativas.'
      },
      {
        id: 'D',
        text: 'Reclamo com colegas próximos sobre a total falta de compromisso e pontualidade da pessoa.',
        primaryDimension: 'externalizacao_responsabilidade',
        secondaryDimension: 'foco_obstaculo',
        weight: 1,
        conceptualRationale: 'Foco no descaso alheio compartilhado como desabafo.'
      }
    ]
  },
  {
    id: 6,
    themeNumber: 6,
    themeTopic: 'Ser injustiçado ou acreditar que foi tratado injustamente',
    category: 'Justiça e Reconhecimento',
    title: 'Distribuição desbalanceada de responsabilidades',
    context: 'Em uma divisão de tarefas ou benefícios, você percebe que ficou com uma carga desproporcionalmente pesada enquanto outros foram poupados.',
    alternatives: [
      {
        id: 'A',
        text: 'Solicito uma conversa com quem coordenou a divisão, exponho os critérios objetivos com firmeza e peço a revisão.',
        primaryDimension: 'confrontacao_reativa',
        secondaryDimension: 'reorganizacao_solucao',
        weight: 1,
        conceptualRationale: 'Enfrentamento explícito da injustiça percebida via negociação direta.'
      },
      {
        id: 'B',
        text: 'Assumo a tarefa em silêncio, mas internamente guardo mágoa e faço apenas o mínimo estritamente exigido.',
        primaryDimension: 'retraimento_evitacao',
        weight: 1,
        conceptualRationale: 'Conformismo aparente com resistência passiva velada.'
      },
      {
        id: 'C',
        text: 'Fico pensando no quanto sou ingênuo por sempre aceitar as coisas sem reclamar a tempo.',
        primaryDimension: 'autodirecionamento_reacao',
        weight: 1,
        conceptualRationale: 'Autoculpabilização pela passividade percebida.'
      },
      {
        id: 'D',
        text: 'Avalio se a divisão faz sentido no contexto geral do projeto antes de decidir se vale a pena contestar formalmente.',
        primaryDimension: 'flexibilidade_resposta',
        secondaryDimension: 'regulacao_antes_resposta',
        weight: 1,
        conceptualRationale: 'Ponderação contextual de custos e benefícios da contestação.'
      }
    ]
  },
  {
    id: 7,
    themeNumber: 7,
    themeTopic: 'Sentir-se ignorado',
    category: 'Acordos e Convivência',
    title: 'Ideia desconsiderada na discussão em grupo',
    context: 'Você dá uma opinião sincera sobre um problema relevante, mas a conversa segue em frente como se você não tivesse falado nada.',
    alternatives: [
      {
        id: 'A',
        text: 'Interrompo a conversa educadamente para reiterar minha observação e checar se compreenderam meu ponto.',
        primaryDimension: 'confrontacao_reativa',
        secondaryDimension: 'flexibilidade_resposta',
        weight: 1,
        conceptualRationale: 'Insistência ativa em ter sua presença e fala reconhecidas.'
      },
      {
        id: 'B',
        text: 'Não falo mais nada no restante do encontro, sentindo que minha presença ali é indiferente.',
        primaryDimension: 'retraimento_evitacao',
        weight: 1,
        conceptualRationale: 'Silenciamento e recolhimento social.'
      },
      {
        id: 'C',
        text: 'Observo a dinâmica do grupo para identificar o melhor momento de reapresentar a ideia de outra forma.',
        primaryDimension: 'regulacao_antes_resposta',
        secondaryDimension: 'reorganizacao_solucao',
        weight: 1,
        conceptualRationale: 'Leitura tática de ambiente com paciência estratégica.'
      },
      {
        id: 'D',
        text: 'Penso que minha colocação deve ter sido confusa ou desinteressante para os outros.',
        primaryDimension: 'autodirecionamento_reacao',
        weight: 1,
        conceptualRationale: 'Atribuição da indiferença a deficiência pessoal de comunicação.'
      }
    ]
  },
  {
    id: 8,
    themeNumber: 8,
    themeTopic: 'Receber uma negativa',
    category: 'Contrariedade e Discordância',
    title: 'Recusa direta a uma solicitação relevante',
    context: 'Você pediu um recurso, prazo ou apoio justificado para sua atividade e recebe um "não" enfático e definitivo.',
    alternatives: [
      {
        id: 'A',
        text: 'Procuro entender os motivos da recusa e negocio condições para tentar viabilizar uma versão reduzida.',
        primaryDimension: 'reorganizacao_solucao',
        secondaryDimension: 'flexibilidade_resposta',
        weight: 1,
        conceptualRationale: 'Busca ativa de caminhos alternativos e concessões possíveis.'
      },
      {
        id: 'B',
        text: 'Fico indignado com a falta de sensibilidade de quem negou e insisto no absurdo da resposta.',
        primaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Resistência indignada à negativa recebida.'
      },
      {
        id: 'C',
        text: 'Fico preso ao fato de que sem esse recurso o projeto está irremediavelmente comprometido.',
        primaryDimension: 'foco_obstaculo',
        weight: 1,
        conceptualRationale: 'Fixação no prejuízo decorrente da recusa.'
      },
      {
        id: 'D',
        text: 'Aceito a negativa sem argumentar e tento me virar com o que já tenho, mesmo ficando prejudicado.',
        primaryDimension: 'retraimento_evitacao',
        weight: 1,
        conceptualRationale: 'Submissão ao veto sem tentativa de renegociação.'
      }
    ]
  },
  {
    id: 9,
    themeNumber: 9,
    themeTopic: 'Ter o próprio trabalho questionado',
    category: 'Crítica e Avaliação',
    title: 'Dúvidas expressas sobre sua competência técnica',
    context: 'Um cliente, líder ou colega pergunta se você realmente tem preparo suficiente para conduzir a entrega que está sob sua responsabilidade.',
    alternatives: [
      {
        id: 'A',
        text: 'Respondo de forma incisiva lembrando meu histórico de entregas e questionando a fundamentação daquela dúvida.',
        primaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Defesa contundente de autoridade e reputação.'
      },
      {
        id: 'B',
        text: 'Mantenho a postura profissional, apresento o método e as evidências técnicas do que estou executando.',
        primaryDimension: 'regulacao_antes_resposta',
        secondaryDimension: 'reorganizacao_solucao',
        weight: 1,
        conceptualRationale: 'Resposta pautada em dados e regulação de compostura.'
      },
      {
        id: 'C',
        text: 'Sinto abalo profundo em minha autoconfiança, temendo que a pessoa tenha razão em desconfiar.',
        primaryDimension: 'autodirecionamento_reacao',
        weight: 1,
        conceptualRationale: 'Fragilização da autoconfiança com validação da dúvida alheia.'
      },
      {
        id: 'D',
        text: 'Atribuo a atitude da pessoa a ciúmes profissionais ou tentativa deliberada de me desestabilizar.',
        primaryDimension: 'externalizacao_responsabilidade',
        weight: 1,
        conceptualRationale: 'Interpretação da crítica como conspiração ou má intenção alheia.'
      }
    ]
  },
  {
    id: 10,
    themeNumber: 10,
    themeTopic: 'Perder uma oportunidade',
    category: 'Obstáculos e Prazos',
    title: 'Oportunidade aguardada que é concedida a outra pessoa',
    context: 'Uma vaga, viagem ou projeto que parecia reservado para você é de repente entregue a um colega.',
    alternatives: [
      {
        id: 'A',
        text: 'Focalizo na frustração e na sensação de que todo o esforço anterior foi em vão.',
        primaryDimension: 'foco_obstaculo',
        weight: 1,
        conceptualRationale: 'Concentração na perda e na quebra de perspectiva.'
      },
      {
        id: 'B',
        text: 'Converso com quem tomou a decisão para entender os critérios e identificar que competências preciso desenvolver.',
        primaryDimension: 'reorganizacao_solucao',
        secondaryDimension: 'regulacao_antes_resposta',
        weight: 1,
        conceptualRationale: 'Uso da perda como dado para desenvolvimento futuro.'
      },
      {
        id: 'C',
        text: 'Fico convencido de que houve favorecimento pessoal e jogo de interesses injusto.',
        primaryDimension: 'externalizacao_responsabilidade',
        weight: 1,
        conceptualRationale: 'Ceticismo com atribuição a conchavo e desonestidade do processo.'
      },
      {
        id: 'D',
        text: 'Me afasto da pessoa que ganhou a oportunidade e diminuo meu envolvimento com a equipe.',
        primaryDimension: 'retraimento_evitacao',
        weight: 1,
        conceptualRationale: 'Distanciamento relacional após a frustração comparativa.'
      }
    ]
  },
  {
    id: 11,
    themeNumber: 11,
    themeTopic: 'Lidar com uma pessoa que não cumpre um acordo',
    category: 'Acordos e Convivência',
    title: 'Descumprimento reincidente de compromisso firmado',
    context: 'Uma pessoa com quem você combinou papéis e prazos claros simplesmente não entrega o combinado e age com normalidade.',
    alternatives: [
      {
        id: 'A',
        text: 'Chamo a pessoa em particular imediatamente, mostro o acordo prévio e cobro uma solução sem rodeios.',
        primaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Enfrentamento explícito e cobrança incisiva de conformidade.'
      },
      {
        id: 'B',
        text: 'Assumo a parte dela para que a entrega não atrase, mesmo ficando sobrecarregado e irritado.',
        primaryDimension: 'reorganizacao_solucao',
        secondaryDimension: 'retraimento_evitacao',
        weight: 1,
        conceptualRationale: 'Resolução compensatória que evita o atrito interpessoal direto.'
      },
      {
        id: 'C',
        text: 'Paro o processo e deixo claro que a responsabilidade pela paralisação é exclusivamente dela.',
        primaryDimension: 'externalizacao_responsabilidade',
        secondaryDimension: 'foco_obstaculo',
        weight: 1,
        conceptualRationale: 'Exposição pública da culpabilidade do outro.'
      },
      {
        id: 'D',
        text: 'Pergunto o que aconteceu antes de julgar e procuro renegociar um prazo final firme e documentado.',
        primaryDimension: 'flexibilidade_resposta',
        secondaryDimension: 'regulacao_antes_resposta',
        weight: 1,
        conceptualRationale: 'Investigação inicial com preservação de limites claros.'
      }
    ]
  },
  {
    id: 12,
    themeNumber: 12,
    themeTopic: 'Precisar admitir que está errado',
    category: 'Crítica e Avaliação',
    title: 'Constatação inequívoca de que você cometeu um equívoco',
    context: 'Você defendeu uma posição com veemência, mas novas evidências provam que você estava redondamente enganado.',
    alternatives: [
      {
        id: 'A',
        text: 'Reconheço o erro prontamente e de forma explícita, propondo como corrigir o problema gerado.',
        primaryDimension: 'reorganizacao_solucao',
        secondaryDimension: 'flexibilidade_resposta',
        weight: 1,
        conceptualRationale: 'Humildade pragmática direcionada à reparação da consequência.'
      },
      {
        id: 'B',
        text: 'Tento relativizar o erro, mostrando que as premissas da época davam margem àquela interpretação.',
        primaryDimension: 'externalizacao_responsabilidade',
        weight: 1,
        conceptualRationale: 'Atenuação da culpa por meio de justificativas contextuais.'
      },
      {
        id: 'C',
        text: 'Fico severamente autocítico, sentindo que perdi a moral e a credibilidade com todos.',
        primaryDimension: 'autodirecionamento_reacao',
        weight: 1,
        conceptualRationale: 'Sentimento exagerado de vergonha e perda de valor pessoal.'
      },
      {
        id: 'D',
        text: 'Mudo de assunto rapidamente e evito tocar novamente no tópico do equívoco.',
        primaryDimension: 'retraimento_evitacao',
        weight: 1,
        conceptualRationale: 'Esquiva do embaraço de verbalizar a própria falha.'
      }
    ]
  },
  {
    id: 13,
    themeNumber: 13,
    themeTopic: 'Ser comparado com outra pessoa',
    category: 'Justiça e Reconhecimento',
    title: 'Comparação desfavorável explícita',
    context: 'Uma liderança ou figura próxima compara seus resultados com os de um colega, dizendo que você deveria ser mais como ele.',
    alternatives: [
      {
        id: 'A',
        text: 'Reajo dizendo que comparações são inadequadas e que meu método e contexto são diferentes.',
        primaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Rejeição frontal da legitimidade da comparação.'
      },
      {
        id: 'B',
        text: 'Internalizo a comparação e me sinto insuficiente em relação ao colega.',
        primaryDimension: 'autodirecionamento_reacao',
        weight: 1,
        conceptualRationale: 'Adoção da régua externa com desvalorização própria.'
      },
      {
        id: 'C',
        text: 'Filtro a forma indelicada e avalio se há alguma prática do colega que realmente valha a pena incorporar.',
        primaryDimension: 'flexibilidade_resposta',
        secondaryDimension: 'regulacao_antes_resposta',
        weight: 1,
        conceptualRationale: 'Separação de conteúdo útil de ruído emocional.'
      },
      {
        id: 'D',
        text: 'Passo a criticar o colega pelas costas para mostrar que ele não é tão perfeito quanto pensam.',
        primaryDimension: 'externalizacao_responsabilidade',
        weight: 1,
        conceptualRationale: 'Ataque indireto para desqualificar o padrão de comparação.'
      }
    ]
  },
  {
    id: 14,
    themeNumber: 14,
    themeTopic: 'Ter uma expectativa frustrada',
    category: 'Controle e Imprevistos',
    title: 'Resultado muito inferior ao investimento feito',
    context: 'Você planejou um evento ou projeto por semanas na certeza de grande repercussão, mas a adesão foi quase nula.',
    alternatives: [
      {
        id: 'A',
        text: 'Fico remoendo o fracasso, pensando que não deveria ter tentado nada daquilo.',
        primaryDimension: 'autodirecionamento_reacao',
        secondaryDimension: 'foco_obstaculo',
        weight: 1,
        conceptualRationale: 'Arrependimento autodirigido e paralisia reflexiva.'
      },
      {
        id: 'B',
        text: 'Analiso os números com calma para diagnosticar onde a divulgação ou proposta falhou e como replanejar.',
        primaryDimension: 'reorganizacao_solucao',
        secondaryDimension: 'regulacao_antes_resposta',
        weight: 1,
        conceptualRationale: 'Abordagem investigativa com foco em diagnóstico analítico.'
      },
      {
        id: 'C',
        text: 'Coloco a culpa no desinteresse e na falta de consideração do público convidado.',
        primaryDimension: 'externalizacao_responsabilidade',
        weight: 1,
        conceptualRationale: 'Deslocamento da causa exclusivamente para a atitude do público.'
      },
      {
        id: 'D',
        text: 'Cancelo tudo de imediato e decido me afastar desse tipo de iniciativa por um longo período.',
        primaryDimension: 'retraimento_evitacao',
        weight: 1,
        conceptualRationale: 'Abandono definitivo da frente para evitar nova frustração.'
      }
    ]
  },
  {
    id: 15,
    themeNumber: 15,
    themeTopic: 'Sentir que perdeu o controle de uma situação',
    category: 'Controle e Imprevistos',
    title: 'Imprevistos múltiplos ocorrendo simultaneamente',
    context: 'Várias variáveis saem do curso ao mesmo tempo: prazos encurtam, fornecedores atrasam e o escopo muda sem seu aval.',
    alternatives: [
      {
        id: 'A',
        text: 'Faço uma pausa obrigatória para respirar e listar estritamente o que depende de mim versus o que está fora de alcance.',
        primaryDimension: 'regulacao_antes_resposta',
        secondaryDimension: 'flexibilidade_resposta',
        weight: 1,
        conceptualRationale: 'Pausa deliberada para triagem de esferas de controle.'
      },
      {
        id: 'B',
        text: 'Tento forçar as pessoas a acelerarem, elevando o tom de cobrança para tentar retomar o comando.',
        primaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Tentativa de reassumir o controle por meio da imposição enérgica.'
      },
      {
        id: 'C',
        text: 'Sinto uma sensação paralisante de ansiedade e permaneço focado no risco de colapso do projeto.',
        primaryDimension: 'foco_obstaculo',
        secondaryDimension: 'autodirecionamento_reacao',
        weight: 1,
        conceptualRationale: 'Ansiedade com foco exclusivo nas consequências catastróficas.'
      },
      {
        id: 'D',
        text: 'Repriorizo o escopo imediatamente, descartando o supérfluo para salvar o núcleo da entrega.',
        primaryDimension: 'reorganizacao_solucao',
        weight: 1,
        conceptualRationale: 'Pragmatismo de triagem e adaptação do produto viável.'
      }
    ]
  },
  {
    id: 16,
    themeNumber: 16,
    themeTopic: 'Receber uma ordem que considera inadequada',
    category: 'Contrariedade e Discordância',
    title: 'Diretriz impositiva com efeitos contraproducentes',
    context: 'Uma chefia determina que você execute uma tarefa de uma forma que você sabe por experiência que vai gerar retrabalho ou prejuízo.',
    alternatives: [
      {
        id: 'A',
        text: 'Recuso-me a cumprir daquela maneira e digo francamente que a ordem é insensata.',
        primaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Insubordinação ou confronto explícito contra a diretriz.'
      },
      {
        id: 'B',
        text: 'Apresento com calma os dados dos riscos previstos e proponho uma adaptação que preserve o objetivo da liderança.',
        primaryDimension: 'flexibilidade_resposta',
        secondaryDimension: 'reorganizacao_solucao',
        weight: 1,
        conceptualRationale: 'Negociação assertiva com foco em conciliação técnica.'
      },
      {
        id: 'C',
        text: 'Cumpro estritamente a ordem sem questionar, registrando que a responsabilidade do resultado será de quem mandou.',
        primaryDimension: 'externalizacao_responsabilidade',
        secondaryDimension: 'retraimento_evitacao',
        weight: 1,
        conceptualRationale: 'Conformismo passivo com transferência deliberada de culpa futura.'
      },
      {
        id: 'D',
        text: 'Guardo a indignação para mim, sinto frustração por não poder decidir e faço a tarefa de má vontade.',
        primaryDimension: 'foco_obstaculo',
        secondaryDimension: 'retraimento_evitacao',
        weight: 1,
        conceptualRationale: 'Remoagem do ressentimento sem ação externa.'
      }
    ]
  },
  {
    id: 17,
    themeNumber: 17,
    themeTopic: 'Ter um esforço pouco reconhecido',
    category: 'Justiça e Reconhecimento',
    title: 'Dedicação extraordinária sem qualquer menção',
    context: 'Você passou fins de semana trabalhando para garantir um resultado excelente, mas na comemoração oficial seu nome sequer é mencionado.',
    alternatives: [
      {
        id: 'A',
        text: 'Fico profundamente chateado, me sinto invisível e perco totalmente o ânimo de me esforçar pelo grupo.',
        primaryDimension: 'retraimento_evitacao',
        secondaryDimension: 'foco_obstaculo',
        weight: 1,
        conceptualRationale: 'Retraimento afetivo e desmobilização motivacional.'
      },
      {
        id: 'B',
        text: 'Em momento oportuno e com serenidade, converso com a coordenação e pontuo meu papel na entrega.',
        primaryDimension: 'regulacao_antes_resposta',
        secondaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Posicionamento assertivo planejado e sem explosão.'
      },
      {
        id: 'C',
        text: 'Publico indiretas ou reclamo abertamente sobre a injustiça com colegas próximos.',
        primaryDimension: 'confrontacao_reativa',
        secondaryDimension: 'externalizacao_responsabilidade',
        weight: 1,
        conceptualRationale: 'Manifestação reativa de revolta por canais alternativos.'
      },
      {
        id: 'D',
        text: 'Valorizo meu próprio aprendizado e os resultados práticos conquistados, sem depender de elogios externos.',
        primaryDimension: 'flexibilidade_resposta',
        weight: 1,
        conceptualRationale: 'Autovalidação madura com redução de dependência de aplausos.'
      }
    ]
  },
  {
    id: 18,
    themeNumber: 18,
    themeTopic: 'Enfrentar uma mudança inesperada',
    category: 'Controle e Imprevistos',
    title: 'Mudança drástica de regras no meio da execução',
    context: 'Uma nova política ou ferramenta é imposta de repente, exigindo que você mude completamente seus hábitos de trabalho.',
    alternatives: [
      {
        id: 'A',
        text: 'Reclamo veementemente da mudança e questiono por que mudar algo que já funcionava bem.',
        primaryDimension: 'confrontacao_reativa',
        secondaryDimension: 'foco_obstaculo',
        weight: 1,
        conceptualRationale: 'Resistência vocal imediata à novidade imprevista.'
      },
      {
        id: 'B',
        text: 'Foco no aprendizado do novo formato o mais rápido possível para recuperar minha produtividade.',
        primaryDimension: 'reorganizacao_solucao',
        weight: 1,
        conceptualRationale: 'Adaptação ativa com foco na curva de aprendizado.'
      },
      {
        id: 'C',
        text: 'Adio ao máximo o uso da nova ferramenta e continuo fazendo do jeito antigo enquanto for possível.',
        primaryDimension: 'retraimento_evitacao',
        weight: 1,
        conceptualRationale: 'Esquiva operacional e postergação da transição.'
      },
      {
        id: 'D',
        text: 'Avalio o que a mudança traz de vantagens e desvantagens, adaptando minha rotina com flexibilidade.',
        primaryDimension: 'flexibilidade_resposta',
        secondaryDimension: 'regulacao_antes_resposta',
        weight: 1,
        conceptualRationale: 'Modulação adaptativa com análise equilibrada de prós e contras.'
      }
    ]
  },
  {
    id: 19,
    themeNumber: 19,
    themeTopic: 'Lidar com uma falha de outra pessoa que afeta seu resultado',
    category: 'Acordos e Convivência',
    title: 'Erro de colega que recai sobre o cronograma de todos',
    context: 'Um colaborador apagou sem querer arquivos essenciais e agora você terá de refazer várias horas de compilação.',
    alternatives: [
      {
        id: 'A',
        text: 'Não escondo minha fúria e responsabilizo a pessoa com dureza pelo prejuízo causado a todos.',
        primaryDimension: 'confrontacao_reativa',
        secondaryDimension: 'externalizacao_responsabilidade',
        weight: 1,
        conceptualRationale: 'Explosão de reprovação centrada na culpa do outro.'
      },
      {
        id: 'B',
        text: 'Mobilizo a equipe para tentar recuperar backups e dividir o retrabalho de forma rápida.',
        primaryDimension: 'reorganizacao_solucao',
        weight: 1,
        conceptualRationale: 'Ação focada na mitigação prática do estrago.'
      },
      {
        id: 'C',
        text: 'Fico inconformado com a incompetência alheia e não consigo me concentrar na reconstrução do material.',
        primaryDimension: 'foco_obstaculo',
        secondaryDimension: 'externalizacao_responsabilidade',
        weight: 1,
        conceptualRationale: 'Paralisia cognitiva ancorada na indignação com o erro do outro.'
      },
      {
        id: 'D',
        text: 'Ajudo a acalmar o colega que errou e ajusto o cronograma com os interessados.',
        primaryDimension: 'flexibilidade_resposta',
        secondaryDimension: 'regulacao_antes_resposta',
        weight: 1,
        conceptualRationale: 'Empatia reguladora e repactuação de expectativas externas.'
      }
    ]
  },
  {
    id: 20,
    themeNumber: 20,
    themeTopic: 'Precisar esperar sem saber quando terá uma solução',
    category: 'Obstáculos e Prazos',
    title: 'Espera indefinida por uma resposta crucial',
    context: 'Você depende de uma aprovação jurídica ou técnica para poder avançar em sua vida ou projeto, mas os responsáveis dizem que não há prazo para resposta.',
    alternatives: [
      {
        id: 'A',
        text: 'Fico obcecado verificando status a todo momento, incapaz de relaxar ou render em outras tarefas.',
        primaryDimension: 'foco_obstaculo',
        weight: 1,
        conceptualRationale: 'Hiperfoco ansioso na incerteza e na perda de controle temporal.'
      },
      {
        id: 'B',
        text: 'Cobro diariamente com insistência agressiva, exigindo uma posição sob pena de escalar o caso.',
        primaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Pressão constante para abreviar a espera.'
      },
      {
        id: 'C',
        text: 'Aceito a indefinição temporária e canalizo minha atenção integral para projetos paralelos que dependem só de mim.',
        primaryDimension: 'flexibilidade_resposta',
        secondaryDimension: 'reorganizacao_solucao',
        weight: 1,
        conceptualRationale: 'Descentralização do foco para frentes de controle pessoal.'
      },
      {
        id: 'D',
        text: 'Desisto de acompanhar o processo e deixo as coisas correrem sozinhas sem qualquer monitoramento.',
        primaryDimension: 'retraimento_evitacao',
        weight: 1,
        conceptualRationale: 'Abandono da vigilância por esgotamento emocional.'
      }
    ]
  },
  {
    id: 21,
    themeNumber: 21,
    themeTopic: 'Ser interrompido ao falar',
    category: 'Acordos e Convivência',
    title: 'Interrupção reiterada durante exposição de ideias',
    context: 'Sempre que você começa a expor seu raciocínio em uma mesa de conversa, a mesma pessoa corta sua fala e passa a falar por cima de você.',
    alternatives: [
      {
        id: 'A',
        text: 'Falo mais alto no mesmo instante e digo firmemente: "Por favor, me deixe concluir meu pensamento".',
        primaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Imposição enérgica e imediata do direito à fala.'
      },
      {
        id: 'B',
        text: 'Interrompo minha fala na hora, fico calado e não volto a me manifestar naquele encontro.',
        primaryDimension: 'retraimento_evitacao',
        weight: 1,
        conceptualRationale: 'Silenciamento defensivo ante a invasão de espaço verbal.'
      },
      {
        id: 'C',
        text: 'Aguardo a pessoa concluir a intromissão sem demonstrar irritação e retomo com serenidade o ponto exato onde fui cortado.',
        primaryDimension: 'regulacao_antes_resposta',
        secondaryDimension: 'flexibilidade_resposta',
        weight: 1,
        conceptualRationale: 'Regulação de compostura com retomada elegante do raciocínio.'
      },
      {
        id: 'D',
        text: 'Penso que minha fala devia estar desinteressante e prolixa, e por isso fui atropelado.',
        primaryDimension: 'autodirecionamento_reacao',
        weight: 1,
        conceptualRationale: 'Justificativa do desrespeito alheio como falha da própria comunicação.'
      }
    ]
  },
  {
    id: 22,
    themeNumber: 22,
    themeTopic: 'Ter um limite pessoal desrespeitado',
    category: 'Justiça e Reconhecimento',
    title: 'Invasão de limites de tempo ou espaço pessoal',
    context: 'Uma pessoa do convívio faz exigências insistentes fora dos horários combinados ou invade sua privacidade sem justificativa plausível.',
    alternatives: [
      {
        id: 'A',
        text: 'Estabeleço o limite de forma imediata e transparente: respondo que aquele horário não está disponível e que falaremos no momento adequado.',
        primaryDimension: 'regulacao_antes_resposta',
        secondaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Demarcação clara de limites com autocontrole e firmeza.'
      },
      {
        id: 'B',
        text: 'Reajo com rispidez e agressividade para cortar de uma vez qualquer tentativa de aproximação indevida.',
        primaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Reação explosiva para repelir a invasão percebida.'
      },
      {
        id: 'C',
        text: 'Atendo a contragosto e reclamo depois para outras pessoas sobre a falta de noção da pessoa.',
        primaryDimension: 'retraimento_evitacao',
        secondaryDimension: 'externalizacao_responsabilidade',
        weight: 1,
        conceptualRationale: 'Cedência comportamental com desabafo ressentido posterior.'
      },
      {
        id: 'D',
        text: 'Sinto culpa por querer dizer não e acabo me convencendo de que sou egoísta por impor barreiras.',
        primaryDimension: 'autodirecionamento_reacao',
        weight: 1,
        conceptualRationale: 'Conflito interno de culpa ao cogitar preservar seus próprios limites.'
      }
    ]
  },
  {
    id: 23,
    themeNumber: 23,
    themeTopic: 'Ser responsabilizado por algo que acredita não ter causado',
    category: 'Justiça e Reconhecimento',
    title: 'Acusação injusta de erro cometido por outrem',
    context: 'Em uma apuração de problemas, apontam o dedo para você afirmando que a falha de um processo crítico foi sua.',
    alternatives: [
      {
        id: 'A',
        text: 'Rebato a acusação no ato, com raiva, exigindo retratação imediata de quem fez o comentário leviano.',
        primaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Contra-ataque indignado perante a imputação indevida.'
      },
      {
        id: 'B',
        text: 'Reúno os registros e históricos com objetividade para demonstrar tecnicamente onde ocorreu o problema, sem entrar em bate-boca.',
        primaryDimension: 'reorganizacao_solucao',
        secondaryDimension: 'regulacao_antes_resposta',
        weight: 1,
        conceptualRationale: 'Defesa documental desprovida de dramatização relacional.'
      },
      {
        id: 'C',
        text: 'Acuso de volta os verdadeiros culpados, expondo erros anteriores deles para desviar o foco de mim.',
        primaryDimension: 'externalizacao_responsabilidade',
        weight: 1,
        conceptualRationale: 'Retaliação direcionada com exposição de falhas alheias.'
      },
      {
        id: 'D',
        text: 'Fico tão chocado que me calo na hora, sentindo-me injustiçado e sem forças para me defender.',
        primaryDimension: 'retraimento_evitacao',
        secondaryDimension: 'foco_obstaculo',
        weight: 1,
        conceptualRationale: 'Paralisia emocional diante do choque da injustiça percebida.'
      }
    ]
  },
  {
    id: 24,
    themeNumber: 24,
    themeTopic: 'Lidar com divergências em um grupo',
    category: 'Contrariedade e Discordância',
    title: 'Debate tenso e polarizado na equipe',
    context: 'Uma decisão estratégica divide o time ao meio. O clima fica ríspido, as pessoas começam a atacar umas às outras e a reunião emperra.',
    alternatives: [
      {
        id: 'A',
        text: 'Entro no embate para defender meu lado com toda a força de argumentação possível.',
        primaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Adesão combativa à polarização.'
      },
      {
        id: 'B',
        text: 'Proponho pausar a discussão, sintetizar os pontos de convergência e buscar uma terceira via conciliatória.',
        primaryDimension: 'flexibilidade_resposta',
        secondaryDimension: 'reorganizacao_solucao',
        weight: 1,
        conceptualRationale: 'Mediação construtiva com foco em conciliação integrativa.'
      },
      {
        id: 'C',
        text: 'Desligo meu microfone ou me afasto fisicamente da sala para não me contaminar com o desgaste.',
        primaryDimension: 'retraimento_evitacao',
        weight: 1,
        conceptualRationale: 'Afastamento autoprotetor do estresse coletivo.'
      },
      {
        id: 'D',
        text: 'Fico irritado com a imaturidade do grupo e penso como é difícil trabalhar com gente tão teimosa.',
        primaryDimension: 'externalizacao_responsabilidade',
        secondaryDimension: 'foco_obstaculo',
        weight: 1,
        conceptualRationale: 'Julgamento depreciativo dos pares como desabafo mental.'
      }
    ]
  },
  {
    id: 25,
    themeNumber: 25,
    themeTopic: 'Receber uma resposta considerada grosseira',
    category: 'Acordos e Convivência',
    title: 'Tratamento ríspido e descortês inesperado',
    context: 'Ao fazer uma pergunta simples e rotineira, você recebe uma resposta atravessada, ríspida e com tom desrespeitoso.',
    alternatives: [
      {
        id: 'A',
        text: 'Respondo na mesma moeda e no mesmo tom, para deixar claro que não aceito ser tratado com desdém.',
        primaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Retribuição simétrica da agressividade.'
      },
      {
        id: 'B',
        text: 'Mantenho o tom sereno e pergunto diretamente: "Aconteceu algo? Fiz uma pergunta profissional e estranhei sua reação".',
        primaryDimension: 'regulacao_antes_resposta',
        secondaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Confrontação regulada que espelha o desrespeito sem se rebaixar ao tom.'
      },
      {
        id: 'C',
        text: 'Fico sem reação, engulo o sapo e fico magoado o resto do dia.',
        primaryDimension: 'retraimento_evitacao',
        secondaryDimension: 'autodirecionamento_reacao',
        weight: 1,
        conceptualRationale: 'Inibição comportamental com retenção de mágoa.'
      },
      {
        id: 'D',
        text: 'Reconheço que o mau humor pode ser um problema pessoal da pessoa que nada tem a ver comigo e sigo meu trabalho.',
        primaryDimension: 'flexibilidade_resposta',
        weight: 1,
        conceptualRationale: 'Despersonalização madura da indelicadeza do outro.'
      }
    ]
  },
  {
    id: 26,
    themeNumber: 26,
    themeTopic: 'Enfrentar uma falha de equipamento ou de processo',
    category: 'Obstáculos e Prazos',
    title: 'Pane de sistema a poucos minutos do prazo final',
    context: 'O software ou computador trava irreversivelmente faltando quinze minutos para o envio de um arquivo inadiável.',
    alternatives: [
      {
        id: 'A',
        text: 'Fico furioso, dou pancadas na mesa ou xingo a máquina, sentindo impotência total.',
        primaryDimension: 'confrontacao_reativa',
        secondaryDimension: 'foco_obstaculo',
        weight: 1,
        conceptualRationale: 'Descarga física impulsiva de frustração perante o objeto inanimado.'
      },
      {
        id: 'B',
        text: 'Busco na mesma hora outro computador, telefone ou canal alternativo para notificar o destinatário e enviar o que tiver salvo.',
        primaryDimension: 'reorganizacao_solucao',
        weight: 1,
        conceptualRationale: 'Plano de contenção emergencial e ação rápida.'
      },
      {
        id: 'C',
        text: 'Foco no tamanho do prejuízo e na injustiça de isso acontecer exatamente no momento decisivo.',
        primaryDimension: 'foco_obstaculo',
        weight: 1,
        conceptualRationale: 'Lamentação fatalista focada no infortúnio.'
      },
      {
        id: 'D',
        text: 'Me culpo profundamente por não ter feito backup cinco minutos antes, remoendo minha imprudência.',
        primaryDimension: 'autodirecionamento_reacao',
        weight: 1,
        conceptualRationale: 'Autoflagelação por falha preventiva prévia.'
      }
    ]
  },
  {
    id: 27,
    themeNumber: 27,
    themeTopic: 'Precisar refazer uma tarefa',
    category: 'Controle e Imprevistos',
    title: 'Retrabalho obrigatório decorrente de mudança de diretrizes',
    context: 'Depois de dias finalizando um relatório complexo, seu gestor avisa que as regras mudaram e que praticamente tudo terá de ser refeito.',
    alternatives: [
      {
        id: 'A',
        text: 'Demonstro explicitamente meu descontentamento e cobro planejamento melhor para que isso não se repita.',
        primaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Questionamento vocal da desorganização que gerou retrabalho.'
      },
      {
        id: 'B',
        text: 'Faço um mapeamento do que pode ser reaproveitado do trabalho anterior para acelerar a nova versão.',
        primaryDimension: 'reorganizacao_solucao',
        weight: 1,
        conceptualRationale: 'Otimização inteligente de ativos para mitigar esforço.'
      },
      {
        id: 'C',
        text: 'Fico desolado com o desperdício de tempo e sinto extrema dificuldade de retomar a concentração.',
        primaryDimension: 'foco_obstaculo',
        weight: 1,
        conceptualRationale: 'Dificuldade de desapego do esforço invalidado.'
      },
      {
        id: 'D',
        text: 'Aceito a mudança como parte natural da dinâmica profissional e reorganizo meu calendário sem drama.',
        primaryDimension: 'flexibilidade_resposta',
        secondaryDimension: 'regulacao_antes_resposta',
        weight: 1,
        conceptualRationale: 'Aceitação adaptativa da fluidez dos contextos de trabalho.'
      }
    ]
  },
  {
    id: 28,
    themeNumber: 28,
    themeTopic: 'Perceber que outra pessoa não compartilha sua urgência',
    category: 'Acordos e Convivência',
    title: 'Ritmo excessivamente calmo de parceiro frente a prazo crítico',
    context: 'O prazo do projeto expira hoje e você está a mil por hora, enquanto seu parceiro de entrega toma café com calma e diz para "não esquentar a cabeça".',
    alternatives: [
      {
        id: 'A',
        text: 'Fico indignado com o comodismo dele e exijo que ele acelere o passo agora mesmo.',
        primaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Cobrança direta de alinhamento enérgico.'
      },
      {
        id: 'B',
        text: 'Assumo o que faltava dele e faço sozinho para garantir a entrega, mesmo ficando exausto.',
        primaryDimension: 'reorganizacao_solucao',
        secondaryDimension: 'autodirecionamento_reacao',
        weight: 1,
        conceptualRationale: 'Sobrecarregamento voluntário para assegurar resultado.'
      },
      {
        id: 'C',
        text: 'Respiro fundo, explico com clareza o impacto de cada minuto perdido e negocio horários rígidos para a finalização conjunta.',
        primaryDimension: 'regulacao_antes_resposta',
        secondaryDimension: 'flexibilidade_resposta',
        weight: 1,
        conceptualRationale: 'Alinhamento didático e firme com regulação de impaciência.'
      },
      {
        id: 'D',
        text: 'Desacelero também por pirraça, pensando: "Se ele não se importa, por que eu me importaria?".',
        primaryDimension: 'retraimento_evitacao',
        secondaryDimension: 'externalizacao_responsabilidade',
        weight: 1,
        conceptualRationale: 'Retaliação passivo-agressiva por desengajamento reflexo.'
      }
    ]
  },
  {
    id: 29,
    themeNumber: 29,
    themeTopic: 'Não conseguir atingir uma meta',
    category: 'Crítica e Avaliação',
    title: 'Encerramento de ciclo com meta não alcançada',
    context: 'Ao fechar o mês ou trimestre, você constata que ficou abaixo da meta que havia traçado e se comprometido a entregar.',
    alternatives: [
      {
        id: 'A',
        text: 'Sinto profundo desânimo e me considero incompetente ou inferior aos que bateram o resultado.',
        primaryDimension: 'autodirecionamento_reacao',
        weight: 1,
        conceptualRationale: 'Autodesvalorização e identificação pessoal com o insucesso numérico.'
      },
      {
        id: 'B',
        text: 'Reviso o funil e os indicadores para diagnosticar gargalos técnicos e ajustar o plano de ação do próximo período.',
        primaryDimension: 'reorganizacao_solucao',
        weight: 1,
        conceptualRationale: 'Investigação analítica para correção de rota.'
      },
      {
        id: 'C',
        text: 'Argumento que o mercado, o cenário econômico e a falta de apoio tornaram a meta totalmente irreal.',
        primaryDimension: 'externalizacao_responsabilidade',
        weight: 1,
        conceptualRationale: 'Explicação fundamentada unicamente em barreiras do ecossistema.'
      },
      {
        id: 'D',
        text: 'Tento esquecer o assunto o mais rápido possível e prefiro não olhar detalhadamente para os números.',
        primaryDimension: 'retraimento_evitacao',
        weight: 1,
        conceptualRationale: 'Negação e evitação da evidência do resultado indesejado.'
      }
    ]
  },
  {
    id: 30,
    themeNumber: 30,
    themeTopic: 'Lidar com uma situação ambígua, sem saber a intenção do outro',
    category: 'Contrariedade e Discordância',
    title: 'Comentário dúbio ou atitude misteriosa de alguém próximo',
    context: 'Alguém envia uma mensagem curta com reticências ou faz uma expressão estranha após você falar, deixando um ar de reprovação sem nada dizer.',
    alternatives: [
      {
        id: 'A',
        text: 'Presumo logo que a pessoa está descontente ou desaprovando minha conduta e começo a me justificar.',
        primaryDimension: 'autodirecionamento_reacao',
        secondaryDimension: 'foco_obstaculo',
        weight: 1,
        conceptualRationale: 'Preenchimento paranoico de ambiguidade com autorreprovação.'
      },
      {
        id: 'B',
        text: 'Entro em contato de forma direta e tranquila perguntando: "Ficou alguma dúvida ou algo pendente sobre nossa conversa?".',
        primaryDimension: 'regulacao_antes_resposta',
        secondaryDimension: 'reorganizacao_solucao',
        weight: 1,
        conceptualRationale: 'Clarificação proativa da ambiguidade sem acusação prévia.'
      },
      {
        id: 'C',
        text: 'Ignoro completamente e considero que se a pessoa tiver algo para falar, ela que procure as palavras certas.',
        primaryDimension: 'retraimento_evitacao',
        secondaryDimension: 'flexibilidade_resposta',
        weight: 1,
        conceptualRationale: 'Não absorção de indiretas com fronteira nítida de responsabilidade.'
      },
      {
        id: 'D',
        text: 'Fico irritado com a covardia da comunicação indireta e cobro rispidamente que ela seja transparente.',
        primaryDimension: 'confrontacao_reativa',
        weight: 1,
        conceptualRationale: 'Intolerância agressiva à comunicação ambígua ou passiva.'
      }
    ]
  },
  {
    id: 31,
    themeNumber: 31,
    themeTopic: 'Enfrentar um obstáculo persistente apesar de várias tentativas',
    category: 'Obstáculos e Prazos',
    title: 'Problema recorrente que resiste às soluções usuais',
    context: 'Você já tentou três abordagens diferentes para resolver um problema crônico e, mais uma vez, o impedimento reaparece do mesmo jeito.',
    alternatives: [
      {
        id: 'A',
        text: 'Fico obcecado e frustrado, não conseguindo pensar em nada além da injustiça de o problema persistir.',
        primaryDimension: 'foco_obstaculo',
        weight: 1,
        conceptualRationale: 'Fixação circular no bloqueio e no sentimento de impotência.'
      },
      {
        id: 'B',
        text: 'Reconheço que as fórmulas antigas se esgotaram e busco ajuda externa ou um olhar inédito para pensar fora da caixa.',
        primaryDimension: 'flexibilidade_resposta',
        secondaryDimension: 'reorganizacao_solucao',
        weight: 1,
        conceptualRationale: 'Desapego de velhos métodos e abertura para nova perspectiva.'
      },
      {
        id: 'C',
        text: 'Largo o problema de mão, convencido de que não tem conserto e que insistir é pura perda de tempo.',
        primaryDimension: 'retraimento_evitacao',
        weight: 1,
        conceptualRationale: 'Desistência e desinvestimento por desamparo aprendido.'
      },
      {
        id: 'D',
        text: 'Confronto com veemência quem gerencia o processo ou sistema, apontando a negligência na manutenção da ferramenta.',
        primaryDimension: 'confrontacao_reativa',
        secondaryDimension: 'externalizacao_responsabilidade',
        weight: 1,
        conceptualRationale: 'Cobrança exasperada da cadeia de suporte e sustentação.'
      }
    ]
  }
];
