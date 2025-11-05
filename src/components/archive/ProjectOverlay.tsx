import { ProjectType } from "@/types/types";
import { PortableText } from "next-sanity";
import Tag from "../_UI/Tag";

type ProjectOverlayProps = {
  project: ProjectType;
  setHighlightProject: React.Dispatch<React.SetStateAction<ProjectType | null>>;
};

export default function ProjectOverlay({
  project,
  setHighlightProject,
}: ProjectOverlayProps) {
  function camelToNormal(text: string) {
    return text
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  }

  return (
    <div
      className="project__overlayWrapper"
      onClick={() => setHighlightProject(null)}
    >
      <div className="project__overlay">
        <h1>{project.title}</h1>
        <div className="project__image"></div>
        <div className="project__info">
          <div className="project__properties">
            <h2>Properties</h2>
            {Object.entries(project.properties || {}).map(([key, value]) => (
              <div key={key} className="project__property">
                {camelToNormal(key)}: {value}
              </div>
            ))}
          </div>
          <div className="project__textWrapper">
            <h2>Info</h2>
            <div className="project__text">
              {/* <PortableText value={project.beschreibung} /> */}
            </div>
          </div>
        </div>
        <div className="project__tags">
          {Object.entries(project.categories || {}).map(([value], i) => (
            <Tag key={i} label={value} />
          ))}
        </div>
      </div>
    </div>
  );
}
