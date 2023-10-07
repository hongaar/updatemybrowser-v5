import type { DocumentDefinition } from "sanity";
import { iconWithSubIcon } from "../../preview/IconWithSubIcon.js";

export const versionSource: DocumentDefinition = {
  name: "release",
  title: "Release",
  type: "document",
  preview: {
    select: {
      title: "browser.name",
      icon: "browser.icon",
      subIcon: "oses.0.icon",
      os0: "oses.0.name",
      os1: "oses.1.name",
      os2: "oses.2.name",
      os3: "oses.3.name",
    },
    prepare({ title, icon, subIcon, os0, os1, os2, os3, ...rest }) {
      const osNames = [os0, os1, os2].filter(Boolean);
      const subtitle = osNames.length ? osNames.join(", ") : "";
      const hasMore = Boolean(os3);
      return {
        ...rest,
        title,
        subtitle: hasMore ? `${subtitle}…` : subtitle,
        media: iconWithSubIcon({ icon, subIcon }),
      };
    },
  },
  fields: [
    {
      name: "browser",
      title: "Browser",
      type: "reference",
      to: [{ type: "browser" }],
      validation: (rule) => rule.required(),
    },
    {
      name: "oses",
      title: "Operating systems",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "os" }],
        },
      ],
      validation: (rule) => rule.required(),
    },
    {
      name: "currentVersion",
      title: "Current version",
      description: "Will be set by a version source.",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.regex(/^\d[\d.]*\d$/, { name: "version" }),
    },
  ],
};
