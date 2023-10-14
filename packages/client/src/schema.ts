type SanityKeyed<T> = T & {
  _key: string;
};

export type SanityDoc<T> = T & {
  _id: string;
  _originalId?: string;
  _rev: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
};

export type SanityReference = { _ref: string; _type: "reference" };

export type SanityI18nField = {
  [languageId: string]: string | null;
};

export type SanitySlug = {
  _type: "slug";
  current: string;
};

export type SanityColor = {
  _type: "color";
  hex: string;
  hsv: {
    _type: "hsvaColor";
    a: number;
    s: number;
    v: number;
    h: number;
  };
  rgb: {
    _type: "rgbaColor";
    a: number;
    b: number;
    r: number;
    g: number;
  };
  hsl: {
    _type: "hslaColor";
    a: number;
    s: number;
    h: number;
    l: number;
  };
  alpha: number;
};

export type SanityIcon = {
  _type: "icon.manager";
  icon: string;
  metadata: {
    iconName: string;
    collectionId: string;
    collectionName: string;
    url: string;
    downloadUrl: string;
    inlineSvg?: string;
    hFlip: boolean;
    vFlip: boolean;
    flip?: "" | "horizontal" | "vertical" | "horizontal,vertical";
    rotate: 0 | 1 | 2 | 3;
    size: {
      width: number;
      height: number;
    };
    color?: {
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

export type SanityImage = {
  _type: "figure";
  caption: string;
  asset: SanityReference;
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
  slug: SanitySlug;
  vendor: string;
  homepage: string;
  matchBrowserName: string;
  description: SanityI18nField;
  icon?: SanityIcon;
  logo?: SanityImage;
  color?: SanityColor;
}>;

export type SanityOS = SanityDoc<{
  _type: "os";
  name: string;
  slug: SanitySlug;
  vendor: string;
  homepage: string;
  matchOsName: string;
  description: SanityI18nField;
  icon?: SanityIcon;
  logo?: SanityImage;
  color?: SanityColor;
}>;

export type SanityRelease<T extends "ref" | "expanded" = "ref"> = SanityDoc<{
  _type: "release";
  browser: T extends "ref" ? SanityReference : SanityBrowser;
  oses: T extends "ref"
    ? SanityKeyed<SanityReference>[]
    : SanityKeyed<SanityOS>[];
  versionSource: SanityKeyed<{
    _type: "versionSource";
    source: "caniuse" | "wikipedia";
    caniuse_agent?: string;
  }>[];
  currentVersion: string;
  currentUsage: number;
}>;

export type SanityReleaseExpanded = SanityRelease<"expanded">;

export enum DocType {
  Language = "language",
  Browser = "browser",
  OS = "os",
  Release = "release",
}

export type SanityDocs = {
  [DocType.Language]: SanityLanguage;
  [DocType.Browser]: SanityBrowser;
  [DocType.OS]: SanityOS;
  [DocType.Release]: SanityRelease;
};
