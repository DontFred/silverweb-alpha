
export type NominatimResponseProps = [
  {
    place_id: number,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: string,
    osm_id: number,
    boundingbox: string[],
    lat:number,
    lon: number,
    display_name:
      string,
    class: string,
    type: string,
    importance: number,
    icon: string,
    address: {
      shop: string,
      road: string,
      neighbourhood: string,
      suburb: string,
      borough: string,
      city: string,
      "ISO3166-2-lvl4": string,
      postcode: string,
      country: string,
      country_code: string,
    },
  },
] | [];

