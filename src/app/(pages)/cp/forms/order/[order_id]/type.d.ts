import { Prisma } from "@prisma/client"

export type OrderProps = Prisma.OrderGetPayload<{
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
  }>

export type FormDataProps = {
  commentToRotation: string, 
  commentToNumbersOfWorker: string, 
  inductionStart: string,
  authCode: string,
  officialCompanyName: string,
  companyAddress: {
      streetNo: string,
      city: string,
      postalCode: string,
      country: string
  },
  personalContact: {
      firstName: string,
      lastName: string,
      jobPosition: string,
      email: string,
      phone: string
  },
  projectName: string,
  projectAddress: {
      streetNo: string,
      city: string,
      postalCode: string,
      country: string
  },
  performedWork: string[],
  workerNeeded: string[],
  confirmRotation: string[],
  projectStart: string,
  projectDuration: {
    from: string,
    to: string
  },
  requiredTrainingCourses: string[],
  inductionForms: 
      {
          filename: string,
          uri: string
      }[]
  ,
  typeOfProject: string,
  meetingPerson: {
      firstName: string,
      lastName: string,
      jobPosition: string,
      email: string,
      phone: string
  },
  deliveryAddress: {
      streetNo: string,
      city: string,
      postalCode: string,
      country: string
  },
  confirmPayterm: string[],
  invoicingAddress: {
      streetNo: string,
      city: string,
      postalCode: string,
      country: string
  },
  orgaNumber: string,
  vatNumber: string,
  confirmChargerates: string[],
  confirmOTChargerates: string[],
  colleaguesContactDetails: 
      {
              phone: string,
              firstName: string,
              lastName: string,
              jobPosition: string,
              email: string
      }[]
  ,
  workerOnSite: Record<string, number>,
  invoicingEmail: string
}