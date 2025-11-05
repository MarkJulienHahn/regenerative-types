"use client";

import { ProjectType } from "@/types/types";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Tag from "../_UI/Tag";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

  console.log(project);

  return (
    <div
      className="project__overlayWrapper"
      onClick={() => setHighlightProject(null)}
    >
      <div className="project__overlay" onClick={(e) => e.stopPropagation()}>
        <h1>{project.title}</h1>
        <div className="project__images">
          {project.images && (
            <Swiper
              modules={[Navigation]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
              className="project__swiper"
            >
              {project.images?.map((img, i) => {
                const imageUrl =
                  img.typeContent?.image?.asset.url ||
                  img.assemblageContent?.image?.asset.url ||
                  (img as any)?.imageContent?.image?.asset.url;

                if (!imageUrl) return null;

                return (
                  <SwiperSlide key={i}>
                    <div className="project__image">
                      <Image
                        src={imageUrl}
                        width={800}
                        height={600}
                        alt={project.title || ""}
                        className="object-contain"
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}

          {project?.image && (
              <div className="project__image">
                <Image
                  src={project.image.asset.url}
                  width={800}
                  height={600}
                  alt={project.title || ""}
                  className="object-contain"
                />
              </div>
          )}
        </div>

        {/* --- Project Info --- */}
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
              {project.beschreibung && (
                <PortableText value={project.beschreibung} />
              )}
            </div>
          </div>
        </div>

        {/* --- Tags --- */}
        <div className="project__tags">
          {Object.entries(project.categories || {}).map(([value], i) => (
            <Tag key={i} label={value} />
          ))}
        </div>
      </div>
    </div>
  );
}
