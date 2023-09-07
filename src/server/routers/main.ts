import { TRPCError, initTRPC } from "@trpc/server";
import SuperJSON from "superjson";
import { z } from "zod";
import { prisma } from "../prisma";
import { NominatimResponseProps } from "../../../type";
import bcrypt from "bcrypt";
import { intervalToDuration, setHours } from "date-fns";

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
        Project: true,
      },
    });
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
  getOrderByCode: t.procedure.input(z.string()).query(async (req) => {
    const { input } = req;
    return await prisma.order.findUnique({
      where: {
        orderCode: input,
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
        ClientProfiles: true,
      },
    });
  }),
  getOrderFormById: t.procedure.input(z.string()).query(async (req) => {
    const { input } = req;
    return await prisma.orderFormAuth.findUnique({
      where: {
        id: input,
      },
    });
  }),
  getWebAuthnByEmail: t.procedure.input(z.string()).mutation(async (req) => {
    const { input } = req;
    return await prisma.user.findFirst({
      where: {
        email: input,
      },
      select: {
        WebAuthN: {
          select: {
            webauthnChallenge: true,
          }
        },
      }
    });
  }),
  getUserByEmail: t.procedure.input(z.string()).query(async (req) => {
    const { input } = req;
    return await prisma.user.findFirst({
      where: {
        email: input,
      },
      select: {
        color: true,
        department: true,
      }
    });
  }),
  getWebAuthnBySecretKey: t.procedure.input(z.object({ secret: z.string(), otp: z.string() })).mutation(async (req) => {
    const { input } = req;
    const credentials = await prisma.webAuthN.findFirst({
      where: {
        secretOTP: input.secret,
      },
      include: {
        User: true
      }
    });
    if(!credentials || credentials.otp === null) return null;
    const verify = await bcrypt.compare(input.otp, credentials.otp)
    if(!verify) return null;
    return credentials;
  }),
  addOrder: t.procedure
    .input(
      z.object({
        accountManager: z.string(),
        orderCode: z.string(),
        clientProjectCode: z.string(),
        projectRef: z.string().optional(),
        clientRef: z.string(),
        registerName: z.string().optional(),
        registerAddress: z
          .object({
            streetNo: z.string(),
            postalCode: z.string(),
            city: z.string(),
            country: z.string(),
          })
          .optional(),
        salesContact: z
          .object({
            firstName: z.string(),
            lastName: z.string(),
            jobPosition: z.string(),
            email: z.string(),
            phone: z.string().nullish(),
          })
          .optional(),
        currency: z.string(),
        payChargeRates: z.array(
          z.object({
            jobRole: z.string(),
            payRate: z.object({
              normal: z.number(),
              ot1: z.number(),
              ot2: z.number(),
              ot3: z.number(),
              ot4: z.number(),
            }),
            chargeRate: z.object({
              normal: z.number(),
              ot1: z.number(),
              ot2: z.number(),
              ot3: z.number(),
              ot4: z.number(),
            }),
          })
        ),
      })
    )
    .mutation(async (req) => {
      const { input } = req;
      return await prisma.$transaction(async (tx) => {
        const project = await tx.project.findFirst({
          where: {
            name: input.projectRef || "",
          },
        });

        const company = await tx.company.findFirstOrThrow({
          where: {
            name: input.clientRef,
          },
        });

        const client = await tx.client.findFirst({
          where: {
            name: input.registerName,
          },
        });

        const r = await fetch(
          `https://nominatim.openstreetmap.org/?addressdetails=1&q=${input.registerAddress?.streetNo}+${input.registerAddress?.postalCode}+${input.registerAddress?.city}+${input.registerAddress?.country}&format=json&limit=1`,
          { method: "GET" }
        );
        const result: NominatimResponseProps = await r.json();
        const order = await tx.order.create({
          data: {
            commentToNumbersOfWorker: "",
            commentToRotation: "",
            clientProjectCode: input.clientProjectCode,
            breaksPaid: "Unpaid",
            breakTime: "1h/day",
            rotation: "6 weeks on / 2 weeks off",
            workingHours: {
              mo: 10,
              tu: 10,
              we: 10,
              th: 10,
              fr: 10,
              sa: 0,
              su: 0,
            },
            commentToDuration: "",
            commentToGeneralInformation: "",
            commentToInvoicing: "",
            orgaNumber: "",
            end: new Date(),
            start: new Date(),
            estimatedDuration: "0 weeks",
            inductionDateTime: new Date(),
            orderCode: input.orderCode,
            invoiceEmail: "",
            invoicingFrequency: "Weekly",
            payTerm: "30 days",
            rct: "",
            vatNumber: "",
            answered: false,
            User: {
              connect: {
                id: input.accountManager,
              },
            },
            Project: {
              connectOrCreate: {
                where: {
                  id: project?.id || "",
                },
                create: {
                  name: input.projectRef || "No Project yet",
                  company: "No Company yet",
                  size: "No Size yet",
                  comment: "No Comment yet",
                  typeID: "00000000-0000-0000-0000-000000000000",
                  addressID: "00000000-0000-0000-0000-000000000000",
                },
              },
            },
            client: {
              connectOrCreate: {
                where: {
                  id: client?.id || "",
                },
                create: {
                  name: input.registerName || "",
                  company: {
                    connect: {
                      id: company.id,
                    },
                  },
                  address: {
                    ...(input.registerAddress
                      ? {
                          create: {
                            city: input.registerAddress.city,
                            country: input.registerAddress.country,
                            postCode: input.registerAddress.postalCode,
                            streetNo: input.registerAddress.streetNo,
                            coordinates: {
                              create: {
                                lat:
                                  Math.round((result[0]?.lat || 1) * 1000) /
                                  1000,
                                lng:
                                  Math.round((result[0]?.lon || 1) * 1000) /
                                  1000,
                              },
                            },
                          },
                        }
                      : {
                          connect: {
                            id: "00000000-0000-0000-0000-000000000000",
                          },
                        }),
                  },
                },
              },
            },
            deliveryAddress: {
              connect: {
                id: "00000000-0000-0000-0000-000000000000",
              },
            },
            inductionAddress: {
              connect: {
                id: "00000000-0000-0000-0000-000000000000",
              },
            },
            invoicingAddress: {
              connect: {
                id: "00000000-0000-0000-0000-000000000000",
              },
            },
            projectAddress: {
              connect: {
                id: "00000000-0000-0000-0000-000000000000",
              },
            },
            meetingPerson: {
              connect: {
                id: "00000000-0000-0000-0000-000000000000",
              },
            },
            ...(input.salesContact && {
              ContactOrder: {
                create: {
                  contact: {
                    create: {
                      company: {
                        connect: {
                          id: company.id,
                        },
                      },
                      firstName: input.salesContact.firstName,
                      lastName: input.salesContact.lastName,
                      jobPosition: input.salesContact.jobPosition,
                      email: input.salesContact.email,
                      phoneNumber: input.salesContact.phone || "",
                    },
                  },
                  orderNo: 1,
                },
              },
            }),
          },
        });

        const PayChargeRate = await Promise.all(
          input.payChargeRates.map(async (rate) => {
            return await tx.payChargeRate.create({
              data: {
                order: {
                  connect: {
                    id: order.id,
                  },
                },
                appliedAt: new Date(),
                currency: input.currency,
                jobRole: {
                  connect: {
                    name: rate.jobRole,
                  },
                },
                payRate: {
                  create: {
                    normal: rate.payRate.normal,
                    ot1: rate.payRate.ot1,
                    ot2: rate.payRate.ot2,
                    ot3: rate.payRate.ot3,
                    ot4: rate.payRate.ot4,
                  },
                },
                chargeRate: {
                  create: {
                    normal: rate.chargeRate.normal,
                    ot1: rate.chargeRate.ot1,
                    ot2: rate.chargeRate.ot2,
                    ot3: rate.chargeRate.ot3,
                    ot4: rate.chargeRate.ot4,
                  },
                },
              },
            });
          })
        );

        const FormCredential = await tx.orderFormAuth.create({
          data: {
            password: Array.from(
              { length: 16 },
              () =>
                "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"[
                  Math.floor(Math.random() * 32)
                ]
            ).join(""),
            orderID: order.id,
          },
        });
        return FormCredential;
      });
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
              },
            },
            chargeRate: {
              create: {
                normal: 0,
                ot1: 0,
                ot2: 0,
                ot3: 0,
                ot4: 0,
              },
            },
            order: {
              connect: {
                id: input.id,
              },
            },
            jobRole: {
              connect: {
                id: input.jobRole,
              },
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
        }),
      })
    )
    .mutation(async (req) => {
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
            old: input.old,
          },
        });
      });
    }),
  submitOrderForm: t.procedure
    .input(
      z.object({
        orderId: z.string(),
        authCode: z.string(),
        officialCompanyName: z.string(),
        companyAddress: z.object({
            streetNo: z.string(),
            city: z.string(),
            postalCode: z.string(),
            country: z.string()
        }),
        personalContact: z.object({
            firstName: z.string(),
            lastName: z.string(),
            jobPosition: z.string(),
            email: z.string(),
            phone: z.string()
        }),
        projectName: z.string(),
        projectAddress: z.object({
            streetNo: z.string(),
            city: z.string(),
            postalCode: z.string(),
            country: z.string()
        }),
        performedWork: z.array(z.string()),
        workerNeeded: z.array(z.string()),
        confirmRotation: z.array(z.string()),
        projectDuration: z.object({
            from: z.date(),
            to: z.date()
        }),
        requiredTrainingCourses: z.array(z.string()),
        inductionForms: z.array(z.object({
           filename: z.string(), uri: z.string() 
        })),
        typeOfProject: z.string(),
        meetingPerson: z.object({
            firstName: z.string(),
            lastName: z.string(),
            jobPosition: z.string(),
            email: z.string(),
            phone: z.string()
        }),
        deliveryAddress: z.object({
            streetNo: z.string(),
            city: z.string(),
            postalCode: z.string(),
            country: z.string()
        }).optional(),
        confirmPayterm: z.array(z.string()),
        invoicingAddress: z.object({
            streetNo: z.string(),
            city: z.string(),
            postalCode: z.string(),
            country: z.string()
        }),
        orgaNumber: z.string(),
        vatNumber: z.string(),
        confirmChargerates: z.array(z.string()),
        confirmOTChargerates: z.array(z.string()),
        colleaguesContactDetails: z.array(
          z.object({
            firstName: z.string(),
            lastName: z.string(),
            jobPosition: z.string(),
            email: z.string(),
            phone: z.string()
          })
        ),
        workerOnSite: z.record(z.string(), z.number()),
        inductionAddress: z.object({
            streetNo: z.string(),
            city: z.string(),
            postalCode: z.string(),
            country: z.string()
        }).optional(),
        inductionStart: z.string(),
        commentToRotation: z.string().optional(),
        commentToNumbersOfWorker: z.string().optional(),
        invoicingEmail: z.string()
    })
    )
    .mutation(async (req) => {
      const { input } = req;
      return await prisma.$transaction(async (tx) => {
        const par = await fetch(
          `https://nominatim.openstreetmap.org/?addressdetails=1&q=${input.projectAddress.streetNo}+${input.projectAddress.postalCode}+${input.projectAddress.city}+${input.projectAddress.country}&format=json&limit=1`,
          { method: "GET" }
        );
        const projectAddress: NominatimResponseProps = await par.json();

        const car = await fetch(
          `https://nominatim.openstreetmap.org/?addressdetails=1&q=${input.companyAddress.streetNo}+${input.companyAddress.postalCode}+${input.companyAddress.city}+${input.companyAddress.country}&format=json&limit=1`,
          { method: "GET" }
        );
        const clientAddress: NominatimResponseProps = await car.json();

        const dar = await fetch(
          `https://nominatim.openstreetmap.org/?addressdetails=1&q=${input.deliveryAddress?.streetNo}+${input.deliveryAddress?.postalCode}+${input.deliveryAddress?.city}+${input.deliveryAddress?.country}&format=json&limit=1`,
          { method: "GET" }
        );
        const deliveryAddress: NominatimResponseProps = await dar.json();

        const indar = await fetch(
          `https://nominatim.openstreetmap.org/?addressdetails=1&q=${input.inductionAddress?.streetNo}+${input.inductionAddress?.postalCode}+${input.inductionAddress?.city}+${input.inductionAddress?.country}&format=json&limit=1`,
        )

        const inductionAddress: NominatimResponseProps = await indar.json();

        const iar = await fetch(
          `https://nominatim.openstreetmap.org/?addressdetails=1&q=${input.invoicingAddress.streetNo}+${input.invoicingAddress.postalCode}+${input.invoicingAddress.city}+${input.invoicingAddress.country}&format=json&limit=1`,
          { method: "GET" }
        );
        const invoicingAddress: NominatimResponseProps = await iar.json();

        const orderPre = await tx.order.findUnique({
          where: {
            id: input.orderId,
          },
          include: {
            client: {
              include: {
                company: true,
              },
            },
            ContactOrder: {
              include: {
                contact: true,
              },
            },
          },
        });

        const client = await tx.client.findFirst({
          where: {
            name: input.officialCompanyName,
          },
        });

        if (client) {
          const clientAddressCheck = await tx.client.findFirst({
            where: {
              id: client.id,
              address: {
                streetNo: input.companyAddress.streetNo,
              },
            },
          });

          if (!clientAddressCheck) {
            const updateClientAddress = await tx.client.update({
              where: {
                id: client.id,
              },
              data: {
                address: {
                  create: {
                    city: input.companyAddress.city,
                    streetNo: input.companyAddress.streetNo,
                    postCode: input.companyAddress.postalCode,
                    country: input.companyAddress.country,
                    coordinates: {
                      create: {
                        lat:
                          Math.round((clientAddress[0]?.lat || 1) * 1000) /
                          1000,
                        lng:
                          Math.round((clientAddress[0]?.lon || 1) * 1000) /
                          1000,
                      },
                    },
                  },
                },
              },
            });
          }
        }

        await Promise.all(
          input.colleaguesContactDetails.map(async (contact, idx) => {
            await tx.contactOrder.create({
              data: {
                orderNo: idx + 2,
                order: {
                  connect: {
                    id: orderPre?.id || "",
                  },
                },
                contact: {
                  create: {
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    jobPosition: contact.jobPosition,
                    email: contact.email,
                    phoneNumber: contact.phone,
                  },
                },
              },
            });
          })
        );

        const salesContact = await tx.contact.update({
          where: {
            id: orderPre?.ContactOrder.find((x) => x.orderNo === 1)?.contact
              ?.id,
          },
          data: {
            firstName: input.personalContact.firstName,
            lastName: input.personalContact.lastName,
            jobPosition: input.personalContact.jobPosition,
            email: input.personalContact.email,
            phoneNumber: input.personalContact.phone,
          },
        });
        const order = await tx.order.update({
          where: {
            id: input.orderId,
          },
          data: {
          inductionDateTime: new Date(input.inductionStart),
          commentToRotation: input.commentToRotation,
          commentToNumbersOfWorker: input.commentToNumbersOfWorker,
            orgaNumber: input.orgaNumber,
            start: setHours(new Date(input.projectDuration.from), 7),
            estimatedDuration: intervalToDuration({start: new Date(input.projectDuration.from), end: new Date(input.projectDuration.to)}).weeks + " weeks",
            end: new Date(input.projectDuration.to),
            invoiceEmail: input.invoicingEmail,
            vatNumber: input.vatNumber,
            answered: true,
            Project: {
              ...{
                    update: {
                      name: input.projectName,
                      type: {
                        connectOrCreate: {
                          where: {
                            name: input.typeOfProject,
                          },
                          create: {
                            name: input.typeOfProject,
                          },
                        },
                      },
                      address: {
                        create: {
                          city: input.projectAddress.city,
                          streetNo: input.projectAddress.streetNo,
                          postCode: input.projectAddress.postalCode,
                          country: input.projectAddress.country,
                          coordinates: {
                            create: {
                              lat:
                                Math.round(
                                  (projectAddress[0]?.lat || 1) * 1000
                                ) / 1000,
                              lng:
                                Math.round(
                                  (projectAddress[0]?.lon || 1) * 1000
                                ) / 1000,
                            },
                          },
                        },
                      },
                    },
                  },
            },
            client: {
              ...(client
                ? {
                    connect: {
                      id: client.id,
                    },
                  }
                : {
                    create: {
                      name: input.officialCompanyName,
                      company: {
                        connect: {
                          id: orderPre?.client.company.id,
                        },
                      },
                      address: {
                        create: {
                          city: input.companyAddress.city,
                          streetNo: input.companyAddress.streetNo,
                          postCode: input.companyAddress.postalCode,
                          country: input.companyAddress.country,
                          coordinates: {
                            create: {
                              lat:
                                Math.round(
                                  (clientAddress[0]?.lat || 1) * 1000
                                ) / 1000,
                              lng:
                                Math.round(
                                  (clientAddress[0]?.lat || 1) * 1000
                                ) / 1000,
                            },
                          },
                        },
                      },
                    },
                  }),
            },
            deliveryAddress: {
              create: {
                city: input.deliveryAddress?.city ? input.deliveryAddress.city : input.projectAddress.city,
                streetNo: input.deliveryAddress?.city ? input.deliveryAddress.streetNo : input.projectAddress.streetNo,
                postCode: input.deliveryAddress?.city ? input.deliveryAddress.postalCode : input.projectAddress.postalCode,
                country: input.deliveryAddress?.city ? input.deliveryAddress.country : input.projectAddress.country,
                coordinates: {
                  create: {
                    lat:
                      Math.round(((input.deliveryAddress?.city ? deliveryAddress[0]?.lat : projectAddress[0]?.lat) || 1) * 1000) / 1000,
                    lng:
                      Math.round(((input.deliveryAddress?.city ? deliveryAddress[0]?.lat : projectAddress[0]?.lon) || 1) * 1000) / 1000,
                  },
                },
              },
            },
            inductionAddress: {
              create: {
                city: input.inductionAddress?.city ? input.inductionAddress.city : input.projectAddress.city,
                streetNo: input.inductionAddress?.city ? input.inductionAddress.streetNo : input.projectAddress.streetNo,
                postCode: input.inductionAddress?.city ? input.inductionAddress.postalCode : input.projectAddress.postalCode,
                country: input.inductionAddress?.city ? input.inductionAddress.country : input.projectAddress.country,
                coordinates: {
                  create: {
                    lat:
                      Math.round(((input.inductionAddress?.city ? inductionAddress[0]?.lat : projectAddress[0]?.lat) || 1) * 1000) / 1000,
                    lng:
                      Math.round(((input.inductionAddress?.city ? inductionAddress[0]?.lat : projectAddress[0]?.lon) || 1) * 1000) / 1000,
                  },
                },
              }
            },  
            invoicingAddress: {
              create: {
                city: input.invoicingAddress.city,
                streetNo: input.invoicingAddress.streetNo,
                postCode: input.invoicingAddress.postalCode,
                country: input.invoicingAddress.country,
                coordinates: {
                  create: {
                    lat:
                      Math.round((invoicingAddress[0]?.lat || 1) * 1000) / 1000,
                    lng:
                      Math.round((invoicingAddress[0]?.lat || 1) * 1000) / 1000,
                  },
                },
              },
            },
            projectAddress: {
              create: {
                city: input.projectAddress.city,
                streetNo: input.projectAddress.streetNo,
                postCode: input.projectAddress.postalCode,
                country: input.projectAddress.country,
                coordinates: {
                  create: {
                    lat:
                      Math.round((projectAddress[0]?.lat || 1) * 1000) / 1000,
                    lng:
                      Math.round((projectAddress[0]?.lat || 1) * 1000) / 1000,
                  },
                },
              },
            },
            meetingPerson: {
              create: {
                email: input.meetingPerson.email,
                firstName: input.meetingPerson.firstName,
                lastName: input.meetingPerson.lastName,
                jobPosition: input.meetingPerson.jobPosition,
                phoneNumber: input.meetingPerson.phone,
                companyID: orderPre?.client.company.id,
              },
            },
          },
        });

        await Promise.all(
          input.performedWork.map(async (item, idx) => {
            await tx.workPerformed.create({
              data: {
                order: {
                  connect: {
                    id: order.id,
                  },
                },
                work: {
                  connectOrCreate: {
                    where: {
                      name: item,
                    },
                    create: {
                      name: item,
                    },
                  },
                },
              },
            });
          })
        );

        await Promise.all(
          input.workerNeeded.map(async (item, idx) => {
            await tx.workerRequired.create({
              data: {
                order: {
                  connect: {
                    id: order.id,
                  },
                },
                jobRole: {
                  connectOrCreate: {
                    where: {
                      name: item,
                    },
                    create: {
                      name: item,
                    },
                  },
                },
                quantity: input.workerOnSite[item],
              },
            });
          })
        );

        await Promise.all(
          input.requiredTrainingCourses.map(async (item, idx) => {
            await tx.trainingCourseRequired.create({
              data: {
                order: {
                  connect: {
                    id: order.id,
                  },
                },
                course: {
                  connectOrCreate: {
                    where: {
                      name: item.replace(/[^a-zA-Z]/g, ''),
                    },
                    create: {
                      name: item.replace(/[^a-zA-Z]/g, ''),
                    },
                  },
                },
              },
            });
          })
        );

        await Promise.all(
          input.inductionForms.map(async (item, idx) => {
            await tx.inductionForm.create({
              data: {
                order: {
                  connect: {
                    id: order.id,
                  },
                },
                file: {
                  create: {
                    name: item.filename,
                    uri: item.uri,
                  },
                },
              },
            });
          })
        );
      });
    }),
  registerWebAuthN: t.procedure
    .input(z.object({
      id: z.string(),
      secret: z.string(),
    }))
    .mutation(async (req) => {
      const { input } = req;
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(input.secret, salt);
      return await prisma.webAuthN.update({
        where: {
          id: input.id,
        },
        data: {
          webauthnSecret: hashed,
          otp: null,
        },
      });
    }),
  addCompany: t.procedure
    .input(z.object({
      name: z.string(),
      workingField: z.string(),
      email: z.string(),
      phone: z.string(),
      address: z.object({
        city: z.string(),
        streetNo: z.string(),
        postalCode: z.string(),
        country: z.string(),
      }),
    })).mutation(async (req) => {
      const { input } = req;

      const cadr = await fetch(
        `https://nominatim.openstreetmap.org/?addressdetails=1&q=${input.address.streetNo}+${input.address.postalCode}+${input.address.city}+${input.address.country}&format=json&limit=1`,
        { method: "GET" }

      );
      const companyAddress: NominatimResponseProps = await cadr.json();
      return await prisma.company.create({
        data: {
          email: input.email,
          name: input.name,
          phone: input.phone,
          workingField: input.workingField,
          address: {
            create: {
              city: input.address.city,
              streetNo: input.address.streetNo,
              postCode: input.address.postalCode,
              country: input.address.country,
              coordinates: {
                create: {
                  lat: Math.round(companyAddress[0]?.lat || 1 * 1000) / 1000,
                  lng: Math.round(companyAddress[0]?.lon || 1 * 1000) / 1000,
                }
              }
            },
          }
        }
      })
    }),
  checkWebAuthN: t.procedure
    .input(z.object({
      email: z.string(),
      secret: z.string(),
    })).mutation(async (req) => {
      const { input } = req;
      const account = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
        include: {
          department: true,
          color: true,
          WebAuthN: true,
        }
      })
      if(!account || !account.WebAuthN || !account.WebAuthN.webauthnSecret) return null;

      const comp = await bcrypt.compare(input.secret, account.WebAuthN.webauthnSecret);
      if(!comp) return null;

      return account;
    })
});

export type AppRouter = typeof appRouter;
