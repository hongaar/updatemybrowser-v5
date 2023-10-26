import type { DocumentDefinition } from "sanity";
import { slug } from "../mixins/index.js";

export const site: DocumentDefinition = {
  name: "site",
  title: "Site",
  type: "document",
  fieldsets: [
    {
      name: "branding",
      title: "Branding",
      options: { collapsible: true, collapsed: false },
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "domain",
      media: "icon",
    },
  },
  fields: [
    {
      name: "name",
      title: "Name",
      description: "e.g. Update my Browser",
      type: "string",
      validation: (rule) => rule.required(),
    },
    slug(),
    {
      name: "domain",
      title: "Domain",
      description: "e.g. updatemybrowser.org",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "icon",
      title: "Icon",
      type: "icon",
      fieldset: "branding",
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      fieldset: "branding",
    },
    {
      name: "color",
      title: "Color",
      type: "color",
      fieldset: "branding",
    },
  ],
};
