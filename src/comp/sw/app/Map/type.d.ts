export type MarkerProps = {
        id: string,
        name: string,
        company: string,
        type: 
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
          "Windfarm"
        ,
        address: {
          lat: number,
          lng: number,
        }
      }