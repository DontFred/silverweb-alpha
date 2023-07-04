import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";
import { z } from "zod";
import { prisma } from "../prisma";

const t = initTRPC.create({
  transformer: SuperJSON,
});

export const appRouter = t.router({
  getAllProjects: t.procedure.query(async () => {
    return await prisma.project.findMany({
      include: {
        address: {
          include: {
            coordinates: true,
          },
        },
        type: true,
      },
    });
  }),
  getProjectById: t.procedure.input(z.string()).query(async (req) => {
    const { input } = req;
    return await prisma.project.findUnique({
      where: {
        id: input,
      },
      include: {
        address: {
          include: {
            coordinates: true,
          },
        },
        type: true,
        Order: {
          include: {
            client: {
              include: {
                company: true,
              },
            },
          },
        },
      },
    });
  }),
  getAllOrders: t.procedure.query(async () => {
    return await prisma.order.findMany({
      include: {
        client: {
          include: {
            company: true,
          },
        },
        Project: true
      }
    })
  }),
  getOrderById: t.procedure.input(z.string()).query(async (req) => {
    const { input } = req;
    return await prisma.order.findUnique({
      where: {
        id: input,
      },
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
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        InductionForm: {
          include: {
            file: true,
          },
        },
        PayChargeRate: {
          include: {
            jobRole: true,
            chargeRate: true,
            payRate: true,
          },
        },
        Project: {
          include: {
            type: true,
          },
        },
        TrainingCourseRequired: {
          include: {
            course: true,
          },
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
                            user: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        WorkPerformed: {
          include: {
            work: true,
          },
        },
        WorkerRequired: {
          include: {
            jobRole: true,
          },
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
              },
            },
            address: true,
          },
        },
        deliveryAddress: {
          include: {
            coordinates: true,
          },
        },
        inductionAddress: {
          include: {
            coordinates: true,
          },
        },
        invoicingAddress: true,
        projectAddress: {
          include: {
            coordinates: true,
          },
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
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }),
  getAllJobRoles: t.procedure.query(async () => {
    return await prisma.jobRole.findMany();
  }),
  getAllCompanies: t.procedure.query(async () => {
    return await prisma.company.findMany({
      include: {
        address: true,
        ClientProfiles: true
      }
    })
  }),
  addPayChargeRate: t.procedure
    .input(
      z.object({
        id: z.string(),
        jobRole: z.string(),
        currency: z.string(),
      })
    )
    .mutation(async (req) => {
      const { input } = req;
      return await prisma.$transaction(async (tx) => {
        const payChargeRate = await tx.payChargeRate.create({
          data: {
            payRate: {
                create: {
                    normal: 0,
                    ot1: 0,
                    ot2: 0,
                    ot3: 0,
                    ot4: 0,
                }
            },
            chargeRate: {
                create: {
                    normal: 0,
                    ot1: 0,
                    ot2: 0,
                    ot3: 0,
                    ot4: 0,
                }
            },
            order: {
                connect: {
                    id: input.id
                }
            },
            jobRole: {
                connect: {
                    id: input.jobRole
                }
            },
            old: {
                payRate: {
                    normal: 0,
                    ot1: 0,
                    ot2: 0,
                    ot3: 0,
                    ot4: 0,
                },
                chargeRate: {
                    normal: 0,
                    ot1: 0,
                    ot2: 0,
                    ot3: 0,
                    ot4: 0,
                },
            },
            appliedAt: new Date(),
            currency: input.currency,
          },
        });
      });
    }),
  editPayChargeRate: t.procedure
    .input(
      z.object({
        id: z.string(),
        appliedAt: z.date(),
        chargeRate: z.object({
          normal: z.number(),
          ot1: z.number(),
          ot2: z.number(),
          ot3: z.number(),
          ot4: z.number(),
        }),
        payRate: z.object({
          normal: z.number(),
          ot1: z.number(),
          ot2: z.number(),
          ot3: z.number(),
          ot4: z.number(),
        }),
        old: z.object({
          chargeRate: z.object({
            normal: z.number(),
            ot1: z.number(),
            ot2: z.number(),
            ot3: z.number(),
            ot4: z.number(),
          }),
          payRate: z.object({
            normal: z.number(),
            ot1: z.number(),
            ot2: z.number(),
            ot3: z.number(),
            ot4: z.number(),
          }),
        })
      })
    ).mutation(async (req) => {
      const { input } = req;
      return await prisma.$transaction(async (tx) => {
        const payChargeRate = await tx.payChargeRate.update({
          where: {
            id: input.id,
          },
          data: {
            appliedAt: input.appliedAt,
            chargeRate: {
              update: {
                normal: input.chargeRate.normal,
                ot1: input.chargeRate.ot1,
                ot2: input.chargeRate.ot2,
                ot3: input.chargeRate.ot3,
                ot4: input.chargeRate.ot4,
              },
            },
            payRate: {
              update: {
                normal: input.payRate.normal,
                ot1: input.payRate.ot1,
                ot2: input.payRate.ot2,
                ot3: input.payRate.ot3,
                ot4: input.payRate.ot4,
              },
            },
            old: input.old
          }
        })
      })
    })
});

export type AppRouter = typeof appRouter;
