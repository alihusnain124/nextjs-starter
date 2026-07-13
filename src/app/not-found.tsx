import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h2 className="text-foreground text-xl font-semibold">Page not found</h2>
      <p className="text-muted-foreground max-w-sm text-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button render={<Link href="/" />}>Return home</Button>
    </div>
  );
}
