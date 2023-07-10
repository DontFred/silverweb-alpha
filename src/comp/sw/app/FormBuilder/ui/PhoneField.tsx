import {
  CSS,
  Container,
  FormElement,
  Grid,
  Input,
  Popover,
  Spacer,
  Text,
} from "@nextui-org/react";
import { Check, Play } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, Fragment, useRef, useState } from "react";
import StyleObject from "csstype";
import { PhoneFieldProps } from "../types";
import { useController, useFormContext, useWatch } from "react-hook-form";
import TooltipHelper from "./TooltipHelper";

type PrefixEntry = { country: string; name: string; prefix: string };

const NumberPrefix: PrefixEntry[] = [
  {
    name: "Afghanistan",
    prefix: "+93",
    country: "af",
  },
  {
    name: "Albania",
    prefix: "+355",
    country: "al",
  },
  {
    name: "Algeria",
    prefix: "+213",
    country: "dz",
  },
  {
    name: "American Samoa",
    prefix: "+1-684",
    country: "as",
  },
  {
    name: "Andorra",
    prefix: "+376",
    country: "ad",
  },
  {
    name: "Angola",
    prefix: "+244",
    country: "ao",
  },
  {
    name: "Anguilla",
    prefix: "+1-264",
    country: "ai",
  },
  {
    name: "Antarctica",
    prefix: "+672",
    country: "aq",
  },
  {
    name: "Antigua and Barbuda",
    prefix: "+1-268",
    country: "ag",
  },
  {
    name: "Argentina",
    prefix: "+54",
    country: "ar",
  },
  {
    name: "Armenia",
    prefix: "+374",
    country: "am",
  },
  {
    name: "Aruba",
    prefix: "+297",
    country: "aw",
  },
  {
    name: "Australia",
    prefix: "+61",
    country: "au",
  },
  {
    name: "Austria",
    prefix: "+43",
    country: "at",
  },
  {
    name: "Azerbaijan",
    prefix: "+994",
    country: "az",
  },
  {
    name: "Bahamas",
    prefix: "+1-242",
    country: "bs",
  },
  {
    name: "Bahrain",
    prefix: "+973",
    country: "bh",
  },
  {
    name: "Bangladesh",
    prefix: "+880",
    country: "bd",
  },
  {
    name: "Barbados",
    prefix: "+1-246",
    country: "bb",
  },
  {
    name: "Belarus",
    prefix: "+375",
    country: "by",
  },
  {
    name: "Belgium",
    prefix: "+32",
    country: "be",
  },
  {
    name: "Belize",
    prefix: "+501",
    country: "bz",
  },
  {
    name: "Benin",
    prefix: "+229",
    country: "bj",
  },
  {
    name: "Bermuda",
    prefix: "+1-441",
    country: "bm",
  },
  {
    name: "Bhutan",
    prefix: "+975",
    country: "bt",
  },
  {
    name: "Bolivia",
    prefix: "+591",
    country: "bo",
  },
  {
    name: "Bosnia and Herzegovina",
    prefix: "+387",
    country: "ba",
  },
  {
    name: "Botswana",
    prefix: "+267",
    country: "bw",
  },
  {
    name: "Brazil",
    prefix: "+55",
    country: "br",
  },
  {
    name: "British Indian Ocean Territory",
    prefix: "+246",
    country: "io",
  },
  {
    name: "British Virgin Islands",
    prefix: "+1-284",
    country: "vg",
  },
  {
    name: "Brunei",
    prefix: "+673",
    country: "bn",
  },
  {
    name: "Bulgaria",
    prefix: "+359",
    country: "bg",
  },
  {
    name: "Burkina Faso",
    prefix: "+226",
    country: "bf",
  },
  {
    name: "Burundi",
    prefix: "+257",
    country: "bi",
  },
  {
    name: "Cambodia",
    prefix: "+855",
    country: "kh",
  },
  {
    name: "Cameroon",
    prefix: "+237",
    country: "cm",
  },
  {
    name: "Canada",
    prefix: "+1",
    country: "ca",
  },
  {
    name: "Cape Verde",
    prefix: "+238",
    country: "cv",
  },
  {
    name: "Cayman Islands",
    prefix: "+1-345",
    country: "ky",
  },
  {
    name: "Central African Republic",
    prefix: "+236",
    country: "cf",
  },
  {
    name: "Chad",
    prefix: "+235",
    country: "td",
  },
  {
    name: "Chile",
    prefix: "+56",
    country: "cl",
  },
  {
    name: "China",
    prefix: "+86",
    country: "cn",
  },
  {
    name: "Christmas Island",
    prefix: "+61",
    country: "cx",
  },
  {
    name: "Cocos Islands",
    prefix: "+61",
    country: "cc",
  },
  {
    name: "Colombia",
    prefix: "+57",
    country: "co",
  },
  {
    name: "Comoros",
    prefix: "+269",
    country: "km",
  },
  {
    name: "Cook Islands",
    prefix: "+682",
    country: "ck",
  },
  {
    name: "Costa Rica",
    prefix: "+506",
    country: "cr",
  },
  {
    name: "Croatia",
    prefix: "+385",
    country: "hr",
  },
  {
    name: "Cuba",
    prefix: "+53",
    country: "cu",
  },
  {
    name: "Curacao",
    prefix: "+599",
    country: "cw",
  },
  {
    name: "Cyprus",
    prefix: "+357",
    country: "cy",
  },
  {
    name: "Czech Republic",
    prefix: "+420",
    country: "cz",
  },
  {
    name: "Democratic Republic of the Congo",
    prefix: "+243",
    country: "cd",
  },
  {
    name: "Denmark",
    prefix: "+45",
    country: "dk",
  },
  {
    name: "Djibouti",
    prefix: "+253",
    country: "dj",
  },
  {
    name: "Dominica",
    prefix: "+1-767",
    country: "dm",
  },
  {
    name: "Dominican Republic",
    prefix: "+1-809, 1-829, 1-849",
    country: "do",
  },
  {
    name: "East Timor",
    prefix: "+670",
    country: "tl",
  },
  {
    name: "Ecuador",
    prefix: "+593",
    country: "ec",
  },
  {
    name: "Egypt",
    prefix: "+20",
    country: "eg",
  },
  {
    name: "El Salvador",
    prefix: "+503",
    country: "sv",
  },
  {
    name: "Equatorial Guinea",
    prefix: "+240",
    country: "gq",
  },
  {
    name: "Eritrea",
    prefix: "+291",
    country: "er",
  },
  {
    name: "Estonia",
    prefix: "+372",
    country: "ee",
  },
  {
    name: "Ethiopia",
    prefix: "+251",
    country: "et",
  },
  {
    name: "Falkland Islands",
    prefix: "+500",
    country: "fk",
  },
  {
    name: "Faroe Islands",
    prefix: "+298",
    country: "fo",
  },
  {
    name: "Fiji",
    prefix: "+679",
    country: "fj",
  },
  {
    name: "Finland",
    prefix: "+358",
    country: "fi",
  },
  {
    name: "France",
    prefix: "+33",
    country: "fr",
  },
  {
    name: "French Polynesia",
    prefix: "+689",
    country: "pf",
  },
  {
    name: "Gabon",
    prefix: "+241",
    country: "ga",
  },
  {
    name: "Gambia",
    prefix: "+220",
    country: "gm",
  },
  {
    name: "Georgia",
    prefix: "+995",
    country: "ge",
  },
  {
    name: "Germany",
    prefix: "+49",
    country: "de",
  },
  {
    name: "Ghana",
    prefix: "+233",
    country: "gh",
  },
  {
    name: "Gibraltar",
    prefix: "+350",
    country: "gi",
  },
  {
    name: "Greece",
    prefix: "+30",
    country: "gr",
  },
  {
    name: "Greenland",
    prefix: "+299",
    country: "gl",
  },
  {
    name: "Grenada",
    prefix: "+1-473",
    country: "gd",
  },
  {
    name: "Guam",
    prefix: "+1-671",
    country: "gu",
  },
  {
    name: "Guatemala",
    prefix: "+502",
    country: "gt",
  },
  {
    name: "Guernsey",
    prefix: "+44-1481",
    country: "gg",
  },
  {
    name: "Guinea",
    prefix: "+224",
    country: "gn",
  },
  {
    name: "Guinea-Bissau",
    prefix: "+245",
    country: "gw",
  },
  {
    name: "Guyana",
    prefix: "+592",
    country: "gy",
  },
  {
    name: "Haiti",
    prefix: "+509",
    country: "ht",
  },
  {
    name: "Honduras",
    prefix: "+504",
    country: "hn",
  },
  {
    name: "Hong Kong",
    prefix: "+852",
    country: "hk",
  },
  {
    name: "Hungary",
    prefix: "+36",
    country: "hu",
  },
  {
    name: "Iceland",
    prefix: "+354",
    country: "is",
  },
  {
    name: "India",
    prefix: "+91",
    country: "in",
  },
  {
    name: "Indonesia",
    prefix: "+62",
    country: "id",
  },
  {
    name: "Iran",
    prefix: "+98",
    country: "ir",
  },
  {
    name: "Iraq",
    prefix: "+964",
    country: "iq",
  },
  {
    name: "Ireland",
    prefix: "+353",
    country: "ie",
  },
  {
    name: "Isle of Man",
    prefix: "+44-1624",
    country: "im",
  },
  {
    name: "Israel",
    prefix: "+972",
    country: "il",
  },
  {
    name: "Italy",
    prefix: "+39",
    country: "it",
  },
  {
    name: "Ivory Coast",
    prefix: "+225",
    country: "ci",
  },
  {
    name: "Jamaica",
    prefix: "+1-876",
    country: "jm",
  },
  {
    name: "Japan",
    prefix: "+81",
    country: "jp",
  },
  {
    name: "Jersey",
    prefix: "+44-1534",
    country: "je",
  },
  {
    name: "Jordan",
    prefix: "+962",
    country: "jo",
  },
  {
    name: "Kazakhstan",
    prefix: "+7",
    country: "kz",
  },
  {
    name: "Kenya",
    prefix: "+254",
    country: "ke",
  },
  {
    name: "Kiribati",
    prefix: "+686",
    country: "ki",
  },
  {
    name: "Kosovo",
    prefix: "+383",
    country: "xk",
  },
  {
    name: "Kuwait",
    prefix: "+965",
    country: "kw",
  },
  {
    name: "Kyrgyzstan",
    prefix: "+996",
    country: "kg",
  },
  {
    name: "Laos",
    prefix: "+856",
    country: "la",
  },
  {
    name: "Latvia",
    prefix: "+371",
    country: "lv",
  },
  {
    name: "Lebanon",
    prefix: "+961",
    country: "lb",
  },
  {
    name: "Lesotho",
    prefix: "+266",
    country: "ls",
  },
  {
    name: "Liberia",
    prefix: "+231",
    country: "lr",
  },
  {
    name: "Libya",
    prefix: "+218",
    country: "ly",
  },
  {
    name: "Liechtenstein",
    prefix: "+423",
    country: "li",
  },
  {
    name: "Lithuania",
    prefix: "+370",
    country: "lt",
  },
  {
    name: "Luxembourg",
    prefix: "+352",
    country: "lu",
  },
  {
    name: "Macao",
    prefix: "+853",
    country: "mo",
  },
  {
    name: "Macedonia",
    prefix: "+389",
    country: "mk",
  },
  {
    name: "Madagascar",
    prefix: "+261",
    country: "mg",
  },
  {
    name: "Malawi",
    prefix: "+265",
    country: "mw",
  },
  {
    name: "Malaysia",
    prefix: "+60",
    country: "my",
  },
  {
    name: "Maldives",
    prefix: "+960",
    country: "mv",
  },
  {
    name: "Mali",
    prefix: "+223",
    country: "ml",
  },
  {
    name: "Malta",
    prefix: "+356",
    country: "mt",
  },
  {
    name: "Marshall Islands",
    prefix: "+692",
    country: "mh",
  },
  {
    name: "Mauritania",
    prefix: "+222",
    country: "mr",
  },
  {
    name: "Mauritius",
    prefix: "+230",
    country: "mu",
  },
  {
    name: "Mayotte",
    prefix: "+262",
    country: "yt",
  },
  {
    name: "Mexico",
    prefix: "+52",
    country: "mx",
  },
  {
    name: "Micronesia",
    prefix: "+691",
    country: "fm",
  },
  {
    name: "Moldova",
    prefix: "+373",
    country: "md",
  },
  {
    name: "Monaco",
    prefix: "+377",
    country: "mc",
  },
  {
    name: "Mongolia",
    prefix: "+976",
    country: "mn",
  },
  {
    name: "Montenegro",
    prefix: "+382",
    country: "me",
  },
  {
    name: "Montserrat",
    prefix: "+1-664",
    country: "ms",
  },
  {
    name: "Morocco",
    prefix: "+212",
    country: "ma",
  },
  {
    name: "Mozambique",
    prefix: "+258",
    country: "mz",
  },
  {
    name: "Myanmar",
    prefix: "+95",
    country: "mm",
  },
  {
    name: "Namibia",
    prefix: "+264",
    country: "na",
  },
  {
    name: "Nauru",
    prefix: "+674",
    country: "nr",
  },
  {
    name: "Nepal",
    prefix: "+977",
    country: "np",
  },
  {
    name: "Netherlands",
    prefix: "+31",
    country: "nl",
  },
  {
    name: "Netherlands Antilles",
    prefix: "+599",
    country: "an",
  },
  {
    name: "New Caledonia",
    prefix: "+687",
    country: "nc",
  },
  {
    name: "New Zealand",
    prefix: "+64",
    country: "nz",
  },
  {
    name: "Nicaragua",
    prefix: "+505",
    country: "ni",
  },
  {
    name: "Niger",
    prefix: "+227",
    country: "ne",
  },
  {
    name: "Nigeria",
    prefix: "+234",
    country: "ng",
  },
  {
    name: "Niue",
    prefix: "+683",
    country: "nu",
  },
  {
    name: "North Korea",
    prefix: "+850",
    country: "kp",
  },
  {
    name: "Northern Mariana Islands",
    prefix: "+1-670",
    country: "mp",
  },
  {
    name: "Norway",
    prefix: "+47",
    country: "no",
  },
  {
    name: "Oman",
    prefix: "+968",
    country: "om",
  },
  {
    name: "Pakistan",
    prefix: "+92",
    country: "pk",
  },
  {
    name: "Palau",
    prefix: "+680",
    country: "pw",
  },
  {
    name: "Palestine",
    prefix: "+970",
    country: "ps",
  },
  {
    name: "Panama",
    prefix: "+507",
    country: "pa",
  },
  {
    name: "Papua New Guinea",
    prefix: "+675",
    country: "pg",
  },
  {
    name: "Paraguay",
    prefix: "+595",
    country: "py",
  },
  {
    name: "Peru",
    prefix: "+51",
    country: "pe",
  },
  {
    name: "Philippines",
    prefix: "+63",
    country: "ph",
  },
  {
    name: "Pitcairn",
    prefix: "+64",
    country: "pn",
  },
  {
    name: "Poland",
    prefix: "+48",
    country: "pl",
  },
  {
    name: "Portugal",
    prefix: "+351",
    country: "pt",
  },
  {
    name: "Puerto Rico",
    prefix: "+1-787, 1-939",
    country: "pr",
  },
  {
    name: "Qatar",
    prefix: "+974",
    country: "qa",
  },
  {
    name: "Republic of the Congo",
    prefix: "+242",
    country: "cg",
  },
  {
    name: "Reunion",
    prefix: "+262",
    country: "re",
  },
  {
    name: "Romania",
    prefix: "+40",
    country: "ro",
  },
  {
    name: "Russia",
    prefix: "+7",
    country: "ru",
  },
  {
    name: "Rwanda",
    prefix: "+250",
    country: "rw",
  },
  {
    name: "Saint Barthelemy",
    prefix: "+590",
    country: "bl",
  },
  {
    name: "Saint Helena",
    prefix: "+290",
    country: "sh",
  },
  {
    name: "Saint Kitts and Nevis",
    prefix: "+1-869",
    country: "kn",
  },
  {
    name: "Saint Lucia",
    prefix: "+1-758",
    country: "lc",
  },
  {
    name: "Saint Martin",
    prefix: "+590",
    country: "mf",
  },
  {
    name: "Saint Pierre and Miquelon",
    prefix: "+508",
    country: "pm",
  },
  {
    name: "Saint Vincent and the Grenadines",
    prefix: "+1-784",
    country: "vc",
  },
  {
    name: "Samoa",
    prefix: "+685",
    country: "ws",
  },
  {
    name: "San Marino",
    prefix: "+378",
    country: "sm",
  },
  {
    name: "Sao Tome and Principe",
    prefix: "+239",
    country: "st",
  },
  {
    name: "Saudi Arabia",
    prefix: "+966",
    country: "sa",
  },
  {
    name: "Senegal",
    prefix: "+221",
    country: "sn",
  },
  {
    name: "Serbia",
    prefix: "+381",
    country: "rs",
  },
  {
    name: "Seychelles",
    prefix: "+248",
    country: "sc",
  },
  {
    name: "Sierra Leone",
    prefix: "+232",
    country: "sl",
  },
  {
    name: "Singapore",
    prefix: "+65",
    country: "sg",
  },
  {
    name: "Sint Maarten",
    prefix: "+1-721",
    country: "sx",
  },
  {
    name: "Slovakia",
    prefix: "+421",
    country: "sk",
  },
  {
    name: "Slovenia",
    prefix: "+386",
    country: "si",
  },
  {
    name: "Solomon Islands",
    prefix: "+677",
    country: "sb",
  },
  {
    name: "Somalia",
    prefix: "+252",
    country: "so",
  },
  {
    name: "South Africa",
    prefix: "+27",
    country: "za",
  },
  {
    name: "South Korea",
    prefix: "+82",
    country: "kr",
  },
  {
    name: "South Sudan",
    prefix: "+211",
    country: "ss",
  },
  {
    name: "Spain",
    prefix: "+34",
    country: "es",
  },
  {
    name: "Sri Lanka",
    prefix: "+94",
    country: "lk",
  },
  {
    name: "Sudan",
    prefix: "+249",
    country: "sd",
  },
  {
    name: "Suriname",
    prefix: "+597",
    country: "sr",
  },
  {
    name: "Svalbard and Jan Mayen",
    prefix: "+47",
    country: "sj",
  },
  {
    name: "Swaziland",
    prefix: "+268",
    country: "sz",
  },
  {
    name: "Sweden",
    prefix: "+46",
    country: "se",
  },
  {
    name: "Switzerland",
    prefix: "+41",
    country: "ch",
  },
  {
    name: "Syria",
    prefix: "+963",
    country: "sy",
  },
  {
    name: "Taiwan",
    prefix: "+886",
    country: "tw",
  },
  {
    name: "Tajikistan",
    prefix: "+992",
    country: "tj",
  },
  {
    name: "Tanzania",
    prefix: "+255",
    country: "tz",
  },
  {
    name: "Thailand",
    prefix: "+66",
    country: "th",
  },
  {
    name: "Togo",
    prefix: "+228",
    country: "tg",
  },
  {
    name: "Tokelau",
    prefix: "+690",
    country: "tk",
  },
  {
    name: "Tonga",
    prefix: "+676",
    country: "to",
  },
  {
    name: "Trinidad and Tobago",
    prefix: "+1-868",
    country: "tt",
  },
  {
    name: "Tunisia",
    prefix: "+216",
    country: "tn",
  },
  {
    name: "Turkey",
    prefix: "+90",
    country: "tr",
  },
  {
    name: "Turkmenistan",
    prefix: "+993",
    country: "tm",
  },
  {
    name: "Turks and Caicos Islands",
    prefix: "+1-649",
    country: "tc",
  },
  {
    name: "Tuvalu",
    prefix: "+688",
    country: "tv",
  },
  {
    name: "U.S. Virgin Islands",
    prefix: "+1-340",
    country: "vi",
  },
  {
    name: "Uganda",
    prefix: "+256",
    country: "ug",
  },
  {
    name: "Ukraine",
    prefix: "+380",
    country: "ua",
  },
  {
    name: "United Arab Emirates",
    prefix: "+971",
    country: "ae",
  },
  {
    name: "United Kingdom",
    prefix: "+44",
    country: "gb",
  },
  {
    name: "United States",
    prefix: "+1",
    country: "us",
  },
  {
    name: "Uruguay",
    prefix: "+598",
    country: "uy",
  },
  {
    name: "Uzbekistan",
    prefix: "+998",
    country: "uz",
  },
  {
    name: "Vanuatu",
    prefix: "+678",
    country: "vu",
  },
  {
    name: "Vatican",
    prefix: "+379",
    country: "va",
  },
  {
    name: "Venezuela",
    prefix: "+58",
    country: "ve",
  },
  {
    name: "Vietnam",
    prefix: "+84",
    country: "vn",
  },
  {
    name: "Wallis and Futuna",
    prefix: "+681",
    country: "wf",
  },
  {
    name: "Western Sahara",
    prefix: "+212",
    country: "eh",
  },
  {
    name: "Yemen",
    prefix: "+967",
    country: "ye",
  },
  {
    name: "Zambia",
    prefix: "+260",
    country: "zm",
  },
  {
    name: "Zimbabwe",
    prefix: "+263",
    country: "zw",
  },
];

