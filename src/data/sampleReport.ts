/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SITUATIONS } from './situations';
import { calculateAssessmentReport } from '../engine/scoringEngine';
import { AlternativeId, AssessmentReport, ReflectionAnswer, SituationResponse } from '../types/comet';

// Conjunto realista de respostas para demonstração:
// Perfil com tendência à confrontação sob desrespeito de limites e quebra de acordos,
// acompanhada de alta capacidade prática de reorganização orientada à solução.
const SAMPLE_ALTERNATIVES: AlternativeId[] = [
  'A', // Sit 1: Contesta prontamente (Confrontação)
  'C', // Sit 2: Adapta sua parte ao plano do grupo (Reorganização)
  'A', // Sit 3: Reconhece o erro na hora e ajusta (Flexibilidade)
  'B', // Sit 4: Aproveita o tempo para pendências úteis (Reorganização)
  'B', // Sit 5: Cobrança enfática perante o atraso (Confrontação)
  'A', // Sit 6: Solicita reunião formal para rever divisão (Confrontação/Reorganização)
  'C', // Sit 7: Observa dinâmica para reapresentar (Regulação/Reorganização)
  'A', // Sit 8: Negocia versão reduzida da proposta (Reorganização)
  'A', // Sit 9: Defesa contundente de seu histórico técnico (Confrontação)
  'B', // Sit 10: Conversa para diagnosticar competências futuras (Reorganização)
  'A', // Sit 11: Chama em particular e cobra sem rodeios (Confrontação)
  'A', // Sit 12: Reconhece erro prontamente e propõe correção (Reorganização)
  'A', // Sit 13: Rejeita legitimidade da comparação direta (Confrontação)
  'B', // Sit 14: Diagnostica onde a proposta falhou (Reorganização)
  'A', // Sit 15: Pausa deliberada para triagem de esferas de controle (Regulação)
  'B', // Sit 16: Apresenta dados de risco para liderança (Flexibilidade/Reorganização)
  'B', // Sit 17: Conversa serena com a coordenação sobre seu papel (Regulação/Confrontação)
  'B', // Sit 18: Foco no aprendizado rápido da ferramenta (Reorganização)
  'B', // Sit 19: Mobiliza equipe para recuperar backups (Reorganização)
  'C', // Sit 20: Canaliza atenção para projetos independentes (Flexibilidade)
  'A', // Sit 21: Pede firmemente para concluir o raciocínio (Confrontação)
  'A', // Sit 22: Estabelece limite de horário com transparência (Regulação/Confrontação)
  'B', // Sit 23: Reúne registros técnicos objetivos sem bate-boca (Reorganização)
  'B', // Sit 24: Propõe sintetizar pontos de convergência (Flexibilidade/Reorganização)
  'A', // Sit 25: Rebate na mesma moeda contra indelicadeza (Confrontação)
  'B', // Sit 26: Procura canal alternativo de contingência (Reorganização)
  'B', // Sit 27: Mapeia o que pode ser reaproveitado (Reorganização)
  'A', // Sit 28: Exige que o parceiro acelere o passo (Confrontação)
  'B', // Sit 29: Revisa indicadores para diagnosticar gargalos (Reorganização)
  'B', // Sit 30: Entra em contato direto e tranquilo para clarificar (Regulação)
  'B'  // Sit 31: Busca ajuda externa para pensar fora da caixa (Flexibilidade)
];

const SAMPLE_INTENSITIES: number[] = [
  3, 1, 2, 2, 3, 4, 2, 2, 4, 3,
  4, 2, 3, 2, 3, 2, 4, 1, 3, 2,
  3, 4, 4, 2, 4, 3, 2, 3, 2, 2, 3
];

const SAMPLE_FREQUENCIES: number[] = [
  3, 2, 2, 3, 3, 3, 2, 3, 3, 2,
  4, 2, 3, 2, 2, 2, 3, 3, 3, 2,
  3, 3, 3, 2, 3, 3, 2, 3, 2, 2, 2
];

export function getSampleAssessmentReport(): AssessmentReport {
  const responses: SituationResponse[] = SITUATIONS.map((sit, idx) => ({
    situationId: sit.id,
    selectedAlternativeId: SAMPLE_ALTERNATIVES[idx] || 'A',
    emotionalIntensity: SAMPLE_INTENSITIES[idx] ?? 2,
    reactionFrequency: SAMPLE_FREQUENCIES[idx] ?? 2,
    answeredAt: new Date(Date.now() - (31 - idx) * 45000).toISOString()
  }));

  const reflectionAnswers: ReflectionAnswer[] = [
    {
      questionId: 'ref_1_conflict_environment',
      category: 'Ambiente Formativo',
      questionText: 'Quando você era mais jovem, como as pessoas ao seu redor costumavam reagir diante de conflitos e divergências?',
      selectedOption: 'Geralmente com discussões acaloradas, gritos ou explosões frequentes.',
      notes: 'Havia uma regra implícita em casa de que quem falasse mais alto vencia a discussão.'
    },
    {
      questionId: 'ref_2_anger_expression',
      category: 'Expressão Emocional',
      questionText: 'Na sua história de desenvolvimento, demonstrar raiva ou contrariedade era algo:',
      selectedOption: 'Aceito abertamente e incentivado como sinal de firmeza e defesa pessoal.',
      notes: 'Passividade era vista como fraqueza; defender-se prontamente era valorizado.'
    },
    {
      questionId: 'ref_3_disagreement_interpretation',
      category: 'Interpretação de Ameaça',
      questionText: 'No íntimo, o que você costuma interpretar espontaneamente quando alguém discorda firmemente de você?',
      selectedOption: 'Que a pessoa está desafiando minha autoridade, meu valor ou minha competência.',
      notes: 'Primeiro sinto como se meu esforço estivesse sendo desrespeitado, antes de conseguir racionalizar.'
    },
    {
      questionId: 'ref_4_defense_triggers',
      category: 'Gatilhos de Defesa',
      questionText: 'Em quais situações você sente que precisa se defender imediatamente, quase no piloto automático?',
      selectedOption: 'Quando percebo tom de desdém, ironia ou desrespeito à minha dignidade.',
      notes: 'Ironia e descompromisso com acordos combinados disparam minha resposta na hora.'
    },
    {
      questionId: 'ref_5_control_loss',
      category: 'Percepção de Controle',
      questionText: 'Que tipo de circunstância mais facilmente faz você sentir que está perdendo o controle?',
      selectedOption: 'Depender da velocidade e da boa vontade de terceiros para cumprir prazos.',
      notes: 'Lentidão alheia em momentos de emergência gera grande aflição.'
    },
    {
      questionId: 'ref_6_habits_future',
      category: 'Revisão de Padrões',
      questionText: 'Olhando para a sua forma habitual de responder a frustrações, qual intenção você tem para o seu desenvolvimento?',
      selectedOption: 'Aprender a respirar e fazer uma pausa antes de disparar respostas imediatas de confronto.',
      notes: 'Quero calibrar a firmeza sem precisar ser agressivo verbalmente.'
    }
  ];

  const report = calculateAssessmentReport(
    responses,
    reflectionAnswers,
    'Alexandre Mendes (Exemplo Demonstrativo)'
  );

  // Injetar uma anotação inicial no PDI de exemplo
  if (report.actionPlan.length > 0) {
    report.actionPlan[0].userNotes =
      'Vou praticar a pausa respiratória especialmente nas reuniões de sprint review nas terças-feiras.';
  }

  return report;
}
