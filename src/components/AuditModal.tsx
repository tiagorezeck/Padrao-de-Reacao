/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Table, RefreshCw, ShieldCheck } from 'lucide-react';
import { runCometAuditTests } from '../engine/selfTests';
import { SCORING_MATRIX } from '../engine/scoringMatrix';
import { SelfTestResult } from '../types/comet';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose }) => {
  const [testResults, setTestResults] = useState<SelfTestResult[]>(() => runCometAuditTests());
  const [viewMatrix, setViewMatrix] = useState<boolean>(false);
  const [filterSituation, setFilterSituation] = useState<number | 'all'>('all');

  if (!isOpen) return null;

  const handleRerun = () => {
    setTestResults(runCometAuditTests());
  };

  const allPassed = testResults.every((t) => t.status === 'passed');

  const filteredMatrix =
    filterSituation === 'all'
      ? SCORING_MATRIX
      : SCORING_MATRIX.filter((m) => m.situationId === filterSituation);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Auditoria e Testes do Algoritmo COMET
              </h2>
              <p className="text-xs text-slate-500">
                Verificação automatizada da matriz, escores, isolamento e equilíbrio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRerun}
              className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Reexecutar testes"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {allPassed ? (
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Todos os 6 testes de conformidade aprovados (100% de sucesso)</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-rose-600 font-semibold">
                <AlertCircle className="w-4 h-4" />
                <span>Falhas detectadas na auditoria</span>
              </span>
            )}
          </div>

          <button
            onClick={() => setViewMatrix(!viewMatrix)}
            className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            <Table className="w-3.5 h-3.5" />
            <span>{viewMatrix ? 'Ver Testes' : 'Inspecionar Matriz de Pesos (124 itens)'}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {!viewMatrix ? (
            <div className="space-y-3">
              {testResults.map((test) => (
                <div
                  key={test.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {test.status === 'passed' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {test.title}
                      </h3>
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        test.status === 'passed'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {test.status === 'passed' ? 'Aprovado' : 'Falhou'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {test.message}
                  </p>

                  {test.auditMetrics && (
                    <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-950 font-mono text-[11px] text-slate-500 space-y-0.5">
                      {Object.entries(test.auditMetrics).map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span>{k}:</span>
                          <span className="text-slate-700 dark:text-slate-300 font-bold">{String(v)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  Total de 124 alternativas mapeadas na matriz centralizada:
                </span>
                <select
                  value={filterSituation}
                  onChange={(e) =>
                    setFilterSituation(e.target.value === 'all' ? 'all' : Number(e.target.value))
                  }
                  className="text-xs p-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  <option value="all">Todas as 31 situações</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      Situação {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-2.5">Sit.</th>
                      <th className="p-2.5">Alt.</th>
                      <th className="p-2.5">Dimensão Primária</th>
                      <th className="p-2.5">Secundária</th>
                      <th className="p-2.5">Peso</th>
                      <th className="p-2.5">Justificativa Conceitual</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                    {filteredMatrix.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                        <td className="p-2.5 font-bold">{item.situationId}</td>
                        <td className="p-2.5 font-bold text-indigo-600">{item.alternativeId}</td>
                        <td className="p-2.5 text-slate-800 dark:text-slate-200 font-sans">{item.primaryDimension}</td>
                        <td className="p-2.5 text-slate-400 font-sans">{item.secondaryDimension || '—'}</td>
                        <td className="p-2.5">{item.weight}</td>
                        <td className="p-2.5 text-slate-500 font-sans text-[11px] leading-tight">
                          {item.conceptualRationale}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition"
          >
            Fechar Auditoria
          </button>
        </div>
      </div>
    </div>
  );
};
