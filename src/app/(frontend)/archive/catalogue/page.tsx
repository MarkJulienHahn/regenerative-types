import Catalogue from "@/components/archive/Catalogue";
import { getProjects } from "@/../sanity/sanity-utils";

export default async function page() {
  const projects = await getProjects();
  return (
    <div>
      <Catalogue projects={projects} />
    </div>
  );
}
