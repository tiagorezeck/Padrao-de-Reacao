/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Download,
  Printer,
  RotateCcw,
  Shield,
  HelpCircle,
  Lightbulb,
  Target,
  AlertTriangle,
  Compass,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';
import { DIMENSIONS_META } from '../data/dimensionsMeta';
import { exportReportToJSON } from '../storage/cometStorage';
import { ActionPlanItem, AssessmentReport, DimensionId, DimensionScore } from '../types/comet';

interface ReportViewProps {
  report: AssessmentReport;
  onRetakeTest: () => void;
  onUpdateActionPlanNotes?: (planId: string, notes: string) => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  report,
  onRetakeTest,
  onUpdateActionPlanNotes
}) => {
  const [expandedDimension, setExpandedDimension] = useState<DimensionId | null>(null);
  const [actionPlanState, setActionPlanState] = useState<ActionPlanItem[]>(report.actionPlan);

  const toggleDimension = (id: DimensionId) => {
    setExpandedDimension((prev) => (prev === id ? null : id));
  };

  const handleNoteChange = (id: string, notes: string) => {
    setActionPlanState((prev) =>
      prev.map((item) => (item.id === id ? { ...item, userNotes: notes } : item))
    );
    if (onUpdateActionPlanNotes) {
      onUpdateActionPlanNotes(id, notes);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    exportReportToJSON({
      ...report,
      actionPlan: actionPlanState
    });
  };

  const formattedDate = new Date(report.completedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 space-y-12">
      {/* Top Floating Action Bar (hidden in print) */}
      <div className="no-print bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Relatório gerado em <span className="font-semibold text-slate-800 dark:text-slate-200">{formattedDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-md transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / Salvar PDF</span>
          </button>

          <button
            onClick={onRetakeTest}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-md transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nova Avaliação</span>
          </button>
        </div>
      </div>

      {/* SEÇÃO 1 — VISÃO GERAL */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Compass className="w-4 h-4" />
              <span>Assessment COMET · Relatório Técnico Individual</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              Reação à Frustração e Padrões Aprendidos
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Participante: <strong className="text-slate-800 dark:text-slate-200">{report.participantName}</strong> · Matriz: {report.matrixVersion} · Algoritmo: {report.algorithmVersion}
            </p>
          </div>

          <div className="text-right text-xs text-slate-400 space-y-0.5">
            <div>31 Situações Analisadas</div>
            <div>Identificador: <span className="font-mono text-[11px]">{report.id.substring(0, 16)}</span></div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Seção 1 · Síntese dos Padrões Identificados
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Este instrumento avalia padrões comportamentais observáveis diante de obstáculos cotidianos, contrariedades e discordâncias. O objetivo é apoiar seu autoconhecimento prático, sem classificar sua personalidade por rótulos estáticos ou categorias diagnósticas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <div className="text-xs font-semibold text-slate-500 uppercase">Vetor Reativo Prevalente</div>
              <div className="text-base font-bold text-slate-900 dark:text-slate-100">
                {report.predominantReactive.name}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                {DIMENSIONS_META[report.predominantReactive.dimensionId]?.shortDescription}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase">Recurso Construtivo Evidenciado</div>
              <div className="text-base font-bold text-slate-900 dark:text-slate-100">
                {report.predominantConstructive.name}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                {DIMENSIONS_META[report.predominantConstructive.dimensionId]?.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2 — MAPA DE REAÇÃO À FRUSTRAÇÃO */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Seção 2 · Mapa de Reação à Frustração (As 8 Dimensões)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            As dimensões não são polos excludentes. Você pode apresentar escores elevados em confronto e simultaneamente em reorganização prática.
          </p>
        </div>

        {/* Dimensions Bar Chart */}
        <div className="space-y-4 pt-2">
          {report.sortedDimensions.map((dim) => {
            const meta = DIMENSIONS_META[dim.dimensionId];
            const isExpanded = expandedDimension === dim.dimensionId;
            return (
              <div
                key={dim.dimensionId}
                className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 transition-all hover:border-slate-300 dark:hover:border-slate-700 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {dim.name}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-normal">
                        ({dim.experimentalBand})
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {meta?.shortDescription}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                    <span className="text-slate-400" title="Pontos brutos / Máximo possível">
                      Bruto: {dim.rawScore} / {dim.maxPossibleRaw}
                    </span>
                    <span className="text-base font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                      {dim.normalizedScore}%
                    </span>
                    <button
                      onClick={() => toggleDimension(dim.dimensionId)}
                      className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1"
                      title="Ver detalhes da dimensão"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Progress Visual Bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-500"
                    style={{ width: `${Math.max(3, dim.normalizedScore)}%` }}
                  />
                </div>

                {/* Expanded Details Accordion */}
                {isExpanded && meta && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs space-y-3 text-slate-600 dark:text-slate-400 animate-fadeIn">
                    <div>
                      <strong className="text-slate-800 dark:text-slate-200">Definição conceitual:</strong> {meta.definition}
                    </div>

                    <div>
                      <strong className="text-slate-800 dark:text-slate-200">Manifestação no comportamento:</strong> {meta.behavioralManifestation}
                    </div>

                    <div>
                      <strong className="text-slate-800 dark:text-slate-200">Gatilhos que costumam ativar:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-500">
                        {meta.situationalTriggers.map((trig, idx) => (
                          <li key={idx}>{trig}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-amber-900 dark:text-amber-300">
                      <strong>Ponto de Cautela e Atenção:</strong> {meta.cautionaryPoints}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SEÇÃO 3 — REAÇÕES QUE MERECEM ATENÇÃO */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Seção 3 · Reações que Merecem Atenção
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Análise dos comportamentos mais recorrentes versus os recursos de modulação demonstrados no questionário.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase">
              <AlertTriangle className="w-4 h-4" />
              <span>Padrão Reativo de Maior Frequência</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {report.predominantReactive.name} ({report.predominantReactive.normalizedScore}%)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Você tendeu a selecionar esta reação de forma consistente ao longo de várias situações. Isso não indica descontrole emocional, mas sim que este é o canal preferencial pelo qual sua insatisfação é manifestada sob estresse.
            </p>
            <div className="text-xs text-slate-500 pt-1">
              <strong>Impacto potencial:</strong> {DIMENSIONS_META[report.predominantReactive.dimensionId]?.cautionaryPoints}
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>Padrão Construtivo e Resolutivo</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {report.predominantConstructive.name} ({report.predominantConstructive.normalizedScore}%)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Este resultado demonstra sua capacidade ativa de redefinir estratégias, respirar antes de agir ou adaptar sua conduta. Representa sua principal âncora para conter escaladas e construir soluções maduras.
            </p>
            <div className="text-xs text-slate-500 pt-1">
              <strong>Como alavancar:</strong> Utilize este recurso como ponto de apoio antes de emitir respostas automáticas do padrão reativo.
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4 — GATILHOS SITUACIONAIS */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Seção 4 · Mapeamento de Gatilhos Situacionais
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Como suas respostas se distribuíram nos diferentes contextos de fricção humana e profissional.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {report.triggersAnalysis.map((item) => (
            <div
              key={item.category}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-2"
            >
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {item.category}
              </div>

              <div className="text-xs text-slate-500">
                Reação mais escolhida:{' '}
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {item.dominantDimensionName}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-400 flex justify-between">
                <span>
                  Intensidade:{' '}
                  {item.averageIntensity !== null ? `${item.averageIntensity}/4` : 'Não informada'}
                </span>
                <span>
                  Frequência:{' '}
                  {item.averageFrequency !== null ? `${item.averageFrequency}/4` : 'Não informada'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO 5 — PADRÕES APRENDIDOS E HIPÓTESES */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Seção 5 · Padrões Aprendidos e Hipóteses Retrospectivas
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Exploração qualitativa de influências históricas e modelos formativos.
          </p>
        </div>

        {report.reflectionSummary.hasReflections ? (
          <div className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-950/50 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase text-slate-500">
                Observações Registradas por Você
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {report.reflectionSummary.observations.map((obs, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-300 space-y-1 leading-relaxed">
              <strong>Hipótese reflexiva para desenvolvimento:</strong> As respostas que aprendemos na história (como silenciar para evitar punição ou contra-atacar para não ser dominado) foram estratégias úteis de sobrevivência no passado. O desafio atual é reconhecer quando essas defesas antigas disparam sem real necessidade no presente.
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 italic">
            Você optou por pular a etapa reflexiva de história e padrões aprendidos. O relatório segue plenamente funcional com base em suas 31 escolhas comportamentais diretas.
          </div>
        )}
      </section>

      {/* SEÇÃO 6 — ESTRATÉGIAS DE DESENVOLVIMENTO */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Seção 6 · Estratégias Práticas de Desenvolvimento
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Micro-comportamentos recomendados para modular o padrão reativo prevalente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <Lightbulb className="w-4 h-4" />
              <span>1. Reconhecer os Sinais Fisiológicos</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Note a tensão muscular, mandíbula travada ou calor no peito antes de emitir qualquer resposta. O sinal físico precede a reação impulsiva em alguns segundos.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <Lightbulb className="w-4 h-4" />
              <span>2. Intervalo de Respiração Consciente</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Crie uma pausa intencional de 5 a 10 segundos antes de rebater uma crítica ou responder a um e-mail ríspido. A pausa devolve o controle ao córtex pré-frontal.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <Lightbulb className="w-4 h-4" />
              <span>3. Separar Fato de Intenção Atribuída</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Questione: "O que de fato aconteceu aqui?" versus "Qual intenção estou presumindo que a outra pessoa teve?". Faça perguntas antes de acusar.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <Lightbulb className="w-4 h-4" />
              <span>4. Demarcação de Limites sem Agressão</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Dizer "não" ou pontuar um desacordo com tom calmo e postura firme é muito mais eficaz e sustentável do que a explosão verbal ou o recuo silencioso.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 7 — PLANO DE DESENVOLVIMENTO PESSOAL (PDI) */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Seção 7 · Plano de Desenvolvimento Individual (PDI)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Ações concretas e observáveis para praticar ao longo das próximas semanas.
          </p>
        </div>

        <div className="space-y-4">
          {actionPlanState.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/30 space-y-3"
            >
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
                <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>{item.priorityTitle}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="font-semibold text-slate-500 block">Comportamento-Alvo:</span>
                  <span className="text-slate-700 dark:text-slate-300">{item.targetBehavior}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 block">Contexto de Prática:</span>
                  <span className="text-slate-700 dark:text-slate-300">{item.practiceContext}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 block">Indicador Observável:</span>
                  <span className="text-slate-700 dark:text-slate-300">{item.observableIndicator}</span>
                </div>
              </div>

              {/* User Editable Notes for reflection */}
              <div className="pt-2">
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                  Minhas anotações e compromisso pessoal para esta ação:
                </label>
                <textarea
                  rows={2}
                  value={item.userNotes}
                  onChange={(e) => handleNoteChange(item.id, e.target.value)}
                  placeholder="Escreva como você pretende aplicar isso na prática..."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO 8 — LIMITAÇÕES TÉCNICAS E ÉTICAS */}
      <section className="bg-slate-100/70 dark:bg-slate-900/40 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 text-xs text-slate-600 dark:text-slate-400 space-y-3">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm">
          <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Seção 8 · Limitações Técnicas, Metodológicas e Éticas</span>
        </div>

        <ul className="list-disc list-inside space-y-1.5 leading-relaxed">
          <li>
            <strong>Instrumento Original COMET:</strong> Este teste é uma criação original desenvolvida para a plataforma Assessment COMET. Embora fundamentado na literatura científica sobre frustração (Faiad, Pasquali & Primi, 2016), <em>não reproduz o TRFO oficial</em>, suas pranchas, gabarito ou normas.
          </li>
          <li>
            <strong>Caráter Não Clínico e Exploratório:</strong> O algoritmo e os escores não constituem laudo psicológico, avaliação pericial ou diagnóstico psiquiátrico de transtornos de humor ou personalidade.
          </li>
          <li>
            <strong>Sem Relação Causal Comprovada:</strong> As reflexões históricas sobre infância e ambiente formativo representam hipóteses dialógicas de autoconhecimento e não comprovam causalidade mecânica.
          </li>
          <li>
            <strong>Versão em Pesquisa:</strong> Escores brutos e normalizados refletem a distribuição interna das 31 situações respondidas nesta sessão (Versão {report.algorithmVersion}).
          </li>
        </ul>
      </section>
    </div>
  );
};
