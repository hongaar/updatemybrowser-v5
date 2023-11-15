import type { FieldsetDefinition } from "sanity";

export const defaultFieldset: FieldsetDefinition[] = [
  {
    name: "i18n",
    title: "i18n",
    options: { collapsible: true, collapsed: false },
  },
  {
    name: "branding",
    title: "Branding",
    options: { collapsible: true, collapsed: false },
  },
  {
    name: "media",
    title: "Media",
    options: { collapsible: true, collapsed: false },
  },
  {
    name: "articles",
    title: "Articles",
    options: { collapsible: true, collapsed: false },
  },
];
