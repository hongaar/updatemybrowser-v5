import type { DocumentDefinition } from "sanity";
import { iconWithSubIcon } from "../../components/index.js";

export const release: DocumentDefinition = {
  name: "release",
  title: "Release",
  type: "document",
  preview: {
    select: {
      title: "browser.name",
      icon: "browser.icon",
      subIcon: "oses.0.icon",
      currentVersion: "currentVersion",
      os0: "oses.0.name",
      os1: "oses.1.name",
      os2: "oses.2.name",
      os3: "oses.3.name",
    },
    prepare({
      title,
      icon,
      subIcon,
      currentVersion,
      os0,
      os1,
      os2,
      os3,
      ...rest
    }) {
      const osNames = [os0, os1, os2].filter(Boolean);
      const subtitle = osNames.length ? osNames.join(", ") : "";
      const hasMore = Boolean(os3);
      return {
        ...rest,
        title: `${title}${currentVersion ? ` v${currentVersion}` : ""}`,
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
      name: "versionSource",
      title: "Version source",
      description: "Configure automatic version updates",
      type: "array",
      of: [{ type: "versionSource" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "currentVersion",
      title: "Current version",
      description: "Set by the version source, not normally updated by hand",
      type: "string",
    },
    {
      name: "currentUsage",
      title: "Current usage",
      description: "Set by the version source, not normally updated by hand",
      type: "number",
    },
  ],
};
