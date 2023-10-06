import type { FieldDefinition, Rule } from "sanity";

export function slug({
  source = "name",
  description = "URL fragment of this object",
} = {}): FieldDefinition {
  return {
    name: "slug",
    type: "slug",
    title: "Slug",
    description,
    options: {
      source,
      maxLength: 96,
    },
    validation: (rule: Rule) => rule.required(),
  };
}
