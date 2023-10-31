import type { FieldDefinition, Rule } from "sanity";

type Params = {
  name: string;
  title?: string;
  description?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
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
  minLength,
  maxLength,
  fieldset = "i18n",
}: Params): FieldDefinition {
  return {
    name,
    title: title ?? capitalizeString(name),
    type: "internationalizedArrayString",
    description,
    validation: (rule: Rule) => {
      if (required) {
        rule.required();
      }

      if (minLength) {
        rule.min(minLength);
      }

      if (maxLength) {
        rule.max(maxLength);
      }

      return rule;
    },
    fieldset,
  };
}

export function i18nUrl({
  name,
  title,
  description,
  required = false,
  fieldset = "i18n",
}: Params): FieldDefinition {
  return {
    name,
    title: title ?? capitalizeString(name),
    type: "internationalizedArrayUrl",
    description,
    validation: (rule: Rule) => (required ? rule.required() : undefined),
    fieldset,
  };
}

export function i18nText({
  name,
  title,
  description,
  required = false,
  fieldset = "i18n",
}: Params): FieldDefinition {
  return {
    name,
    title: title ?? capitalizeString(name),
    type: "internationalizedArrayText",
    description,
    validation: (rule: Rule) => (required ? rule.required() : undefined),
    fieldset,
  };
}
