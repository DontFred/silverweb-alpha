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

async function getMapFriendlyProjectsData(){
  const projectsData = faker.helpers.multiple(createRandomProjects, {count: 40})

  const mapFriendlyProjectsData: MapFriendlyProjectData[] = projectsData.map(project => ({
    id: project?.id,
    type: project?.type,
    name: project?.name,
    company: project?.company?.name,
    address: project?.address?.coordinates
  }))

  return mapFriendlyProjectsData
}

export default async function Projects() {

  const mapFriendlyProjectsData = await getMapFriendlyProjectsData()
  return (
    <Fragment>
      <ProjectsContent projectsData={mapFriendlyProjectsData}/>
    </Fragment>
  )
}
