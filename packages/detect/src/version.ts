export function toSimpleVersionString(version?: string) {
  if (!version) {
    return;
  }

  const components = version.split(".").slice(0, 2).map(Number);

  if (components.length === 0) {
    return "0";
  }

  if (components[2] && components[2] !== 0) {
    return components.join(".");
  }

  if (components[1] && components[1] !== 0) {
    return `${components[0]}.${components[1]}`;
  }

  return components[0]!.toString();
}
