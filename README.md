# Next.js Starter

A batteries-included Next.js starter template — created by **Ali Husnain**.

Includes:

- **Next.js 16** (App Router, TypeScript, `src/` directory)
- **Tailwind CSS 4** + **shadcn/ui** components (`src/components/ui`)
- **Inter** / **JetBrains Mono** loaded via `next/font/google`
- **Redux Toolkit** store scaffolded for **async actions via thunks** (`createAsyncThunk`), with each feature split into `services.ts` / `thunk.ts` / `slice.ts` — the standard way to call APIs from Redux. Not wired into any page by default — it's scaffolding, not a live demo.
- **Axios** API client (`src/lib/axios.ts`) with request/response interceptors (auth token attach + normalized errors), backed by [JSONPlaceholder](https://jsonplaceholder.typicode.com) as a reference implementation — swap `NEXT_PUBLIC_API_URL` to point at your real backend
- **Next.js proxy** (`src/proxy.ts`, formerly "middleware") — a dummy auth guard on `/dashboard/:path*`, ready to swap for real session/token logic
- A clean, typed folder structure ready to grow

## Folder structure

```
src/
  app/                    # App Router: pages, layout, global styles
    layout.tsx
    page.tsx
    globals.css

  components/ui/          # shadcn/ui components + reusable presentational components
    button.tsx, badge.tsx, card.tsx, separator.tsx   # shadcn/ui (generated)
    PostCard.tsx, Spinner.tsx                        # hand-written, reusable

  features/                # One folder per Redux feature — same 3 files every time
    posts/
      services.ts         # API calls for this resource (uses apiClient)
      thunk.ts             # createAsyncThunk actions (calls services.ts)
      slice.ts             # createSlice + extraReducers (handles thunk.ts)

  lib/
    axios.ts               # Shared axios instance + interceptors (auth token, error shape)
    utils.ts                # shadcn's `cn()` class-merging helper

  store/
    store.ts                # configureStore, registers every feature's reducer
    hooks.ts                 # typed useAppDispatch / useAppSelector
    provider.tsx              # <StoreProvider> (wraps app/layout.tsx)

  types/
    index.ts                 # Shared TypeScript types (e.g. Post)

  proxy.ts                    # Dummy auth-guard proxy (Next.js 16's renamed "middleware")
```

**The pattern in one line:** `services.ts` calls the API → `thunk.ts` wraps it as a dispatchable
async action → `slice.ts` reduces its pending/fulfilled/rejected states → components dispatch it and
read state via the typed hooks. Every new resource gets its own `features/<resource>/` folder with
exactly these three files.

`features/posts/` is the worked example: `postsApi.getAll()` in `services.ts` → `fetchPosts` in
`thunk.ts` → handled in `slice.ts` → registered as `posts` in `store/store.ts`.

The home page (`src/app/page.tsx`) does **not** dispatch `fetchPosts` — it's a static landing page.
The Redux store, slice, and API layer exist purely as a working reference; wire `dispatch(fetchPosts())`
into a page/component yourself when you're ready to use it.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # point NEXT_PUBLIC_API_URL at your backend when ready
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a new API-backed feature

1. Add types to `src/types`.
2. Create `src/features/<resource>/services.ts` with plain functions calling `apiClient` (from `src/lib/axios.ts`).
3. Create `src/features/<resource>/thunk.ts` with `createAsyncThunk` actions that call those services. For any "fetch list/detail" thunk, add a `condition` using `shouldSkipFetch` from `src/store/thunk-helpers.ts` so repeated dispatches don't refetch data that's already loading or loaded — see `features/posts/thunk.ts` for the one-line pattern.
4. Create `src/features/<resource>/slice.ts` with `createSlice` + `extraReducers` handling the thunks. Type the `status` field as `AsyncStatus` (from `src/store/thunk-helpers.ts`) instead of a local union.
5. Register the reducer in `src/store/store.ts`.
6. Use `useAppDispatch` / `useAppSelector` (`src/store/hooks.ts`) in your components.

## Proxy (formerly Middleware)

`src/proxy.ts` ships a dummy auth guard: it reads a `token` cookie and redirects to `/login`
if it's missing, scoped to `/dashboard/:path*` via the exported `config.matcher`. Replace the cookie
check with your real auth (next-auth, JWT verification, etc.) and update `matcher` for the routes
you want protected.

Next.js 16 renamed the `middleware` file convention to `proxy` — same behavior, new name (see the
[migration notes](https://nextjs.org/docs/messages/middleware-to-proxy)).

## UI components (shadcn/ui)

Components are copied into `src/components/ui` (not installed as a package), so you own and can
edit the code directly. Add more with:

```bash
npx shadcn@latest add <component>   # e.g. dialog, input, dropdown-menu
```

## Scripts

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Start the dev server             |
| `npm run build`        | Production build                 |
| `npm run start`        | Run the production build         |
| `npm run lint`         | Lint the project                 |
| `npm run format`       | Format the project with Prettier |
| `npm run format:check` | Check formatting without writing |

## Keeping the project up to date

When a new version of Next.js, React, Tailwind, or Redux Toolkit is released:

1. Check what's outdated:
   ```bash
   npm outdated
   ```
2. For routine minor/patch bumps:
   ```bash
   npm update
   ```
3. For a major version (e.g. Next.js 16 → 17), upgrade deliberately:
   ```bash
   npm install next@latest react@latest react-dom@latest
   npx @next/codemod@latest upgrade   # applies official Next.js migration codemods
   ```
   Then read that version's release notes / migration guide before merging, since major bumps can change routing, config, or the App Router APIs.
4. For Tailwind CSS major upgrades, check the [Tailwind upgrade guide](https://tailwindcss.com/docs/upgrade-guide) — v4 uses a CSS-first config (in `globals.css`) instead of `tailwind.config.js`.
5. For Redux Toolkit / React Redux, check their changelogs — the `createAsyncThunk` / `createSlice` API in this template has been stable across recent majors.
6. After any upgrade:
   ```bash
   npm run lint
   npm run build
   ```
   to confirm nothing broke, then commit the updated `package.json` / `package-lock.json` together.

## Credits

Starter template created and maintained by **Ali Husnain**.
