# Ligana — landing page de pré-lançamento

**Ligana. Conexões que geram renda.**

Landing page de **pré-lançamento** da Ligana em Campo Grande (MS). A Ligana está sendo construída para
conectar empresas e profissionais **por compatibilidade** (função, experiência, disponibilidade,
localização e remuneração). O motor de matching **ainda não existe**: a página apresenta a proposta,
mostra um exemplo ilustrativo e capta leads qualificados para o lançamento.

- Conversão primária: **empresas** com dificuldade de encontrar profissionais (acesso antecipado).
- Conversão secundária: **profissionais**, para formar a base inicial de oferta.

Estrutura: Hero → `#quero-contratar` (empresas) → `#matching` (exemplo ilustrativo do matching) →
`#quero-trabalhar` (profissionais) → `#como-funciona` → `#perguntas` → rodapé.

Regra de comunicação (ver `src/content/landing.ts`): tudo no futuro ("estamos criando", "a Ligana
vai"); nada de vagas reais, garantias, contadores, depoimentos, percentuais ou datas não confirmadas.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4 (design tokens em `src/app/globals.css`)
- Zod (validação única, no navegador e no servidor)
- Supabase (PostgreSQL) para os leads
- Vitest para testes; ESLint (`eslint-config-next`)
- Fonte Nunito (auto-hospedada via `@fontsource-variable/nunito`, sem chamada ao Google)

## Rodando localmente

Requer Node.js 20.9+.

```bash
npm install
cp .env.example .env.local   # preencha o que tiver
npm run dev                  # http://localhost:3000
```

Sem Supabase configurado a página funciona normalmente, mas o envio do formulário mostra
"o cadastro ainda não está aberto" e **nada é gravado**. Não existe sucesso simulado.

### Verificações

```bash
npm run lint
npm run typecheck
npm test
npm run build
# ou tudo de uma vez:
npm run check
```

## Estrutura

```
src/
  app/
    layout.tsx              # metadados de SEO/compartilhamento, fonte, analytics
    page.tsx                # composição das seções
    privacidade/page.tsx    # Política de Privacidade (dados do responsável via env)
    api/leads/route.ts      # POST de leads (liga o handler às dependências reais)
    opengraph-image.tsx     # imagem de compartilhamento gerada no build
    icon.svg, robots.ts, sitemap.ts
  components/
    brand/                  # símbolo e logo da Ligana (SVG)
    illustrations/          # ilustração do hero
    sections/               # Header, Hero, AudienceSection (empresas/profissionais),
                            # MatchingDemo, HowItWorks, Faq, Footer
    forms/                  # EmployerForm, WorkerForm, campos acessíveis, useLeadForm
    analytics/              # Analytics (page view + UTM), CtaLink
    ui/                     # Container, SectionHeading, Icon, estilos de botão
  content/
    landing.ts              # todos os textos da página
    options.ts              # opções dos formulários (valores gravados no banco)
    privacy.ts              # versão da política e prazo de retenção
  config/site.ts            # configuração pública vinda de NEXT_PUBLIC_*
  lib/
    leads/schema.ts         # validação Zod (cliente e servidor)
    leads/handler.ts        # regras do POST: anti-spam, validação, limite, gravação
    leads/store.ts          # gravação no Supabase (somente servidor)
    analytics.ts            # eventos (sem dados pessoais)
    utm.ts, phone.ts, rate-limit.ts, audience.ts
supabase/migrations/        # tabelas, segurança (RLS) e visões de análise
```

Para mudar textos, edite `src/content/landing.ts`. Para mudar cores ou fonte, edite os tokens em
`src/app/globals.css`. Os `value` de `src/content/options.ts` são gravados no banco: rótulos podem
mudar à vontade, valores não (sem migrar os dados e as restrições da migração).

## Ativando a gravação de leads (Supabase)

1. Crie um projeto em [supabase.com](https://supabase.com) (região São Paulo, de preferência).
2. Crie as tabelas:
   - pelo painel: **SQL Editor** → **New query** → cole o arquivo `supabase/setup.sql` inteiro → **Run**
     (pode rodar mais de uma vez sem problema); ou
   - pela CLI: `supabase link --project-ref <ref>` e `supabase db push` (usa `supabase/migrations/`).
3. Em **Project Settings → API**, copie a **Project URL** e a chave **service_role**.
4. Defina no servidor (`.env.local` ou variáveis da hospedagem):
   ```
   SUPABASE_URL=https://<ref>.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=<service_role>
   ```
5. Reinicie e envie um cadastro de teste. Ele deve aparecer em **Table Editor → employer_leads**
   ou **worker_leads**. Apague o registro de teste depois.

### Atualizando um banco que já existe

Cada mudança de banco fica em `supabase/migrations/`, em ordem de data. Para atualizar um projeto que
já está no ar, rode no SQL Editor só as migrações que ainda não rodou (todas podem rodar de novo sem
problema). **Rode a migração antes de publicar a versão do site que depende dela.**

### Segurança dos leads

- A chave `service_role` só existe no servidor (`src/lib/leads/store.ts` importa `server-only`).
  Nunca use prefixo `NEXT_PUBLIC_` nela.
- As tabelas têm RLS ligado e **nenhuma política**: a chave anônima não lê nem grava nada.
  Só o servidor grava, e só quem tem acesso ao painel do Supabase lê.
- O banco também valida (CHECK) formato do WhatsApp, opções permitidas e consentimento.
- Anti-spam: campo-armadilha invisível, tempo mínimo de preenchimento, verificação de origem,
  limite de tamanho e limite de 5 envios a cada 10 minutos por IP (em memória, por instância).
  Em produção, complemente com o firewall/rate limit da hospedagem (ex.: Vercel Firewall).
- Logs de erro registram só o código do erro, nunca dados do lead.

### Análise dos dados

A migração cria visões agregadas (sem dados pessoais), consultáveis no SQL Editor:

| Visão | Responde |
| --- | --- |
| `lead_overview` | Quantos contratantes e profissionais; interesse no piloto; quem autorizou contato |
| `lead_demand_supply_by_category` | Categorias mais procuradas x com maior oferta |
| `lead_demand_supply_by_region` | Procura x oferta por região da cidade |
| `lead_employer_urgency` | Urgência e frequência das contratações |
| `lead_engagement_types` | Tipos de vínculo desejados (freela, temporário, fixo) |
| `lead_pay_ranges` | Faixas de remuneração oferecidas x esperadas |
| `lead_campaigns` | Origem dos cadastros por campanha (UTM) |
| `lead_demand_supply_by_cep_area` | Procura x oferta por faixa de CEP (5 primeiros dígitos) |
| `lead_demand_supply_by_role` | Procura x oferta por função (garçom, chapeiro…) |
| `lead_employer_need` | Quando as empresas precisam, quantas pessoas e de que segmento |
| `lead_willingness_to_pay` | Pesquisa: as empresas pagariam pela intermediação? (por segmento) |
| `lead_employer_pain` | Principal dificuldade x como as empresas encontram profissionais hoje |
| `lead_workers_by_role_region` | Profissionais por função e por região em que aceitam trabalhar |

**Indicadores do pré-lançamento:**

| Indicador | Onde ver |
| --- | --- |
| Visitantes únicos | Ferramenta de analytics (`page_view`) |
| Cliques nos CTAs | `click_hire_cta` / `click_work_cta` (por `location`) |
| Início e conclusão dos formulários | `start_*_form` e `submit_*_form_success` |
| Taxa de conversão por público | `submit_company_form_success ÷ visitantes` e o mesmo para profissionais |
| Origem dos leads | Colunas `utm_*` nas tabelas e visão `lead_campaigns` |
| Empresas com demanda imediata | `need_timing = 'today_tomorrow'` (visão `lead_employer_need`) e a propriedade `need_timing` do evento de conversão |
| Profissionais por função e região | Visão `lead_workers_by_role_region` |

Os campos `urgency` e `pilot_interest` só existem nos cadastros antigos (antes de 31/10/2026); os
novos usam `need_timing` e não perguntam mais sobre o piloto.

Para contatar pessoas do piloto, filtre sempre por `consent_contact = true`.

## CEP, bairro e região

- O CEP é opcional. Ao digitar os 8 números, o navegador consulta o
  [ViaCEP](https://viacep.com.br) (gratuito, sem chave) e preenche o bairro. CEP de outra cidade
  marca a região como "Fora de Campo Grande". Se a busca falhar, a pessoa preenche à mão.
- Só o que foi preenchido automaticamente é trocado numa nova busca; o que a pessoa digitou fica.
- O CEP é gravado (8 dígitos). A região continua sendo escolhida/conferida pela pessoa.
- **Sugestões de bairro e região automática:** preencha `src/content/neighborhoods.ts` com os
  bairros oficiais (Planurb) e suas regiões. Enquanto a lista estiver vazia, o bairro é texto
  livre e a região é escolhida à mão.

## Campanhas (UTM) e links diretos

Links com `utm_source`, `utm_medium`, `utm_campaign`, `utm_term` e `utm_content` são registrados
junto do cadastro. Para abrir direto o formulário certo, use as âncoras:

- Empresas (seção): `https://ligana-app.vercel.app/?utm_source=instagram&utm_campaign=restaurantes#quero-contratar`
- Empresas (direto no formulário): `…#formulario-empresa`
- Profissionais (seção): `https://ligana-app.vercel.app/?utm_source=whatsapp&utm_campaign=garcons#quero-trabalhar`
- Profissionais (direto no formulário): `…#formulario-profissional`

## Analytics

Eventos disparados em `window.dataLayer` (Google Tag Manager) e no Plausible, se ativo. Sem nenhuma
ferramenta configurada, nada sai do navegador (em desenvolvimento, aparecem no console).

| Evento | Quando | Propriedades |
| --- | --- | --- |
| `page_view` | Abertura da página | — |
| `click_hire_cta` | Clique em qualquer CTA de empresa ("Quero contratar profissionais", "Preciso de profissionais", menu) | `location` |
| `click_work_cta` | Clique em qualquer CTA de profissional | `location` |
| `start_company_form` | Primeira interação com o formulário de empresas | — |
| `submit_company_form_success` | Cadastro da empresa gravado no banco | `need_timing` (urgência, sem dado pessoal) |
| `start_worker_form` | Primeira interação com o formulário de profissionais | — |
| `submit_worker_form_success` | Cadastro do profissional gravado no banco | — |
| `form_submission_error` | Falha de validação ou de envio | `form` (`company`/`worker`), `reason` |

`location`: `header`, `hero`, `section`, `how_it_works` ou `faq`. `reason`: `validation`,
`not_configured`, `unavailable`, `network`, `rejected`, `too_many_requests` ou `invalid`.

**Para ativar:** crie um contêiner no Google Tag Manager, defina `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX` na
Vercel e, no GTM, crie gatilhos do tipo "Evento personalizado" com os nomes acima (ex.: uma tag de
conversão do GA4/Meta disparada por `submit_company_form_success`). Ou use o Plausible
(`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`), que registra os eventos como metas.

Nenhum evento leva nome, WhatsApp, bairro ou respostas. Para ativar, defina `NEXT_PUBLIC_GTM_ID`
(Google Tag Manager) e/ou `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`. Se usar ferramentas que gravam cookies
(ex.: GA4 via GTM), revise a seção de cookies da Política de Privacidade e avalie um aviso de
consentimento.

## Publicação (Vercel)

1. Importe o repositório em [vercel.com/new](https://vercel.com/new) (detecta Next.js sozinho).
2. Cadastre as variáveis de `.env.example` em **Settings → Environment Variables**.
3. Faça o deploy e aponte o domínio. Atualize `NEXT_PUBLIC_SITE_URL` para o domínio final.

Qualquer hospedagem com Node.js também serve: `npm run build && npm start`.

### Checklist antes de divulgar

- [ ] Supabase configurado e um cadastro de teste gravado (e apagado) em cada formulário
- [ ] `NEXT_PUBLIC_CONTROLLER_NAME` e `NEXT_PUBLIC_CONTROLLER_EMAIL` preenchidos
      (a política mostra avisos laranja "[preencher …]" enquanto faltarem)
- [ ] Política de Privacidade revisada por quem responde juridicamente pela Ligana
- [ ] Contato do rodapé configurado
- [ ] `NEXT_PUBLIC_SITE_URL` com o domínio final (confira a prévia no WhatsApp)
- [ ] Logo: o símbolo em `src/components/brand/LigaSymbol.tsx` foi desenhado a partir do conceito
      da marca (duas pessoas unidas por um laço). Se houver arquivo oficial (SVG), substitua ali,
      em `src/app/icon.svg` e em `src/app/opengraph-image.tsx`.
