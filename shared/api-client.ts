import type { ApiContract } from "./api-contract.ts";

export async function apiFetch<
  R extends keyof ApiContract
>(
  route: R,
  params?: ApiContract[R]["params"]
): Promise<ApiContract[R]["response"]> {
  const url = new URL(route, window.location.origin);

  if (params) {
    Object.entries(params).forEach(([k, v]) =>
      url.searchParams.set(k, String(v))
    );
  }

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("API error");

  return res.json();
}
