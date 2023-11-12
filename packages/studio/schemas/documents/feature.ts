import type { DocumentDefinition } from "sanity";
import { iconWithSubIconPreview } from "../../components/index.js";
import { defaultFieldset, i18nString, slug } from "../mixins/index.js";

export const feature: DocumentDefinition = {
  name: "feature",
  title: "Feature",
  type: "document",
  fieldsets: defaultFieldset,
  preview: {
    select: {
      title: "name",
      icon: "category.icon",
      subIcon: "icon",
    },
    prepare({ title, icon, subIcon, ...rest }) {
      return {
        ...rest,
        title: title?.[0]?.value,
        media: iconWithSubIconPreview({ icon, subIcon }),
      };
    },
  },
  fields: [
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "featureCategory" }],
      validation: (rule) => rule.required(),
    },
    i18nString({
      name: "name",
      title: "Name",
      description: 'e.g. "Ad blocker"',
      required: true,
    }),
    slug({
      description: 'e.g. "ad-blocker"',
      source: "name[0].value",
    }),
    i18nString({
      name: "description",
      title: "Description",
      description: 'e.g. "Blocks ads from appearing on websites"',
    }),
    {
      name: "icon",
      title: "Icon",
      type: "icon",
      fieldset: "branding",
    },
  ],
};
