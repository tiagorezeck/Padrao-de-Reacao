/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AssessmentReport, ReflectionAnswer, SituationResponse } from '../types/comet';

const ACTIVE_SESSION_KEY = 'comet_frustration_active_session_v1';
const HISTORY_KEY = 'comet_frustration_history_v1';

export interface ActiveSession {
  participantName: string;
  currentSituationIndex: number;
  responses: SituationResponse[];
  reflectionAnswers: ReflectionAnswer[];
  startedAt: string;
  updatedAt: string;
}

export function saveActiveSession(session: ActiveSession): void {
  try {
    session.updatedAt = new Date().toISOString();
    localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(session));
  } catch (error) {
    console.error('Erro ao salvar sessão ativa:', error);
  }
}

export function getActiveSession(): ActiveSession | null {
  try {
    const raw = localStorage.getItem(ACTIVE_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ActiveSession;
  } catch (error) {
    console.error('Erro ao carregar sessão ativa:', error);
    return null;
  }
}

export function clearActiveSession(): void {
  try {
    localStorage.removeItem(ACTIVE_SESSION_KEY);
  } catch (error) {
    console.error('Erro ao limpar sessão ativa:', error);
  }
}

export function saveCompletedReport(report: AssessmentReport): void {
  try {
    const history = getSavedReports();
    // Previne duplicação pelo ID
    const updated = [report, ...history.filter((r) => r.id !== report.id)].slice(0, 20);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    clearActiveSession();
  } catch (error) {
    console.error('Erro ao salvar relatório no histórico:', error);
  }
}

export function getSavedReports(): AssessmentReport[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as AssessmentReport[];
  } catch (error) {
    console.error('Erro ao buscar histórico de relatórios:', error);
    return [];
  }
}

export function exportReportToJSON(report: AssessmentReport): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
  const downloadAnchor = document.createElement('a');
  const sanitizedName = (report.participantName || 'participante')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_');
  const dateStr = new Date(report.completedAt).toISOString().split('T')[0];
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `relatorio_comet_${sanitizedName}_${dateStr}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function parseAndValidateImportedReport(jsonContent: string): {
  success: boolean;
  report?: AssessmentReport;
  error?: string;
} {
  try {
    const parsed = JSON.parse(jsonContent);
    if (
      !parsed ||
      typeof parsed !== 'object' ||
      !parsed.scores ||
      !parsed.responses ||
      !Array.isArray(parsed.responses)
    ) {
      return { success: false, error: 'O arquivo JSON não possui o formato válido de um relatório COMET.' };
    }
    return { success: true, report: parsed as AssessmentReport };
  } catch (err: unknown) {
    return { success: false, error: 'Falha ao processar o arquivo JSON. Certifique-se de que é um arquivo válido.' };
  }
}
