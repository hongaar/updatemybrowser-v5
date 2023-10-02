import { colorInput } from "@sanity/color-input";
import { visionTool } from "@sanity/vision";
import { defaultLanguage, sanity } from "@updatemybrowser/core";
import { defineConfig } from "sanity";
import { IconManager } from "sanity-plugin-icon-manager";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas/index.js";

const { dataset, projectId } = sanity;

export default defineConfig({
  name: "default",
  title: "updatemybrowser-v5",

  projectId,
  dataset,

  plugins: [
    deskTool(),
    colorInput(),
    IconManager(),
    internationalizedArray({
      languages: (client) => {
        return client.fetch(`*[_type == "language"]{ id, title }`);
      },
      defaultLanguages: [defaultLanguage],
      fieldTypes: ["string"],
      buttonAddAll: false,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
