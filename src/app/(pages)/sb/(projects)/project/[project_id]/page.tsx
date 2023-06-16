import { Fragment } from "react";
import ProjectInterfaceContent from "./content";

import { createRandomOrder, createRandomProjects } from "@/faker";
import { OrderProps, ProjectProps } from "@/faker.d";
import { faker } from "@faker-js/faker";

export type ProjectDataProps = ProjectProps & {
    order: Array<OrderProps>;
  };
  
async function getProjectData(){
    const projectData = createRandomProjects();
  
    Object.assign(projectData, {
      order: [...faker.helpers.multiple(createRandomOrder, { count: 6 })],
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


