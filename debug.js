let debug = false;

/**
 * Enables or disables debug logging.
 * @param {boolean} value If true, log output is enabled.
 */
export function setDebug(value) {
  debug = value;
}

/**
 * Logs to the console when debug mode is active.
 * @param {...any} args Values to log.
 */
export function debugLog(...args) {
  if (debug) {
    console.log(...args);
  }
}

