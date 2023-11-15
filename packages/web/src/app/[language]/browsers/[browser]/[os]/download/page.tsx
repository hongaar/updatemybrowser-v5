import type { LanguageParams } from "../../../../route";
import type { BrowserParams } from "../../page";
import GenericPage, {
  genericGenerateMetadata,
  type OsParams,
} from "../_genericPage";

export async function generateMetadata({
  params,
}: LanguageParams & BrowserParams & OsParams) {
  return genericGenerateMetadata("download", { params });
}

export default async function Download({
  params,
}: LanguageParams & BrowserParams & OsParams) {
  return <GenericPage type="download" params={params} />;
}
