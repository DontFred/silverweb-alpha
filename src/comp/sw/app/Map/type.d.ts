import { Decimal } from "@prisma/client/runtime"

export type MarkerProps = {
        id?: string,
        name: string,
        company?: string,
        type?: 
          "Apartments" |
          "Battery Factory" |
          "Data Centre" |
          "Hospital" |
          "Mine" |
          "Museum" |
          "Paper Mill" |
          "Pre-Cast Factory" |
          "School" |
          "Shopping Centre" |
          "Windfarm" |
          string
        ,
        address: {
          lat: number,
          lng: number,
        }
      } 