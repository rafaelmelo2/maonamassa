# 🚀 **MãoNaMassa – Estrutura Completa do MVP**

> **Missão**  
> Conectar **profissionais autônomos** a **clientes** em Catalão-GO (e além), garantindo **experiência intuitiva**, **contratação rápida** e **plena escalabilidade**.

---

## 🎯 Objetivo
Conectar profissionais autônomos (eletricistas, costureiras, personal trainers…) a clientes de **18 a 60+ anos**, com navegação simples, contratos claros e pagamento seguro.

---

## 🖌️ Princípios de Design & UX
- **Botões grandes** (≥ 44×44 px) e **fonte ≥ 16 px** para acessibilidade.  
- **Fluxo linear:** `Buscar → Selecionar → Contratar`.  
- **Ícones familiares** (🔌, ✂️, 🏋️) e **contraste WCAG AA**.  
- **Onboarding guiado:** 3-4 telas + tooltips contextuais na 1ª tarefa.

---

## 🔏 Fluxo Legal & Contrato
1. **Geração automática** de contrato (PDF) ao escolher profissional.  
2. **Assinatura digital/presencial** de ambas as partes.  
3. **Escrow interno**: app libera pagamento **após ambas confirmarem** conclusão.  
4. Histórico de contratos sempre disponível (mesmo offline).

---

## 💸 Pagamento & Reembolso
- **Valor retido** até confirmação final.  
- **Reembolso integral** caso serviço seja mal-executado **e** contrato esteja assinado.  
- Disputas mediadas via suporte do aplicativo.

---

## ⭐ Plano de Assinatura (Futuro)
| Plano | Benefícios | Preço |
|-------|------------|-------|
| **Gratuito** | Listagem básica · Avaliações · Chat | R$ 0 |
| **Premium** | Perfil destacado · Isenção de taxa em serviços até R$ 100 · Selo **Profissional Verificado** | **R$ 50/ano** |

---

## 📊 Métricas & Monitoramento
- ✔️ **Contratações totais** & **churn** de assinantes  
- 🌟 **NPS** (Net Promoter Score) mensal  
- ⏱️ **Tempo médio de resposta** do profissional  
- 📈 Dashboards em tempo real

---

## 🧪 Testes & Qualidade
- **Unitários** → Jest  
- **End-to-End** → Detox  
- **Pipeline CI:** lint → build → testes → deploy

---

## 🔍 Monitoramento & Logs
- **Sentry** para crash-reporting (front-end/back-end)  
- **Logs JSON** estruturados por nível (`INFO`, `WARN`, `ERROR`)

---

## 📈 Analytics
- **Funil de aquisição:** `download → cadastro → 1ª contratação`  
- **Firebase Analytics** ou **Amplitude**  
- **Relatórios semanais** automáticos

---

## 💾 Backup & Migração
- **Dump diário** do SQLite  
- **Scripts de migração** para Postgres quando escalar  
- **Testes de restauração** mensais

---

## 📜 Compliance Fiscal
- Integração opcional com **NFS-e** da prefeitura  
- Campos de **CNAE/ISS** para profissionais

---

## 🛡️ KYC / Verificação
- **Selfie + documento** com OCR  
- Checagem de antecedentes via serviço parceiro  

---

## 📣 Estratégia de Aquisição
- **Programa de indicação** (créditos no app)  
- Parcerias com **rádios locais** e **comércios**

---

## 🎨 Design System
| Elemento        | Cor (HEX) | Uso                                |
|-----------------|-----------|------------------------------------|
| **Primária**    | `#0057D9` | Botões principais, cabeçalhos      |
| **Secundária**  | `#FF8C00` | Destaques, ícones de ação          |
| **Texto**       | `#333333` | Labels e parágrafos                |
| **Fundo**       | `#FFFFFF` | Background                         |
| **Sucesso**     | `#28A745` | Mensagens positivas                |
| **Erro**        | `#DC3545` | Alertas de falha                   |

> **Tipografia:** Roboto (ou Sans-Serif equivalente)

---

## ⚙️ Arquitetura & Modularização
- **Clean Architecture**  
  - *Domain* · *Data* · *Infrastructure* · *Presentation*  
- **Repository Pattern**: abstrai SQLite hoje, Postgres amanhã  
- **Dependency Injection** para trocar SGBD sem impacto na lógica

