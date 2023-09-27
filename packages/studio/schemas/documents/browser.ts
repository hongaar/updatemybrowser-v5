import { DocumentDefinition } from "sanity";
import { mediaPreview } from "sanity-plugin-icon-manager";

export const browser: DocumentDefinition = {
  name: "browser",
  title: "Browser",
  type: "document",
  fieldsets: [
    {
      name: "branding",
      title: "Branding",
      options: { collapsible: true },
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "vendor",
      icon: "icon",
    },
    prepare({ icon, ...rest }) {
      return {
        ...rest,
        media: mediaPreview(icon),
      };
    },
  },
  fields: [
    {
      name: "name",
      title: "Name",
      description: "e.g. Chrome or Firefox",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      description: "e.g. chrome or firefox",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (rule) => rule.required(),
    },
    {
      name: "vendor",
      title: "Vendor",
      description: "e.g. Google or Mozilla",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "homepage",
      title: "Homepage",
      description: "e.g. https://www.google.com/chrome/",
      type: "url",
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
      type: "icon.manager",
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
