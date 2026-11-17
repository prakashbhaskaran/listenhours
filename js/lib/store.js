// Private, on-device storage. Every access is guarded: in private mode or with
// blocked site data, localStorage can throw, and the tools must still work.
const PREFIX = "lh.";

function defaultStorage() {
  try { return globalThis.localStorage ?? null; } catch { return null; }
}

export function load(key, fallback, storage = defaultStorage()) {
  try {
    const raw = storage?.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function save(key, value, storage = defaultStorage()) {
  try {
    if (!storage) return false;
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function clearAll(storage = defaultStorage()) {
  try {
    if (!storage) return;
    const keys = [];
    for (let i = 0; i < storage.length; i++) {
      const k = storage.key(i);
      if (k && k.startsWith(PREFIX)) keys.push(k);
    }
    keys.forEach((k) => storage.removeItem(k));
  } catch {
    /* nothing to clear */
  }
}
