# Next.js MVP Project Setup Decisions

Project: **nextjs-template-01-basic**
Date: 2026-03-04
Purpose: MVP with minimal configuration

---

## Summary Table

| # | Category | Decision | Alternatives Considered |
|---|----------|----------|------------------------|
| 1 | Package Manager | pnpm | npm, yarn, bun |
| 2 | Language | TypeScript | JavaScript |
| 3 | Router | App Router | Pages Router |
| 4 | Styling | Tailwind CSS | CSS Modules, styled-components, Plain CSS |
| 5 | src/ Directory | Yes | No |
| 6 | ESLint | Yes | No |
| 7 | Turbopack | Yes (dev mode) | Webpack |
| 8 | Import Alias | @/* (default) | ~/, no alias |
| 9 | Deployment | Undecided | Vercel, Docker, AWS Amplify |
| 10 | Node.js Version | Node 25 | Node 20 LTS, Node 22 LTS, Node 18 LTS |
| 11 | Testing | Skip for MVP | Vitest, Vitest + Playwright |
| 12 | Additional Libraries | None | shadcn/ui, next-auth |
| 13 | Prettier | Yes | No |
| 14 | ESLint + Prettier Integration | eslint-config-prettier | eslint-plugin-prettier |
| 15 | Prettier Style | Standard defaults | Single quotes/no semis, Custom |
| 16 | Tailwind Class Sorting | prettier-plugin-tailwindcss | None (manual ordering) |

---

## Setup Command

```bash
pnpm create next-app@latest nextjs-template-01-basic \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --turbopack \
  --import-alias "@/*"
```

---

## Decision Details

### 1. Package Manager: pnpm

- Fastest install times via content-addressable storage and hard links
- Strict dependency resolution prevents phantom dependency issues
- Disk-efficient when managing multiple projects
- Widely adopted in the Next.js ecosystem

### 2. Language: TypeScript

- First-class support in Next.js (auto-configured tsconfig, typed API routes)
- Type safety catches bugs at compile time, reducing MVP iteration cycles
- Superior IDE autocompletion and refactoring support
- Negligible overhead compared to JavaScript for project setup

### 3. Router: App Router

- Default and recommended router since Next.js 13.4
- Supports React Server Components for better performance
- Built-in layouts, loading states, and error boundaries
- Future-proof: all new Next.js features target App Router first
- Pages Router is in maintenance mode

### 4. Styling: Tailwind CSS

- Utility-first approach enables rapid prototyping (ideal for MVP speed)
- Built-in support via create-next-app, zero extra configuration
- No context-switching between component files and CSS files
- Tree-shaken in production, resulting in minimal CSS bundle
- Large ecosystem of component libraries (shadcn/ui, daisyUI) if needed later

### 5. src/ Directory: Yes

- Separates source code from root-level configuration files
- Cleaner project root (package.json, tsconfig, next.config stay at root)
- Standard convention in larger Next.js projects
- No downside for MVP; easier to navigate from day one

### 6. ESLint: Yes

- eslint-config-next catches common React and Next.js mistakes automatically
- Near-zero setup cost (included in create-next-app)
- Prevents issues like missing alt attributes, incorrect link usage, etc.
- Can be extended later without reconfiguration

### 7. Turbopack: Yes (dev mode)

- Rust-based successor to Webpack for development
- Significantly faster HMR (Hot Module Replacement) and cold start
- Stable in Next.js 15+ for development use
- Improves developer iteration speed during MVP development
- Production builds still use Webpack (no risk)

### 8. Import Alias: @/* (default)

- Standard convention across the Next.js ecosystem
- Enables clean imports: `@/components/Button` instead of `../../../components/Button`
- Pre-configured by create-next-app, no additional setup
- Mapped to `src/*` in tsconfig.json

### 9. Deployment: Undecided

- Deferred to avoid premature infrastructure decisions
- Next.js output is platform-agnostic by default
- Can add Vercel, Docker, or other deployment config later without refactoring
- Recommended to revisit before MVP launch

### 10. Node.js Version: Node 25

- User-specified choice (current release as of March 2026)
- Note: Node 25 is an odd-numbered release (Current, not LTS)
- Ensure hosting platform compatibility before deployment
- Consider pinning via .nvmrc or .node-version for team consistency

### 11. Testing: Skip for MVP

- Prioritizes speed to market over test coverage
- Reduces initial setup complexity and dependency count
- Testing framework (Vitest recommended) can be added post-MVP
- Critical paths should be manually verified during MVP phase

### 12. Additional Libraries: None

- Start with bare Next.js to keep the dependency tree minimal
- Add libraries only as concrete needs arise
- Avoids premature abstraction and unnecessary bundle size
- shadcn/ui and next-auth are good candidates when needed later

### 13. Prettier: Yes

- Opinionated code formatter — eliminates all style debates
- Supports TypeScript, JSX, CSS, JSON, and Markdown out of the box
- Format-on-save integration with all major editors (VS Code, WebStorm, etc.)
- Ensures consistent formatting across the entire codebase

### 14. ESLint + Prettier Integration: eslint-config-prettier

- **Approach**: Run ESLint and Prettier as separate tools, each doing its own job
  - ESLint handles code quality (unused vars, incorrect imports, React rules)
  - Prettier handles formatting (whitespace, semicolons, quotes, line width)
- **eslint-config-prettier** disables all ESLint rules that would conflict with Prettier
  - Extends the ESLint config with `"prettier"` as the last item to override conflicting rules
  - Prevents false positives where ESLint and Prettier disagree on formatting
- **Why not eslint-plugin-prettier**: Running Prettier inside ESLint is slower, produces noisy red-squiggle output for formatting issues, and conflates two separate concerns. The Prettier team themselves recommend against it.
- **Conflict-free guarantee**: With eslint-config-prettier, ESLint never reports formatting issues and Prettier never touches code logic — zero overlap

### 15. Prettier Style: Standard Defaults

- `semi: true` — semicolons at end of statements
- `singleQuote: false` — double quotes for strings
- `tabWidth: 2` — 2-space indentation
- `trailingComma: "all"` — trailing commas everywhere (cleaner git diffs)
- `printWidth: 80` — line wrap at 80 characters
- Zero-config: using Prettier's built-in defaults means no `.prettierrc` customization needed (though the config file is still created for explicitness)

### 16. Tailwind Class Sorting: prettier-plugin-tailwindcss

- Official Prettier plugin maintained by the Tailwind CSS team
- Automatically sorts utility classes in the recommended order (layout → spacing → typography → visual → etc.)
- Eliminates class ordering bikeshedding in code reviews
- Works seamlessly with Prettier — just add to plugins array, no other config needed
- Zero runtime cost: sorting happens at format time only

---

## Post-Setup Steps

1. Verify Node 25 is active: `node -v`
2. Pin Node version: create `.nvmrc` with `25`

### 3. Install Prettier + Integration Packages

```bash
pnpm add -D prettier eslint-config-prettier prettier-plugin-tailwindcss
```

| Package | Purpose |
|---------|---------|
| `prettier` | Code formatter |
| `eslint-config-prettier` | Disables ESLint rules that conflict with Prettier |
| `prettier-plugin-tailwindcss` | Auto-sorts Tailwind CSS classes |

### 4. Configure Prettier — `.prettierrc`

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

> No other options needed — Prettier's standard defaults apply (semi: true, double quotes, tabWidth: 2, trailingComma: "all", printWidth: 80). The config file exists solely to register the Tailwind plugin.

### 5. Configure ESLint — update `.eslintrc.json`

Ensure `"prettier"` is the **last** entry in `extends` so it overrides all conflicting rules:

```json
{
  "extends": ["next/core-web-vitals", "next/typescript", "prettier"]
}
```

> `next/core-web-vitals` and `next/typescript` are auto-generated by create-next-app. Adding `"prettier"` at the end disables any formatting rules they include.

### 6. Add `.prettierignore`

```
node_modules
.next
out
dist
pnpm-lock.yaml
```

### 7. Add Scripts to `package.json`

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "lint": "next lint"
  }
}
```

> `lint` (ESLint) checks code quality. `format` (Prettier) fixes formatting. `format:check` verifies formatting in CI without modifying files.

### 8. Verify Setup

```bash
pnpm lint          # ESLint — should pass with no formatting complaints
pnpm format:check  # Prettier — should report no unformatted files
pnpm dev           # Dev server with Turbopack
```
