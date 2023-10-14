import type { ObjectDefinition } from "sanity";

export const versionSource: ObjectDefinition = {
  name: "versionSource",
  title: "Version source",
  type: "object",
  preview: {
    select: {
      title: "source",
      caniuse_agent: "caniuse_agent",
    },
    prepare({ title, caniuse_agent }) {
      return {
        title,
        subtitle: title === "caniuse" ? caniuse_agent : "",
      };
    },
  },
  fields: [
    {
      name: "source",
      title: "Source",
      description: "e.g. caniuse, wikipedia",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Can I Use", value: "caniuse" },
          { title: "Wikipedia (not implemented)", value: "wikipedia" },
        ],
      },
    },
    {
      name: "caniuse_agent",
      title: "Agent identifier",
      description: "e.g. chrome, opera",
      type: "string",
      validation: (Rule) => Rule.required(),
      hidden: ({ parent }) => parent?.source !== "caniuse",
    },
    {
      name: "caniuse_contribute_usage",
      title: "Contribute usage data",
      type: "boolean",
      initialValue: true,
      hidden: ({ parent }) => parent?.source !== "caniuse",
    },
  ],
};
