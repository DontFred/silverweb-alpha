import { z } from "zod";
import { NominatimResponseProps } from "../../../../../type";

export const addressSchema = z
  .object(
    {
      streetNo: z.string(),
      city: z.string(),
      postalCode: z.string(),
      country: z.string(),
    },
    {
      required_error: "Please enter an Address",
    }
  )
  .refine(
    async (address) => {

      if(!address.streetNo || !address.city || !address.postalCode || !address.country) return false;
      setTimeout(async () => {
        const r = await fetch(
          `https://nominatim.openstreetmap.org/?addressdetails=1&q=${address.streetNo}+${address.postalCode}+${address.city}+${address.country}&format=json&limit=1`,
          { method: "GET" }
        );
        const result: NominatimResponseProps = await r.json();
  
        return result.length != 0;
      }, 1000)
    },
    {
      message: "Please enter a valid Address",
    }
  );

export const contactSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  jobPosition: z.string(),
  email: z.string(),
  phone: z.string(),
});

export const fileSchema = z.array(z.object({
  filename: z.string(),
  uri: z.string(),
}))

export const checkboxSchema = z.array(z.string())

export const dateRangeSchema = z.object({
  from: z.string(),
  to: z.string(),
})

