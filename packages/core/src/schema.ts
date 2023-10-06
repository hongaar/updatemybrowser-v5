export type SanityDoc<T> = T & {
  _id: string;
  _rev: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
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

export enum DocType {
  Language = "language",
  Browser = "browser",
}

export type Docs = {
  [DocType.Language]: Language;
  [DocType.Browser]: Browser;
};

export type Language = SanityDoc<{
  _type: "language";
  id: string;
  name: string;
  flag: SanityIcon;
}>;

export type Browser = SanityDoc<{
  _type: "browser";
  name: string;
  slug: {
    current: string;
  };
  vendor: string;
  homepage: string;
  description: string;
  icon: SanityIcon;
  logo: string;
  color: string;
}>;
