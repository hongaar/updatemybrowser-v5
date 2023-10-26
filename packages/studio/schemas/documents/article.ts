import type { DocumentDefinition } from "sanity";
import { iconPreview, iconWithSubIconPreview } from "../../components/index.js";
import { slug } from "../mixins/index.js";

export const article: DocumentDefinition = {
  name: "article",
  title: "Article",
  type: "document",
  fieldsets: [
    {
      name: "references",
      title: "References",
      description: "Optional references of this article",
      options: { collapsible: true, collapsed: false },
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "language",
      icon: "browser.icon",
      subIcon: "oses.0.icon",
    },
    prepare({ icon, subIcon, ...rest }) {
      return {
        ...rest,
        ...(icon && subIcon
          ? { media: iconWithSubIconPreview({ icon, subIcon }) }
          : icon && !subIcon
          ? { media: iconPreview({ icon }) }
          : !icon && subIcon
          ? { media: iconPreview({ icon: subIcon }) }
          : {}),
      };
    },
  },
  fields: [
    {
      name: "title",
      title: "Title",
      description: "e.g. How to Update Opera on Windows",
      type: "string",
      validation: (rule) => rule.required(),
    },
    slug({ source: "title" }),
    {
      name: "language",
      title: "Language",
      description: "Set by translation tool",
      type: "string",
      readOnly: true,
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
    },
    {
      name: "contents",
      title: "Contents",
      type: "markdown",
      validation: (rule) => rule.required(),
    },
    {
      name: "browser",
      title: "Browser",
      description: "The article applies to this browser",
      type: "reference",
      to: [{ type: "browser" }],
      fieldset: "references",
    },
    {
      name: "oses",
      title: "Operating systems",
      description: "The article applies to all of these operating systems",
      type: "array",
      of: [{ type: "reference", to: [{ type: "os" }] }],
      fieldset: "references",
    },
  ],
};
