import React, { Fragment } from "react";
import ProjectsContent from "./content";
import { trpc } from "@/lib/trpc/ssTRPC";
import { notFound } from "next/navigation";

export type MapFriendlyProjectData =
  | {
      id: string;
      type: string;
      name: string;
      company: string;
      address: {
        locstring: string;
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

  if (!data){
    notFound()
  }
  function getMapFriendlyAllProjectsData(allProjectData: typeof data) {
    const projectsData = allProjectData;
    const mapFriendlyAllProjectsData: MapFriendlyProjectData =
      projectsData?.map((project) => ({
        id: project.id,
        type: project.type.name,
        name: project.name,
        company: project.company,
        address: {
          locstring: project.address.city + ", " + project.address.country,
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
