# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Perfin is a budget and spending tracker app focused on manual entry to encourage mindfulness about every dollar spent. This repository contains the responsive one-page marketing/landing website for the app.

## Architecture

React single-page application built with Vite. Single `App.jsx` component contains all sections (Header, Hero, Problem, Showcase, Features, CTA, Footer). Styling via `index.css` using CSS custom properties.

## Development

```bash
npm install    # Install dependencies
npm run dev    # Start dev server (http://localhost:5173)
npm run build  # Production build to /dist
npm run preview # Preview production build
```

## Design System

**Colors (CSS variables in index.css):**
- Background: `--bg-primary` (#0A0F1F), `--bg-surface` (#20283A)
- Primary accent: `--accent-blue` (#2563EB)
- Secondary accent: `--accent-teal` (#2A9D8F)

**Typography:**
- Display: Syne (headings)
- Body: Outfit (text)

See `.claude/frontend-skills.md` for detailed frontend design guidelines.
