"use client";

import { Fragment } from "react";
import HomeContent from "./content";
import { faker } from "@faker-js/faker";
import { trpc } from "@/lib/trpc/csTRPC";
import LoadingComponent from "@/app/loading";
import { Decimal } from "@prisma/client/runtime";



export type MapFriendlyProjectData = {
  id: string,
  type: string,
  name: string,
  company: string,
  address: {
    lat: Decimal,
    lng: Decimal,
  }
}[] | undefined;

export type StatisticsFriendlyProjectData = {
  greenProjects: number | undefined;
  factories: number | undefined;
  buildings: number | undefined;
  other: number | undefined;
};

export type HoursFriendlyProjectHistoryData = {
  elec: number | undefined;
  mech: number | undefined;
  white: number | undefined;
};


/**
 * Asynchronously retrieves the hours-friendly history data for all projects.
 *
 * @return {Promise<HoursFriendlyProjectHistoryData>} The object containing the hours-friendly history data for all projects.
 */
async function getHoursFriendlyAllProjectsData() {
  const hoursFriendlyAllProjectsHistoryData: HoursFriendlyProjectHistoryData = {
    elec: faker.number.int(9000),
    mech: faker.number.int(9000),
    white: faker.number.int(14000),
  };

  return hoursFriendlyAllProjectsHistoryData;
}

/**
 * This function is the Home component, which is responsible for rendering the homepage of the website.
 *
 * @return {JSX.Element} The JSX element representing the homepage.
 */
export default async function Home() {
  
  let { data, isLoading, isFetching } = trpc.getAllProjects.useQuery();
  if (isLoading || isFetching) {
    return <LoadingComponent />;
  }
  function getMapFriendlyAllProjectsData(allProjectData: typeof data ) {
    const projectsData = allProjectData;
    const mapFriendlyAllProjectsData: MapFriendlyProjectData = projectsData?.map(
      (project) => ({
        id: project.id,
        type: project.type.name,
        name: project.name,
        company: project.company,
        address: { lat: project.address.coordinates.lat, lng: project.address.coordinates.lng},
      })
    );
  
    return mapFriendlyAllProjectsData;
  }

  function getStaticFriendlyAllProjectsData(allProjectData: typeof data) {
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
      greenProjects: projectsData?.filter((p) =>
        ProjectCategory.greenProjects.includes(p.type.name)
      ).length,
      factories: projectsData?.filter((p) =>
        ProjectCategory.factories.includes(p.type.name)
      ).length,
      buildings: projectsData?.filter((p) =>
        ProjectCategory.building.includes(p.type.name)
      ).length,
      other: projectsData?.filter((p) => !ProjectCategory.other.includes(p.type.name))
        .length,
    };
  
    return statisticFriendlyAllProjectsData;
  }

  const mapFriendlyAllProjectsData = await getMapFriendlyAllProjectsData(data);

  const statisticFriendlyAllProjectsData =
    await getStaticFriendlyAllProjectsData(data);

  const hoursFriendlyAllProjectsHistoryData =
    await getHoursFriendlyAllProjectsData();

  return (
    <Fragment>
      <HomeContent
        {...mapFriendlyAllProjectsData && { mapFriendlyAllProjectsData: mapFriendlyAllProjectsData }}
        statisticFriendlyAllProjectsData={statisticFriendlyAllProjectsData}
        hoursFriendlyAllProjectsHistoryData={
          hoursFriendlyAllProjectsHistoryData
        }
      />
    </Fragment>
  );
}
