/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { ArrowRight, Play, Upload, ShieldCheck, Sparkles, BookOpen, Clock, CheckCircle, FileText, Eye } from 'lucide-react';
import { DIMENSIONS_META } from '../data/dimensionsMeta';
import { ActiveSession } from '../storage/cometStorage';

interface WelcomeViewProps {
  participantName: string;
  onParticipantNameChange: (name: string) => void;
  onStartNewTest: () => void;
  onResumeTest?: () => void;
  activeSession: ActiveSession | null;
  onImportJSON: (file: File) => void;
  onLoadSampleReport: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  participantName,
  onParticipantNameChange,
  onStartNewTest,
  onResumeTest,
  activeSession,
  onImportJSON,
  onLoadSampleReport
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportJSON(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200/60 dark:border-indigo-800/60">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Instrumento COMET Original</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Reação à Frustração e Padrões Aprendidos
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          “Compreenda seus gatilhos, suas respostas automáticas e as possibilidades de mudança.”
        </p>
      </div>

      {/* The 3 Core Questions Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
          Três Perguntas Centrais do Instrumento
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 border-l-2 border-indigo-500 pl-4">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">01</span>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Como eu costumo reagir quando as coisas não acontecem como espero?
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Mapeamento de comportamentos observáveis diante de obstáculos cotidianos.
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-amber-500 pl-4">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">02</span>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Quais situações e interpretações ativam minhas reações automáticas?
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Identificação de gatilhos específicos como críticas, atrasos e perda de controle.
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-emerald-500 pl-4">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">03</span>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Quais padrões aprendidos posso desenvolver em respostas mais conscientes?
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Construção de estratégias práticas e plano de desenvolvimento individual (PDI).
            </p>
          </div>
        </div>
      </div>

      {/* Start Form Card */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white">Preparado para iniciar sua avaliação?</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Você responderá a 31 situações práticas com 4 alternativas cada. Leva cerca de 12 a 15 minutos.
          </p>
        </div>

        <div className="max-w-md space-y-2">
          <label htmlFor="participantName" className="block text-xs font-medium text-slate-300">
            Nome do Participante (opcional para o relatório)
          </label>
          <input
            id="participantName"
            type="text"
            value={participantName}
            onChange={(e) => onParticipantNameChange(e.target.value)}
            placeholder="Ex.: Tiago Rezeck"
            className="w-full px-4 py-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {activeSession && onResumeTest ? (
            <>
              <button
                onClick={onResumeTest}
                className="flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-colors shadow-md"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Continuar Teste Salvo (Situação {activeSession.currentSituationIndex + 1} de 31)</span>
              </button>
              <button
                onClick={onStartNewTest}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-colors border border-slate-700"
              >
                <span>Reiniciar Novo Teste</span>
              </button>
            </>
          ) : (
            <button
              onClick={onStartNewTest}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-sm transition-colors shadow-md"
            >
              <span>Iniciar Avaliação (31 Situações)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onLoadSampleReport}
            className="flex items-center gap-2 px-4 py-3 rounded-lg bg-indigo-950/80 hover:bg-indigo-900/90 text-indigo-200 hover:text-white font-medium text-sm transition-colors border border-indigo-700/60 shadow-sm"
            title="Visualizar um relatório completo pré-preenchido com as 8 seções analíticas"
          >
            <Eye className="w-4 h-4 text-indigo-400" />
            <span>Ver Exemplo de Relatório</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-colors border border-slate-700 ml-auto"
          >
            <Upload className="w-4 h-4" />
            <span>Importar JSON</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>12 a 15 min estimados</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Totalmente confidencial (salvo localmente)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Sem respostas certas ou erradas</span>
          </div>
        </div>
      </div>

      {/* The 8 Dimensions Explored */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            As 8 Dimensões Comportamentais Mapeadas
          </h2>
          <span className="text-xs text-slate-500">Sem classificação de personalidade</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.values(DIMENSIONS_META).map((dim) => (
            <div
              key={dim.id}
              className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-2 hover:border-slate-300 dark:hover:border-slate-700 transition"
            >
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {dim.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                  {dim.shortDescription}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                Padrão Reacional
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Methodological Transparency & Limitations Note */}
      <div className="bg-slate-100/70 dark:bg-slate-900/40 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
        <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Aviso Ético e Científico</span>
        </div>
        <p className="leading-relaxed">
          Este instrumento é uma <strong>criação original do Assessment COMET</strong> para fins de autoconhecimento e desenvolvimento de liderança/relacionamento interpessoal. Não é o teste TRFO oficial nem possui finalidade clínica ou diagnóstica de transtornos de personalidade. Os resultados refletem tendências comportamentais situacionais descritas pelo próprio participante nas 31 situações apresentadas.
        </p>
      </div>
    </div>
  );
};
