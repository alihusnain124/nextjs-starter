// Shared across every feature's thunk.ts — see "Adding a new API-backed feature" in the README.
export type AsyncStatus = "idle" | "loading" | "succeeded" | "failed";

// Use inside a createAsyncThunk `condition` callback to skip dispatch when
// data is already loading or has already been fetched successfully.
export function shouldSkipFetch(status: AsyncStatus): boolean {
  return status === "loading" || status === "succeeded";
}
