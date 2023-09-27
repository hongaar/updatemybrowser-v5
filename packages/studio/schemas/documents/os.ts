import { DocumentDefinition } from "sanity";
import { mediaPreview } from "sanity-plugin-icon-manager";

export const os: DocumentDefinition = {
  name: "os",
  title: "Operating system",
  type: "document",
  fieldsets: [
    {
      name: "branding",
      title: "Branding",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "vendor",
      media: "icon",
    },
    prepare({ icon }) {
      return {
        media: mediaPreview(icon),
      };
    },
  },
  fields: [
    {
      name: "name",
      title: "Name",
      description: "e.g. Windows or Ubuntu",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      description: "e.g. windows or ubuntu",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (rule) => rule.required(),
    },
    {
      name: "vendor",
      title: "Vendor",
      description: "e.g. Microsoft or Canonical",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "homepage",
      title: "Homepage",
      description: "e.g. https://www.microsoft.com/windows",
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
