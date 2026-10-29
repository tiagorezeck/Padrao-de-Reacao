/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIMENSIONS_META } from '../data/dimensionsMeta';
import { SITUATIONS } from '../data/situations';
import {
  ActionPlanItem,
  AssessmentReport,
  DimensionId,
  DimensionScore,
  ReflectionAnswer,
  SituationCategory,
  SituationResponse,
  TriggerAnalysis
} from '../types/comet';
import {
  ALGORITHM_VERSION,
  calculateDimensionOpportunities,
  getMatrixEntry,
  MATRIX_VERSION
} from './scoringMatrix';

export function calculateAssessmentReport(
  responses: SituationResponse[],
  reflectionAnswers: ReflectionAnswer[] = [],
  participantName: string = 'Participante'
): AssessmentReport {
  const opportunities = calculateDimensionOpportunities();

  // Inicializa pontuação bruta para cada dimensão
  const rawScores: Record<DimensionId, number> = {
    confrontacao_reativa: 0,
    externalizacao_responsabilidade: 0,
    retraimento_evitacao: 0,
    autodirecionamento_reacao: 0,
    foco_obstaculo: 0,
    reorganizacao_solucao: 0,
    regulacao_antes_resposta: 0,
    flexibilidade_resposta: 0
  };

  // Contabilização direta via matriz de correção
  responses.forEach((resp) => {
    const entry = getMatrixEntry(resp.situationId, resp.selectedAlternativeId);
    if (!entry) return;

    // Contribuição primária (peso integral)
    rawScores[entry.primaryDimension] += entry.weight;

    // Se houver dimensão secundária, adiciona peso fracionado de apoio (0.5)
    if (entry.secondaryDimension) {
      rawScores[entry.secondaryDimension] += 0.5 * entry.weight;
    }
  });

  // Converte em escores estruturados e normalizados (0 a 100)
  const scores: Record<DimensionId, DimensionScore> = {} as Record<DimensionId, DimensionScore>;
  const allDimensionIds = Object.keys(DIMENSIONS_META) as DimensionId[];

  allDimensionIds.forEach((dimId) => {
    const raw = Number(rawScores[dimId].toFixed(1));
    const maxRaw = opportunities[dimId].maxRawScore;
    const normalized = Math.min(100, Math.max(0, Math.round((raw / (maxRaw || 1)) * 100)));

    let experimentalBand: DimensionScore['experimentalBand'] = 'Faixa Intermediária';
    if (normalized < 35) {
      experimentalBand = 'Faixa Baixa';
    } else if (normalized > 65) {
      experimentalBand = 'Faixa Evidenciada';
    }

    scores[dimId] = {
      dimensionId: dimId,
      name: DIMENSIONS_META[dimId].name,
      rawScore: raw,
      maxPossibleRaw: maxRaw,
      normalizedScore: normalized,
      opportunityCount: opportunities[dimId].count,
      experimentalBand
    };
  });

  // Ordenação das dimensões por escore normalizado
  const sortedDimensions = [...Object.values(scores)].sort(
    (a, b) => b.normalizedScore - a.normalizedScore
  );

  // Identificação dos padrões preponderantes (separando estritamente reativos de construtivos)
  const reactiveIds: DimensionId[] = [
    'confrontacao_reativa',
    'externalizacao_responsabilidade',
    'retraimento_evitacao',
    'autodirecionamento_reacao',
    'foco_obstaculo'
  ];

  const constructiveIds: DimensionId[] = [
    'reorganizacao_solucao',
    'regulacao_antes_resposta',
    'flexibilidade_resposta'
  ];

  const predominantReactive =
    sortedDimensions.find((d) => reactiveIds.includes(d.dimensionId)) || sortedDimensions[0];

  const predominantConstructive =
    sortedDimensions.find((d) => constructiveIds.includes(d.dimensionId)) || sortedDimensions[1];

  // Análise de Gatilhos Situacionais agrupados por categoria
  const categoryGroups: Record<SituationCategory, SituationResponse[]> = {
    'Crítica e Avaliação': [],
    'Contrariedade e Discordância': [],
    'Controle e Imprevistos': [],
    'Acordos e Convivência': [],
    'Justiça e Reconhecimento': [],
    'Obstáculos e Prazos': []
  };

  responses.forEach((resp) => {
    const situation = SITUATIONS.find((s) => s.id === resp.situationId);
    if (situation) {
      categoryGroups[situation.category].push(resp);
    }
  });

  const triggersAnalysis: TriggerAnalysis[] = (
    Object.keys(categoryGroups) as SituationCategory[]
  ).map((category) => {
    const groupResponses = categoryGroups[category];
    const dimCount: Partial<Record<DimensionId, number>> = {};
    let totalIntensity = 0;
    let countIntensity = 0;
    let totalFrequency = 0;
    let countFrequency = 0;

    groupResponses.forEach((r) => {
      const entry = getMatrixEntry(r.situationId, r.selectedAlternativeId);
      if (entry) {
        dimCount[entry.primaryDimension] = (dimCount[entry.primaryDimension] || 0) + 1;
      }
      if (typeof r.emotionalIntensity === 'number') {
        totalIntensity += r.emotionalIntensity;
        countIntensity++;
      }
      if (typeof r.reactionFrequency === 'number') {
        totalFrequency += r.reactionFrequency;
        countFrequency++;
      }
    });

    // Encontrar dimensão dominante no grupo
    let dominantDim: DimensionId = 'reorganizacao_solucao';
    let maxDimCount = -1;
    (Object.entries(dimCount) as [DimensionId, number][]).forEach(([dim, count]) => {
      if (count > maxDimCount) {
        maxDimCount = count;
        dominantDim = dim;
      }
    });

    return {
      category,
      count: groupResponses.length,
      dominantDimension: dominantDim,
      dominantDimensionName: DIMENSIONS_META[dominantDim]?.name || dominantDim,
      averageIntensity: countIntensity > 0 ? Number((totalIntensity / countIntensity).toFixed(1)) : null,
      averageFrequency: countFrequency > 0 ? Number((totalFrequency / countFrequency).toFixed(1)) : null
    };
  });

  // Geração do Plano de Desenvolvimento Individual (PDI) com comportamentos observáveis
  const actionPlan = generateActionPlan(predominantReactive.dimensionId, predominantConstructive.dimensionId);

  // Síntese das reflexões sobre história e padrões aprendidos
  const reflectionObservations: string[] = [];
  reflectionAnswers.forEach((ans) => {
    if (ans.selectedOption && !ans.selectedOption.includes('Prefiro não')) {
      reflectionObservations.push(
        `Na dimensão "${ans.category}", você destacou: "${ans.selectedOption}".`
      );
    }
    if (ans.notes && ans.notes.trim().length > 0) {
      reflectionObservations.push(`Anotação pessoal registrada: "${ans.notes.trim()}".`);
    }
  });

  return {
    id: `comet_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    participantName: participantName.trim() || 'Participante',
    instrumentName: 'COMET — Reação à Frustração e Padrões Aprendidos',
    instrumentSubtitle: 'Compreenda seus gatilhos, suas respostas automáticas e as possibilidades de mudança.',
    algorithmVersion: ALGORITHM_VERSION,
    matrixVersion: MATRIX_VERSION,
    startedAt: responses[0]?.answeredAt || new Date().toISOString(),
    completedAt: new Date().toISOString(),
    responses,
    reflectionAnswers,
    scores,
    sortedDimensions,
    predominantReactive,
    predominantConstructive,
    triggersAnalysis,
    actionPlan,
    reflectionSummary: {
      answeredQuestionsCount: reflectionAnswers.filter((a) => a.selectedOption || a.notes).length,
      hasReflections: reflectionAnswers.length > 0,
      observations: reflectionObservations
    }
  };
}

function generateActionPlan(
  reactiveDim: DimensionId,
  constructiveDim: DimensionId
): ActionPlanItem[] {
  const planMap: Record<DimensionId, { title: string; behavior: string; context: string; metric: string }> = {
    confrontacao_reativa: {
      title: 'Espaço de Desaceleração Prévia',
      behavior: 'Antes de contra-argumentar uma contrariedade ou crítica, fazer uma pausa respiratória de 5 segundos e formular uma pergunta para confirmar o que foi dito.',
      context: 'Reuniões de alinhamento com divergência de opiniões ou feedbacks recebidos.',
      metric: 'Conseguir fazer pelo menos uma pergunta clarificadora antes de emitir julgamento em 3 situações consecutivas.'
    },
    externalizacao_responsabilidade: {
      title: 'Mapeamento de Círculo de Controle',
      behavior: 'Ao constatar um atraso ou falha em um projeto compartilhado, listar primeiro 1 ação concreta que depende exclusivamente de você antes de apontar os erros alheios.',
      context: 'Momentos em que prazos de equipe forem comprometidos por terceiros.',
      metric: 'Registrar por escrito uma iniciativa própria de contenção antes de enviar cobrança a parceiros.'
    },
    retraimento_evitacao: {
      title: 'Posicionamento Gradual Seguro',
      behavior: 'Expressar seu ponto de vista ou limite em pelo menos uma frase objetiva antes de se calar ou concordar apenas por conveniência.',
      context: 'Conversas em que um acordo pessoal ou profissional estiver sendo violado.',
      metric: 'Verbalizar um desacordo de forma educada em vez de silenciar completamente em 2 ocasiões nesta quinzena.'
    },
    autodirecionamento_reacao: {
      title: 'Separação entre Fato e Identidade',
      behavior: 'Ao cometer um erro, anotar o fato ocorrido em uma coluna e a correção necessária em outra, interrompendo questionamentos sobre seu valor pessoal.',
      context: 'Após correções públicas ou métricas abaixo da expectativa.',
      metric: 'Substituir pensamentos de desqualificação por uma ação corretiva imediata em até 10 minutos após o erro.'
    },
    foco_obstaculo: {
      title: 'Transição Temporal para Contingência',
      behavior: 'Permitir-se no máximo 5 minutos para dimensionar a frustração e, em seguida, disparar a pergunta: "Qual é o menor passo viável que posso dar agora?".',
      context: 'Falhas de sistemas, cancelamentos imprevistos ou perdas de oportunidades.',
      metric: 'Reduzir o tempo de ruminação do impedimento, iniciando uma ação de contorno em menos de 15 minutos.'
    },
    reorganizacao_solucao: {
      title: 'Acolhimento Antes da Ação',
      behavior: 'Dar espaço para reconhecer o impacto emocional do grupo antes de impor imediatamente novas tarefas e cronogramas acelerados.',
      context: 'Momentos em que a equipe estiver abalada com um imprevisto.',
      metric: 'Checar como as pessoas envolvidas estão se sentindo antes de propor a lista de novas providências.'
    },
    regulacao_antes_resposta: {
      title: 'Consolidação de Clareza Assertiva',
      behavior: 'Alinhar a pausa reguladora com firmeza verbal, evitando que a compostura seja confundida com passividade ou indiferença.',
      context: 'Situações de cobrança ríspida ou limites desrespeitados.',
      metric: 'Manifestar um posicionamento firme com tom de voz calmo e sem recuar em seus limites essenciais.'
    },
    flexibilidade_resposta: {
      title: 'Demarcação de Linhas Inegociáveis',
      behavior: 'Definir claramente quais são os princípios e entregas essenciais inegociáveis antes de entrar em negociações ou concessões adaptativas.',
      context: 'Discussões com múltiplas demandas concorrentes.',
      metric: 'Manter seus 2 critérios prioritários inalterados mesmo ao realizar adaptações no plano geral.'
    }
  };

  const primaryPlan = planMap[reactiveDim] || planMap.confrontacao_reativa;
  const secondaryPlan = planMap[constructiveDim] || planMap.reorganizacao_solucao;

  return [
    {
      id: 'plan_1',
      priorityTitle: `1. Regular o Gatilho: ${primaryPlan.title}`,
      targetBehavior: primaryPlan.behavior,
      practiceContext: primaryPlan.context,
      observableIndicator: primaryPlan.metric,
      userNotes: ''
    },
    {
      id: 'plan_2',
      priorityTitle: `2. Fortalecer Recursos: ${secondaryPlan.title}`,
      targetBehavior: secondaryPlan.behavior,
      practiceContext: secondaryPlan.context,
      observableIndicator: secondaryPlan.metric,
      userNotes: ''
    },
    {
      id: 'plan_3',
      priorityTitle: '3. Revisão Pós-Fricção (Debriefing Pessoal)',
      targetBehavior: 'Após enfrentar uma contrariedade significativa, dedicar 3 minutos para anotar: (a) Qual foi o gatilho? (b) Qual foi minha primeira reação? (c) O que funcionou e o que ajustarei na próxima?',
      practiceContext: 'Final do dia ou logo após encerramento de um conflito relevante.',
      observableIndicator: 'Completar 3 anotações de debriefing em um caderno ou aplicativo ao longo do mês.',
      userNotes: ''
    }
  ];
}
