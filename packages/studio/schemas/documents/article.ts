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
      name: "hidden",
      title: "Hidden",
      description: "Hide from Guides overview page",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
    },
    {
      name: "contents",
      title: "Contents",
      description: `The following components are always available: <Callout />. \
If this article applies to a browser, you can also use: \
<UpdateLinkButton />, <DownloadLinkButton />. \
If used as the widget article, you can also use: \n
<WidgetDemoButton />`,
      type: "markdown",
      validation: (rule) => rule.required(),
      options: {
        imageUrl: (imageAsset) => imageAsset.url,
      },
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
