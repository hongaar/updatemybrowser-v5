import { colorInput } from "@sanity/color-input";
import { languageFilter } from "@sanity/language-filter";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { IconManager } from "sanity-plugin-icon-manager";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "updatemybrowser-v5",

  projectId: "0ydog342",
  dataset: "production",

  plugins: [
    deskTool(),
    colorInput(),
    IconManager(),
    languageFilter({
      supportedLanguages: [
        { id: "nb", title: "Norwegian (Bokmål)" },
        { id: "nn", title: "Norwegian (Nynorsk)" },
        { id: "en", title: "English" },
        { id: "es", title: "Spanish" },
        { id: "arb", title: "Arabic" },
        { id: "pt", title: "Portuguese" },
        //...
      ],
      // Select Norwegian (Bokmål) by default
      defaultLanguages: ["nb"],
      // Only show language filter for document type `page` (schemaType.name)
      documentTypes: ["page"],
      filterField: (enclosingType, member, selectedLanguageIds) =>
        !enclosingType.name.startsWith("locale") ||
        selectedLanguageIds.includes(member.name),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
