export type ProjectType = {
  title: string;
  beschreibung?: Array<{
    _key: string;
    _type: "block";
    children: Array<{
      _key: string;
      _type: "span";
      marks: string[];
      text: string;
    }>;
    markDefs: Array<{
      _key: string;
      _type: string;
      [key: string]: unknown;
    }>;
    style: string;
  }>;
  image?: { asset: { url: string } }
  images?: Array<{
    url: string;
    kind: "type" | "image" | "assemblage";
    typeContent?: {
      title: string;
      categories?: Record<string, string | undefined>;
      properties?: Record<string, string | undefined>;
      image?: { asset: { url: string } }
    };
    assemblageContent?: {
      title: string;
      categories?: Record<string, string | undefined>;
      properties?: Record<string, string | undefined>;
      image?: { asset: { url: string } }
    };
  }>;
  categories?: Record<string, string | undefined>;
  properties?: Record<string, string | undefined>;
  slug?: string;
};
