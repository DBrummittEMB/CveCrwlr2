export const debug = false;

export function debugLog(...args) {
  if (debug) {
    console.log(...args);
  }
}

