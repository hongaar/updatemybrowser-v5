import { browsers } from "@updatemybrowser/detect";
import type { DocumentDefinition } from "sanity";
import { iconPreview } from "../../components/index.js";
import {
  defaultFieldset,
  i18nString,
  i18nText,
  i18nUrl,
  slug,
} from "../mixins/index.js";

export const browser: DocumentDefinition = {
  name: "browser",
  title: "Browser",
  type: "document",
  fieldsets: defaultFieldset,
  preview: {
    select: {
      title: "name",
      subtitle: "vendor",
      icon: "icon",
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
      name: "name",
      title: "Name",
      description: "e.g. Chrome or Firefox",
      type: "string",
      validation: (rule) => rule.required(),
    },
    slug({
      description: "e.g. chrome or firefox",
    }),
    {
      name: "vendor",
      title: "Vendor",
      description: "e.g. Google or Mozilla",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "homepage",
      title: "Homepage",
      description: "e.g. https://www.google.com/chrome/",
      type: "url",
      validation: (rule) => rule.required(),
    },
    {
      name: "matchBrowserName",
      title: "Match browser name",
      description: "Match browser name from @updatemybrowser/client",
      type: "array",
      of: [
        {
          type: "string",
          options: {
            list: browsers.map((value) => ({
              title: value,
              value,
            })),
          },
        },
      ],
    },
    {
      name: "maybeDetectedAs",
      title: "Maybe detected as",
      description: "List of browsers that this browser may be detected as",
      type: "array",
      of: [{ type: "reference", to: [{ type: "browser" }] }],
    },
    {
      name: "popularity",
      title: "Popularity",
      description: (
        <>
          Source from likes at{" "}
          <a
            href="https://alternativeto.net/category/browsers/web-browser/?sort=likes"
            target="_blank"
            rel="noreferrer"
          >
            alternativeto.net
          </a>
        </>
      ),
      type: "number",
    },
    i18nString({
      name: "description",
    }),
    i18nUrl({
      name: "wikipediaUrl",
      title: "Wikipedia URL",
    }),
    i18nText({
      name: "summary",
      title: "Summary",
      description: "Set by the Wikipedia source, don't edit",
    }),
    {
      name: "icon",
      title: "Icon",
      type: "icon",
      fieldset: "branding",
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      fieldset: "branding",
    },
    {
      name: "color",
      title: "Color",
      type: "color",
      fieldset: "branding",
    },
  ],
};
