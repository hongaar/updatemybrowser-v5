import { browsers } from "@updatemybrowser/detect";
import type { DocumentDefinition } from "sanity";
import { iconPreview } from "../../components/index.js";
import { defaultFieldset, i18nString, slug } from "../mixins/index.js";

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
      type: "string",
      options: {
        list: browsers.map((value) => ({
          title: value,
          value,
        })),
      },
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
