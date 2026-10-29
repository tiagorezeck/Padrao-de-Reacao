/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, SkipForward, Shield, Sparkles, MessageSquare } from 'lucide-react';
import { REFLECTION_QUESTIONS } from '../data/reflectionQuestions';
import { ReflectionAnswer } from '../types/comet';

interface ReflectionStepProps {
  onComplete: (answers: ReflectionAnswer[]) => void;
  onSkip: () => void;
  initialAnswers?: ReflectionAnswer[];
}

export const ReflectionStep: React.FC<ReflectionStepProps> = ({
  onComplete,
  onSkip,
  initialAnswers = []
}) => {
  const [answersMap, setAnswersMap] = useState<Record<string, { option?: string; notes?: string }>>(() => {
    const map: Record<string, { option?: string; notes?: string }> = {};
    initialAnswers.forEach((ans) => {
      map[ans.questionId] = {
        option: ans.selectedOption,
        notes: ans.notes
      };
    });
    return map;
  });

  const handleSelectOption = (questionId: string, option: string) => {
    setAnswersMap((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        option
      }
    }));
  };

  const handleNotesChange = (questionId: string, notes: string) => {
    setAnswersMap((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        notes
      }
    }));
  };

  const handleFinish = () => {
    const compiled: ReflectionAnswer[] = REFLECTION_QUESTIONS.map((q) => ({
      questionId: q.id,
      questionText: q.prompt,
      category: q.category,
      selectedOption: answersMap[q.id]?.option,
      notes: answersMap[q.id]?.notes
    }));
    onComplete(compiled);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 space-y-10">
      {/* Header and Methodological Guardrail */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200/60 dark:border-indigo-800/60">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Etapa Complementar e Opcional</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Reflexão sobre Padrões Aprendidos
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Nossas reações automáticas à frustração frequentemente dialogam com modelos de convivência, regras explícitas ou implícitas sobre conflitos e formas de expressar desacordo que aprendemos ao longo da história.
        </p>

        {/* Cautious Ethical Card */}
        <div className="bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 rounded-xl p-4 text-xs text-amber-900 dark:text-amber-300 space-y-1.5">
          <div className="font-semibold flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Princípio Metodológico de Separação de Hipóteses</span>
          </div>
          <p className="leading-normal">
            As respostas desta seção são <strong>estritamente exploratórias</strong> e <strong>não alteram suas pontuações numéricas</strong> das 31 situações anteriores. O questionário não conclui causas psicológicas definitivas, apenas levanta hipóteses para seu autoconhecimento. Você é livre para responder ou pular.
          </p>
        </div>
      </div>

      {/* Guided Questions List */}
      <div className="space-y-8">
        {REFLECTION_QUESTIONS.map((q, idx) => {
          const current = answersMap[q.id] || {};
          return (
            <div
              key={q.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-indigo-600 dark:text-indigo-400">
                  <span>Reflexão {idx + 1} de {REFLECTION_QUESTIONS.length}</span>
                  <span aria-hidden="true">·</span>
                  <span>{q.category}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {q.prompt}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                  {q.guidance}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2 pt-1" role="radiogroup">
                {q.options.map((opt) => {
                  const isSelected = current.option === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption(q.id, opt)}
                      role="radio"
                      aria-checked={isSelected}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition flex items-start gap-2.5 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 dark:border-indigo-500 font-medium text-indigo-950 dark:text-indigo-200'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                          isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Optional Notes */}
              <div className="pt-2">
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Anotação pessoal ou exemplo que você recorda (Opcional):</span>
                </label>
                <textarea
                  rows={2}
                  value={current.notes || ''}
                  onChange={(e) => handleNotesChange(q.id, e.target.value)}
                  placeholder="Se desejar, escreva uma reflexão livre em poucas palavras..."
                  className="w-full text-xs p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={onSkip}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <SkipForward className="w-4 h-4" />
          <span>Pular esta etapa e gerar relatório direto</span>
        </button>

        <button
          onClick={handleFinish}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition shadow-sm"
        >
          <span>Concluir Reflexão e Ver Relatório</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
