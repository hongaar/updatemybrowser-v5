export function pageTitle(...titles: (string | undefined)[]) {
  return `${titles.reverse().filter(Boolean).join(" - ")} - Update My Browser`;
}
