import type { DocumentDefinition } from "sanity";
import { iconWithSubIconPreview } from "../../components/index.js";
import { defaultFieldset, slug } from "../mixins/index.js";

export const article: DocumentDefinition = {
  name: "article",
  title: "Article",
  icon: () => "📄",
  type: "document",
  fieldsets: defaultFieldset,
  preview: {
    select: {
      title: "title",
      subtitle: "language",
      icon: "browser.icon",
      subIcon: "os.0.icon",
    },
    prepare({ icon, subIcon, ...rest }) {
      return {
        ...rest,
        media: iconWithSubIconPreview({ icon, subIcon }),
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
      type: "string",
      readOnly: true,
    },
    {
      name: "browser",
      title: "Browser",
      type: "reference",
      to: [{ type: "browser" }],
    },
    {
      name: "os",
      title: "Operating system",
      type: "array",
      of: [{ type: "reference", to: [{ type: "os" }] }],
    },
    {
      name: "contents",
      title: "Contents",
      type: "markdown",
    },
  ],
};
