/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SITUATIONS } from '../data/situations';
import { AlternativeId, DimensionId } from '../types/comet';

export interface ScoringMatrixEntry {
  situationId: number;
  alternativeId: AlternativeId;
  primaryDimension: DimensionId;
  secondaryDimension?: DimensionId;
  weight: number;
  conceptualRationale: string;
}

export const MATRIX_VERSION = 'v1.0.0-br';
export const ALGORITHM_VERSION = 'v1.0.0-br-normalized';

// Matriz centralizada compilada a partir das 31 situações
export const SCORING_MATRIX: ScoringMatrixEntry[] = SITUATIONS.flatMap((sit) =>
  sit.alternatives.map((alt) => ({
    situationId: sit.id,
    alternativeId: alt.id,
    primaryDimension: alt.primaryDimension,
    secondaryDimension: alt.secondaryDimension,
    weight: alt.weight,
    conceptualRationale: alt.conceptualRationale
  }))
);

// Obter pesos e dimensões de uma alternativa específica
export function getMatrixEntry(situationId: number, alternativeId: AlternativeId): ScoringMatrixEntry | undefined {
  return SCORING_MATRIX.find(
    (entry) => entry.situationId === situationId && entry.alternativeId === alternativeId
  );
}

// Calcular as oportunidades totais e a pontuação máxima possível para cada dimensão
export function calculateDimensionOpportunities(): Record<DimensionId, { count: number; maxRawScore: number }> {
  const result: Record<DimensionId, { count: number; maxRawScore: number }> = {
    confrontacao_reativa: { count: 0, maxRawScore: 0 },
    externalizacao_responsabilidade: { count: 0, maxRawScore: 0 },
    retraimento_evitacao: { count: 0, maxRawScore: 0 },
    autodirecionamento_reacao: { count: 0, maxRawScore: 0 },
    foco_obstaculo: { count: 0, maxRawScore: 0 },
    reorganizacao_solucao: { count: 0, maxRawScore: 0 },
    regulacao_antes_resposta: { count: 0, maxRawScore: 0 },
    flexibilidade_resposta: { count: 0, maxRawScore: 0 }
  };

  SITUATIONS.forEach((sit) => {
    // Para cada situação, calcular a contribuição máxima que uma única escolha do usuário poderia dar à dimensão
    const dimsInSit = new Set<DimensionId>();
    sit.alternatives.forEach((alt) => {
      dimsInSit.add(alt.primaryDimension);
      if (alt.secondaryDimension) dimsInSit.add(alt.secondaryDimension);
    });

    dimsInSit.forEach((dim) => {
      // Oportunidades: quantas situações oferecem pelo menos uma alternativa que pontua nesta dimensão
      result[dim].count += 1;
      // Como o participante escolhe no máximo uma alternativa por situação:
      result[dim].maxRawScore += 1;
    });
  });

  return result;
}
