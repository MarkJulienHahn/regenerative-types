"use client";

import React, { useState, useMemo } from "react";
import { ProjectType } from "@/types/types";
import Image from "next/image";

// Define a proper type for type images
type TypeImage = {
  kind: "type";
  typeContent: {
    title: string;
    image?: { asset: { url: string } };
    categories?: Record<string, string>;
    properties?: Record<string, string>;
  };
  url: string;
};

export default function Catalogue({ projects }: { projects: ProjectType[] }) {
  const [showAccordion, setShowAccordion] = useState(false);
  const [groupBy, setGroupBy] = useState<{
    type: "category" | "property";
    key: string;
  }>({
    type: "property",
    key: "site",
  });

  // Flatten all type images from projects
  const types = projects
    .flatMap((p) => p.images ?? [])
    .filter(
      (img): img is TypeImage => img.kind === "type" && !!img.typeContent
    );

  // Group type images by category/property
  const groupedTypes = useMemo(() => {
    if (!groupBy.type || !groupBy.key) return {};

    const result: Record<string, TypeImage[]> = {};

    types.forEach((img) => {
      const source =
        groupBy.type === "category"
          ? img.typeContent.categories
          : img.typeContent.properties;

      const value = source?.[groupBy.key];
      if (!value) return; // skip empty

      if (!result[value]) result[value] = [];
      result[value].push(img);
    });

    return result;
  }, [types, groupBy]);

  return (
    <div>
      <div className="filter__menu">
        <span className="filter__label">types</span>
        <div
          className="filter__current"
          onClick={() => setShowAccordion(!showAccordion)}
        >
          by {groupBy.key}
        </div>
      </div>

      {showAccordion && (
        <div
          className="filter__accordion"
          onClick={() => setShowAccordion(false)}
        >
          {[
            "site",
            "program",
            "temporality",
            "materiality",
            "siteConditions",
            "productionType",
          ].map((key) => (
            <button
              key={key}
              onClick={() => setGroupBy({ type: "property", key })}
            >
              by {key.replace(/([A-Z])/g, " $1").toLowerCase()}
            </button>
          ))}
        </div>
      )}

      <div className="catalogue">
        {Object.entries(groupedTypes).map(([groupValue, imgs]) => (
          <div key={groupValue}>
            <h2 className="catalogue__headline">{groupValue}</h2>
            <div className="catalogue__row">
              {imgs.map((img, i) => (
                <div
                  className="catalogue__entry"
                  key={img.typeContent.title + i}
                >
                  {img.typeContent.image?.asset.url && (
                    <Image
                      src={img.typeContent.image.asset.url}
                      width={500}
                      height={500}
                      alt={img.typeContent.title}
                    />
                  )}
                  <p>#{img.typeContent.title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
