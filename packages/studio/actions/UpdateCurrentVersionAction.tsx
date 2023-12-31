import { SyncIcon } from "@sanity/icons";
import type { Release } from "@updatemybrowser/client";
import { updateFromMultiple } from "@updatemybrowser/updater";
import { useState } from "react";
import {
  useDocumentOperation,
  type ActionComponent,
  type DocumentActionProps,
} from "sanity";

function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && typeof value !== "undefined";
}

export const UpdateCurrentVersionAction: ActionComponent<
  DocumentActionProps
  // eslint-disable-next-line react/prop-types
> = ({ id, type, published, draft, onComplete }) => {
  const doc = (draft || published) as Release | null;
  const [updating, setUpdating] = useState(false);
  const { patch } = useDocumentOperation(id, type);

  if (!doc || type !== "release" || !doc.versionSource) {
    return null;
  }

  async function handleUpdate() {
    setUpdating(true);

    try {
      const sources = (doc!.versionSource || [])
        .map(({ source, ...rest }) => {
          if (source === "caniuse" && rest.caniuse_agent) {
            return {
              source,
              agent: rest.caniuse_agent,
              contributeUsage: rest.caniuse_contribute_usage ?? true,
            };
          }

          return null;
        })
        .filter(notEmpty);
      const { version, usage } = await updateFromMultiple(sources);

      version && patch.execute([{ set: { currentVersion: version } }]);
      usage && patch.execute([{ set: { currentUsage: usage } }]);
    } catch (error) {
      alert(String(error));
    }

    setUpdating(false);

    onComplete();
  }

  return {
    disabled: updating,
    label: updating ? "Updating current version..." : "Update current version",
    icon: SyncIcon,
    onHandle: handleUpdate,
  };
};
