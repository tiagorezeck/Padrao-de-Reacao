/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ReflectionQuestionItem {
  id: string;
  category: string;
  prompt: string;
  guidance: string;
  options: string[];
}

export const REFLECTION_QUESTIONS: ReflectionQuestionItem[] = [
  {
    id: 'ref_1_conflict_environment',
    category: 'Ambiente Formativo',
    prompt: 'Quando você era mais jovem, como as pessoas ao seu redor costumavam reagir diante de conflitos e divergências?',
    guidance: 'Pense nos modelos de convivência predominantes na família, escola ou primeiros ambientes de socialização.',
    options: [
      'Geralmente com discussões acaloradas, gritos ou explosões frequentes.',
      'Com silêncios prolongados, afastamento e assuntos ignorados para evitar atrito.',
      'Com diálogo ponderado, escuta e busca cooperativa de acordos.',
      'Com reações imprevisíveis: ora calmaria, ora cobrança abrupta sem aviso.',
      'Prefiro não especificar / Não me recordo com clareza.'
    ]
  },
  {
    id: 'ref_2_anger_expression',
    category: 'Expressão Emocional',
    prompt: 'Na sua história de desenvolvimento, demonstrar raiva ou contrariedade era algo:',
    guidance: 'Observe quais sentimentos eram tolerados ou proibidos no seu círculo de formação.',
    options: [
      'Fortemente reprimido ou punido (havia a exigência de "engolir o choro" ou manter a compostura).',
      'Aceito abertamente e incentivado como sinal de firmeza e defesa pessoal.',
      'Acolhido como sentimento natural, porém orientado para ser expresso sem violência.',
      'Vivenciado com medo de represálias ou ameaça de rompimento de laços afetivos.',
      'Outro padrão não descrito aqui.'
    ]
  },
  {
    id: 'ref_3_disagreement_interpretation',
    category: 'Interpretação de Ameaça',
    prompt: 'No íntimo, o que você costuma interpretar espontaneamente quando alguém discorda firmemente de você?',
    guidance: 'Qual é o primeiro pensamento automático que surge antes da reflexão racional?',
    options: [
      'Que a pessoa está desafiando minha autoridade, meu valor ou minha competência.',
      'Que ela é teimosa, desinformada ou tem má vontade em relação ao meu ponto.',
      'Que eu cometi algum erro grave ou não me expressei com a qualidade necessária.',
      'Que discordar é natural e faz parte da troca de pontos de vista diferentes.',
      'Que a relação está sob risco e é melhor recuar para não desgastar o vínculo.'
    ]
  },
  {
    id: 'ref_4_defense_triggers',
    category: 'Gatilhos de Defesa',
    prompt: 'Em quais situações você sente que precisa se defender imediatamente, quase no piloto automático?',
    guidance: 'Identifique os cenários em que o impulso de reação supera a ponderação deliberada.',
    options: [
      'Quando percebo tom de desdém, ironia ou desrespeito à minha dignidade.',
      'Quando sou acusado injustamente de algo que não fiz ou quando distorcem fatos.',
      'Quando tentam me impor ordens sem justificativa lógica transparente.',
      'Quando alguém tenta invadir meu espaço pessoal ou desconsiderar meu cansaço.',
      'Dificilmente sinto necessidade de reagir imediatamente.'
    ]
  },
  {
    id: 'ref_5_control_loss',
    category: 'Percepção de Controle',
    prompt: 'Que tipo de circunstância mais facilmente faz você sentir que está perdendo o controle?',
    guidance: 'O que mais desestabiliza sua sensação de previsibilidade e segurança?',
    options: [
      'Depender da velocidade e da boa vontade de terceiros para cumprir prazos.',
      'Mudanças bruscas de diretrizes após ter dedicado muito tempo a um plano.',
      'Ambientes barulhentos, caóticos e com interrupções frequentes.',
      'Situações em que não posso prever a reação emocional da outra pessoa.',
      'Não me desestabilizo com facilidade diante de imprevistos.'
    ]
  },
  {
    id: 'ref_6_habits_future',
    category: 'Revisão de Padrões',
    prompt: 'Olhando para a sua forma habitual de responder a frustrações, qual intenção você tem para o seu desenvolvimento?',
    guidance: 'Esta resposta servirá de âncora para o seu Plano de Desenvolvimento Individual (PDI).',
    options: [
      'Aprender a respirar e fazer uma pausa antes de disparar respostas imediatas de confronto.',
      'Desenvolver mais firmeza para me posicionar e parar de engolir mágoas em silêncio.',
      'Cobrar-me menos e parar de remoer equívocos que já foram superados.',
      'Aprimorar minha capacidade de negociar com flexibilidade sem levar as coisas para o lado pessoal.',
      'Manter os padrões atuais, que já atendem bem à minha realidade de vida.'
    ]
  }
];
