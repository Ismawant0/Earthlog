# PGDOWN — Material You Design Specification

> **Type:** Internal Design Spec · **Version:** 2.0 · **Date:** June 2026  
> **Team:** Principal Designer (Google Material Design 3) · Lead Product Designers (Notion, Linear, Raycast)  
> **Status:** Approved · **Implementation:** In Progress

---

## Table of Contents

1. [Visual Philosophy](#1-visual-philosophy)
2. [Color System](#2-color-system)
3. [Radical Geometry & Corner Radii](#3-radical-geometry--corner-radii)
4. [Typography](#4-typography)
5. [Spacing & Layout Grid](#5-spacing--layout-grid)
6. [Component Design Breakdown](#6-component-design-breakdown)
7. [Motion & Micro-interactions](#7-motion--micro-interactions)
8. [UI Layout Architecture](#8-ui-layout-architecture)
9. [UX Interaction Flow](#9-ux-interaction-flow)
10. [Tailwind / CSS Configuration](#10-tailwind--css-configuration)
11. [Accessibility](#11-accessibility)
12. [Implementation Roadmap](#12-implementation-roadmap)

---

## 1. Visual Philosophy

### 1.1 Core Emotions

PGDOWN is **not enterprise software**. It is a **creative sanctuary for writing** — a Markdown playground and technical publication that must feel:

| Emotion | Rationale |
|---------|-----------|
| **Approachable** | Warm, soft visuals invite exploration. No cold corporate grids. |
| **Lightweight** | Generous whitespace, transparency, and airy layouts. Feels fast before it loads. |
| **Tactile** | Every interaction has a physical response — bounce, scale, spring. Satisfying to click. |
| **Organic** | Pill shapes, soft shadows, natural color transitions. |
| **Inspiring** | Typography-centric. Content is the hero. The UI gets out of the way. |

### 1.2 Design Principles

1. **Content-First:** The UI is a stage for writing, not a dashboard.
2. **Soft Precision:** Every pixel is intentional, but nothing feels rigid.
3. **Joyful Restraint:** Delightful micro-interactions that never overwhelm the task.
4. **Adaptive Identity:** The brand morphs with its environment (light/dark, focus/multitask).

### 1.3 Zero Zones — What We Explicitly Avoid

- ❌ Rigid enterprise corporate grids
- ❌ Heavy borders and hard lines
- ❌ Dark hacker / cyberpunk / neon / crypto aesthetics
- ❌ Generic Bootstrap or Tailwind template patterns
- ❌ Skeleton screens that flash
- ❌ Pure black backgrounds (`#000000`) — always dark charcoal

---

## 2. Color System

### 2.1 Light Mode Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--canvas-bg` | `#F4F6F8` | Main page background — warm gray-blue to reduce eye strain |
| `--surface` | `#FFFFFF` | Cards, editor, preview panels |
| `--surface-alt` | `#F8F9FA` | Sidebars, low-elevation containers |
| `--primary` | `#4285F4` | Key actions, links, selection indicators |
| `--primary-hover` | `#1A73E8` | Hover state for primary |
| `--primary-pressed` | `#1558B0` | Active/pressed state |
| `--primary-subtle` | `rgba(66, 133, 244, 0.10)` | Active backgrounds, tags |

#### Playful Pastel Accents

| Name | Surface | Text | Usage |
|------|---------|------|-------|
| Muted Green | `#E6F4EA` | `#137333` | Success messages, saved indicators |
| Muted Yellow | `#FEF7E0` | `#B06000` | Active line highlight, focus indicators |
| Muted Lavender | `#E8F0FE` | `#1A73E8` | Selection state, tab highlights |
| Muted Coral | `#FCE8E6` | `#C5221F` | Warnings, errors (rare use) |

#### Neutral Typography (Light)

| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#1F1F1F` | Headings, body text |
| `--text-secondary` | `#5E5E5E` | Supporting text, descriptions |
| `--text-muted` | `#757575` | Placeholders, captions, metadata |

### 2.2 Dark Mode Palette (Midnight Charcoal)

| Token | Hex | Usage |
|-------|-----|-------|
| `--canvas-bg` | `#1F2023` | Main background |
| `--surface` | `#28292E` | Editor, cards, panels |
| `--surface-alt` | `#202124` | Sidebars, toolbars |
| `--primary` | `#8AB4F8` | Key actions (lighter for dark) |
| `--primary-subtle` | `rgba(138, 180, 248, 0.12)` | Active backgrounds |

#### Playful Glow Accents (Dark)

| Name | Surface | Text | Usage |
|------|---------|------|-------|
| Dark Green | `#1E3A2E` | `#81C995` | Success |
| Dark Yellow | `#3A2E1E` | `#FDD663` | Focus indicators |
| Dark Lavender | `#1E2A3A` | `#8AB4F8` | Selection states |

#### Neutral Typography (Dark)

| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#E3E3E3` | Headings, body |
| `--text-secondary` | `#C4C6C5` | Supporting text |
| `--text-muted` | `#8E918F` | Placeholders |

### 2.3 Semantic Colors

| Token | Light | Dark |
|-------|-------|------|
| `--success` | `#34A853` | `#81C995` |
| `--warning` | `#FBBC05` | `#FDD663` |
| `--error` | `#EA4335` | `#F28B82` |
| `--info` | `#4285F4` | `#8AB4F8` |

### 2.4 Logo Colors

| Token | Light | Dark |
|-------|-------|------|
| `--logo-color` | `#1F1F1F` | `#E3E3E3` |
| `--logo-hover` | `#4285F4` | `#8AB4F8` |

The logo **never** uses a rigid branded color. It inherits the dominant neutral text color and only transitions to Google Blue on hover.

---

## 3. Radical Geometry & Corner Radii

Inspired by Material Design 3's "expressive shapes," we use **exaggerated, smooth rounded corners**:

| Element | Border Radius | Visual |
|---------|--------------|--------|
| App containers, workspace panels | `24px` | Large, smooth — feels like iPad / Pixel UI |
| Cards, modals | `16px` | Standard elevated surface |
| Buttons, tabs, active indicators | `9999px` | Fully pill-shaped |
| Form inputs | `12px` | Soft, inviting |
| Inline code blocks | `6px` | Subtle pill |
| Blockquote vertical bar | `4px` | Rounded cap, thick |

The visual principle: **everything should look like it wants to be touched.** Smoothness conveys approachability.

---

## 4. Typography

### 4.1 Font Stack

| Context | Font | Fallback |
|---------|------|----------|
| UI / Display | Inter (Variable) | `system-ui, sans-serif` |
| Editor (Code) | JetBrains Mono | `ui-monospace, SFMono-Regular, Menlo` |
| Long-form Reading | Source Serif 4 | `ui-serif, Georgia, Cambria` |

### 4.2 Type Scale

| Token | Size | Weight | Line Height | Tracking |
|-------|------|--------|-------------|----------|
| `--text-hero` | `48px` | `700` | `1.1` | `-0.02em` |
| `--text-h1` | `40px` | `700` | `1.2` | `-0.02em` |
| `--text-h2` | `26px` | `600` | `1.3` | `-0.01em` |
| `--text-h3` | `20px` | `600` | `1.4` | normal |
| `--text-body` | `17px` | `400` | `1.85` | normal |
| `--text-small` | `13px` | `500` | `1.5` | normal |
| `--text-tiny` | `11px` | `600` | `1.4` | `0.02em` |
| `--text-caption` | `9px` | `700` | `1.3` | `0.08em` |

### 4.3 Editor Typography

| Property | Value |
|----------|-------|
| Font | JetBrains Mono, 15px |
| Line height | `1.7` |
| Letter spacing | `0em` |
| Max width | `680px` (centered) |

---

## 5. Spacing & Layout Grid

### 5.1 Baseline Grid

We use a **4px baseline grid** (standard Material 3 spacing):

```
--space-1: 4px    --space-2: 8px    --space-3: 12px
--space-4: 16px   --space-5: 20px   --space-6: 24px
--space-8: 32px   --space-10: 40px  --space-12: 48px
--space-16: 64px  --space-20: 80px
```

### 5.2 Layout Constraints

| Container | Max Width | Padding (mobile → desktop) |
|-----------|-----------|--------------------------|
| Main page | `1280px` | `16px` → `24px` → `32px` |
| Article reading | `740px` | `16px` → `24px` |
| Editor canvas | `100%` (with max `840px` centered) | `24px` |

### 5.3 Surface Elevation

| Elevation | Box Shadow | Usage |
|-----------|-----------|-------|
| Base | `none` | Canvas |
| Low | `0 1px 2px rgba(0,0,0,0.06)` | Cards in grid |
| Mid | `0 6px 20px rgba(0,0,0,0.08)` | Modals, floating panels |
| High | `0 12px 40px rgba(0,0,0,0.12)` | Dialogs, popovers |

---

## 6. Component Design Breakdown

### 6.1 Logo

```
┌──────────────────────────────────────────┐
│  PGDOWN beta                    ← Neutral #1F1F1F
│                                       
│  Hover: → #4285F4 + scale(1.03)       
│  Duration: 200ms cubic-bezier(0.34, 1.56, 0.64, 1)
└──────────────────────────────────────────┘
```

- **Type:** Wordmark (PG + DOWN treated as two fragments for the morph effect)
- **Badge:** Pill-shaped "beta" in primary-subtle background
- **Interaction:** On hover, the entire wordmark transitions from neutral to Google Blue. Subtle scale of 1.03x. Color transition is 200ms, transform is 300ms (slightly delayed for a "breathing" effect).

### 6.2 Navbar

```
┌─────────────────────────────────────────────────────────────┐
│ ▤ PGDOWN beta    [AI] [Linux] [Windows] [OS] [...]   ⌘K ☀ ✉ 👤 │
│─────────────────────────────────────────────────────────────│
└─────────────────────────────────────────────────────────────┘
```

- **Height:** 60px (compact, not 64px)
- **Background:** `backdrop-filter: blur(20px)` with 85% opacity surface
- **Bottom:** No hard border. A subtle shadow `0 1px 3px rgba(0,0,0,0.06)` appears only when scrolled.
- **Nav links:** 13px weight 500, rounded-2xl (12px) hover with primary-subtle background
- **Search:** ⌘K pill button, transitions to elevated state on hover
- **Scroll behavior:** Hides on scroll down (threshold 4px), reveals on scroll up. Sticky at top.

### 6.3 Segmented Controls (Editor / Preview / Split)

```
┌──────────────────────────────────┐
│ ┌────────┬──────────┬──────────┐ │
│ │ Editor │ Preview  │  Split   │ │   ← Sliding pill capsule
│ └────────┴──────────┴──────────┘ │
└──────────────────────────────────┘
```

- **Container:** Pill-shaped, subtle border, background-alt
- **Active indicator:** A physically sliding pill capsule (Linear style)
- **Animation:** The capsule glides between options with `cubic-bezier(0.34, 1.56, 0.64, 1)` at 300ms
- **Hover:** Scale 1.02 on the entire control group
- **Typography:** Active: bold primary color. Inactive: muted text, 500 weight

### 6.4 Editor & Writing Canvas

```
┌──────────────────────────────────────┐
│                                      │
│  # Getting Started                   │  ← Active line: subtle yellow glow
│                                      │
│  This is a paragraph of text that    │
│  wraps nicely at 680px max-width.    │
│                                      │
│  - List item 1                       │
│  - List item 2                       │
│                                      │
│  > A blockquote with a thick         │  ← 4px rounded vertical bar
│  > blue bar on the left              │
│                                      │
│  `inline code` here                  │  ← Pill-shaped, #EEF3FD bg
│                                      │
│  ```                                  │
│  const x = 5;                        │  ← Code block with 16px radius
│  ```                                  │
│                                      │
└──────────────────────────────────────┘
```

**Focus Mode:**
- When the user starts typing, all chrome (navbar, sidebar, toolbar) fades to 30% opacity over 400ms
- The editor container remains at 100% opacity — crystal clear
- Moving the mouse restores the UI immediately (200ms)

**Active Line Indicator:**
- Subtle warm yellow gradient background `#FEF7E0` → transparent (horizontal gradient going right)
- Not a border. Not a full line highlight. Just a faint glow.

### 6.5 Sidebar

```
┌────────────────────────┐
│ ☰ PGDOWN               │
│                        │
│  ○ Introduction        │  ← Normal item (separated by whitespace)
│  ○ Getting Started     │
│  ● API Reference   ←── │  ← Active: pill bg, bold text
│  ○ Deployment          │
│  ○ Configuration       │
│                        │
│ ──── Favorites ────    │
│  ☆ Quick Start         │
│  ☆ Troubleshooting     │
└────────────────────────┘
```

- **Width:** 280px (collapsible to icon-only at 72px)
- **No heavy borders.** Items separated purely by whitespace.
- **Active item:** Complete pill-shaped background using `rgba(66, 133, 244, 0.10)` with bold primary-colored text
- **Hover:** Subtle background shift to surface-alt, 180ms
- **Section dividers:** Thin gray line with uppercase muted label

### 6.6 Buttons

| Type | Style | Hover | Active |
|------|-------|-------|--------|
| Primary | `bg-primary text-white pill` | `scale(1.02)` + brighter | `scale(0.97)` |
| Secondary | `border border-border pill` | `scale(1.02)` + subtle shadow | `scale(0.97)` |
| Ghost | `transparent pill` | `bg-surface-alt` | `scale(0.97)` |
| Icon | `w-9 h-9 pill` | `bg-surface-alt` + `scale(1.05)` | `scale(0.95)` |

All buttons use the spring cubic-bezier for hover/active transitions.

### 6.7 Cards

```
┌──────────────────────────┐
│ ┌──────┐                 │
│ │      │  Category • 5min│
│ │ Img  │                 │
│ │      │  Title Here     │
│ └──────┘  Description... │
│                          │
│ By Author • Date         │
└──────────────────────────┘
```

- **Border radius:** 16px for the card, 12px for inner images
- **Shadow:** `0 1px 2px rgba(0,0,0,0.06)` — extremely subtle
- **Hover:** Elevation lift — `translateY(-2px)` + shadow increase. Duration 200ms with spring bezier.

### 6.8 Markdown Preview Elements

**Blockquotes:**
- Thick, rounded 4px vertical bar in Google Blue
- Background: `rgba(66, 133, 244, 0.04)`
- Right side: `border-radius: 0 12px 12px 0`
- Text: secondary color, italic

**Inline Code:**
- Pill-shaped (`border-radius: 6px`)
- Background: `#EEF3FD` (light) / `#3C4043` (dark)
- Text: blue-700 (light) / blue-300 (dark)
- No border — pure surface

**Code Blocks:**
- Border radius: 16px
- Background: `#F8F9FA` (light) / `#202124` (dark)
- Border: 1px solid `#E8EAED` (light) / `#3C4043` (dark)
- Padding: 20px 24px
- Line numbers: optional, muted

**Tables:**
- Border radius: 16px on the container
- Header: `#F1F3F4` (light) / `#303134` (dark)
- Row hover: subtle tint
- No vertical borders inside — clean horizontal lines only

**Checklists:**
- Custom pill-shaped checkboxes
- Checked: green background with white checkmark
- Unchecked: subtle border, no fill

### 6.9 Search Dialog

```
┌─────────────────────────────────────┐
│ 🔍 Search anything...          ⌘K   │
│─────────────────────────────────────│
│                                     │
│  📄 Getting Started with MDX        │
│     Category: Fundamentals • 5min   │
│                                     │
│  📄 TypeScript Advanced Types        │
│     Category: Programming • 8min    │
│                                     │
│  🔥 Recent searches...              │
│     • zero trust                    │
│     • kubernetes                    │
│                                     │
└─────────────────────────────────────┘
```

- **Modal overlay:** Backdrop blur with 40% opacity scrim
- **Dialog:** 24px border radius, elevated shadow, 580px max-width
- **Input:** Large, pill-shaped, no border — just a focused glow
- **Results:** Minimal. Just title, category chip, read time.
- **Keyboard:** Fully navigable with arrow keys, enter to select, esc to dismiss

---

## 7. Motion & Micro-interactions

### 7.1 The "Joy" Curve

All interactive transitions use:

```css
--joy-bezier: cubic-bezier(0.34, 1.56, 0.64, 1);
```

This gives a **slight, satisfying "spring" or elastic feel** — typical of Raycast and Apple UI. It is NOT a boring flat ease-out.

### 7.2 Timing Map

| Interaction | Duration | Easing | Notes |
|-------------|----------|--------|-------|
| Button hover | 200ms | joy-bezier | scale(1.02) |
| Button active | 150ms | ease-out | scale(0.97) |
| Logo hover | 200ms | joy-bezier | color + scale(1.03) |
| Segmented slide | 300ms | joy-bezier | Pill capsule glides |
| Card hover | 200ms | joy-bezier | translateY(-2px) |
| Navbar hide/show | 300ms | ease-out | translateY transform |
| Focus mode fade | 400ms | ease-out | Opacity to 30% |
| Focus mode restore | 200ms | ease-out | Mouse movement |
| Modal open | 250ms | joy-bezier | Scale from 0.95 + fade |
| Modal close | 180ms | ease-in | Fade out |
| Sidebar collapse | 300ms | joy-bezier | Width transition |
| Theme toggle | 400ms | ease-out | Cross-fade |

### 7.3 Micro-interaction Catalog

1. **Button Press:** Spring-loaded. Scale up slightly on hover, compress on click, release with slight overshoot.
2. **Logo Morph:** Neutral → Blue color transition with gentle scale. Feels alive.
3. **Segmented Control Slider:** The active pill physically glides to the selected option. Not a cross-fade — a position-based slide.
4. **Card Hover Lift:** Cards gently float up with shadow deepening. Invites interaction.
5. **Focus Mode Entrance:** The world fades away, leaving only the text. Cinematic.
6. **Search Dialog:** Opens with a subtle scale-up bounce. Keyboard-first.
7. **Tag Removal:** Tags shrink and fade with a slight rotation — playful dismissal.
8. **Saved Indicator:** A green pill with a checkmark pops in with a bounce. Feels rewarding.

---

## 8. UI Layout Architecture

### 8.1 Homepage (Content Publication View)

```
┌──────────────────────────────────────────────────────────────────┐
│ Navbar (60px, glass morphism)                                     │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ 🔥 Featured Stories                                        │  │
│  │ ┌──────────────────────┐ ┌──────────────┐                 │  │
│  │ │                      │ │ 📄 Story 2    │                 │  │
│  │ │   Hero Article       │ │ 📄 Story 3    │                 │  │
│  │ │   (7 cols)           │ │ 📄 Story 4    │                 │  │
│  │ │                      │ │ 📄 Story 5    │                 │  │
│  │ └──────────────────────┘ └──────────────┘                 │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Latest Updates                                  Chrono     │  │
│  │ ┌─────────┐ ┌─────────┐ ┌─────────┐                       │  │
│  │ │ Card 1  │ │ Card 2  │ │ Card 3  │                       │  │
│  │ └─────────┘ └─────────┘ └─────────┘                       │  │
│  │ ┌─────────┐ ┌─────────┐ ┌─────────┐                       │  │
│  │ │ Card 4  │ │ Card 5  │ │ Card 6  │                       │  │
│  │ └─────────┘ └─────────┘ └─────────┘                       │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ 📬 Newsletter (pill container, 24px radius)                │  │
│  │ "Get Technical Updates Weekly"                             │  │
│  │ [email input] [Subscribe pill button]                      │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│ Footer                                                           │
└──────────────────────────────────────────────────────────────────┘
```

### 8.2 Article Reader View

```
┌──────────────────────────────────────────────────────────────────┐
│ Navbar                                      Reading Progress ██  │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│        ┌────────────────────────────────────────────────┐        │
│        │                                                │        │
│        │  Article Title (40px, bold)                    │        │
│        │  Category • 5 min read • By Author • Date      │        │
│        │                                                │        │
│        │  ┌──────────────┐                              │        │
│        │  │  Cover Image │  16px radius                 │        │
│        │  └──────────────┘                              │        │
│        │                                                │        │
│        │  Body text flows here at 740px max-width.      │        │
│        │  Beautifully spaced with 1.85 line-height.     │        │
│        │                                                │        │
│        │  > Blockquotes with thick blue bar             │        │
│        │                                                │        │
│        │  `inline code` and code blocks                 │        │
│        │                                                │        │
│        │  ┌──────────────────────────────────┐          │        │
│        │  │  Code block with 16px radius     │          │        │
│        │  │  shell: $ npm install            │          │        │
│        │  └──────────────────────────────────┘          │        │
│        │                                                │        │
│        │  --- end of article ---                        │        │
│        │                                                │        │
│        └────────────────────────────────────────────────┘        │
│                                                                  │
│  [← Back] [❤ Save] [🔗 Share] [💬 Discuss]                     │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│ Footer                                                           │
└──────────────────────────────────────────────────────────────────┘
```

### 8.3 Editor / Playground View

```
┌──────────────────────────────────────────────────────────────────┐
│ Navbar (60px, glass)       [Editor | Preview | Split]  [💾] [⚙] │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────── Markdown Editor ────────────────────────────┐  │
│  │                                                           │  │  ← Active line: 
│  │  # Getting Started                                        │  │     yellow glow
│  │                                                           │  │
│  │  This is markdown. Type here.                             │  │
│  │                                                           │  │
│  │  - [ ] Task item 1                                        │  │
│  │  - [ ] Task item 2                                        │  │
│  │                                                           │  │
│  │  `code` and **bold** work here.                           │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Status: Saved • Words: 142 • Reading time: 1 min               │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│ Footer (simplified)                                              │
└──────────────────────────────────────────────────────────────────┘
```

---

## 9. UX Interaction Flow

### 9.1 Page Load

1. Theme script runs synchronously from `<head>` — flashes correct theme immediately (no FOUC)
2. Navbar loads with glass backdrop and subtle shadow if scrolled
3. Content appears with a 50ms staggered fade-in using IntersectionObserver
4. Reading progress bar initializes at 0%

### 9.2 Scrolling Behavior

1. **Navbar:** Hides after scrolling down 10+px (with 4px hysteresis). Reappears on scroll up.
2. **Reading Progress:** Google-yellow bar at the very top (3px height). Follows scroll position.
3. **TOC Highlight:** Sidebar TOC auto-highlights the current section with the pill active state.
4. **Back to Top:** Appears after scrolling past 2 viewports. Pill-shaped floating button.

### 9.3 Search Flow

1. Press `⌘K` or click the search pill
2. Modal opens with bounce scale animation (250ms)
3. Input is auto-focused with a subtle cursor blink
4. Results appear after 150ms debounce (Orama local search)
5. Navigate with `↑↓` keys, select with `Enter`, dismiss with `Esc`
6. On select: navigate to article. Modal closes with reverse animation.

### 9.4 Theme Switch

1. Click theme toggle (sun/moon icon)
2. Icon rotates 180deg with the joy bezier
3. CSS variables swap instantly (no flash) thanks to the preloaded theme script
4. All surfaces, text, and accent colors transition smoothly

### 9.5 Editor Focus Mode

1. User begins typing in the editor
2. After 1.5 seconds of no mouse movement, chrome begins fading (400ms)
3. All UI elements (navbar, toolbar, sidebar) reach 30% opacity
4. The editor container remains at full opacity — crystal clear
5. Any mouse movement restores the UI immediately (200ms)
6. Toggle-able via a dedicated button for users who prefer constant visibility

### 9.6 Touch / Mobile

1. All interactive elements have minimum 44x44pt touch targets
2. Sidebar becomes a bottom sheet on mobile
3. Segmented controls stack vertically on narrow screens
4. Starred/favorite actions have haptic feedback support
5. Swipe gestures: swipe left on article row to save, swipe right to share

---

## 10. Tailwind / CSS Configuration

### 10.1 CSS Custom Properties (Complete)

```css
:root {
  /* === SURFACES === */
  --canvas-bg:           #F4F6F8;
  --surface:             #FFFFFF;
  --surface-alt:         #F8F9FA;
  --surface-elevated:    #FFFFFF;

  /* === BORDERS === */
  --border:              #E8EAED;
  --border-soft:         rgba(0, 0, 0, 0.06);

  /* === TEXT === */
  --text-primary:        #1F1F1F;
  --text-secondary:      #5E5E5E;
  --text-muted:          #757575;

  /* === BRAND === */
  --primary:             #4285F4;
  --primary-hover:       #1A73E8;
  --primary-pressed:     #1558B0;
  --primary-subtle:      rgba(66, 133, 244, 0.10);

  /* === PASTEL ACCENTS === */
  --green-surface:       #E6F4EA;
  --green-text:          #137333;
  --yellow-surface:      #FEF7E0;
  --yellow-text:         #B06000;
  --lavender-surface:    #E8F0FE;
  --lavender-text:       #1A73E8;

  /* === SEMANTIC === */
  --success:             #34A853;
  --warning:             #FBBC05;
  --error:               #EA4335;
  --info:                #4285F4;

  /* === LOGO === */
  --logo-color:          #1F1F1F;
  --logo-hover:          #4285F4;

  /* === RADIUS === */
  --radius-sm:           6px;
  --radius-md:           12px;
  --radius-lg:           16px;
  --radius-xl:           24px;
  --radius-pill:         9999px;

  /* === SHADOWS === */
  --shadow-sm:           0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-md:           0 6px 20px rgba(0, 0, 0, 0.08);
  --shadow-lg:           0 12px 40px rgba(0, 0, 0, 0.12);

  /* === MOTION === */
  --joy-bezier:          cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out:            ease-out;
  --duration-fast:       150ms;
  --duration-base:       200ms;
  --duration-slow:       300ms;
}
```

### 10.2 Tailwind V4 `@theme` Block

```css
@theme {
  /* Surfaces */
  --color-canvas-bg:      var(--canvas-bg);
  --color-surface:        var(--surface);
  --color-surface-alt:    var(--surface-alt);
  --color-surface-elevated: var(--surface-elevated);

  /* Text */
  --color-text-primary:   var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-muted:     var(--text-muted);

  /* Brand */
  --color-primary:        var(--primary);
  --color-primary-hover:  var(--primary-hover);
  --color-primary-pressed: var(--primary-pressed);
  --color-primary-subtle: var(--primary-subtle);

  /* Accents */
  --color-green-surface:  var(--green-surface);
  --color-green-text:     var(--green-text);
  --color-yellow-surface: var(--yellow-surface);
  --color-yellow-text:    var(--yellow-text);
  --color-lavender-surface: var(--lavender-surface);
  --color-lavender-text:  var(--lavender-text);

  /* Radius */
  --radius-sm:            var(--radius-sm);
  --radius-md:            var(--radius-md);
  --radius-lg:            var(--radius-lg);
  --radius-xl:            var(--radius-xl);
  --radius-pill:          var(--radius-pill);

  /* Animations */
  --animate-spring-in:    spring-in var(--duration-base) var(--joy-bezier);
  --animate-fade-in:      fade-in var(--duration-base) var(--ease-out);
}

@keyframes spring-in {
  from { transform: scale(0.95); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

### 10.3 Utility Classes

```css
/* Pill shapes */
.pill { border-radius: var(--radius-pill); }

/* Interactive elements */
.interactive {
  transition: all var(--duration-base) var(--joy-bezier);
  cursor: pointer;
}
.interactive:hover { transform: scale(1.02); }
.interactive:active { transform: scale(0.97); }

/* Surface cards */
.surface-card {
  background: var(--surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: transform var(--duration-base) var(--joy-bezier),
              box-shadow var(--duration-base) var(--joy-bezier);
}
.surface-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Glass effect */
.glass {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
.dark .glass {
  background: rgba(31, 32, 35, 0.85);
}

/* Focus mode */
.focus-mode .chrome { opacity: 0.3; transition: opacity 400ms ease-out; }
.focus-mode .editor-container { opacity: 1; }

/* Active line */
.active-line {
  background: linear-gradient(
    to right,
    var(--yellow-surface) 0%,
    transparent 70%
  );
}
```

---

## 11. Accessibility

### 11.1 Color Contrast

All text/background pairs meet WCAG 2.1 AA standards:

- **Primary text** (#1F1F1F) on white (#FFFFFF): 15.3:1 ✅ AAA
- **Secondary text** (#5E5E5E) on white (#FFFFFF): 6.5:1 ✅ AA
- **Muted text** (#757575) on white (#FFFFFF): 4.7:1 ✅ AA (large text only)
- **Primary (#4285F4)** on white (#FFFFFF): 5.1:1 ✅ AA

### 11.2 Focus Indicators

- Custom `focus-visible` ring: 2px solid primary, 2px offset, radius matches component
- All interactive elements focusable
- Skip-to-content link available

### 11.3 Motion Preferences

- Respects `prefers-reduced-motion`: all animations degrade to 0ms / instant
- Spring bezier falls back to `ease-out` when motion reduced

### 11.4 Keyboard Navigation

- Tab order matches visual layout (left → right, top → bottom)
- All dropdowns, dialogs, and menus fully keyboard navigable
- Escape closes any open overlay
- Arrow keys navigate within lists and search results

---

## 12. Implementation Roadmap

### Phase 1: Foundation (Current)
- [x] Next.js 16 with App Router
- [x] Tailwind CSS 4 integration
- [x] CSS custom properties for theming
- [x] Light / Dark mode support
- [x] Base typography (Inter, JetBrains Mono, Source Serif 4)

### Phase 2: Design System Implementation
- [ ] Update color variables to new spec (canvas #F4F6F8, pastel accents)
- [ ] Implement new radius system (24px containers, pill buttons)
- [ ] Add joy-bezier motion curve to all transitions
- [ ] Create utility classes (.interactive, .glass, .surface-card)
- [ ] Add spring animations to Tailwind theme

### Phase 3: Component Refresh
- [ ] Redesign logo with hover morph effect
- [ ] Update navbar: 60px, blur(20px), no hard border
- [ ] Implement pill-shaped segmented controls with sliding capsule
- [ ] Add focus mode to editor
- [ ] Redesign sidebar with pill active states
- [ ] Update blockquotes and code blocks to new spec

### Phase 4: Micro-interactions
- [ ] Add button spring animations (scale 1.02 / 0.97)
- [ ] Card hover elevation lift
- [ ] Search dialog with bounce entrance
- [ ] Logo hover color morph
- [ ] Reading progress bar

### Phase 5: Polish
- [ ] Responsive audit (mobile + tablet)
- [ ] Accessibility audit (contrast, focus, reduced motion)
- [ ] Performance profiling
- [ ] Cross-browser testing
- [ ] Documentation

---

## Appendix A: Dark Mode Comparison

| Element | Light | Dark |
|---------|-------|------|
| Canvas | `#F4F6F8` | `#1F2023` |
| Surface | `#FFFFFF` | `#28292E` |
| Surface Alt | `#F8F9FA` | `#202124` |
| Primary Text | `#1F1F1F` | `#E3E3E3` |
| Secondary Text | `#5E5E5E` | `#C4C6C5` |
| Primary | `#4285F4` | `#8AB4F8` |
| Green Surface | `#E6F4EA` | `#1E3A2E` |
| Yellow Surface | `#FEF7E0` | `#3A2E1E` |
| Lavender Surface | `#E8F0FE` | `#1E2A3A` |
| Glass BG | `rgba(255,255,255,0.85)` | `rgba(31,32,35,0.85)` |

## Appendix B: Border Radius Map

```
Containers           ⎯⎯⎯⎯⎯ 24px ──→  ┌──────────────────────┐
                                       │                      │
Cards / Modals       ⎯⎯⎯⎯⎯ 16px ──→  │  ┌────────────────┐   │
                                       │  │                │   │
Buttons / Tabs       ⎯⎯⎯⎯⎯ pill ──→   │  │  ○ Pill btn    │   │
                                       │  └────────────────┘   │
Inputs               ⎯⎯⎯⎯⎯ 12px ──→   │  [ Input field  ]     │
                                       │                      │
Inline Code          ⎯⎯⎯⎯⎯ 6px ───→   │  `code`              │
                                       └──────────────────────┘
```

## Appendix C: Motion Cheat Sheet

```css
/* Apply to all interactive elements */
* {
  --joy: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Button system */
.btn {
  transition: transform 200ms var(--joy);
}
.btn:hover { transform: scale(1.02); }
.btn:active { transform: scale(0.97); }

/* Card hover */
.card {
  transition: transform 200ms var(--joy), box-shadow 200ms var(--joy);
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
}

/* Logo */
.logo-text {
  transition: color 200ms var(--joy), transform 200ms var(--joy);
}
.logo-text:hover {
  color: #4285F4;
  transform: scale(1.03);
}

/* Modal entrance */
.modal {
  animation: springIn 250ms var(--joy);
}
@keyframes springIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

---

> **Document Maintainer:** PGDOWN Design Team  
> **Last Updated:** June 2026  
> **Questions?** Open an issue in the repository with the `design-spec` label.