/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import { AlternativeId, Situation, SituationResponse } from '../types/comet';

interface SituationStepProps {
  situation: Situation;
  currentIndex: number;
  totalSituations: number;
  currentResponse?: SituationResponse;
  onSelectAlternative: (altId: AlternativeId) => void;
  onUpdateIntensity: (intensity: number) => void;
  onUpdateFrequency: (frequency: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export const SituationStep: React.FC<SituationStepProps> = ({
  situation,
  currentIndex,
  totalSituations,
  currentResponse,
  onSelectAlternative,
  onUpdateIntensity,
  onUpdateFrequency,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious
}) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  // Se já houver dados de intensidade/frequência salvos, mantém a gaveta aberta
  useEffect(() => {
    if (
      currentResponse &&
      (typeof currentResponse.emotionalIntensity === 'number' ||
        typeof currentResponse.reactionFrequency === 'number')
    ) {
      setDrawerOpen(true);
    }
  }, [situation.id, currentResponse]);

  // Atalhos de teclado: 1, 2, 3, 4 selecionam A, B, C, D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignora se estiver digitando em campos de input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === '1') onSelectAlternative('A');
      if (e.key === '2') onSelectAlternative('B');
      if (e.key === '3') onSelectAlternative('C');
      if (e.key === '4') onSelectAlternative('D');
      if (e.key === 'ArrowRight' && canGoNext) onNext();
      if (e.key === 'ArrowLeft' && canGoPrevious) onPrevious();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canGoNext, canGoPrevious, onSelectAlternative, onNext, onPrevious]);

  const intensityLabels = [
    '0 - Nada',
    '1 - Pouco',
    '2 - Moderadamente',
    '3 - Intensamente',
    '4 - Muito intensamente'
  ];

  const frequencyLabels = [
    '0 - Quase nunca',
    '1 - Raramente',
    '2 - Às vezes',
    '3 - Frequentemente',
    '4 - Quase sempre'
  ];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Top Meta Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            Situação {currentIndex + 1} de {totalSituations}
          </span>
          <span aria-hidden="true">·</span>
          <span>Tema: {situation.themeTopic}</span>
        </div>

        <div className="text-[11px] font-mono text-slate-400">
          Atalhos: [1, 2, 3, 4] para escolher | [← / →] para navegar
        </div>
      </div>

      {/* Main Situation Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {situation.category}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            {situation.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
            {situation.context}
          </p>
        </div>

        <div className="pt-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
            Como você costuma reagir nessa situação? (Escolha a mais próxima)
          </h3>

          <div className="space-y-3" role="radiogroup" aria-label="Alternativas comportamentais">
            {situation.alternatives.map((alt, idx) => {
              const isSelected = currentResponse?.selectedAlternativeId === alt.id;
              return (
                <button
                  key={alt.id}
                  onClick={() => onSelectAlternative(alt.id)}
                  role="radio"
                  aria-checked={isSelected}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 group ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 dark:border-indigo-500 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 group-hover:border-indigo-400'
                    }`}
                  >
                    {alt.id}
                  </div>

                  <div className="flex-1 pt-0.5 text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-snug">
                    {alt.text}
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-1">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional Expandable Intensity & Frequency Drawer */}
        {currentResponse?.selectedAlternativeId && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="flex items-center justify-between w-full text-left py-2 px-3 rounded-lg bg-slate-100/70 dark:bg-slate-800/60 hover:bg-slate-200/60 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Registrar Intensidade Emocional e Frequência</span>
                <span className="text-[11px] text-slate-400 font-normal">(Opcional)</span>
              </div>
              {drawerOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {drawerOpen && (
              <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800 space-y-6">
                {/* Intensidade */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">
                      Quanto essa situação costuma afetar você emocionalmente?
                    </label>
                    <span className="font-mono font-medium text-indigo-600 dark:text-indigo-400">
                      {typeof currentResponse.emotionalIntensity === 'number'
                        ? intensityLabels[currentResponse.emotionalIntensity]
                        : 'Não especificado'}
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5 pt-1">
                    {[0, 1, 2, 3, 4].map((val) => (
                      <button
                        key={val}
                        onClick={() => onUpdateIntensity(val)}
                        className={`py-2 px-1 text-xs rounded-lg font-medium border text-center transition ${
                          currentResponse.emotionalIntensity === val
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 px-1">
                    <span>Nada (0)</span>
                    <span>Moderado (2)</span>
                    <span>Muito intenso (4)</span>
                  </div>
                </div>

                {/* Frequência */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">
                      Com que frequência você reage dessa maneira em casos reais semelhantes?
                    </label>
                    <span className="font-mono font-medium text-indigo-600 dark:text-indigo-400">
                      {typeof currentResponse.reactionFrequency === 'number'
                        ? frequencyLabels[currentResponse.reactionFrequency]
                        : 'Não especificado'}
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5 pt-1">
                    {[0, 1, 2, 3, 4].map((val) => (
                      <button
                        key={val}
                        onClick={() => onUpdateFrequency(val)}
                        className={`py-2 px-1 text-xs rounded-lg font-medium border text-center transition ${
                          currentResponse.reactionFrequency === val
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 px-1">
                    <span>Quase nunca (0)</span>
                    <span>Às vezes (2)</span>
                    <span>Quase sempre (4)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
            canGoPrevious
              ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800'
              : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onNext}
            disabled={!canGoNext}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm ${
              canGoNext
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
            }`}
          >
            <span>{currentIndex === totalSituations - 1 ? 'Concluir 31 Situações' : 'Avançar'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
