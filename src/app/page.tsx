import { Boxes, Palette, ShieldCheck, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STACK = ["Next.js 16", "TypeScript", "Tailwind CSS 4", "Redux Toolkit", "shadcn/ui"];

const FEATURES = [
  {
    icon: Zap,
    title: "Async thunks + axios",
    description:
      "Redux Toolkit slices with createAsyncThunk, backed by a preconfigured axios instance with request/response interceptors.",
  },
  {
    icon: ShieldCheck,
    title: "Middleware ready",
    description:
      "A dummy auth-guard middleware protecting /dashboard — swap in your real session check and matcher routes.",
  },
  {
    icon: Palette,
    title: "Tailwind + shadcn/ui",
    description:
      "Tailwind CSS 4 and shadcn/ui components you own the code for, styled with a consistent design token system.",
  },
  {
    icon: Boxes,
    title: "Typed folder structure",
    description:
      "Each feature gets services.ts, thunk.ts, and slice.ts — the same predictable pattern every time.",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="border-border relative overflow-hidden border-b">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--color-primary)/8%,transparent_60%)]"
        />
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 py-20 text-center">
          <Badge variant="secondary" className="gap-2 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Starter template
          </Badge>

          <h1 className="text-foreground max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Next.js, styled and{" "}
            <span className="from-primary bg-gradient-to-r to-fuchsia-500 bg-clip-text text-transparent">
              ready for real APIs
            </span>
          </h1>

          <p className="text-muted-foreground max-w-xl text-balance">
            Tailwind CSS and shadcn/ui out of the box, a typed folder structure, and a Redux Toolkit
            store with async thunks scaffolded for your API calls — no boilerplate to write.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {STACK.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight">
            What&apos;s inside
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Everything wired together so you start building features, not plumbing.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-2 flex h-9 w-9 items-center justify-center rounded-lg">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Get started */}
      <section className="border-border border-t">
        <div className="mx-auto w-full max-w-4xl px-6 py-16">
          <h2 className="text-foreground text-center text-2xl font-semibold tracking-tight">
            Get started
          </h2>
          <pre className="bg-card text-card-foreground ring-foreground/10 mt-6 overflow-x-auto rounded-xl px-5 py-4 font-mono text-sm ring-1">
            <code>
              npm install{"\n"}
              cp .env.local.example .env.local{"\n"}
              npm run dev
            </code>
          </pre>
        </div>
      </section>

      {/* Creator credit */}
      <section className="border-border border-t">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 px-6 py-14 text-center">
          <div className="from-primary text-primary-foreground shadow-primary/30 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br to-fuchsia-500 text-lg font-semibold shadow-lg">
            AH
          </div>
          <div>
            <p className="text-foreground font-semibold">Ali Husnain</p>
            <p className="text-muted-foreground text-sm">Creator of this starter</p>
          </div>
        </div>
      </section>
    </main>
  );
}
