# COMET — Reação à Frustração e Padrões Aprendidos

Instrumento original de avaliação de padrões de reação a contrariedades, críticas, impedimentos e frustrações interpessoais, com separação conceitual estrita entre respostas comportamentais observáveis, gatilhos situacionais, intensidade emocional e reflexão histórica sobre padrões aprendidos.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> **Decisões Confirmadas pelo Usuário na Etapa de Alinhamento:**
> - **Coleta de Intensidade e Frequência**: Integrada como gaveta opcional/expansível logo abaixo de cada situação respondida, evitando sobrecarga cognitiva e permitindo fluidez com a opção de registrar intensidade (0 a 4) e frequência (0 a 4) sem interromper o fluxo central.
> - **Persistência de Dados**: Armazenamento completo e resiliente em `LocalStorage`, com recurso nativo de importação/exportação em arquivo JSON padronizado e versão do esquema, garantindo portabilidade, auditoria e total privacidade sem dependências externas não provisionadas.
> - **Padrões Aprendidos**: Posicionamento em etapa reflexiva intermediária, claramente identificada como opcional e guiada, após as 31 situações e antes da geração do relatório final, assegurando separação matemática estrita em relação aos escores comportamentais.

---

### 1. Overview & Core Concept

- **O que faz**: Apresenta uma jornada interativa de avaliação estruturada em 31 situações cotidianas (pessoais e profissionais). O participante escolhe sua reação comportamental mais provável entre 4 alternativas equilibradas (sem alternativas moralistas, caricatas ou "corretas"), com opção de registrar intensidade emocional e frequência habitual. Em seguida, oferece uma etapa reflexiva guiada sobre aprendizado histórico de respostas emocionais e gera um relatório analítico multidimensional em 8 seções focado em autoconhecimento e desenvolvimento, e não em rotulagem diagnóstica.
- **Público-alvo**: Adultos em contextos pessoais, organizacionais, de liderança ou desenvolvimento profissional que desejam mapear seus gatilhos automáticos e construir respostas mais conscientes.
- **Valor Principal**: Transparência metodológica, diferenciação entre reação impulsiva e escolha deliberada, e ausência de julgamento moral ou enquadramento clínico fechado (não é TRFO nem diagnóstico).

---

### 2. User Experience & Visual Design

#### A. Fluxos do Usuário

```
┌─────────────────┐     ┌───────────────────────┐     ┌────────────────────────┐     ┌──────────────────────┐
│  Apresentação   │ ──> │   31 Situações (1/1)  │ ──> │ Etapa Reflexiva Opc.   │ ──> │  Relatório Analítico │
│  Conceito e     │     │  4 Alternativas +     │     │ Histórico de Padrões   │     │  8 Seções + PDI +    │
│  Instruções     │     │  Gaveta Intensidade   │     │ (Pular a qualquer hora)│     │  Exportação JSON     │
└─────────────────┘     └───────────────────────┘     └────────────────────────┘     └──────────────────────┘
```

1. **Tela Inicial (Boas-vindas & Propósito)**:
   - Apresentação do objetivo, esclarecimento de que não se trata de teste diagnóstico nem de perfil de personalidade engessado.
   - Informações sobre sigilo, tempo estimado (12–15 minutos) e instruções claras.
   - Opções para "Iniciar Novo Teste", "Continuar Teste Salvo" ou "Carregar Relatório JSON Anterior".
2. **Ambiente de Aplicação (31 Situações)**:
   - Uma situação por tela, sem ruídos visuais ou distrações.
   - Barra de progresso linear e contador textual: `Pergunta 12 de 31` com indicador de porcentagem.
   - Opções A, B, C e D em cartões de seleção ergonômicos com contraste WCAG AA e navegação por teclado (teclas 1 a 4 ou setas).
   - Gaveta expansível sutil e elegante: *"Deseja indicar a intensidade e frequência com que isso ocorre? (Opcional)"* com sliders de 0 a 4.
   - Botões "Voltar" e "Avançar" para livre revisão e alteração a qualquer momento.
3. **Etapa Reflexiva de Padrões Aprendidos**:
   - Transição acolhedora e respeitosa com aviso claro de que nenhuma pergunta é de cunho íntimo/traumático obrigatório.
   - 6 questões estruturadas sobre ambiente formativo, regras implícitas sobre expressar raiva/desacordo e reações automáticas reconhecidas.
   - Botão bem visível: *"Pular etapa e ver relatório direto"*.
4. **Relatório Individual COMET (8 Seções)**:
   - Cabeçalho executivo com metadados e limites técnicos.
   - Gráfico de barras comparativo das 8 Dimensões com valores brutos e normalizados (0 a 100).
   - Análise de reações prioritárias (padrões frequentes vs. padrões de apoio à solução).
   - Mapeamento de gatilhos situacionais observados.
   - Seção destacada de hipóteses reflexivas sobre padrões aprendidos.
   - Estratégias práticas e Plano de Desenvolvimento Pessoal (PDI) com metas observáveis.
   - Botões de ação: "Baixar Relatório JSON", "Imprimir / Salvar em PDF" e "Nova Avaliação".

