# Notion Budget Management Application

A responsive personal and team financial orchestration application built with React, TypeScript, and Tailwind CSS, adhering strictly to the design system rules, typography scale, elevation, and pastel color tokens documented in [`DESIGN.md`](./DESIGN.md).

## Features
- **Design System Fidelity**: Full adherence to `DESIGN.md` styling, including the signature `#0a1530` navy hero band with scattered decorative sticky-note dots and wire illustrations, `#5645d4` purple rectangular CTA buttons (8px radius), pastel feature card tints (peach, rose, mint, lavender, sky), and the high-emphasis bold yellow banner.
- **Embedded Workspace Mockup**: Interactive live financial workspace preview embedded in the hero band with Level 3 elevation shadow.
- **Controlled Financial Forms**: Real-time validation for title, positive numeric amounts, dates, and category selections with inline error messaging.
- **Dynamic Ledger & State Container**: `BudgetContext` computing dynamic net balance, inflow totals, outflow totals, savings rate, and category budget utilization with `localStorage` persistence.
- **Interactive Filtering & Sorting**: Search transactions by keyword, filter by pill tabs (All Items, Expenses, Income, Recurring), and sort by date or amount.
- **Category Guardrails & Limits**: Set monthly category spending targets and monitor progress bars with real-time over-budget warnings.
- **Budget vs Actual Comparison Table**: Tabular view of monthly budget limits vs actual expenditures with variance calculations.
- **Responsive Layout**: Designed for fluid layouts across Mobile (<480px, 480-767px), Tablet (768-1023px), and Desktop (>=1024px).

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Running Locally

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   Or from the root directory:
   ```bash
   npm run dev
   ```

3. Run automated tests:
   ```bash
   npm run test
   ```

4. Build for production:
   ```bash
   npm run build
   ```
