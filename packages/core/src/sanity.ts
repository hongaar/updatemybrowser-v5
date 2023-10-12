export type SanityDoc<T> = T & {
  _id: string;
  _rev: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
};

export type SanityReference = { _ref: string; _type: "reference" };

export type SanityIcon = {
  _type: "icon.manager";
  icon: string;
  metadata: {
    iconName: string;
    collectionId: string;
    collectionName: string;
    url: string;
    downloadUrl: string;
    inlineSvg: string;
    hFlip: boolean;
    vFlip: boolean;
    flip: "horizontal" | "vertical" | "horizontal,vertical";
    rotate: 0 | 1 | 2 | 3;
    size: {
      width: number;
      height: number;
    };
    color: {
      hex: string;
      rgba: {
        r: number;
        g: number;
        b: number;
        a: number;
      };
    };
    palette: boolean;
    author: {
      name: string;
      url: string;
    };
    license: {
      name: string;
      url: string;
    };
  };
};

export type SanityLanguage = SanityDoc<{
  _type: "language";
  id: string;
  name: string;
  flag: SanityIcon;
}>;

export type SanityBrowser = SanityDoc<{
  _type: "browser";
  name: string;
  slug: {
    current: string;
  };
  vendor: string;
  homepage: string;
  matchBrowserName: string;
  description: string;
  icon: SanityIcon;
  logo: string;
  color: string;
}>;

export type SanityOS = SanityDoc<{
  _type: "os";
  name: string;
  slug: {
    current: string;
  };
  vendor: string;
  homepage: string;
  matchOsName: string;
  description: string;
  icon: SanityIcon;
  logo: string;
  color: string;
}>;

export type SanityRelease = SanityDoc<{
  _type: "release";
  browser: SanityBrowser;
  oses: SanityOS[];
  versionSource: { source: "caniuse" | "wikipedia"; caniuse_agent?: string }[];
  currentVersion: string;
  currentUsage: number;
}>;

export enum SanityDocType {
  Language = "language",
  Browser = "browser",
  OS = "os",
  Release = "release",
}

export type SanityDocs = {
  [SanityDocType.Language]: SanityLanguage;
  [SanityDocType.Browser]: SanityBrowser;
  [SanityDocType.OS]: SanityOS;
  [SanityDocType.Release]: SanityRelease;
};

export const sanityConfig = {
  projectId: "0ydog342",
  dataset: "production",
};
