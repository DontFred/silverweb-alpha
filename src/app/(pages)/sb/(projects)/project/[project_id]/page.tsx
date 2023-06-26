import { Fragment } from "react";
import ProjectInterfaceContent from "./content";

import { createRandomOrder, createRandomProjects } from "@/faker";
import { OrderProps, ProjectProps } from "@/faker.d";
import { faker } from "@faker-js/faker";

export type ProjectDataProps = ProjectProps & {
    order: Array<OrderProps>;
  };
  
/**
 * Asynchronously generates and returns a new set of ProjectDataProps.
 *
 * @return {Promise<ProjectDataProps>} The newly generated ProjectDataProps.
 */
async function getProjectData(){
    const projectData = createRandomProjects();
  
    Object.assign(projectData, {
      order: [...faker.helpers.uniqueArray(createRandomOrder, 6)],
    }) as ProjectDataProps;
  
    return projectData as ProjectDataProps
  }

export default async function ProjectInterface() {

  const projectData = await getProjectData()

  return (
    <Fragment>
      <ProjectInterfaceContent projectData={projectData}/>
    </Fragment>
  );
}


