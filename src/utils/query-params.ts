export function buildUrl(
  base: string,
  path: string,
  params?: Record<string, unknown>,
): string {
  const url = new URL(path, base);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}
