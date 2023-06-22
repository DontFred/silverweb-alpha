import React, { Fragment } from 'react'
import ProjectsContent from './content'
import { ProjectProps  } from '@/faker.d'
import { faker } from '@faker-js/faker'
import { createRandomProjects } from '@/faker'

export type MapFriendlyProjectData = {
  id: ProjectProps["id"],
  type: ProjectProps["type"],
  name: ProjectProps["name"],
  company: ProjectProps["company"]["name"],
  address: ProjectProps["address"]["coordinates"]
}

/**
 * Retrieves an array of map-friendly project data using faker and returns it.
 *
 * @return {Promise<MapFriendlyProjectData[]>} An array of map-friendly project data
 */
async function getMapFriendlyProjectsData(){
  const projectsData = faker.helpers.uniqueArray(createRandomProjects, 80)

  const mapFriendlyProjectsData: MapFriendlyProjectData[] = projectsData.map(project => ({
    id: project?.id,
    type: project?.type,
    name: project?.name,
    company: project?.company?.name,
    address: project?.address?.coordinates
  }))

  return mapFriendlyProjectsData
}

/**
 * Asynchronously renders the Projects component that displays the content of 
 * all the projects.
 *
 * @return {JSX.Element} A fragment component that contains the ProjectsContent 
 * component with the data of all projects.
 */
export default async function Projects() {

  const mapFriendlyProjectsData = await getMapFriendlyProjectsData()
  return (
    <Fragment>
      <ProjectsContent projectsData={mapFriendlyProjectsData}/>
    </Fragment>
  )
}
