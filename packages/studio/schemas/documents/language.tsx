import { Icon } from "@iconify/react";
import { DocumentDefinition } from "sanity";

export const language: DocumentDefinition = {
  name: "language",
  title: "Language",
  type: "document",
  preview: {
    select: {
      title: "title",
      subtitle: "id",
      flag: "flag",
    },
    prepare(attrs) {
      return {
        ...attrs,
        media: () => <Icon icon={`flag:${attrs.flag}-4x3`} />,
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
      name: "flag",
      title: "Flag",
      description: "e.g. gb or nl",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "title",
      title: "Title",
      description: "e.g. English or Dutch",
      type: "string",
      validation: (rule) => rule.required(),
    },
  ],
};
