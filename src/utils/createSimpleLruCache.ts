/**
 * Simple in-memory LRU Cache
 * - Keeps at most `capacity` entries
 * - Evicts least-recently-used (LRU) entries automatically
 * - Normalizes keys (trim + lowercase)
 */

interface LRUCache<T> {
  get: (rawKey: string) => T | undefined;
  set: (rawKey: string, value: T) => void;
  clear: () => void;
}

export function createSimpleLRU<T>(capacity: number = 20): LRUCache<T> {
  const normalizeKey = (key: string): string => key.trim().toLowerCase();
  const map = new Map<string, T>();

  // Get item and mark as recently used
  const get = (rawKey: string): T | undefined => {
    const key = normalizeKey(rawKey);
    if (!map.has(key)) return undefined;
    const value = map.get(key);
    // Move to end (mark as most recent)
    map.delete(key);
    map.set(key, value!);
    console.log(`Cache HIT: "${key}" moved to most recent position`);
    console.log(`Current cache order:`, Array.from(map.keys()));
    return value;
  };

  // Set new item and handle eviction
  const set = (rawKey: string, value: T): void => {
    const key = normalizeKey(rawKey);
    // If already present, refresh it
    if (map.has(key)) map.delete(key);
    map.set(key, value);
    console.log(`Added to cache: "${key}"`);
    // If over capacity, remove the oldest key
    if (map.size > capacity) {
      // Give me the first key in the Map.
      const oldestKey = map.keys().next().value;
      if (oldestKey !== undefined) {
        map.delete(oldestKey);
        console.log(`Evicted oldest cached key: "${oldestKey}"`);
      }
    }
    console.log(
      `Current cache order (${map.size}/${capacity}):`,
      Array.from(map.keys())
    );
  };

  const clear = (): void => {
    map.clear();
    console.log("Cache cleared", map);
  };

  return { get, set, clear };
}
