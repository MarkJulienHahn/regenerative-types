import { defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "projects",
  title: "Projects",
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
      of: [
        {
          type: "object",
          fields: [
            {
              name: "kind",
              type: "string",
              title: "Type",
              options: {
                list: [
                  { title: "Image", value: "image" },
                  { title: "Type", value: "type" },
                  { title: "Assemblage", value: "assemblage" },
                ],
                layout: "radio",
              },
            },
            {
              name: "imageContent",
              type: "object",
              title: "Image Content",
              hidden: ({ parent }) => parent.kind !== "image",
              fields: [
                { name: "title", type: "string" },
                {
                  name: "image",
                  type: "image",
                  title: "Image",
                  options: {
                    collapsible: false,
                    collapsed: false,
                  },
                },
              ],
            },
            {
              name: "typeContent",
              type: "object",
              title: "Type Content",
              hidden: ({ parent }) => parent.kind !== "type",
              fields: [
                { name: "title", type: "string" },
                {
                  name: "image",
                  type: "image",
                  title: "Image",
                  options: {
                    collapsible: false,
                    collapsed: false,
                  },
                },
                { name: "text", type: "array", of: [{ type: "block" }] },

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
                      title: "Topic",
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
                  name: "timelinePosition",
                  type: "number",
                  title: "Timeline Position",
                  validation: (Rule) => Rule.min(0).max(100),
                },
              ],
            },
            {
              name: "assemblageContent",
              type: "object",
              title: "Assemblage Content",
              hidden: ({ parent }) => parent.kind !== "assemblage",
              fields: [
                { name: "title", type: "string" },
                {
                  name: "image",
                  type: "image",
                  title: "Image",
                  options: {
                    collapsible: false,
                    collapsed: false,
                  },
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
                      title: "Topic",
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
              ],
            },
          ],
          preview: {
            select: {
              kind: "kind",
              imageTitle: "imageContent.title",
              typeTitle: "typeContent.title",
              assemblageTitle: "assemblageContent.title",
            },
            prepare({ kind, imageTitle, typeTitle, assemblageTitle }) {
              let title = "Untitled";
              if (kind === "image") title = imageTitle || "Image";
              if (kind === "type") title = typeTitle || "Type";
              if (kind === "assemblage")
                title = assemblageTitle || "Assemblage";
              return {
                title,
                subtitle: kind
                  ? kind.charAt(0).toUpperCase() + kind.slice(1)
                  : "",
              };
            },
          },
        },
      ],
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
          title: "Topic",
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

    orderRankField({ type: "projects" }),
  ],
});
