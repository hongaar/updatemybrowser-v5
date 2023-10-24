import type { DocumentDefinition } from "sanity";
import { iconWithSubIconPreview } from "../../components/index.js";

export const release: DocumentDefinition = {
  name: "release",
  title: "Release",
  icon: () => "🚀",
  type: "document",
  preview: {
    select: {
      title: "browser.name",
      icon: "browser.icon",
      subIcon: "oses.0.os.icon",
      currentVersion: "currentVersion",
      os0: "oses.0.os.name",
      os1: "oses.1.os.name",
      os2: "oses.2.os.name",
      os3: "oses.3.os.name",
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
        media: iconWithSubIconPreview({ icon, subIcon }),
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
      of: [{ type: "osVersion" }],
      validation: (rule) => rule.required(),
    },
    {
      name: "downloadUrl",
      title: "Download URL",
      description: "Address to download release",
      type: "url",
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
      description: "Set by the version source, don't edit",
      type: "string",
    },
    {
      name: "currentUsage",
      title: "Current usage",
      description: "Set by the version source, don't edit",
      type: "number",
    },
  ],
};
