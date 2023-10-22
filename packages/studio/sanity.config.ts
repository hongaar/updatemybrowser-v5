import { colorInput } from "@sanity/color-input";
import { visionTool } from "@sanity/vision";
import { defaultLanguage, sanityConfig } from "@updatemybrowser/client";
import { defineConfig } from "sanity";
import { IconManager } from "sanity-plugin-icon-manager";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
import { deskTool } from "sanity/desk";
import {
  UpdateCurrentVersionAction,
  UpdateWikipediaAction,
} from "./actions/index.js";
import { schemaTypes } from "./schemas/index.js";

const { dataset, projectId } = sanityConfig;

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
      languages: async (client) => {
        return (
          await client.fetch<{ id: string; name: string }[]>(
            `*[_type == "language"]{ id, name }`,
          )
        )
          .filter(({ id, name }) => id && name)
          .map(({ id, name }) => ({ id, title: name }));
      },
      defaultLanguages: [defaultLanguage],
      fieldTypes: ["string", "url", "text"],
      buttonAddAll: false,
    }),
    visionTool(),
  ],

  document: {
    actions: [UpdateCurrentVersionAction, UpdateWikipediaAction],
  },

  schema: {
    types: schemaTypes,
  },
});
