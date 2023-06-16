import { Fragment } from "react";
import HomeContent from "./content";
import { ProjectProps as FakerProjectProps } from "@/faker.d";
import { faker } from "@faker-js/faker";
import { createRandomProjects } from "@/faker";

export type ProjectProps = FakerProjectProps;

export type MapFriendlyProjectData = {
  id: ProjectProps["id"];
  type: ProjectProps["type"];
  name: ProjectProps["name"];
  company: ProjectProps["company"]["name"];
  address: ProjectProps["address"]["coordinates"];
};

export type StatisticsFriendlyProjectData = {
  greenProjects: number;
  factories: number;
  buildings: number;
  other: number;
};

export type HoursFriendlyProjectHistoryData = {
  elec: number;
  mech: number;
  white: number;
};

async function getAllProjectData() {
  const projectsData: ProjectProps[] = faker.helpers.multiple(
    createRandomProjects,
    { count: 60 }
  );

  return projectsData;
}

async function getMapFriendlyAllProjectsData(allProjectData: ProjectProps[]) {
  const projectsData = allProjectData;
  const mapFriendlyAllProjectsData: MapFriendlyProjectData[] = projectsData.map(
    (project) => ({
      id: project?.id,
      type: project?.type,
      name: project?.name,
      company: project?.company?.name,
      address: project?.address?.coordinates,
    })
  );

  return mapFriendlyAllProjectsData;
}

async function getStaticFriendlyAllProjectsData(allProjectData: ProjectProps[]) {
  const projectsData = allProjectData;

  const ProjectCategory = {
    greenProjects: ["Battery Factory", "Data Centre", "Windfarm"],
    factories: ["Pre-Cast Factory", "Paper Mill"],
    building: ["Apartments", "Museum", "Shopping Centre"],
    other: [
      "Battery Factory",
      "Data Centre",
      "Windfarm",
      "Pre-Cast Factory",
      "Paper Mill",
      "Apartments",
      "Museum",
      "Shopping Centre",
    ],
  };

  const statisticFriendlyAllProjectsData: StatisticsFriendlyProjectData = {
    greenProjects: projectsData.filter((p) =>
      ProjectCategory.greenProjects.includes(p.type)
    ).length,
    factories: projectsData.filter((p) =>
      ProjectCategory.factories.includes(p.type)
    ).length,
    buildings: projectsData.filter((p) =>
      ProjectCategory.building.includes(p.type)
    ).length,
    other: projectsData.filter((p) => !ProjectCategory.other.includes(p.type))
      .length,
  };

  return statisticFriendlyAllProjectsData;
}

async function getHoursFriendlyAllProjectsData() {
  const hoursFriendlyAllProjectsHistoryData: HoursFriendlyProjectHistoryData = {
    elec: faker.number.int(9000),
    mech: faker.number.int(9000),
    white: faker.number.int(14000),
  };

  return hoursFriendlyAllProjectsHistoryData;
}

export default async function Home() {

  const allProjectData = await getAllProjectData()
  const mapFriendlyAllProjectsData = await getMapFriendlyAllProjectsData(allProjectData);

  const statisticFriendlyAllProjectsData =
    await getStaticFriendlyAllProjectsData(allProjectData);

  const hoursFriendlyAllProjectsHistoryData =
    await getHoursFriendlyAllProjectsData();

  return (
    <Fragment>
      <HomeContent
        mapFriendlyAllProjectsData={mapFriendlyAllProjectsData}
        statisticFriendlyAllProjectsData={statisticFriendlyAllProjectsData}
        hoursFriendlyAllProjectsHistoryData={
          hoursFriendlyAllProjectsHistoryData
        }
      />
    </Fragment>
  );
}
