/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DimensionId, DimensionMeta } from '../types/comet';

export const DIMENSIONS_META: Record<DimensionId, DimensionMeta> = {
  confrontacao_reativa: {
    id: 'confrontacao_reativa',
    name: 'Confrontação Reativa',
    shortDescription: 'Expressão de oposição, contestação e discordância imediata frente a contrariedades.',
    definition: 'Tendência a externalizar prontamente a insatisfação, desafiando a fonte do incômodo ou exigindo correções na hora.',
    situationalTriggers: [
      'Ordens percebidas como arbitrárias',
      'Desrespeito a limites declarados',
      'Críticas públicas diretas',
      'Respostas ríspidas ou impositivas'
    ],
    behavioralManifestation: 'Questionamento imediato, tom firme de contestação, interrupção para contra-argumentar, postura de não aceitar passivamente o ocorrido.',
    cautionaryPoints: 'Embora garanta clareza de posicionamento e impeça abusos, pode escalar discussões desnecessárias e reduzir a cooperação se empregada sem calibragem de timing.'
  },
  externalizacao_responsabilidade: {
    id: 'externalizacao_responsabilidade',
    name: 'Externalização da Responsabilidade',
    shortDescription: 'Atribuição da causalidade de falhas e atritos a fatores externos, terceiros ou ao contexto.',
    definition: 'Tendência a localizar a origem do impedimento ou do erro fora de si, enfatizando a negligência, a lentidão ou a interferência de outras partes.',
    situationalTriggers: [
      'Metas comprometidas por atrasos alheios',
      'Acordos quebrados sem aviso',
      'Mudanças de regras sem comunicação prévia',
      'Falhas operacionais em cadeia'
    ],
    behavioralManifestation: 'Apontar inconsistências de outrem, demandar satisfações sobre papéis combinados, registrar que o resultado foi prejudicado por fatores alheios.',
    cautionaryPoints: 'Evita a sobrecarga injusta de culpa própria, mas quando excessiva pode limitar o aprendizado reflexivo e dar a impressão de relutância em assumir a parte que lhe cabe.'
  },
  retraimento_evitacao: {
    id: 'retraimento_evitacao',
    name: 'Retraimento e Evitação',
    shortDescription: 'Afastamento temporário, silenciamento ou adiamento deliberado do enfrentamento direto.',
    definition: 'Tendência a conter a reação externa imediata, preservando-se do atrito, silenciando ou postergando a discussão para evitar desgaste interpessoal.',
    situationalTriggers: [
      'Ambientes com tensão polarizada',
      'Críticas vindas de figuras de autoridade',
      'Situações ambíguas sem intenção clara',
      'Sensação de que o confronto não trará benefícios imediatos'
    ],
    behavioralManifestation: 'Silenciar na reunião, concordar superficialmente para encerrar o tema, afastar-se fisicamente da situação, guardar a insatisfação.',
    cautionaryPoints: 'Preserva a energia em conflitos estéreis e previne rompimentos impulsivos, mas pode acumular ressentimento silencioso e adiar soluções que exigem assertividade.'
  },
  autodirecionamento_reacao: {
    id: 'autodirecionamento_reacao',
    name: 'Autodirecionamento da Reação',
    shortDescription: 'Focalização da cobrança em si mesmo, internalização da falha e ruminação sobre o próprio papel.',
    definition: 'Tendência a voltar o desconforto para o próprio comportamento, questionando a própria competência, remoendo o equívoco ou sentindo-se pessoalmente insuficiente.',
    situationalTriggers: [
      'Cometer erros expostos perante a equipe',
      'Não atingir uma meta pessoal importante',
      'Receber feedback de baixo desempenho',
      'Comparações explícitas com pares bem-sucedidos'
    ],
    behavioralManifestation: 'Admitir falha com autocrítica severa, remoer detalhes após a conversa, questionar a própria capacidade de entrega, desculpar-se repetidamente.',
    cautionaryPoints: 'Demonstra senso de responsabilidade e humildade para aprender, mas em excesso corrói a autoconfiança e gera paralisia por excesso de autojulgamento.'
  },
  foco_obstaculo: {
    id: 'foco_obstaculo',
    name: 'Foco no Obstáculo',
    shortDescription: 'Concentração prolongada no impedimento, na perda concreta ou na injustiça vivenciada.',
    definition: 'Tendência a permanecer ancorado no problema em si, analisando o tamanho do prejuízo, a gravidade do atraso ou o quanto a situação foi desfavorável.',
    situationalTriggers: [
      'Cancelamento repentino de planos planejados com zelo',
      'Retrabalho forçado por fatores externos',
      'Perda de uma oportunidade que parecia ganha',
      'Falhas de infraestrutura ou ferramentas críticas'
    ],
    behavioralManifestation: 'Enfatizar repetidamente o impacto do problema, detalhar a perda de tempo e recursos, paralisar momentaneamente para dimensionar a frustração.',
    cautionaryPoints: 'Ajuda a avaliar a real gravidade do impacto sem ingenuidade, mas pode prolongar o sentimento de impotência e postergar a transição para atitudes resolutivas.'
  },
  reorganizacao_solucao: {
    id: 'reorganizacao_solucao',
    name: 'Reorganização Orientada à Solução',
    shortDescription: 'Mobilização prática para redefinir estratégias, ajustar rotas e buscar alternativas concretas.',
    definition: 'Tendência a direcionar o esforço cognitivo e comportamental para a contenção de danos, plano de contingência e resolução pragmática do problema.',
    situationalTriggers: [
      'Planos inviabilizados no meio do caminho',
      'Prazos encurtados ou recursos reduzidos',
      'Descumprimento de etapas por terceiros',
      'Demandas inesperadas com alto impacto prático'
    ],
    behavioralManifestation: 'Propor novos prazos, redistribuir tarefas, listar saídas viáveis, negociar alternativas de execução imediata.',
    cautionaryPoints: 'Altamente funcional para a produtividade e resolução de problemas, mas pode suprimir o espaço necessário para acolher sentimentos legítimos ou apressar saídas sem diagnosticar causas profundas.'
  },
  regulacao_antes_resposta: {
    id: 'regulacao_antes_resposta',
    name: 'Regulação Antes da Resposta',
    shortDescription: 'Criação de intervalo consciente entre o estímulo estressor e a manifestação comportamental.',
    definition: 'Tendência a respirar, respirar fundo, distanciar-se cognitivamente do primeiro impulso e deliberar sobre a melhor forma de se manifestar.',
    situationalTriggers: [
      'Provocações verbais ou comentários sarcásticos',
      'Notícias inesperadas que geram choque inicial',
      'Reuniões com clima hostil',
      'Mensagens escritas ambíguas ou acusatórias'
    ],
    behavioralManifestation: 'Pedir um momento antes de responder, fazer perguntas esclarecedoras para confirmar fatos, respirar pausadamente, checar suposições antes de emitir julgamento.',
    cautionaryPoints: 'Excelente mecanismo de inteligência relacional que previne arrependimentos, exigindo apenas equilíbrio para não soar evasivo ou demorado em contextos que pedem firmeza imediata.'
  },
  flexibilidade_resposta: {
    id: 'flexibilidade_resposta',
    name: 'Flexibilidade de Resposta',
    shortDescription: 'Capacidade de calibrar e variar o comportamento conforme a especificidade do contexto e interlocutor.',
    definition: 'Tendência a modular a postura entre firmeza, conciliação, silêncio ou negociação dependendo do que for mais adequado para o desfecho construtivo.',
    situationalTriggers: [
      'Negociações com múltiplos interesses em jogo',
      'Mudanças de contexto organizacional',
      'Divergências complexas em equipe',
      'Obstáculos recorrentes que pedem abordagens não convencionais'
    ],
    behavioralManifestation: 'Adotar tom colaborativo quando há abertura e tom firme quando limites são violados, ceder em pontos periféricos para preservar o objetivo principal.',
    cautionaryPoints: 'Propicia alta maturidade relacional e adaptabilidade, mas deve ser sustentada por limites éticos claros para não ser interpretada como falta de convicção própria.'
  }
};
