export const debounceRaf = fn => {
  let ref = 0;

  return (...args) => {
    if (ref) return;

    ref = requestAnimationFrame(() => {
      fn(...args);
      ref = 0;
    });
  };
};
