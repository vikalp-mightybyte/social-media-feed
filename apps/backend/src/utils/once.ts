export function once<T>(fn: null | (() => T)): () => T {
  let val: T;
  return () => {
    if (fn) {
      val = fn();
      fn = null;
    }
    return val;
  };
}