#### B. Identidade Visual & Design System

- **Direção Estética**: Editorial / Científico-institucional sóbrio, contemporâneo e humanizado. Inspirado na identidade visual do Assessment COMET (azul marinho profundo, ardósia mineral, toques de âmbar e esmeralda para equilíbrio visual).
- **Paleta de Cores**:
  - Fundo primário: `bg-slate-50 dark:bg-slate-950`
  - Superfícies de cartões: `bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800`
  - Texto principal: `text-slate-900 dark:text-slate-100` (contraste $> 7:1$)
  - Texto secundário / metadados: `text-slate-500 dark:text-slate-400`
  - Cor de destaque COMET: `indigo-600 dark:indigo-500` e acento `amber-600` para situações de fricção/gatilhos e `emerald-600` para reorganização.
- **Zero-Pill Discipline**:
  - Metadados, dimensões e números exibidos com texto limpo e separadores tipográficos (`·`, `|`), nunca em pílulas decorativas estáticas.
  - Indicadores numéricos tabulares com `tabular-nums font-mono`.

---

### 3. Key Product Decisions & Trade-Offs

- **Decisão 1: Arquitetura das Dimensões e Normalização**:
  - *Abordagem*: Modelo de 8 dimensões comportamentais independentes, calculadas a partir da soma dos pesos de cada alternativa respondida, normalizadas estritamente pela quantidade de oportunidades de pontuação de cada dimensão no questionário ($Escore = \frac{PontosBrutos}{MaxPontosPossiveis} \times 100$).
  - *Justificativa*: Como estipulado nas seções 6 e 8 da solicitação, dimensões não são polos opostos de uma mesma régua; o participante pode pontuar simultaneamente em confronto e em reorganização. A normalização por oportunidade elimina distorções de frequência de itens.
  - *Alternativas Descartadas*: Uso de percentis populacionais arbitrários ou médias fictícias que induziriam o participante a erro metodológico.
- **Decisão 2: Coleta Opcional e Expansível de Intensidade/Frequência**:
  - *Abordagem*: Uma gaveta retrátil que se abre suavemente após o clique na alternativa comportamental, permitindo registrar intensidade (0-4) e frequência (0-4), com avanço direto caso o usuário prefira não preencher.
  - *Justificativa*: Mantém o teste ágil sem exigir 62 ou 93 perguntas obrigatórias, preservando a pureza da resposta comportamental inicial.
- **Decisão 3: Isolamento Rígido entre Respostas Retrospectivas e Escores Comportamentais**:
  - *Abordagem*: O motor de pontuação processa exclusivamente as 31 situações objetivas. As respostas da etapa reflexiva alimentam exclusivamente a Seção 5 do relatório ("Hipóteses e Padrões Aprendidos"), utilizando linguagem conjuntiva e exploratória ("Você indicou que...", "Uma hipótese a considerar...").
  - *Justificativa*: Respeita a regra fundamental da psicometria de que correlação percebida em auto-relato não comprova relação causal retrospectiva.

---

### 4. Technical Architecture & Data Strategy

#### A. Diagrama do Sistema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             src/App.tsx                                     │
│  State Machine: 'welcome' | 'test' | 'reflection' | 'report' | 'history'    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
┌──────────────────┐          ┌──────────────────┐          ┌──────────────────┐
│  src/data/       │          │  src/engine/     │          │  src/storage/    │
│  situations.ts   │          │  scoring.ts      │          │  historyStore.ts │
│  - 31 situações  │          │  - Matriz pesos  │          │  - LocalStorage  │
│  - 124 alternat. │          │  - Normalização  │          │  - Export JSON   │
│  - Categorias    │          │  - Análise PDI   │          │  - Import JSON   │
└──────────────────┘          └──────────────────┘          └──────────────────┘
         │                             │                             │
         └─────────────────────────────┼─────────────────────────────┘
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          src/components/                                    │
│  ├─ CometHeader.tsx             ├─ SituationalTest.tsx (Progresso, Teclas)  │
│  ├─ SituationalCard.tsx         ├─ IntensityFrequencyDrawer.tsx             │
│  ├─ ReflectionStep.tsx          ├─ CometReportView.tsx (8 seções completas) │
│  ├─ DimensionChart.tsx          └─ ActionPlanCard.tsx (PDI interativo)      │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### B. As 8 Dimensões Comportamentais Mapeadas

1. `confrontacao_reativa`: Tendência a expressar oposição, contestação ou insatisfação imediata.
2. `externalizacao_responsabilidade`: Atribuição da causa a terceiros ou circunstâncias alheias.
3. `retraimento_evitacao`: Tendência a se calar, esquivar-se, ceder ou adiar o enfrentamento.
4. `autodirecionamento_reacao`: Tendência a internalizar o erro, culpar-se excessivamente ou remoer.
5. `foco_obstaculo`: Fixação na perda, impedimento ou injustiça percebida.
6. `reorganizacao_solucao`: Proatividade para reorganizar a rota, propor alternativas e agir.
7. `regulacao_antes_resposta`: Criação de pausa consciente e regulação antes de reagir.
8. `flexibilidade_resposta`: Adaptação do comportamento às particularidades do contexto e objetivos.

