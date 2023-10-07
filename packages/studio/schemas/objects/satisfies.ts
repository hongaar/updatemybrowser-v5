import { browsers, oses, platforms } from "@updatemybrowser/core";
import type { ObjectDefinition } from "sanity";

export const satisfies: ObjectDefinition = {
  name: "satisfies",
  title: "Satisfies",
  type: "object",
  fields: [
    {
      name: "browser",
      title: "Browser",
      type: "string",
      options: {
        list: Object.keys(browsers).map((value) => ({
          title: browsers[value as keyof typeof browsers],
          value,
        })),
      },
    },
    {
      name: "browserConstraint",
      title: "Version",
      description: "e.g. >=5.1",
      type: "string",
      validation: (Rule) =>
        Rule.regex(/^(>?=?|<?=?)\d[\d.]*\d$/, { name: "version" }),
    },
    {
      name: "os",
      title: "Operating System",
      type: "string",
      options: {
        list: Object.keys(oses).map((value) => ({
          title: oses[value as keyof typeof oses],
          value,
        })),
      },
    },
    {
      name: "osConstraint",
      title: "Version",
      description: "e.g. >=5.1",
      type: "string",
      validation: (Rule) =>
        Rule.regex(/^(>?=?|<?=?)\d[\d.]*\d$/, { name: "version" }),
    },
    {
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: Object.keys(platforms).map((value) => ({
          title: platforms[value as keyof typeof platforms],
          value,
        })),
      },
    },
    {
      name: "platformConstraint",
      title: "Version",
      description: "e.g. >=5.1",
      type: "string",
      validation: (Rule) =>
        Rule.regex(/^(>?=?|<?=?)\d[\d.]*\d$/, { name: "version" }),
    },
  ],
};
