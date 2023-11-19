import { defaultLanguage } from "@updatemybrowser/client";
import type { DocumentDefinition, ReferenceFilterResolver } from "sanity";
import { iconWithSubIconPreview } from "../../components/index.js";

const articleFilter: ReferenceFilterResolver = ({ document }) => {
  const browserId = (document.browser as any)._ref as string;
  const osIds = (document.oses as any[]).map(
    (item) => item.os._ref,
  ) as string[];
  return {
    filter: `language == $language && browser._ref == $browserId && count((oses[]._ref)[@ in $osIds]) > 0`,
    params: { language: defaultLanguage, browserId, osIds },
  };
};

export const release: DocumentDefinition = {
  name: "release",
  title: "Release",
  type: "document",
  fieldsets: [
    {
      name: "version",
      title: "Version",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "instructions",
      title: "Instructions",
      options: { collapsible: true, collapsed: false },
    },
  ],
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
      description: "URL to download release from",
      type: "url",
      fieldset: "instructions",
    },
    {
      name: "downloadArticle",
      title: "Download article",
      description: "Article describing how to download and install the release",
      type: "reference",
      to: [{ type: "article" }],
      options: {
        filter: articleFilter,
      },
      fieldset: "instructions",
    },
    {
      name: "updateUrl",
      title: "Update URL",
      description:
        "URL to update release from. If not provided, will use 'Download URL'",
      type: "url",
      fieldset: "instructions",
    },
    {
      name: "updateArticle",
      title: "Update article",
      description: "Article describing how to update the release",
      type: "reference",
      to: [{ type: "article" }],
      options: {
        filter: articleFilter,
      },
      fieldset: "instructions",
    },
    {
      name: "versionSource",
      title: "Version source",
      description: "Configure automatic version updates",
      type: "array",
      of: [{ type: "versionSource" }],
      fieldset: "version",
    },
    {
      name: "currentVersion",
      title: "Current version",
      description: "Set by the version source, don't edit",
      type: "string",
      fieldset: "version",
    },
    {
      name: "currentUsage",
      title: "Current usage",
      description: "Set by the version source, don't edit",
      type: "number",
      fieldset: "version",
    },
  ],
};
