/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SITUATIONS } from './data/situations';
import { getSampleAssessmentReport } from './data/sampleReport';
import { calculateAssessmentReport } from './engine/scoringEngine';
import {
  ActiveSession,
  clearActiveSession,
  getActiveSession,
  parseAndValidateImportedReport,
  saveActiveSession,
  saveCompletedReport
} from './storage/cometStorage';
import {
  AlternativeId,
  AssessmentReport,
  ReflectionAnswer,
  SituationResponse
} from './types/comet';
import { Header } from './components/Header';
import { WelcomeView } from './components/WelcomeView';
import { SituationStep } from './components/SituationStep';
import { ReflectionStep } from './components/ReflectionStep';
import { ReportView } from './components/ReportView';
import { AuditModal } from './components/AuditModal';
import { HistoryModal } from './components/HistoryModal';

export default function App() {
  const [currentView, setCurrentView] = useState<'welcome' | 'test' | 'reflection' | 'report'>('welcome');
  const [participantName, setParticipantName] = useState<string>('');
  const [currentSituationIndex, setCurrentSituationIndex] = useState<number>(0);
  const [responses, setResponses] = useState<SituationResponse[]>([]);
  const [reflectionAnswers, setReflectionAnswers] = useState<ReflectionAnswer[]>([]);
  const [currentReport, setCurrentReport] = useState<AssessmentReport | null>(null);

  // Modals e Toasts
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);

  // Carrega sessão ativa salva no LocalStorage na inicialização
  useEffect(() => {
    const session = getActiveSession();
    if (session && session.responses.length > 0) {
      setActiveSession(session);
    }
  }, []);

  // Notificação toast temporária
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Salvar automaticamente a sessão em andamento
  useEffect(() => {
    if (currentView === 'test' && responses.length > 0) {
      saveActiveSession({
        participantName,
        currentSituationIndex,
        responses,
        reflectionAnswers,
        startedAt: responses[0]?.answeredAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
  }, [currentView, currentSituationIndex, responses, reflectionAnswers, participantName]);

  // Iniciar novo teste do zero
  const handleStartNewTest = () => {
    clearActiveSession();
    setActiveSession(null);
    setResponses([]);
    setReflectionAnswers([]);
    setCurrentSituationIndex(0);
    setCurrentReport(null);
    setCurrentView('test');
  };

  // Continuar teste existente do LocalStorage
  const handleResumeTest = () => {
    if (!activeSession) return;
    setParticipantName(activeSession.participantName || '');
    setResponses(activeSession.responses || []);
    setReflectionAnswers(activeSession.reflectionAnswers || []);
    setCurrentSituationIndex(Math.min(activeSession.currentSituationIndex || 0, SITUATIONS.length - 1));
    setCurrentView('test');
  };

  // Registrar ou alterar alternativa selecionada
  const handleSelectAlternative = (altId: AlternativeId) => {
    const currentSit = SITUATIONS[currentSituationIndex];
    setResponses((prev) => {
      const existing = prev.find((r) => r.situationId === currentSit.id);
      if (existing) {
        return prev.map((r) =>
          r.situationId === currentSit.id
            ? { ...r, selectedAlternativeId: altId, answeredAt: new Date().toISOString() }
            : r
        );
      } else {
        return [
          ...prev,
          {
            situationId: currentSit.id,
            selectedAlternativeId: altId,
            answeredAt: new Date().toISOString()
          }
        ];
      }
    });
  };

  // Atualizar intensidade emocional (0 a 4)
  const handleUpdateIntensity = (intensity: number) => {
    const currentSit = SITUATIONS[currentSituationIndex];
    setResponses((prev) =>
      prev.map((r) =>
        r.situationId === currentSit.id ? { ...r, emotionalIntensity: intensity } : r
      )
    );
  };

  // Atualizar frequência de reação (0 a 4)
  const handleUpdateFrequency = (frequency: number) => {
    const currentSit = SITUATIONS[currentSituationIndex];
    setResponses((prev) =>
      prev.map((r) =>
        r.situationId === currentSit.id ? { ...r, reactionFrequency: frequency } : r
      )
    );
  };

  // Navegação para a próxima situação
  const handleNextSituation = () => {
    if (currentSituationIndex < SITUATIONS.length - 1) {
      setCurrentSituationIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Concluiu as 31 situações -> Avança para a etapa reflexiva
      setCurrentView('reflection');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Voltar para a situação anterior
  const handlePreviousSituation = () => {
    if (currentSituationIndex > 0) {
      setCurrentSituationIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Concluir etapa reflexiva e gerar relatório
  const handleCompleteReflection = (compiledReflection: ReflectionAnswer[]) => {
    setReflectionAnswers(compiledReflection);
    const report = calculateAssessmentReport(
      responses,
      compiledReflection,
      participantName || 'Participante'
    );
    setCurrentReport(report);
    saveCompletedReport(report);
    setCurrentView('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Relatório COMET gerado e salvo com sucesso!');
  };

  // Pular etapa reflexiva e ir direto para o relatório
  const handleSkipReflection = () => {
    setReflectionAnswers([]);
    const report = calculateAssessmentReport(responses, [], participantName || 'Participante');
    setCurrentReport(report);
    saveCompletedReport(report);
    setCurrentView('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Relatório COMET gerado e salvo com sucesso!');
  };

  // Atualizar anotações no Plano de Ação (PDI)
  const handleUpdateActionPlanNotes = (planId: string, notes: string) => {
    if (!currentReport) return;
    const updatedPlan = currentReport.actionPlan.map((p) =>
      p.id === planId ? { ...p, userNotes: notes } : p
    );
    const updatedReport = { ...currentReport, actionPlan: updatedPlan };
    setCurrentReport(updatedReport);
    saveCompletedReport(updatedReport);
  };

  // Importar JSON
  const handleImportJSON = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const res = parseAndValidateImportedReport(content);
      if (res.success && res.report) {
        setCurrentReport(res.report);
        saveCompletedReport(res.report);
        setCurrentView('report');
        showToast('Relatório importado com sucesso!');
      } else {
        showToast(res.error || 'Erro ao importar arquivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  // Carregar exemplo de relatório demonstrativo completo
  const handleLoadSampleReport = () => {
    const sample = getSampleAssessmentReport();
    setCurrentReport(sample);
    saveCompletedReport(sample);
    setCurrentView('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Exemplo de relatório demonstrativo carregado!');
  };

  // Selecionar relatório do histórico
  const handleSelectHistoricalReport = (report: AssessmentReport) => {
    setCurrentReport(report);
    setCurrentView('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reiniciar tudo para a tela inicial
  const handleResetToWelcome = () => {
    if (confirm('Deseja realmente voltar à tela inicial? Seu progresso salvo poderá ser recuperado.')) {
      setCurrentView('welcome');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Situação atual e resposta correspondente
  const currentSituation = SITUATIONS[currentSituationIndex];
  const currentResponse = responses.find((r) => r.situationId === currentSituation?.id);
  const progressPercentage = ((currentSituationIndex + 1) / SITUATIONS.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Header
        currentView={currentView}
        progressPercentage={progressPercentage}
        onOpenAudit={() => setIsAuditModalOpen(true)}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        onReset={handleResetToWelcome}
      />

      <main className="flex-1">
        {currentView === 'welcome' && (
          <WelcomeView
            participantName={participantName}
            onParticipantNameChange={setParticipantName}
            onStartNewTest={handleStartNewTest}
            onResumeTest={activeSession ? handleResumeTest : undefined}
            activeSession={activeSession}
            onImportJSON={handleImportJSON}
            onLoadSampleReport={handleLoadSampleReport}
          />
        )}

        {currentView === 'test' && currentSituation && (
          <SituationStep
            situation={currentSituation}
            currentIndex={currentSituationIndex}
            totalSituations={SITUATIONS.length}
            currentResponse={currentResponse}
            onSelectAlternative={handleSelectAlternative}
            onUpdateIntensity={handleUpdateIntensity}
            onUpdateFrequency={handleUpdateFrequency}
            onNext={handleNextSituation}
            onPrevious={handlePreviousSituation}
            canGoNext={Boolean(currentResponse?.selectedAlternativeId)}
            canGoPrevious={currentSituationIndex > 0}
          />
        )}

        {currentView === 'reflection' && (
          <ReflectionStep
            onComplete={handleCompleteReflection}
            onSkip={handleSkipReflection}
            initialAnswers={reflectionAnswers}
          />
        )}

        {currentView === 'report' && currentReport && (
          <ReportView
            report={currentReport}
            onRetakeTest={handleStartNewTest}
            onUpdateActionPlanNotes={handleUpdateActionPlanNotes}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="no-print py-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400 space-y-1">
        <div>Assessment COMET · Reação à Frustração e Padrões Aprendidos</div>
        <div className="text-[11px] text-slate-500">
          Instrumento de desenvolvimento comportamental e autoconhecimento. Não aplicável para diagnósticos clínicos.
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-lg text-xs font-semibold animate-slideUp">
          {toastMessage}
        </div>
      )}

      {/* Modals */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        onSelectReport={handleSelectHistoricalReport}
        onImportJSON={handleImportJSON}
        onLoadSampleReport={handleLoadSampleReport}
      />
    </div>
  );
}
