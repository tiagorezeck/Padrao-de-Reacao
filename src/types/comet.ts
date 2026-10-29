/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DimensionId =
  | 'confrontacao_reativa'
  | 'externalizacao_responsabilidade'
  | 'retraimento_evitacao'
  | 'autodirecionamento_reacao'
  | 'foco_obstaculo'
  | 'reorganizacao_solucao'
  | 'regulacao_antes_resposta'
  | 'flexibilidade_resposta';

export interface DimensionMeta {
  id: DimensionId;
  name: string;
  shortDescription: string;
  definition: string;
  situationalTriggers: string[];
  behavioralManifestation: string;
  cautionaryPoints: string;
}

export type AlternativeId = 'A' | 'B' | 'C' | 'D';

export interface Alternative {
  id: AlternativeId;
  text: string;
  primaryDimension: DimensionId;
  secondaryDimension?: DimensionId;
  weight: number;
  conceptualRationale: string;
}

export type SituationCategory =
  | 'Crítica e Avaliação'
  | 'Contrariedade e Discordância'
  | 'Controle e Imprevistos'
  | 'Acordos e Convivência'
  | 'Justiça e Reconhecimento'
  | 'Obstáculos e Prazos';

export interface Situation {
  id: number;
  category: SituationCategory;
  themeNumber: number;
  themeTopic: string;
  title: string;
  context: string;
  alternatives: Alternative[];
}

export interface SituationResponse {
  situationId: number;
  selectedAlternativeId: AlternativeId;
  emotionalIntensity?: number; // 0 a 4
  reactionFrequency?: number;  // 0 a 4
  answeredAt: string;
}

export interface ReflectionAnswer {
  questionId: string;
  questionText: string;
  category: string;
  selectedOption?: string;
  notes?: string;
}

export interface DimensionScore {
  dimensionId: DimensionId;
  name: string;
  rawScore: number;
  maxPossibleRaw: number;
  normalizedScore: number; // 0 - 100
  opportunityCount: number;
  experimentalBand: 'Faixa Baixa' | 'Faixa Intermediária' | 'Faixa Evidenciada';
}

export interface TriggerAnalysis {
  category: SituationCategory;
  count: number;
  dominantDimension: DimensionId;
  dominantDimensionName: string;
  averageIntensity: number | null;
  averageFrequency: number | null;
}

export interface ActionPlanItem {
  id: string;
  priorityTitle: string;
  targetBehavior: string;
  practiceContext: string;
  observableIndicator: string;
  userNotes: string;
}

export interface AssessmentReport {
  id: string;
  participantName: string;
  instrumentName: string;
  instrumentSubtitle: string;
  algorithmVersion: string;
  matrixVersion: string;
  startedAt: string;
  completedAt: string;
  responses: SituationResponse[];
  reflectionAnswers: ReflectionAnswer[];
  scores: Record<DimensionId, DimensionScore>;
  sortedDimensions: DimensionScore[];
  predominantReactive: DimensionScore;
  predominantConstructive: DimensionScore;
  triggersAnalysis: TriggerAnalysis[];
  actionPlan: ActionPlanItem[];
  reflectionSummary: {
    answeredQuestionsCount: number;
    hasReflections: boolean;
    observations: string[];
  };
}

export interface SelfTestResult {
  id: string;
  title: string;
  status: 'passed' | 'failed';
  message: string;
  auditMetrics?: Record<string, number | string>;
}
