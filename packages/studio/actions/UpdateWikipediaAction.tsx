import { SyncIcon } from "@sanity/icons";
import type { Browser, I18nText } from "@updatemybrowser/client";
import {
  getWikipediaSummary,
  parseWikipediaUrl,
} from "@updatemybrowser/updater";
import { useState } from "react";
import {
  useDocumentOperation,
  type ActionComponent,
  type DocumentActionProps,
} from "sanity";

export const UpdateWikipediaAction: ActionComponent<
  DocumentActionProps
  // eslint-disable-next-line react/prop-types
> = ({ id, type, published, draft, onComplete }) => {
  const doc = (draft || published) as Browser | null;
  const [updating, setUpdating] = useState(false);
  const { patch } = useDocumentOperation(id, type);

  if (!doc || type !== "browser") {
    return null;
  }

  async function handleUpdate() {
    setUpdating(true);

    const summary: I18nText = [];

    try {
      const urls = doc!.wikipediaUrl || [];

      for (const { _key: language, value: url } of urls) {
        if (!url) {
          continue;
        }

        const wikipediaResult = await getWikipediaSummary({
          language,
          title: parseWikipediaUrl(url).title,
        });

        summary.push({
          _type: "internationalizedArrayTextValue",
          _key: language,
          value: wikipediaResult.extract,
        });
      }

      patch.execute([{ set: { summary } }]);
    } catch (error) {
      alert(String(error));
    }

    setUpdating(false);

    onComplete();
  }

  return {
    disabled: updating,
    label: updating ? "Updating summary..." : "Update summary",
    icon: SyncIcon,
    onHandle: handleUpdate,
  };
};
