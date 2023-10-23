export function toSimpleVersionString<T extends string | undefined>(
  version: T,
): T extends string ? string : undefined {
  if (!version) {
    // @ts-expect-error
    return;
  }

  const components = version.split(".").slice(0, 3).map(Number);

  if (components.length === 0) {
    return "0" as any;
  }

  if (
    components[2] &&
    components[2] !== 0 &&
    !Number.isNaN(components[1]) &&
    !Number.isNaN(components[2])
  ) {
    return components.join(".") as any;
  }

  if (components[1] && components[1] !== 0 && !Number.isNaN(components[1])) {
    return `${components[0]}.${components[1]}` as any;
  }

  if (Number.isNaN(components[0])) {
    return "0" as any;
  }

  return components[0]!.toString() as any;
}

export function compare(a?: string, b?: string) {
  if (!a || !b) {
    return 0;
  }

  return toSimpleVersionString(a).localeCompare(
    toSimpleVersionString(b),
    undefined,
    {
      numeric: true,
      sensitivity: "base",
    },
  );
}

export function rcompare(a?: string, b?: string) {
  if (!a || !b) {
    return 0;
  }

  return compare(a, b) * -1;
}

export function highestVersion(versions: string[]) {
  return (
    versions
      .map((version) => toSimpleVersionString(version))
      .sort(rcompare)[0] || "0"
  );
}

export function gt(v1: string, v2: string) {
  return compare(v1, v2) === 1;
}

export function lt(v1: string, v2: string) {
  return compare(v1, v2) === -1;
}
