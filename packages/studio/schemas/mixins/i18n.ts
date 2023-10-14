import type { FieldDefinition, Rule } from "sanity";

type Params = {
  name: string;
  title?: string;
  description?: string;
  required?: boolean;
  fieldset?: string;
};

function capitalizeString(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function i18nString({
  name,
  title,
  description,
  required = false,
  fieldset = "i18n",
}: Params): FieldDefinition {
  return {
    name,
    title: title ?? capitalizeString(name),
    type: "internationalizedArrayString",
    description,
    validation: (rule: Rule) => (required ? rule.required() : undefined),
    fieldset,
  };
}
