# Portfolio 2026 — Jhonacunn

> Full-stack developer portfolio built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.4-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-%233178C6)](https://www.typescriptlang.org)

---

## ✨ Features

- **Dark/Light mode** — Theme toggle with system preference detection and localStorage persistence
- **Responsive** — Mobile-first design with hamburger navigation
- **Accessible** — Skip-to-content, aria labels, semantic HTML, keyboard navigation
- **Performant** — Lazy-loaded below-fold sections, CSS animations, minimal client JS
- **SEO** — Sitemap, robots.txt, Open Graph image, JSON-LD structured data
- **Contact form** — Functional API route with validation and error handling
- **Docker support** — Standalone Dockerfile for production deployment

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🏗️ Build

```bash
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🐳 Docker

```bash
docker build -t portfolio-2026 .
docker run -p 3000:3000 portfolio-2026
```

Or for the optimized multi-stage build:

```bash
docker build -f Dockerfile.offline -t portfolio-2026 .
```

## 📁 Project Structure

```
app/
├── api/contact/         # Contact form API route
├── components/
│   ├── icons/           # SVG icon components
│   ├── layout/          # Navbar, Footer
│   ├── sections/        # Page sections (Hero, About, etc.)
│   └── ui/              # Reusable UI (AnimatedSection, ProjectCard, ThemeToggle)
├── data/                # Static content (personal info, projects, tech stack)
├── hooks/               # Custom hooks (useScrollProgress)
├── providers/           # React context providers (ThemeProvider)
└── types/               # TypeScript type definitions
```

## 🔧 Tech Stack

- **Framework:** Next.js 16 (App Router, RSC, Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion (selective), CSS transitions
- **Font:** Geist (by Vercel)
- **Deployment:** Docker, standalone output

## 🌐 Deployment

The project includes a `deploy.sh` script for deploying to a homelab server via SSH + Docker.

```bash
bash deploy.sh
```

## 📄 License

MIT
