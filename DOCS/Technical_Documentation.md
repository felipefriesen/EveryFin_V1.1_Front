# Documentação Técnica do Frontend - EveryFin

**Autor:** Equipe de Desenvolvimento EveryFin  
**Data:** 26/05/2025  
**Versão:** 1.0

---

## 1. Introdução
Este documento descreve, de forma detalhada e técnica, todas as decisões, configurações e implementações realizadas no frontend do sistema financeiro EveryFin até o momento. Ele cobre padrões de arquitetura, estrutura de código, componentes, integração, qualidade, deploy e melhores práticas de mercado.

## 2. Visão Geral da Arquitetura
- **Framework:** React 18 com Vite (build rápido, HMR eficiente)  
- **Tipagem:** TypeScript 5.2.2 (segurança de tipos, detecção precoce de erros)  
- **Estilo:** TailwindCSS 3.3.0 (classes utilitárias, tema customizável)  
- **State Management:** usabilidade de React Hooks + Context API para escopo global mínimo; Redux Toolkit previsto para escalabilidade  
- **Roteamento:** React Router DOM 6.20.0 (nested routes, proteções com <PrivateRoute>)  
- **HTTP Client:** Axios 1.6.0 (instância configurada com interceptors para JWT, tratamento de 401)  
- **Gráficos:** Recharts (componentes modulares, responsivos via <ResponsiveContainer>)

## 3. Estrutura de Diretórios
```
src/
├── assets/             # Imagens, fontes, SVGs
├── components/         # UI atômicos e compostos (Button, Input, Select, CardInfo, Header, Sidebar, PrivateRoute)
├── pages/              # Páginas de rota (Login, Cadastro, Dashboard, Entradas, Saidas, Relatorios)
├── services/           # API e mocks (api.ts com interceptors, mockData.ts para fallback)
├── types/              # Modelos de dados TS (auth.ts, finance.ts, index.ts)
├── utils/              # Helpers (formatters.ts: formatCPF, formatCurrency; validators.ts: validações simples)
├── App.tsx             # Layout principal (Sidebar + Header + Router)
├── Router.tsx          # Rotas da aplicação com proteções
├── main.tsx            # Bootstrap React
└── index.css           # Tailwind directives
```

## 4. Componentes Reutilizáveis
| Componente   | Props Principais                             | Descrição                                                                  |
|--------------|-----------------------------------------------|----------------------------------------------------------------------------|
| Button       | `loading`, `variant`, `size`, `icon`         | Spinner embutido, estados disabled, temas primário/secundário             |
| Input        | `label`, `error`, `icon`, `...inputProps`    | Suporta mensagens de erro inline, acessibilidade com `aria-invalid`       |
| Select       | `label`, `options`, `error`, `...props`       | Dropdown estilizado, placeholder padrão `Selecione...`                    |
| CardInfo     | `title`, `value`, `icon`, `trend`, `trendValue` | Cartões de métricas com variação de cor e ícone contextual               |
| Header       | `username`, `onLogout`                       | Exibe nome de usuário, botão de logout                                    |
| Sidebar      | `links`, `activeRoute`                       | Links de navegação, estado ativo, collapsible opcional                   |
| PrivateRoute | —                                             | `<Outlet>` se token presente; `<Navigate to="/login">` se não            |

## 5. Páginas e Fluxos
### 5.1 Login (/login)
- Formulário controlado por `react-hook-form` + `zod` para validação de esquema  
- Mock de credenciais: `test@everyfin.com` / `123456` gera token fictício  
- Axios.post(`/auth/login`) → armazena token em `localStorage`  
- Redireciona via `useNavigate` para `/dashboard`

### 5.2 Cadastro (/cadastro)
- Máscara CPF on-the-fly com `formatCPF`  
- Validadores zod para formato `XXX.XXX.XXX-XX` e senha mínimo 6  
- POST `/auth/register`, feedback visual de sucesso/erro

### 5.3 Dashboard (/dashboard)
- Requisição GET `/dashboard/summary` → `Summary`  
- Exibe 4 cards de KPI e gráfico de linha de histórico  
- Tratamento de loading/Error boundaries (futuros)

### 5.4 Entradas & 5.5 Saídas
- Listagem via GET `/transactions/entrada|saida` com fallback em `mockData`  
- Formulário inline (description, value, date, category, [client])  
- POST `/transactions` adiciona e refaz busca  
- Tabela com `<table>` sem biblioteca externa para performance

### 5.6 Relatórios (/relatorios)
- Filtros: período (start, end) e tipo  
- POST `/reports/generate` retorna lista  
- Exportação futura em PDF/Excel (back-end deve gerar)

## 6. Integração e Serviços
- **api.ts:** instância Axios com `baseURL`, interceptor de requisição injeta `Authorization: Bearer <token>`, interceptor de resposta remove token em 401  
- **mockData.ts:** array de `Transaction` para testes offline

## 7. Qualidade de Código
- **Lint:** ESLint com regras Airbnb + Prettier  
- **Pre-commit:** Husky + `lint-staged` para rodar `eslint --fix` em `*.ts, *.tsx`  
- **Commitizen:** padronização de mensagens de commit (Conventional Commits)

## 8. Testes (Estratégia)
- **Unit tests:** Jest + React Testing Library para componentes atômicos  
- **E2E:** Cypress no CI para fluxo crítico (Login → Dashboard)

## 9. Build & Deploy
- `npm run build` gera `dist/` otimizado com código separado (code-splitting)  
- `npm run preview` para validar build localmente  
- **CI/CD (GitHub Actions):** workflow `build → test → deploy` em branch `main`

## 10. Performance & Acessibilidade
- **Imagens otim:** uso de SVG e otimização WebP para assets  
- **Lazy-loading:** React.lazy + Suspense para páginas menos usadas  
- **A11Y:** labels em formulário, contraste de cores, `aria-*` onde necessário

## 11. Segurança e Boas Práticas
- **CORS:** configurado no backend para domínios permitidos  
- **XSS:** React escapa conteúdo dinâmico por padrão  
- **Env vars:** credenciais sensíveis via `.env` e `import.meta.env`

## 12. Documentação e Backlog
- Pasta `DOCS/` contém este arquivo `Technical_Documentation.md`  
- Backlog para próximos ciclos: testes unitários, cobertura 80%, integração com CI/CD, autenticação OAuth2, PWA

---

*Esta documentação segue padrões de mercado: semântica Markdown, versão, seções claras, tabelas e exemplos de código.*