// Styling

const InputLabelDropdownHandlerStyling: CSS = {
  zIndex: "$max",
  cursor: "pointer",
  h: "100%",
  pointerEvents: "all",
};

const DropdownMenuStyling: CSS = {
  bs: "0 0 10px black",
  w: 250,
};

const SelectItemStyling: CSS = {
  cursor: "pointer",
  fontSize: "$sm",
  fontWeight: "$normal",
  p: "5px $sm",
  br: "$sm",
  h: "$13",
  m: "-5px 0",
  w: "100%",
  transition: "$dropdownItem",
  userSelect: "none",
};

const GridContainerStyling: CSS = {
  bgColor: "transparent !important",
};

const ItemDisplayTextContainerStyling: CSS = {
  d: "flex",
  ai: "center",
  p: 0,
  background: "transparent !important",
};

const ItemDisplayPrefixStyling: CSS = {
  color: "$accents6",
  background: "transparent !important",
};

const ItemDisplayNameStyling: CSS = {
  color: "$foreground",
  background: "transparent !important",
};

const InputDropdownContainerStyling: StyleObject.Properties = {
  position: "relative",
  width: "100%",
};

const InputLabelDropdownHandlerContainerStyling: StyleObject.Properties = {
  width: "60px",
  height: "100%",
  paddingRight: "10px",
};

