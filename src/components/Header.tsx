/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Compass, FileText, CheckCircle2, History, RotateCcw } from 'lucide-react';

interface HeaderProps {
  currentView: 'welcome' | 'test' | 'reflection' | 'report';
  progressPercentage?: number;
  onOpenAudit: () => void;
  onOpenHistory: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  progressPercentage = 0,
  onOpenAudit,
  onOpenHistory,
  onReset
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Context */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-indigo-600/20">
            <Compass className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-indigo-700 dark:text-indigo-400">
              <span>Assessment COMET</span>
              <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">·</span>
              <span className="text-slate-500 dark:text-slate-400 font-normal normal-case">Instrumento Original</span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 truncate">
              Reação à Frustração e Padrões Aprendidos
            </h1>
          </div>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenAudit}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors border border-slate-200 dark:border-slate-700"
            title="Verificar auditoria e testes do algoritmo"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline">Auditoria do Algoritmo</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors border border-slate-200 dark:border-slate-700"
            title="Relatórios salvos"
          >
            <History className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Histórico</span>
          </button>

          {currentView !== 'welcome' && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-md transition-colors"
              title="Recomeçar do início"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reiniciar</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar (Visible during test) */}
      {currentView === 'test' && (
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1">
          <div
            className="bg-indigo-600 dark:bg-indigo-500 h-1 transition-all duration-300 ease-out"
            style={{ width: `${Math.max(2, Math.min(100, progressPercentage))}%` }}
          />
        </div>
      )}
    </header>
  );
};
