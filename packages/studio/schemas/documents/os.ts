import { oses } from "@updatemybrowser/client";
import type { DocumentDefinition } from "sanity";
import { mediaPreview } from "sanity-plugin-icon-manager";
import { defaultFieldset, i18nString, slug } from "../mixins/index.js";

export const os: DocumentDefinition = {
  name: "os",
  title: "Operating system",
  type: "document",
  fieldsets: defaultFieldset,
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
      description: "e.g. Windows or Ubuntu",
      type: "string",
      validation: (rule) => rule.required(),
    },
    slug({ description: "e.g. windows or ubuntu" }),
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
      name: "matchOsName",
      title: "Match operating system name",
      description: "Match operating system name from @updatemybrowser/client",
      type: "string",
      options: {
        list: Object.keys(oses).map((key) => ({
          title: oses[key as keyof typeof oses],
          value: oses[key as keyof typeof oses],
        })),
      },
    },
    i18nString({
      name: "description",
    }),
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
