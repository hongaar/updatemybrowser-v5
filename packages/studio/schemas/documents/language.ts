import type { DocumentDefinition } from "sanity";
import { mediaPreview } from "sanity-plugin-icon-manager";

export const language: DocumentDefinition = {
  name: "language",
  title: "Language",
  type: "document",
  preview: {
    select: {
      title: "name",
      subtitle: "id",
      flag: "flag",
    },
    prepare({ flag, ...rest }) {
      return {
        ...rest,
        media: mediaPreview(flag),
      };
    },
  },
  fields: [
    {
      name: "id",
      title: "ID",
      description: "e.g. en or nl",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "name",
      title: "Name",
      description: "e.g. English or Dutch",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "flag",
      title: "Flag",
      type: "icon.manager",
      validation: (rule) => rule.required(),
    },
  ],
};
