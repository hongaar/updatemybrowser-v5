/**
 * Function to compare (nested objects) for deep equality, or arrays of objects,
 * in which case order of elements is ignored.
 * Returns true if equal, false otherwise.
 */
export function deepEqual(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }

  if (a && b && typeof a === "object" && typeof b === "object") {
    if (
      (Array.isArray(a) && !Array.isArray(b)) ||
      (!Array.isArray(a) && Array.isArray(b))
    ) {
      return false;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) {
        return false;
      }

      return a.every((item) =>
        b.some((otherItem) => deepEqual(item, otherItem)),
      );
    }

    const keys = Object.keys(a);

    if (keys.length !== Object.keys(b).length) {
      return false;
    }

    return keys.every((key) => deepEqual(a[key], b[key]));
  }

  return false;
}

export function unsafeRandomId(length = 8) {
  const ALPHABET =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let rtn = "";
  for (var i = 0; i < length; i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
}
