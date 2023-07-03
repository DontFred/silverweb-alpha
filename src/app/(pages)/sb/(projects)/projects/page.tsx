import React, { Fragment } from "react";
import ProjectsContent from "./content";
import { trpc } from "@/lib/trpc/ssTRPC";

export type MapFriendlyProjectData =
  | {
      id: string;
      type: string;
      name: string;
      company: string;
      address: {
        lat: number;
        lng: number;
      };
    }[]
  | undefined;

/**
 * Asynchronously renders the Projects component that displays the content of
 * all the projects.
 *
 * @return {JSX.Element} A fragment component that contains the ProjectsContent
 * component with the data of all projects.
 */
export default async function Projects() {
  let data = await trpc.getAllProjects();
  function getMapFriendlyAllProjectsData(allProjectData: typeof data) {
    const projectsData = allProjectData;
    const mapFriendlyAllProjectsData: MapFriendlyProjectData =
      projectsData?.map((project) => ({
        id: project.id,
        type: project.type.name,
        name: project.name,
        company: project.company,
        address: {
          lat: project.address.coordinates.lat,
          lng: project.address.coordinates.lng,
        },
      }));

    return mapFriendlyAllProjectsData;
  }

  const mapFriendlyAllProjectsData = getMapFriendlyAllProjectsData(data);
  return (
    <Fragment>
      <ProjectsContent projectsData={mapFriendlyAllProjectsData} />
    </Fragment>
  );
}
