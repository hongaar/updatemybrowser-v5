import {
  DesktopIcon,
  DocumentsIcon,
  EarthAmericasIcon,
  EarthGlobeIcon,
  PackageIcon,
  RocketIcon,
  TagIcon,
  TagsIcon,
} from "@sanity/icons";
import type { ConfigContext } from "sanity";
import type { StructureBuilder } from "sanity/desk";

export async function structure(S: StructureBuilder, context: ConfigContext) {
  const client = context.getClient({ apiVersion: "2023-01-16" });
  const languages = await client.fetch<{ id: string; name: string }[]>(
    `*[_type == "language"]{ id, name }`,
  );

  return S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Languages")
        .icon(EarthAmericasIcon)
        .child(S.documentTypeList("language")),
      S.divider(),
      S.listItem()
        .title("Articles")
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title("Language")
            .items(
              languages.map((language) => {
                return S.listItem()
                  .title(language.name)
                  .icon(DocumentsIcon)
                  .child(
                    S.documentTypeList("article")
                      .apiVersion("v2023-08-01")
                      .filter(`language == $lang`)
                      .params({ lang: language.id }),
                  );
              }),
            ),
        ),
      S.divider(),
      S.listItem()
        .title("Feature categories")
        .icon(TagsIcon)
        .child(S.documentTypeList("featureCategory")),
      S.listItem()
        .title("Features")
        .icon(TagIcon)
        .child(S.documentTypeList("feature")),
      S.listItem()
        .title("Browsers")
        .icon(EarthGlobeIcon)
        .child(S.documentTypeList("browser")),
      S.listItem()
        .title("Operating Systems")
        .icon(DesktopIcon)
        .child(S.documentTypeList("os")),
      S.listItem()
        .title("Releases")
        .icon(PackageIcon)
        .child(S.documentTypeList("release")),
      S.divider(),
      S.listItem()
        .title("Sites")
        .icon(RocketIcon)
        .child(S.documentTypeList("site")),
    ]);
}
