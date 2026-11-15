export function readStorageValue(key, fallback, area = 'local') {
  try {
    const store = area === 'session' ? sessionStorage : localStorage;
    const value = store.getItem(key);
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
}

export function writeStorageValue(key, value, area = 'local') {
  try {
    const store = area === 'session' ? sessionStorage : localStorage;
    store.setItem(key, String(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStorageValue(key, area = 'local') {
  try {
    const store = area === 'session' ? sessionStorage : localStorage;
    store.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function readStore(key, fallback) {
  try {
    const raw = readStorageValue(key, null);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStore(key, value) {
  try {
    return writeStorageValue(key, JSON.stringify(value));
  } catch {
    return false;
  }
}
