import { z } from "zod";
import { NominatimResponseProps } from "../../../../../type";

export const addressSchema = z.object({
    streetNo: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }, {
    required_error: "Please enter an Address",
  }).refine(async (address) => {
        const r = await fetch(`https://nominatim.openstreetmap.org/?addressdetails=1&q=${address.streetNo}+${
        address.postalCode
      }+${address.city}+${address.country}&format=json&limit=1`,
      { method: "GET" }
    );
    const result: NominatimResponseProps = await r.json();

    return result.length != 0;
  },
  {
    message: "Please enter a valid Address",
  })