import { colorInput } from "@sanity/color-input";
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

  plugins: [deskTool(), colorInput(), IconManager(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
