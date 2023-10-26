import type { FieldsetDefinition } from "sanity";

export const defaultFieldset: FieldsetDefinition[] = [
  {
    name: "i18n",
    title: "i18n",
    options: { collapsible: true, collapsed: true },
  },
  {
    name: "branding",
    title: "Branding",
    options: { collapsible: true, collapsed: true },
  },
  {
    name: "articles",
    title: "Articles",
    options: { collapsible: true, collapsed: true },
  },
];
