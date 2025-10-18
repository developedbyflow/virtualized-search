import { describe, it, expect } from "vitest";
import { createSimpleLRU } from "./createSimpleLruCache";

/**
 * Essential LRU Cache Tests
 * Only testing critical functionality
 */

describe("LRU Cache", () => {
  it("should store and retrieve values", () => {
    const cache = createSimpleLRU<string>(5);
    cache.set("key1", "value1");
    expect(cache.get("key1")).toBe("value1");
  });

  it("should normalize keys to lowercase", () => {
    const cache = createSimpleLRU<string>(5);
    cache.set("Apple", "fruit");
    expect(cache.get("apple")).toBe("fruit");
  });

  it("should evict oldest item when full", () => {
    const cache = createSimpleLRU<string>(3);
    cache.set("key1", "value1");
    cache.set("key2", "value2");
    cache.set("key3", "value3");
    cache.set("key4", "value4"); // Should evict key1

    expect(cache.get("key1")).toBeUndefined();
    expect(cache.get("key4")).toBe("value4");
  });

  it("should clear all items", () => {
    const cache = createSimpleLRU<string>(5);
    cache.set("key1", "value1");
    cache.clear();
    expect(cache.get("key1")).toBeUndefined();
  });
});
