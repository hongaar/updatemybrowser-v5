export type Keyed<T> = T & {
  _key: string;
};

export type Doc<T> = T & {
  _id: string;
  _originalId?: string;
  _rev: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
};

export type Reference = { _ref: string; _type: "reference" };

export type I18nField = {
  [languageId: string]: string | null;
};

export type Slug = {
  _type: "slug";
  current: string;
};

export type Color = {
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

export type IconManager = {
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

export type Icon = {
  _type: "icon";
  predefined?: IconManager;
  custom_svg?: string;
};

export type Image = {
  _type: "figure";
  caption: string;
  asset: Reference;
};

export type Language = Doc<{
  _type: "language";
  id: string;
  name: string;
  flag: IconManager;
}>;

export type Browser<T extends "plain" | "withFlatReleases" = "plain"> = Doc<
  {
    _type: "browser";
    name: string;
    slug: Slug;
    vendor: string;
    homepage: string;
    matchBrowserName: string;
    popularity?: number;
    description: I18nField;
    icon?: Icon;
    logo?: Image;
    color?: Color;
  } & (T extends "plain"
    ? {}
    : // withFlatReleases
      { releases: T extends "plain" ? undefined : ReleaseFlatExpanded[] })
>;

export type BrowserWithFlatReleases = Browser<"withFlatReleases">;

export type OS = Doc<{
  _type: "os";
  name: string;
  slug: Slug;
  vendor: string;
  homepage: string;
  matchOsName: string;
  description: I18nField;
  icon?: Icon;
  logo?: Image;
  color?: Color;
}>;

export type Release<T extends "ref" | "expanded" | "flatExpanded" = "ref"> =
  Doc<
    {
      _type: "release";
      versionSource: Keyed<{
        _type: "versionSource";
        source: "caniuse" | "wikipedia";
        caniuse_agent?: string;
        caniuse_contribute_usage?: boolean;
      }>[];
      currentVersion: string;
      currentUsage: number;
    } & (T extends "ref"
      ? {
          browser: Reference;
          oses: Keyed<Reference>[];
        }
      : T extends "expanded"
      ? {
          browser: Browser;
          oses: OS[];
        }
      : // flatExpanded
        {
          browser: Browser;
          os: OS;
        })
  >;

export type ReleaseExpanded = Release<"expanded">;

export type ReleaseFlatExpanded = Release<"flatExpanded">;

export enum DocType {
  Language = "language",
  Browser = "browser",
  OS = "os",
  Release = "release",
}

export type Docs = {
  [DocType.Language]: Language;
  [DocType.Browser]: Browser;
  [DocType.OS]: OS;
  [DocType.Release]: Release;
};
