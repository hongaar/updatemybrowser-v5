import type { DocumentDefinition } from "sanity";
import { iconPreview } from "../../components/index.js";
import { defaultFieldset, i18nString, slug } from "../mixins/index.js";

export const featureCategory: DocumentDefinition = {
  name: "featureCategory",
  title: "Feature category",
  type: "document",
  fieldsets: defaultFieldset,
  preview: {
    select: {
      title: "name",
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
    i18nString({
      name: "name",
      title: "Name",
      description: "e.g. Privacy or Performance",
      required: true,
    }),
    slug({
      description: "e.g. privacy or performance",
      source: "name[0].value",
    }),
    i18nString({
      name: "description",
      title: "Description",
      description: 'e.g. "Features which help with protecting your privacy"',
    }),
    {
      name: "icon",
      title: "Icon",
      type: "icon",
      fieldset: "branding",
    },
  ],
};
