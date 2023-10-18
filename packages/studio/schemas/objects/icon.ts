import type { ObjectDefinition } from "sanity";

export const icon: ObjectDefinition = {
  name: "icon",
  title: "Icon",
  type: "object",
  fields: [
    {
      name: "predefined",
      title: "Predefined icon",
      type: "icon.manager",
    },
    {
      name: "custom_svg",
      title: "Custom SVG",
      type: "text",
      rows: 3,
    },
  ],
};
