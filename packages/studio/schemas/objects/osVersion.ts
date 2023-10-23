import type { ObjectDefinition } from "sanity";
import { iconPreview } from "../../components/IconPreview.jsx";

export const osVersion: ObjectDefinition = {
  name: "osVersion",
  title: "OS version",
  type: "object",
  preview: {
    select: {
      title: "os.name",
      icon: "os.icon",
      subtitle: "versionConstraint",
    },
    prepare({ icon, ...rest }) {
      return {
        ...rest,
        media: iconPreview({ icon }),
      };
    },
  },
  fields: [
    {
      name: "os",
      title: "OS",
      description: "Reference to a OS",
      type: "reference",
      to: [{ type: "os" }],
      validation: (rule) => rule.required(),
    },
    {
      name: "versionConstraint",
      title: "Version constraint",
      description: "Currently, only <, >, and no constraint are supported.",
      type: "string",
      validation: (Rule) =>
        Rule.regex(/^(>?=?|<?=?)\d[\d.]*\d?$/, { name: "version" }),
    },
  ],
};
