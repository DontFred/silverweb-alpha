import { Fragment } from "react";
import OrderInterfaceContent from "./content";
import { trpc } from "@/lib/trpc/ssTRPC";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

export type OrderDataProps = Prisma.OrderGetPayload<{
  include: {
    ContactOrder: {
      include: {
        contact: {
          include: {
            company: true,
            ContactComment: {
              include: {
                comment: {
                  include: {
                    user: {
                      include: {
                        color: true,
                      }
                    },
                  },
                },
              },
            },
          },
        },
      }
    },
    InductionForm: {
      include: {
        file: true
      }
    },
    PayChargeRate: {
      include: {
        jobRole: true,
        chargeRate: true,
        payRate: true
      }
    },
    Project: {
      include: {
        type: true
      }
    },
    TrainingCourseRequired: {
      include: {
        course: true
      }
    },
    User: {
      include: {
        employee: {
          include: {
            contact: {
              include: {
                company: true,
                ContactComment: {
                  include: {
                    comment: {
                      include: {
                        user: {
                          include: {
                            color: true,
                          }
                        },
                      },
                    },
                  },
                },
              },
            },
          }
        }
      }
    },
    WorkPerformed: {
      include: {
        work: true
      }
    },
    WorkerRequired: {
      include: {
        jobRole: true
      }
    },
    client: {
      include: {
        company: {
            include: {
                CompanyComment: {
                    include: {
                      comment: {
                        include: {
                          user: {
                            include: {
                              color: true,
                            },
                          },
                        },
                      },
                    },
                  },
                  address: true,
            }
        },
        address: true
      },
    },
    deliveryAddress: {
      include: {
        coordinates: true
      }
    },
    inductionAddress: {
      include: {
        coordinates: true
      }
    },
    invoicingAddress: true,
    projectAddress: {
      include: {
        coordinates: true
      }
    },
    meetingPerson: {
      include: {
        company: true,
        ContactComment: {
          include: {
            comment: {
              include: {
                user: {
                  include: {
                    color: true,
                  }
                },
              },
            },
          },
        }
      }
    }
  }
}> | null

export type JobRolesProps = Prisma.JobRoleGetPayload<{
}>

export default async function OrderInterface({ params }: { params: { order_id: string } }) {
  let data = await trpc.getOrderById(params.order_id);
  let jr = await trpc.getAllJobRoles();
  if (!data){
    notFound()
  }
  return (
    <Fragment>
      <OrderInterfaceContent orderData={data} jobRoles={jr} />
    </Fragment>
  );
}
