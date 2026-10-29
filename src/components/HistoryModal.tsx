/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { X, History, FileText, Trash2, Download, Upload } from 'lucide-react';
import { exportReportToJSON, getSavedReports } from '../storage/cometStorage';
import { AssessmentReport } from '../types/comet';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectReport: (report: AssessmentReport) => void;
  onImportJSON: (file: File) => void;
  onLoadSampleReport: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  onSelectReport,
  onImportJSON,
  onLoadSampleReport
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [reports, setReports] = React.useState<AssessmentReport[]>(() => getSavedReports());

  if (!isOpen) return null;

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = reports.filter((r) => r.id !== id);
    setReports(updated);
    try {
      localStorage.setItem('comet_frustration_history_v1', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportJSON(file);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <History className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Histórico de Avaliações Salvas
              </h2>
              <p className="text-xs text-slate-500">
                Relatórios armazenados localmente neste navegador com privacidade
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {reports.length === 0 ? (
            <div className="text-center py-10 text-slate-400 space-y-3">
              <FileText className="w-10 h-10 mx-auto stroke-1 text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Nenhum relatório salvo no momento.</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Você pode responder às 31 situações ou carregar um relatório completo de teste imediatamente para explorar o layout e o algoritmo.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    onLoadSampleReport();
                    onClose();
                  }}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition shadow-sm inline-flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Carregar Exemplo de Relatório Completo</span>
                </button>
              </div>
            </div>
          ) : (
            reports.map((r) => {
              const dateStr = new Date(r.completedAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });
              return (
                <div
                  key={r.id}
                  onClick={() => {
                    onSelectReport(r);
                    onClose();
                  }}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 bg-white dark:bg-slate-900 transition flex items-center justify-between gap-4 cursor-pointer group"
                >
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 transition">
                        {r.participantName || 'Participante'}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400">
                        {dateStr}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">
                      Vetor Reativo: <strong>{r.predominantReactive?.name}</strong> · Construtivo: <strong>{r.predominantConstructive?.name}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        exportReportToJSON(r);
                      }}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                      title="Baixar JSON"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(r.id, e)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition"
                      title="Excluir do histórico"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 transition"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Importar relatório JSON externo</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
