export function generateKey<T extends Record<string, unknown>>(obj: T) {
  return Object.entries(obj).sort().toString();
}
