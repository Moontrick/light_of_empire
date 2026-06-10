# The Light of Empire

Сайт РП по Звёздным Войнам — эпоха Галактической Империи (год после 66 приказа).
---

## Стек

- **Next.js 15** (App Router, `output: standalone`)
- **React 18** + **TypeScript 5**
- **SCSS Modules** — стилизация
- **next-intl** — локализация (`ru`, `en`)
- **Ant Design v6**, **Zustand**, **axios**
- Шрифты: **Russo One** + **Manrope** 

---

## Быстрый старт

Требуется **Node.js 20+** и **Yarn**.

```bash
yarn install
yarn dev          
```

Прод-сборка:

```bash
yarn build
yarn start      
```


---

## Переменные окружения

Файл `.env` (в репозитории есть пример):

| Переменная | Назначение | Пример |
|---|---|---|
| `NEXT_PUBLIC_BACK_PROD` | URL бэкенда (axios) | `http://localhost:8080` |

---

## Структура проекта (FSD-подобная)

```
app/[locale]/        # роутинг (страницы), layout, 404
widgets/             # крупные блоки:
  Landing/           #   лендинг (hero-слайдер, блок «Устав»)
  Charter/           #   страница устава (hero, оглавление, секции, поиск) + content/*
  Hub/               #   хаб-страницы с карточками (Структуры, Дополнительно)
  CharterHeader/     #   верхняя навигация
shared/
  ui/                #   переиспользуемые UI (HudCorners, Alert, ...)
  seo/               #   метаданные/SEO (baseMetadata, pageMetadata)
  styles/            #   _variables.scss (дизайн-токены), globals.scss
  i18n/, locales/    #   локализация
  lib/fonts/         #   шрифты (Russo One, Manrope)
public/images/       # фоновые изображения
```

### Маршруты

| Путь | Страница |
|---|---|
| `/` | Лендинг |
| `/ustav` | Устав Имперской Армии |
| `/structures` | Структуры |
| `/extra` | Дополнительно |
| `/high-command`, `/isb`, `/military-police`, `/inquisitorius`, `/shadow-troopers` | Страницы структур |

Локализация через `next-intl`, `localePrefix: 'as-needed'`: язык по умолчанию (`en`) — без префикса, остальные — с префиксом (`/ru/...`).

---

## Деплой

Проект собирается в режиме **standalone** (`next.config.js` → `output: 'standalone'`).

### Vercel

1. Импортируйте репозиторий в Vercel.
2. Build command: `yarn build` (определяется автоматически).
3. Задайте переменные окружения (`NEXT_PUBLIC_SITE_URL`, при необходимости `NEXT_PUBLIC_BACK_PROD`).

### Node.js (standalone)

```bash
yarn build
# standalone-сборка не включает статику и public — копируем рядом с server.js:
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
PORT=3000 node .next/standalone/server.js
```

### Docker

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
docker build -t light-of-empire .
docker run -p 3000:3000 -e NEXT_PUBLIC_SITE_URL=https://your-domain light-of-empire
```
