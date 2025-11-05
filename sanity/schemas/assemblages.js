import { defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "assemblages",
  title: "Assemblages",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "beschreibung",
      title: "Beschreibung",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    },

    {
      name: "images",
      type: "array",
      of: [{ type: "image", fields: [{ name: "subtitle", type: "string" }] }],
    },

    {
      name: "categories",
      title: "Categories",
      type: "object",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: "topics",
          type: "string",
        },
        {
          name: "claims",
          type: "string",
        },
        {
          name: "response",
          type: "object",
          type: "string",
        },
        {
          name: "typology",
          type: "object",
          type: "string",
        },
      ],
    },
    {
      name: "properties",
      title: "Properties",
      type: "object",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: "site",
          type: "string",
        },
        {
          name: "siteConditions",
          title: "Site Conditions",
          type: "string",
        },
        {
          name: "siteType",
          title: "Site Type",
          type: "string",
        },
        {
          name: "program",
          type: "string",
        },
        {
          name: "materiality",
          type: "string",
        },
        {
          name: "productionType",
          title: "Production Type",
          type: "string",
        },
        {
          name: "structuralType",
          title: "Structural Type",
          type: "string",
        },
        { name: "temporality", type: "string" },
        {
          name: "energyType",
          title: "Energy Type",
          type: "string",
        },
        { name: "transformation", type: "string" },
      ],
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },

    orderRankField({ type: "assemblages" }),
  ],
});