#### C. As 31 Situações Originais Construídas

Todas as 31 situações contemplam os cenários solicitados no documento:
- Situação 1: Crítica a um trabalho concluído com dedicação.
- Situação 2: Decisão de projeto vetada ou contrariada pela equipe.
- Situação 3: Erro cometido perante colegas ou clientes.
- Situação 4: Plano pessoal ou profissional cancelado de última hora.
- Situação 5: Atraso de terceiro que compromete o cronograma pessoal.
- Situação 6: Percepção de tratamento injusto ou desigual na distribuição de tarefas.
- Situação 7: Sugestão ignorada em uma reunião ou debate.
- Situação 8: Resposta negativa ("não") a uma solicitação importante.
- Situação 9: Competência profissional ou técnica colocada em dúvida.
- Situação 10: Perda de uma oportunidade que parecia garantida.
- Situação 11: Colega ou parceiro que descumpre um acordo explícito.
- Situação 12: Necessidade de admitir um equívoco perante outrem.
- Situação 13: Comparação desfavorável feita por uma liderança ou par.
- Situação 14: Expectativa de evento ou resultado altamente frustrada.
- Situação 15: Sensação súbita de perda de controle sobre um processo.
- Situação 16: Instrução ou ordem recebida que soa manifestamente inadequada.
- Situação 17: Esforço extra não reconhecido após entrega de grande impacto.
- Situação 18: Mudança repentina de rumo sem aviso prévio.
- Situação 19: Falha alheia que gera retrabalho direto para você.
- Situação 20: Fila de espera indefinida para resolução de problema crítico.
- Situação 21: Interrupção recorrente de fala durante exposição de ideias.
- Situação 22: Limite de tempo ou espaço pessoal invadido.
- Situação 23: Responsabilização indevida por falha que você não causou.
- Situação 24: Divergência acirrada e polarizada em trabalho em equipe.
- Situação 25: Resposta ríspida ou com tom de desrespeito.
- Situação 26: Pane em equipamento/software no meio de entrega urgente.
- Situação 27: Necessidade de refazer projeto por mudança de escopo externa.
- Situação 28: Terceiro operando em ritmo lento diante de prazo premente.
- Situação 29: Meta individual ou de time não alcançada ao fim de ciclo.
- Situação 30: Mensagem ambígua de alguém, sem clareza de intenção.
- Situação 31: Obstáculo repetitivo que persiste mesmo após três abordagens diferentes.

Cada situação conta com 4 alternativas balanceadas (sem viés moral ou resposta ideal evidente), mapeadas explicitamente para a matriz de pontuação central.

#### D. Estrutura do Relatório Individual COMET (8 Seções)

1. **Visão Geral**: Apresentação executiva, data, metadados da tentativa, versão do instrumento (`v1.0.0-br`) e síntese textual dos vetores predominantes.
2. **Mapa de Reação à Frustração**: Gráficos analíticos das 8 dimensões com escores brutos e normalizados (0-100), detalhando descrição, gatilhos associados e pontos de atenção.
3. **Padrões que Merecem Atenção**: Destaque para estilo reativo prevalente versus estratégias funcionais de reorganização demonstradas nas respostas reais.
4. **Gatilhos Situacionais Mapeados**: Agrupamento por contexto (crítica, perda de controle, quebra de expectativa, lentidão/desacordo).
5. **Padrões Aprendidos & Hipóteses**: Análise das respostas reflexivas da história formativa, com avisos de cautela causal.
6. **Estratégias de Desenvolvimento**: Recomendações acionáveis específicas para os dois vetores mais reativos identificados.
7. **Plano de Desenvolvimento Individual (PDI)**: Três prioridades concretas com microcomportamentos verificáveis, contexto de treino, métrica observável e bloco interativo de anotações.
8. **Limitações Técnicas e Éticas**: Declaração explícita de instrumento de autoconhecimento COMET, natureza não clínica e convite a aprofundamento.

#### E. Testes Automatizados Internos

Módulo de testes automatizados executado em runtime (com console de verificação na UI para auditoria técnica):
- Validação de integridade: 31 situações, exatamente 4 alternativas únicas cada.
- Cobertura da matriz: cada dimensão possui pelo menos 6 oportunidades de pontuação.
- Consistência matemática: simulação de perfis extremos (100% confronto, 100% reorganização, 100% esquiva) garantindo valores entre 0 e 100 sem NaN ou overflow.
- Isolamento: respostas reflexivas não alteram os escores numéricos.
- Persistência e exportação/importação de JSON idênticos sem perda de dados.
