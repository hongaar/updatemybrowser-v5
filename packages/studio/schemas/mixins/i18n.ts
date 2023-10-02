import { capitalize } from "@updatemybrowser/core";
import { FieldDefinition, Rule } from "sanity";

type Params = {
  name: string;
  title?: string;
  description?: string;
  required?: boolean;
};

export function i18nString({
  name,
  title,
  description,
  required = false,
}: Params): FieldDefinition {
  return {
    name,
    type: "string",
    title: title ?? capitalize(name),
    description,
    validation: (rule: Rule) => (required ? rule.required() : undefined),
  };
}
