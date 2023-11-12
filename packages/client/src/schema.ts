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

export type I18nString = {
  _type: "internationalizedArrayStringValue";
  _key: string;
  value?: string;
}[];

export type I18nUrl = {
  _type: "internationalizedArrayUrlValue";
  _key: string;
  value?: string;
}[];

export type I18nText = {
  _type: "internationalizedArrayTextValue";
  _key: string;
  value?: string;
}[];

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
      url?: string;
    };
  };
};

export type Icon = {
  _type: "icon";
  predefined?: IconManager;
  custom_svg?: string;
};

export type Swatch = {
  _type: "sanity.imagePaletteSwatch";
  background: string;
  foreground: string;
  population: number;
  title: string;
};

export type Asset = Doc<{
  _type: "sanity.imageAsset";
  assetId: string;
  extension: "png" | "webp";
  metadata: {
    _type: "sanity.imageMetadata";
    blurHash: string;
    dimensions: {
      _type: "sanity.imageDimensions";
      aspectRatio: number;
      height: number;
      width: number;
    };
    hasAlpha: boolean;
    isOpaque: boolean;
    lqip: string;
    palette: {
      _type: "sanity.imagePalette";
      darkMuted: Swatch;
      darkVibrant: Swatch;
      dominant: Swatch;
      lightMuted: Swatch;
      lightVibrant: Swatch;
      muted: Swatch;
      vibrant: Swatch;
    };
  };
  mimeType: "image/png" | "image/webp";
  originalFilename: string;
  path: string;
  sha1hash: string;
  size: number;
  uploadId: string;
  url: string;
}>;

export type Figure = {
  _type: "figure";
  asset: Asset;
  caption?: string;
  alt: string;
};

export type OsVersion<T = Reference> = {
  _type: "osVersion";
  os: T;
  versionConstraint?: string;
};

export type Language = Doc<{
  _type: "language";
  id: string;
  name: string;
  flag: IconManager;
}>;

export type Browser<T extends "plain" | "flat" = "plain"> = Doc<
  {
    _type: "browser";
    name: string;
    slug: Slug;
    vendor: string;
    homepage: string;
    matchBrowserName?: string[];
    maybeDetectedAs?: Keyed<Reference>[];
    popularity?: number;
    description?: I18nString;
    wikipediaUrl?: I18nUrl;
    summary?: I18nText;
    icon?: Icon;
    logo?: Figure;
    color?: Color;
    screenshots?: Keyed<Figure>[];
    youtubeId?: string;
    featuredArticles?: Keyed<Reference>[];
  } & (T extends "plain"
    ? {
        features?: Reference[];
      }
    : // flat
      {
        featureCategories: FlatFeatureCategory[];
        releases: ReleaseFlatExpanded[];
      })
>;

export type FlatBrowser = Browser<"flat">;

export type FeatureCategory<T extends "plain" | "flat" = "plain"> = Doc<
  {
    _type: "featureCategory";
    name: I18nString;
    slug: Slug;
    description?: I18nString;
    icon?: Icon;
  } & (T extends "plain"
    ? {}
    : // flat
      { features: Feature[] })
>;

export type FlatFeatureCategory = FeatureCategory<"flat">;

export type Feature = Doc<{
  _type: "feature";
  category: Reference;
  name: I18nString;
  slug: Slug;
  description?: I18nString;
  icon?: Icon;
}>;

export type OS = Doc<{
  _type: "os";
  name: string;
  slug: Slug;
  vendor: string;
  homepage: string;
  matchOsName: string[];
  description?: I18nString;
  icon?: Icon;
  logo?: Figure;
  color?: Color;
  featuredArticles?: Keyed<Reference>[];
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
      currentUsage?: number;
      downloadUrl?: string;
      downloadArticle?: Reference;
      updateUrl?: string;
      updateArticle?: Reference;
    } & (T extends "ref"
      ? {
          browser: Reference;
          oses: Keyed<OsVersion>[];
        }
      : T extends "expanded"
      ? {
          browser: Browser;
          oses: OsVersion<OS>[];
        }
      : // flatExpanded
        {
          browser: Browser;
          os: OsVersion<OS>;
        })
  >;

export type ReleaseExpanded = Release<"expanded">;

export type ReleaseFlatExpanded = Release<"flatExpanded">;

export type Article = Doc<{
  title: string;
  slug: Slug;
  language: string;
  excerpt?: string;
  contents: string;
  browser?: Reference;
  oses?: Keyed<Reference>[];
  translationOf?: Reference | null;
}>;

export enum DocType {
  Language = "language",
  Browser = "browser",
  OS = "os",
  Release = "release",
  Article = "article",
  FeatureCategory = "featureCategory",
  Feature = "feature",
}

export type Docs = {
  [DocType.Language]: Language;
  [DocType.Browser]: Browser;
  [DocType.OS]: OS;
  [DocType.Release]: Release;
  [DocType.Article]: Article;
  [DocType.FeatureCategory]: FeatureCategory;
  [DocType.Feature]: Feature;
};
