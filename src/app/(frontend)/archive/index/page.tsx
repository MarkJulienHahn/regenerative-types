import React from "react";

import Index from "@/components/archive/Index";
import {
  getProjects,
  getReferences,
  getPhenomena,
} from "@/../sanity/sanity-utils";

export default async function page() {
  const projects = await getProjects();
  const references = await getReferences();
  const phenomena = await getPhenomena();
  return (
    <div>
      <Index
        projects={projects}
        references={references}
        phenomena={phenomena}
      />
    </div>
  );
}
