import type { LanguageParams } from "../../../../route";
import type { BrowserParams } from "../../page";
import GenericPage, {
  genericGenerateMetadata,
  type OsParams,
} from "../_genericPage";

export async function generateMetadata({
  params,
}: LanguageParams & BrowserParams & OsParams) {
  return genericGenerateMetadata("update", { params });
}

export default async function Update({
  params,
}: LanguageParams & BrowserParams & OsParams) {
  return <GenericPage type="update" params={params} />;
}
