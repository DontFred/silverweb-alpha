import { Fragment } from "react";
import ProjectInterfaceContent from "./content";
import { trpc } from "@/lib/trpc/ssTRPC";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

export type ProjectDataProps = Prisma.ProjectGetPayload<{
  include: {
    address: {
      include: {
        coordinates: true;
      };
    },
    type: true;
    Order: {
      include: {
        client: {
          include: {
            company: true;
          };
        }
      }
    }
  };
}> | null


export default async function ProjectInterface({ params }: { params: { project_id: string } }) { 
  
  let data = await trpc.getProjectById(params.project_id);
  if (!data){
    notFound()
  }
  return (
    <Fragment>
      <ProjectInterfaceContent projectData={data}/>
    </Fragment>
  );
}


