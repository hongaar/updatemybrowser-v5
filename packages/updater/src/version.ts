import { SemVer, coerce, rcompare } from "semver";

export function toSimpleVersionString(version: string) {
  const semver = coerce(version);

  if (!semver) {
    return "0";
  }

  if (semver.patch !== 0) {
    return semver.version;
  }

  if (semver.minor !== 0) {
    return [semver.major, semver.minor].join(".");
  }

  return semver.major.toString();
}

export function highestVersion(versions: string[]) {
  return (
    versions
      .map((version) => coerce(version))
      .filter((version) => version !== null)
      .sort((a, b) => rcompare(a as SemVer, b as SemVer))
      .map((version) => toSimpleVersionString(version!.version))[0] || "0"
  );
}
