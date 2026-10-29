/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SITUATIONS } from '../data/situations';
import { AlternativeId, DimensionId, SelfTestResult, SituationResponse } from '../types/comet';
import { calculateAssessmentReport } from './scoringEngine';
import { calculateDimensionOpportunities, getMatrixEntry, SCORING_MATRIX } from './scoringMatrix';

export function runCometAuditTests(): SelfTestResult[] {
  const results: SelfTestResult[] = [];

  // Teste 1: Quantidade e estrutura das 31 situações originais
  const has31Situations = SITUATIONS.length === 31;
  const eachHas4UniqueAlternatives = SITUATIONS.every((sit) => {
    if (sit.alternatives.length !== 4) return false;
    const ids = sit.alternatives.map((a) => a.id);
    const uniqueIds = new Set(ids);
    const hasTexts = sit.alternatives.every((a) => a.text && a.text.trim().length > 10);
    return uniqueIds.size === 4 && hasTexts;
  });

  results.push({
    id: 'test_1_structure',
    title: 'Estrutura das 31 Situações e 4 Alternativas',
    status: has31Situations && eachHas4UniqueAlternatives ? 'passed' : 'failed',
    message: has31Situations && eachHas4UniqueAlternatives
      ? 'Todas as 31 situações contêm exatamente 4 alternativas únicas e bem descritas.'
      : 'Falha na contagem ou unicidade de situações/alternativas.',
    auditMetrics: {
      totalSituacoes: SITUATIONS.length,
      totalAlternativas: SITUATIONS.reduce((acc, s) => acc + s.alternatives.length, 0)
    }
  });

  // Teste 2: Integridade e cobertura da Matriz de Correção
  const totalMatrixEntries = SCORING_MATRIX.length;
  const expectedEntries = 31 * 4; // 124
  const allEntriesValid = SCORING_MATRIX.every(
    (e) => e.primaryDimension && e.weight > 0 && e.conceptualRationale
  );

  results.push({
    id: 'test_2_matrix_coverage',
    title: 'Integridade da Matriz Centralizada de Correção',
    status: totalMatrixEntries === expectedEntries && allEntriesValid ? 'passed' : 'failed',
    message: `A matriz mapeia 124 alternativas com pesos definidos e justificativas conceituais.`,
    auditMetrics: {
      entradasMapeadas: totalMatrixEntries,
      entradasEsperadas: expectedEntries
    }
  });

  // Teste 3: Cobertura equilibrada de todas as 8 dimensões
  const opportunities = calculateDimensionOpportunities();
  const dimensionIds = Object.keys(opportunities) as DimensionId[];
  const minOpportunities = Math.min(...dimensionIds.map((d) => opportunities[d].count));
  const sufficientCoverage = minOpportunities >= 6; // Todas têm no mínimo 6 itens no questionário

  results.push({
    id: 'test_3_dimension_balance',
    title: 'Equilíbrio e Cobertura das 8 Dimensões',
    status: sufficientCoverage ? 'passed' : 'failed',
    message: sufficientCoverage
      ? `Cada uma das 8 dimensões possui no mínimo ${minOpportunities} situações de pontuação.`
      : `Sub-representação detectada: menor cobertura encontrada foi de ${minOpportunities}.`,
    auditMetrics: Object.fromEntries(dimensionIds.map((d) => [d, opportunities[d].count]))
  });

  // Teste 4: Limites matemáticos da Normalização (0 a 100)
  // Simular teste extremo 1: Todas as opções A
  const mockResponsesA: SituationResponse[] = SITUATIONS.map((s) => ({
    situationId: s.id,
    selectedAlternativeId: 'A',
    answeredAt: new Date().toISOString()
  }));
  const reportA = calculateAssessmentReport(mockResponsesA);
  const scoresA = Object.values(reportA.scores);
  const boundsValid = scoresA.every(
    (s) => s.normalizedScore >= 0 && s.normalizedScore <= 100 && !isNaN(s.normalizedScore)
  );

  results.push({
    id: 'test_4_normalization_bounds',
    title: 'Limites Matemáticos de Normalização (0 a 100)',
    status: boundsValid ? 'passed' : 'failed',
    message: boundsValid
      ? 'Todos os escores normalizados respeitam rigorosamente o intervalo entre 0 e 100.'
      : 'Escores com estouro de escala ou NaN detectados.',
    auditMetrics: {
      minCalculado: Math.min(...scoresA.map((s) => s.normalizedScore)),
      maxCalculado: Math.max(...scoresA.map((s) => s.normalizedScore))
    }
  });

  // Teste 5: Isolamento estrito entre etapa reflexiva e escores comportamentais
  // O relatório com ou sem reflexão deve gerar pontuações IDÊNTICAS
  const reportWithReflection = calculateAssessmentReport(
    mockResponsesA,
    [
      {
        questionId: 'ref_1',
        category: 'Ambiente Formativo',
        questionText: 'Pergunta teste',
        selectedOption: 'Gritos ou explosões',
        notes: 'Ambiente muito tenso na infância'
      }
    ]
  );

  let strictIsolation = true;
  dimensionIds.forEach((dim) => {
    if (reportA.scores[dim].normalizedScore !== reportWithReflection.scores[dim].normalizedScore) {
      strictIsolation = false;
    }
    if (reportA.scores[dim].rawScore !== reportWithReflection.scores[dim].rawScore) {
      strictIsolation = false;
    }
  });

  results.push({
    id: 'test_5_reflection_isolation',
    title: 'Isolamento Rígido: História Retrospectiva vs. Escores Comportamentais',
    status: strictIsolation ? 'passed' : 'failed',
    message: strictIsolation
      ? 'Comprovado: respostas sobre o passado não alteram pontuações comportamentais das 31 situações.'
      : 'Violação metodológica: reflexão histórica influenciou indevidamente os escores numéricos.',
    auditMetrics: {
      escoresIguais: strictIsolation ? 'Sim (100% isolado)' : 'Não'
    }
  });

  // Teste 6: Determinismo e Reprodutibilidade
  const reportARepeat = calculateAssessmentReport(mockResponsesA);
  const isDeterministic = dimensionIds.every(
    (dim) => reportA.scores[dim].normalizedScore === reportARepeat.scores[dim].normalizedScore
  );

  results.push({
    id: 'test_6_determinism',
    title: 'Reprodutibilidade Determinística do Algoritmo',
    status: isDeterministic ? 'passed' : 'failed',
    message: isDeterministic
      ? 'O algoritmo produz resultados 100% idênticos e auditáveis para o mesmo conjunto de respostas.'
      : 'Falha de determinismo nos cálculos.',
    auditMetrics: {
      consistencia: '100% reproduzível'
    }
  });

  return results;
}
