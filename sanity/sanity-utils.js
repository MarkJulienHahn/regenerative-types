import { createClient, groq } from "next-sanity";

const client = createClient({
  projectId: "ft5ap5r6", 
  dataset: "production",
  useCdn: false,
});

export default client;

export async function getProjects() {
  return client.fetch(
    groq`
     *[_type == "projects"] | order(orderRank) {
        title,
        beschreibung,
        "images": images[]{
          kind, 
          "imageContent": imageContent{
            ...,
            "image": image{..., "asset": asset->{url}}
          }, 
          "typeContent": typeContent{
            ...,
            "image": image{..., "asset": asset->{url}}
          }, 
          "assemblageContent": assemblageContent{
            ...,
            "image": image{..., "asset": asset->{url}}
          }, 
        },
        categories{
          topics,
          claims,
          phenomenon,
          response,
          typology
        },
        properties{
          site,
          siteConditions,
          siteType,
          program,
          materiality,
          productionType,
          structuralType,
          temporality,
          energyType,
          transformation
        },
        "slug": slug.current
      }
    `,
    { next: { revalidate: 10 } } 
  );
}

export async function getReferences() {
  return client.fetch(
    groq`
     *[_type == "references"] | order(orderRank) {
        title,
        beschreibung,
        "images": images[]{
          "url": asset->url,
          subtitle
        },
        categories{
          topics,
          claims,
          phenomenon,
          response,
          typology
        },
        properties{
          site,
          siteConditions,
          siteType,
          program,
          materiality,
          productionType,
          structuralType,
          temporality,
          energyType,
          transformation
        },
        "slug": slug.current
      }
    `,
    { next: { revalidate: 10 } }
  );
}

export async function getPhenomena() {
  return client.fetch(
    groq`
     *[_type == "phenomena"] | order(orderRank) {
        title,
        beschreibung,
        "images": images[]{
          "url": asset->url,
          subtitle
        },
        categories{
          topics,
          claims,
          phenomenon,
          response,
          typology
        },
        properties{
          site,
          siteConditions,
          siteType,
          program,
          materiality,
          productionType,
          structuralType,
          temporality,
          energyType,
          transformation
        },
        "slug": slug.current
      }
    `,
    { next: { revalidate: 10 } } 
  );
}
