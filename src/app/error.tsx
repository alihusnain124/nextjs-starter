"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h2 className="text-foreground text-xl font-semibold">Something went wrong</h2>
      <p className="text-muted-foreground max-w-sm text-sm">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <Button onClick={() => unstable_retry()}>Try again</Button>
    </div>
  );
}
