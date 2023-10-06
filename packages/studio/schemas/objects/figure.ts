import type { ImageDefinition } from "sanity";

export const figure: ImageDefinition = {
  name: "figure",
  type: "image",
  title: "Figure",
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "caption",
      type: "string",
      title: "Caption",
    },
    {
      name: "alt",
      type: "string",
      title: "Alternative text",
      description: "Important for SEO and accessiblity.",
      validation: (Rule) =>
        Rule.error("You have to fill out the alternative text.").required(),
    },
  ],
  preview: {
    select: {
      imageUrl: "asset.url",
      title: "caption",
    },
  },
};
