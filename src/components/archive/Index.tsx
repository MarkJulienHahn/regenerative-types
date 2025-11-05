"use client";

import { useState, useMemo } from "react";
import { ProjectType } from "@/types/types";
import ProjectOverlay from "./ProjectOverlay";

type HighlightProjectType =
  | ProjectType
  | { title: string }
  | {
      title: string;
      categories?: Record<string, string | undefined>;
      properties?: Record<string, string | undefined>;
    }
  | null;

export default function Index({
  projects,
  references,
  phenomena,
}: {
  projects: ProjectType[];
  references: ProjectType[];
  phenomena: ProjectType[];
}) {
  const [activeFilter, setActiveFilter] = useState<{
    type: "category" | "property" | null;
    key: string | null;
    value: string | null;
  }>({
    type: null,
    key: null,
    value: null,
  });

  const [indexOpen, setIndexOpen] = useState(true);
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [propertiesOpen, setPropertiesOpen] = useState(true);
  const [hoverValues, setHoverValues] = useState<Set<string>>(new Set());

  const [highlightProject, setHighlightProject] =
    useState<HighlightProjectType>(null);

  const categoryFilters = useMemo(() => {
    const result: Record<string, Set<string>> = {};
    const allEntries = [...projects, ...references, ...phenomena];

    allEntries.forEach((entry) => {
      if (entry.categories) {
        Object.entries(entry.categories).forEach(([key, value]) => {
          if (value) {
            if (!result[key]) result[key] = new Set();
            result[key].add(value);
          }
        });
      }
    });

    return result;
  }, [projects, references, phenomena]);

  const propertyFilters = useMemo(() => {
    const result: Record<string, Set<string>> = {};
    const allEntries = [...projects, ...references, ...phenomena];

    allEntries.forEach((entry) => {
      if (entry.properties) {
        Object.entries(entry.properties).forEach(([key, value]) => {
          if (value) {
            if (!result[key]) result[key] = new Set();
            result[key].add(value);
          }
        });
      }
    });

    return result;
  }, [projects, references, phenomena]);

  const filteredEntries = useMemo(() => {
    const allEntries = [...projects, ...references, ...phenomena];

    if (!activeFilter.type || !activeFilter.key || !activeFilter.value)
      return allEntries;

    return allEntries.filter((entry) => {
      const source =
        activeFilter.type === "category" ? entry.categories : entry.properties;
      return (
        source?.[activeFilter.key as keyof typeof source] === activeFilter.value
      );
    });
  }, [projects, references, phenomena, activeFilter]);

  return (
    <>
      {highlightProject && (
        <ProjectOverlay
          project={highlightProject}
          setHighlightProject={setHighlightProject}
        />
      )}

      <div className="filter__indicator">
        {activeFilter.type && activeFilter.key && activeFilter.value ? (
          <>
            <span className="filter__indicatorButton">
              Filter → {activeFilter.value}
            </span>
            <button
              onClick={() =>
                setActiveFilter({ type: null, key: null, value: null })
              }
              className="filter__indicatorButton filter__indicatorButton--inverted"
            >
              Reset
            </button>
          </>
        ) : (
          ""
        )}
      </div>

      <div className="index">
        <div className="index__table">
          <div className="index__tableHead">
            <h1>Items</h1>
          </div>

          <div className="index__tableWrapper">
            <button
              onClick={() => setIndexOpen((prev) => !prev)}
              className={`index__toggle ${indexOpen ? "index__toggle--up" : "index__toggle--down"}`}
            />

            <div className="index__tableColumn">
              <h1>Projects</h1>
              {indexOpen &&
                filteredEntries
                  .filter((e) => projects.includes(e))
                  .map((p) => {
                    const hasHoverValue = [...hoverValues].some(
                      (v) =>
                        Object.values(p.categories || {}).includes(v) ||
                        Object.values(p.properties || {}).includes(v)
                    );

                    return (
                      <button
                        key={p.slug}
                        className={`index__entry ${hasHoverValue ? "index__highlight" : ""}`}
                        onClick={() =>
                          setHighlightProject(!highlightProject ? p : null)
                        }
                      >
                        {p.title}
                      </button>
                    );
                  })}
            </div>

            <div className="index__tableColumn">
              <h1>Assemblages</h1>
              {indexOpen &&
                filteredEntries
                  .filter((e) => projects.some((p) => p.slug === e.slug))
                  .map((p) => {
                    const assemblageContents = (p.images || []).filter(
                      (
                        img
                      ): img is {
                        url: string;
                        kind: "assemblage";
                        assemblageContent: {
                          categories: {};
                          properties: {};
                          title: string;
                        };
                      } => img.kind === "assemblage" && !!img.assemblageContent
                    );

                    return assemblageContents.map((img, index) => {
                      const title =
                        img.assemblageContent?.title ?? `untitled-${index}`;

                      const hasHoverValue = [...hoverValues].some(
                        (v) =>
                          Object.values(p.categories || {}).includes(v) ||
                          Object.values(p.properties || {}).includes(v)
                      );

                      return (
                        <button
                          key={`${p.slug}-${title}`}
                          className={`index__entry ${hasHoverValue ? "index__highlight" : ""}`}
                          onClick={() =>
                            setHighlightProject(
                              !highlightProject ? img.assemblageContent : null
                            )
                          }
                        >
                          {title}
                        </button>
                      );
                    });
                  })}
            </div>

            <div className="index__tableColumn">
              <h1>Types</h1>
              {indexOpen &&
                filteredEntries
                  .filter((e) => projects.some((p) => p.slug === e.slug))
                  .map((p) => {
                    const typeContents = (p.images || []).filter(
                      (
                        img
                      ): img is {
                        url: string;
                        kind: "type";
                        typeContent: {
                          categories: {};
                          properties: {};
                          title: string;
                        };
                      } => img.kind === "type" && !!img.typeContent
                    );

                    return typeContents.map((img, index) => {
                      const title =
                        img.typeContent?.title ?? `untitled-${index}`;

                      const hasHoverValue = [...hoverValues].some(
                        (v) =>
                          Object.values(p.categories || {}).includes(v) ||
                          Object.values(p.properties || {}).includes(v)
                      );

                      return (
                        <button
                          key={`${p.slug}-${title}`}
                          className={`index__entry ${hasHoverValue ? "index__highlight" : ""}`}
                          onClick={() =>
                            setHighlightProject(
                              !highlightProject ? img.typeContent : null
                            )
                          }
                        >
                          {title}
                        </button>
                      );
                    });
                  })}
            </div>
            <div className="index__tableColumn">
              <h1>References</h1>
              {indexOpen &&
                filteredEntries
                  .filter((e) => references.includes(e))
                  .map((p) => {
                    const hasHoverValue = [...hoverValues].some(
                      (v) =>
                        Object.values(p.categories || {}).includes(v) ||
                        Object.values(p.properties || {}).includes(v)
                    );

                    return (
                      <button
                        key={p.slug}
                        className={`index__entry ${hasHoverValue ? "index__highlight" : ""}`}
                        onClick={() =>
                          setHighlightProject(!highlightProject ? p : null)
                        }
                      >
                        {p.title}
                      </button>
                    );
                  })}
            </div>
            <div className="index__tableColumn">
              <h1>Phenomena</h1>
              {indexOpen &&
                filteredEntries
                  .filter((e) => phenomena.includes(e))
                  .map((p) => {
                    const hasHoverValue = [...hoverValues].some(
                      (v) =>
                        Object.values(p.categories || {}).includes(v) ||
                        Object.values(p.properties || {}).includes(v)
                    );

                    return (
                      <button
                        key={p.slug}
                        className={`index__entry ${hasHoverValue ? "index__highlight" : ""}`}
                        onClick={() =>
                          setHighlightProject(!highlightProject ? p : null)
                        }
                      >
                        {p.title}
                      </button>
                    );
                  })}
            </div>
          </div>
        </div>

        <div className="index__table">
          <div className="index__tableHead">
            <h1>Categories</h1>
          </div>

          <div className="index__tableWrapper">
            {Object.entries(categoryFilters).map(([key, values]) => (
              <div key={key} className="index__tableColumn">
                <h1>{key}</h1>
                <button
                  onClick={() => setCategoriesOpen((prev) => !prev)}
                  className={`index__toggle ${categoriesOpen ? "index__toggle--up" : "index__toggle--down"}`}
                />

                {categoriesOpen &&
                  [...values].map((value) => (
                    <button
                      key={value}
                      onClick={() =>
                        setActiveFilter({ type: "category", key, value })
                      }
                      onMouseEnter={() =>
                        setHoverValues((prev) => new Set(prev).add(value))
                      }
                      onMouseLeave={() => {
                        setHoverValues((prev) => {
                          const copy = new Set(prev);
                          copy.delete(value);
                          return copy;
                        });
                      }}
                      className={`index__entry ${value == activeFilter.value && "index__highlight"}`}
                    >
                      {value}
                    </button>
                  ))}
              </div>
            ))}
          </div>
        </div>

        <div className="index__table">
          <div className="index__tableHead">
            <h1>Properties</h1>
          </div>

          <div className="index__tableWrapper">
            {Object.entries(propertyFilters).map(([key, values]) => (
              <div key={key} className="index__tableColumn">
                <h1>{key}</h1>
                <button
                  onClick={() => setPropertiesOpen((prev) => !prev)}
                  className={`index__toggle ${propertiesOpen ? "index__toggle--up" : "index__toggle--down"}`}
                />

                {propertiesOpen &&
                  [...values].map((value) => (
                    <button
                      key={value}
                      onClick={() =>
                        setActiveFilter({ type: "property", key, value })
                      }
                      onMouseEnter={() =>
                        setHoverValues((prev) => new Set(prev).add(value))
                      }
                      onMouseLeave={() => {
                        setHoverValues((prev) => {
                          const copy = new Set(prev);
                          copy.delete(value);
                          return copy;
                        });
                      }}
                      className={`index__entry ${value == activeFilter.value && "index__highlight"}`}
                    >
                      {value}
                    </button>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