const ListStyling: StyleObject.Properties = {
  margin: "var(--nextui-space-sm)",
  width: "300px",
};

const TriggerStyling: StyleObject.Properties = {
  position: "absolute",
  top: "40px",
};

/**
 * Renders a phone field component.
 *
 * @param {PhoneFieldProps & { name: string }} props - The props object containing:
 *  - name: The name of the field
 *  - option: The rules to apply to the field
 *  - helpText: The help text to display when hovering over the tooltip
 * @return {JSX.Element} The phone field component
 */
export default function PhoneField(props: PhoneFieldProps & { name: string }) {
  // Destruction
  const { name, option, helpText } = props;

  const { control, formState } = useFormContext();
  const { field } = useController({
    name: name,
    control: control,
    rules: {...option, pattern: {
      message: "Please enter a valid phone number",
      value: /^\+[-0-9]+$/
    }},
  });

  // Errors

  const Error = name
    .split(".")
    .reduce((err, path): any => err && err[path], formState.errors);

  const phone = useWatch({
    control: control,
    name: name,
  })

  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [selectedPrefix, setSelectedPrefix] = useState<PrefixEntry | null>(
    NumberPrefix.find(item => field.value?.startsWith(item.prefix)) || null
  );

  const InputRef = useRef<HTMLInputElement>(null);
  return (
    <Fragment>
      <div style={InputDropdownContainerStyling} ref={field.ref}>
        <Input
          status={Error ? "error" : "default"}
          ref={InputRef}
          aria-label="Prefix Selector"
          helperColor="error"
          {...(Error && {
            helperText: "" + Error.message,
          })}
          initialValue={phone}
          value={field.value || ""}
          labelLeft={
            <div style={InputLabelDropdownHandlerContainerStyling}>
              <Grid.Container
                alignItems="center"
                justify="space-around"
                css={InputLabelDropdownHandlerStyling}
                onClick={() => {
                  setOpenPopover(true);
                }}
              >
                <Grid>
                  <Image
                    src={`/flags/${selectedPrefix?.country || "eu"}.svg`}
                    width={20}
                    height={15}
                    alt="Phone flag"
                  />
                </Grid>
                <Grid>
                  <Play
                    size={10}
                    transform={`rotate(${openPopover ? "90" : "0"})`}
                    style={{ transition: "all 200ms" }}
                    color={
                      openPopover ? "white" : "var(--nextui-colors-accents6)"
                    }
                  />
                </Grid>
              </Grid.Container>
            </div>
          }
          bordered
          fullWidth
          inputMode="numeric"
          onChange={(e: ChangeEvent<FormElement>) => {
            e.target.value = e.target.value.replace(/^[^\d-]+$/, "");
            if (!e.target.value.startsWith("+") && e.target.value.length) {
              e.target.value = "+" + e.target.value;
            }
            setSelectedPrefix(
              NumberPrefix.find((item) =>
                e.target.value.startsWith(item.prefix)
              ) || null
            );
            field.onChange(e.target.value);
          }}
          onBlur={field.onBlur}
        />
        <Popover
          placement="bottom-left"
          shouldFlip={false}
          isOpen={openPopover}
          onClose={() => {
            setOpenPopover(false);
          }}
          shouldCloseOnInteractOutside={(e: HTMLElement) => {
            if (e !== InputRef.current) {
              InputRef.current?.blur();
            }
            return true;
          }}
        >
          <Popover.Trigger>
            <div style={TriggerStyling} />
          </Popover.Trigger>
          <Popover.Content css={DropdownMenuStyling}>
            <ul style={ListStyling}>
              {NumberPrefix.map((PrefixEntry, idx) => (
                <li key={idx}>
                  <Grid.Container
                    justify="space-between"
                    alignItems="center"
                    css={SelectItemStyling}
                    onMouseEnter={(e) => {
                      // hover
                      // gave type as HTMLDivElement
                      // bc e.target doesn't have
                      // style property
                      const target = e.target as HTMLDivElement;
                      target.style.backgroundColor =
                        "var(--nextui-colors-neutralLight)";
                    }}
                    onMouseLeave={(e) => {
                      // hover
                      // s. MouseEnter :100
                      const target = e.target as HTMLDivElement;
                      target.style.backgroundColor = "";
                    }}
                    onClick={() => {
                      if (selectedPrefix === PrefixEntry) {
                        setSelectedPrefix(null);
                        if (InputRef.current) {
                          InputRef.current.focus();
                          InputRef.current.value = "";
                        }
                      } else {
                        setSelectedPrefix(PrefixEntry);
                        if (InputRef.current) {
                          InputRef.current.focus();
                          InputRef.current.value = PrefixEntry.prefix;
                        }
                      }
                      setOpenPopover(false);
                    }}
                  >
                    <Grid css={GridContainerStyling}>
                      <Container css={ItemDisplayTextContainerStyling}>
                        <Image
                          src={`/flags/${PrefixEntry.country}.svg`}
                          width={20}
                          height={15}
                          alt="Phone flag"
                        />
                        <Spacer x={0.5} />
                        <Text css={ItemDisplayNameStyling}>
                          {PrefixEntry.name}
                        </Text>
                        <Spacer x={0.5} />
                        <Text css={ItemDisplayPrefixStyling}>
                          {PrefixEntry.prefix}
                        </Text>
                      </Container>
                    </Grid>
                    <Grid css={GridContainerStyling}>
                      <Check
                        size={15}
                        display={selectedPrefix != PrefixEntry ? "none" : ""}
                      />
                    </Grid>
                  </Grid.Container>
                </li>
              ))}
            </ul>
          </Popover.Content>
        </Popover>
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translate(0, -50%)",
            right: -20,
            display: helpText ? "block" : "none",
          }}
        >
          <TooltipHelper content={helpText ? helpText : ""} />
        </div>
      </div>
    </Fragment>
  );
}
