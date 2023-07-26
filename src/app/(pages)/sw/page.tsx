import { Fragment } from "react";
import HomeContent from "./content";
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
    elec: 7344,
    mech: 6422,
    white: 12301,
  };

  return hoursFriendlyAllProjectsHistoryData;
}

/**
 * This function is the Home component, which is responsible for rendering the homepage of the website.
 *
 * @return {JSX.Element} The JSX element representing the homepage.
 */
export default async function Home() {
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
      other: projectsData?.filter(
        (p) => !ProjectCategory.other.includes(p.type.name)
      ).length,
    };

    return statisticFriendlyAllProjectsData;
  }

  const mapFriendlyAllProjectsData = getMapFriendlyAllProjectsData(data);

  const statisticFriendlyAllProjectsData =
    getStaticFriendlyAllProjectsData(data);

  const hoursFriendlyAllProjectsHistoryData =
    await getHoursFriendlyAllProjectsData();

  return (
    <Fragment>
      <HomeContent
        {...(mapFriendlyAllProjectsData && {
          mapFriendlyAllProjectsData: mapFriendlyAllProjectsData,
        })}
        statisticFriendlyAllProjectsData={statisticFriendlyAllProjectsData}
        hoursFriendlyAllProjectsHistoryData={
          hoursFriendlyAllProjectsHistoryData
        }
      />
    </Fragment>
  );
}
