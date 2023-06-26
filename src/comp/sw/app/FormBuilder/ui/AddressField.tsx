import { Grid, Spacer } from "@nextui-org/react";
import TextField from "./TextField";
import SelectField from "./SelectField";
import { AddressFieldProps } from "../types";
import Nominatim from "nominatim-client";
import { useFormContext } from "react-hook-form";

/**
 * Renders an address form with street number, city, postal code, and country fields.
 *
 * @param {AddressFieldProps & { name: string }} props - AddressField component props
 * @return {JSX.Element} The rendered address form
 */
export default function AddressField(
  props: AddressFieldProps & { name: string }
) {
  const { watch, setError, clearErrors } = useFormContext();

  const { name, option } = props;

  /**
   * Asynchronously checks if the provided address is valid.
   *
   * @return {Promise<void>} A Promise that resolves when the function completes.
   */
  // async function checkAddress() {
  //   const result = await Nominatim.createClient({
  //     useragent: "SilverWeb",
  //     referer: `${process.env.NEXT_PUBLIC_HOST_DOMAIN}`,
  //   }).search({
  //     q: `${watch(name).streetNo}, ${watch(name).postalCode} ${
  //       watch(name).city
  //     }, ${watch(name).country}`,
  //     addressdetails: 1,
  //   });
  //   if (result.length != 0) {
  //     clearErrors(name);
  //     return false
  //   } else {
  //     setError(name + ".streetNo", {
  //       type: "validate",
  //       message: "Please enter a valid Address",
  //     });
  //     setError(name + ".postalCode", {
  //       type: "validate",
  //       message: "Please enter a valid Address",
  //     });
  //     setError(name + ".city", {
  //       type: "validate",
  //       message: "Please enter a valid Address",
  //     });
  //     setError(name + ".country", {
  //       type: "validate",
  //       message: "Please enter a valid Address",
  //     });
  //     return "Please enter a valid Address"
  //   }
  // }

  return (
    <Grid.Container>
      <Grid xs={12}>
        <TextField
          name={`${name}.streetNo`}
          label="Street No."
          type="text"
          option={option}
        />
      </Grid>
      <Grid xs={12}>
        <Spacer y={1} />
      </Grid>
      <Grid xs>
        <TextField
          name={`${name}.city`}
          label="City"
          type="text"
          option={option}
        />
      </Grid>
      <Grid>
        <Spacer x={1} />
      </Grid>
      <Grid xs>
        <TextField
          name={`${name}.postalCode`}
          label="Post. code"
          type="text"
          option={option}
        />
      </Grid>
      <Grid xs={12}>
        <Spacer y={1} />
      </Grid>
      <Grid xs={12}>
        <SelectField
          name={`${name}.country`}
          label="Country"
          type="select"
          items={{
            Estimated: ["Sweden", "Denmark", "Norway", "Ireland", "Poland"],
            Africa: [
              "Algeria",
              "Angola",
              "Benin",
              "Botswana",
              "Burkina Faso",
              "Burundi",
              "Cabo Verde",
              "Cameroon",
              "Central African Republic",
              "Chad",
              "Comoros",
              "Democratic Republic of the Congo",
              "Republic of the Congo",
              "Djibouti",
              "Egypt",
              "Equatorial Guinea",
              "Eritrea",
              "Eswatini",
              "Ethiopia",
              "Gabon",
              "Gambia",
              "Ghana",
              "Guinea",
              "Guinea-Bissau",
              "Ivory Coast",
              "Kenya",
              "Lesotho",
              "Liberia",
              "Libya",
              "Madagascar",
              "Malawi",
              "Mali",
              "Mauritania",
              "Mauritius",
              "Morocco",
              "Mozambique",
              "Namibia",
              "Niger",
              "Nigeria",
              "Rwanda",
              "Sao Tome and Principe",
              "Senegal",
              "Seychelles",
              "Sierra Leone",
              "Somalia",
              "South Africa",
              "South Sudan",
              "Sudan",
              "Tanzania",
              "Togo",
              "Tunisia",
              "Uganda",
              "Zambia",
              "Zimbabwe",
            ],
            Asia: [
              "Afghanistan",
              "Armenia",
              "Azerbaijan",
              "Bahrain",
              "Bangladesh",
              "Bhutan",
              "Brunei",
              "Cambodia",
              "China",
              "Cyprus",
              "Georgia",
              "India",
              "Indonesia",
              "Iran",
              "Iraq",
              "Israel",
              "Japan",
              "Jordan",
              "Kazakhstan",
              "Kuwait",
              "Kyrgyzstan",
              "Laos",
              "Lebanon",
              "Malaysia",
              "Maldives",
              "Mongolia",
              "Myanmar",
              "Nepal",
              "North Korea",
              "Oman",
              "Pakistan",
              "Palestine",
              "Philippines",
              "Qatar",
              "Russia",
              "Saudi Arabia",
              "Singapore",
              "South Korea",
              "Sri Lanka",
              "Syria",
              "Taiwan",
              "Tajikistan",
              "Thailand",
              "Timor-Leste",
              "Turkey",
              "Turkmenistan",
              "United Arab Emirates",
              "Uzbekistan",
              "Vietnam",
              "Yemen",
            ],
            Europe: [
              "Albania",
              "Andorra",
              "Austria",
              "Belarus",
              "Belgium",
              "Bosnia and Herzegovina",
              "Bulgaria",
              "Croatia",
              "Cyprus",
              "Czech Republic",
              "Denmark",
              "Estonia",
              "Finland",
              "France",
              "Germany",
              "Greece",
              "Hungary",
              "Iceland",
              "Ireland",
              "Italy",
              "Kosovo",
              "Latvia",
              "Liechtenstein",
              "Lithuania",
              "Luxembourg",
              "Malta",
              "Moldova",
              "Monaco",
              "Montenegro",
              "Netherlands",
              "North Macedonia",
              "Norway",
              "Poland",
              "Portugal",
              "Romania",
              "Russia",
              "San Marino",
              "Serbia",
              "Slovakia",
              "Slovenia",
              "Spain",
              "Sweden",
              "Switzerland",
              "Ukraine",
              "United Kingdom",
              "Vatican City",
            ],
            "North America": [
              "Antigua and Barbuda",
              "Bahamas",
              "Barbados",
              "Belize",
              "Canada",
              "Costa Rica",
              "Cuba",
              "Dominica",
              "Dominican Republic",
              "El Salvador",
              "Grenada",
              "Guatemala",
              "Haiti",
              "Honduras",
              "Jamaica",
              "Mexico",
              "Nicaragua",
              "Panama",
              "Saint Kitts and Nevis",
              "Saint Lucia",
              "Saint Vincent and the Grenadines",
              "Trinidad and Tobago",
              "United States",
            ],
            Oceania: [
              "Australia",
              "Fiji",
              "Kiribati",
              "Marshall Islands",
              "Micronesia",
              "Nauru",
              "New Zealand",
              "Palau",
              "Papua New Guinea",
              "Samoa",
              "Solomon Islands",
              "Tonga",
              "Tuvalu",
              "Vanuatu",
            ],
            "South America": [
              "Argentina",
              "Bolivia",
              "Brazil",
              "Chile",
              "Colombia",
              "Ecuador",
              "Guyana",
              "Paraguay",
              "Peru",
              "Suriname",
              "Uruguay",
              "Venezuela",
            ],
          }}
          option={{...option, validate: {
            ...option?.validate,
            checkAddress: async (_, ) => {
              try {
                if(watch(name).streetNo && watch(name).postalCode && watch(name).city && watch(name).country) {
                  const result = await Nominatim.createClient({
                        useragent: "SilverWeb Nominatim" + name,
                        referer: `${process.env.NEXT_PUBLIC_HOST_DOMAIN}`,
                      }).search({
                        q: `${watch(name).streetNo}, ${watch(name).postalCode} ${
                          watch(name).city
                        }, ${watch(name).country}`,
                        addressdetails: 1,
                      });
                      console.log(result, "result")
                      if (result.length != 0) {
                        clearErrors(name);
                        return false
                      } else {
                        setError(name + ".streetNo", {
                          type: "validate",
                          message: "Please enter a valid Address",
                        });
                        setError(name + ".postalCode", {
                          type: "validate",
                          message: "Please enter a valid Address",
                        });
                        setError(name + ".city", {
                          type: "validate",
                          message: "Please enter a valid Address",
                        });
                        setError(name + ".country", {
                          type: "validate",
                          message: "Please enter a valid Address",
                        });
                        return "Please enter a valid Address"
                      }
                      
                }
              } catch (error) {
                console.error(error, "error");
                return true
              }
            }, 
          }}}
        />
      </Grid>
    </Grid.Container>
  );
}
