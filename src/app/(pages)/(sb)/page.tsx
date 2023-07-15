"use client";
import Footer from "@/comp/sb/ui/Footer";
import Nav from "@/comp/sb/ui/Nav";
import ProjectCard from "@/comp/sb/ui/ProjectCard";
import {
  Button,
  Card,
  Checkbox,
  Container,
  Grid,
  Pagination,
  Text,
  User,
} from "@nextui-org/react";
import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import {
  BatteryCharging,
  BookCopy,
  Box,
  Brush,
  Building2,
  Car,
  ClipboardList,
  CloudSun,
  Cpu,
  Droplets,
  Eraser,
  Factory,
  Footprints,
  Forklift,
  Gem,
  Glasses,
  Globe2,
  Hammer,
  HardHat,
  Joystick,
  KeySquare,
  Lightbulb,
  MessagesSquare,
  Satellite,
  Scroll,
  ServerCog,
  Shovel,
  Siren,
  Sofa,
  Store,
  SunSnow,
  TowerControl,
  ToyBrick,
  Train,
  Unplug,
  UtilityPole,
  Wind,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { Fragment, useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";

export default function Home() {
  const ParallaxRef = useRef<IParallax>(null);

  const LogoTextRef = useRef<HTMLParagraphElement>(null);
  const sideInfoComprehensiveServicesRef = useRef<HTMLDivElement>(null);
  const sideInfoExpertiseAndInnovationRef = useRef<HTMLDivElement>(null);
  const sideInfoMultilingualAndCommunicationFocusedRef =
    useRef<HTMLDivElement>(null);
  const sideInfoGlobalPresenceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const CurrentParallaxRef = ParallaxRef.current;
    CurrentParallaxRef?.container.current.addEventListener(
      "scroll",
      handleScroll
    );
    function handleScroll() {
      const scrollTop = CurrentParallaxRef?.container.current.scrollTop;
      const scrollHeight =
        CurrentParallaxRef?.container.current.scrollHeight -
        CurrentParallaxRef?.container.current.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      console.log(scrollPercent);
      if (scrollPercent > 9 && scrollPercent < 23) {
        Object.assign(sideInfoComprehensiveServicesRef.current?.style || {}, {
          translate:
            300 - ((((scrollPercent - 9) / 14) * 100) / 100) * 300 + "px",
          opacity: (((scrollPercent - 9) / 14) * 100) / 100 + "",
        });
        Object.assign(sideInfoExpertiseAndInnovationRef.current?.style || {}, {
          translate:
            400 - ((((scrollPercent - 9) / 14) * 100) / 100) * 400 + "px",
          opacity: (((scrollPercent - 9) / 14) * 100) / 100 + "",
        });
        Object.assign(
          sideInfoMultilingualAndCommunicationFocusedRef.current?.style || {},
          {
            translate:
              500 - ((((scrollPercent - 9) / 14) * 100) / 100) * 500 + "px",
            opacity: (((scrollPercent - 9) / 14) * 100) / 100 + "",
          }
        );
        Object.assign(sideInfoGlobalPresenceRef.current?.style || {}, {
          translate:
            600 - ((((scrollPercent - 9) / 14) * 100) / 100) * 600 + "px",
          opacity: (((scrollPercent - 9) / 14) * 100) / 100 + "",
        });
      }
      if (scrollPercent > 28 && scrollPercent < 38) {
        Object.assign(sideInfoComprehensiveServicesRef.current?.style || {}, {
          translate: 500 * ((((scrollPercent - 28) / 10) * 100) / 100) + "px",
          opacity: 1 - ((((scrollPercent - 28) / 10) * 100) / 100) * 1,
        });
        Object.assign(sideInfoExpertiseAndInnovationRef.current?.style || {}, {
          translate: 600 * ((((scrollPercent - 28) / 10) * 100) / 100) + "px",
          opacity: 1 - ((((scrollPercent - 28) / 10) * 100) / 100) * 1,
        });
        Object.assign(
          sideInfoMultilingualAndCommunicationFocusedRef.current?.style || {},
          {
            translate: 300 * ((((scrollPercent - 28) / 10) * 100) / 100) + "px",
            opacity: 1 - ((((scrollPercent - 28) / 10) * 100) / 100) * 1,
          }
        );
        Object.assign(sideInfoGlobalPresenceRef.current?.style || {}, {
          translate: 400 * ((((scrollPercent - 28) / 10) * 100) / 100) + "px",
          opacity: 1 - ((((scrollPercent - 28) / 10) * 100) / 100) * 1,
        });
      }
    }
    return () =>
      CurrentParallaxRef?.container.current.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <Fragment>
      <Nav
        data={[
          { title: "Home", href: "#" },
          { title: "About", href: "#" },
          { title: "Method", href: "#" },
          { title: "Partnerships", href: "#" },
          { title: "Job board", href: "#" },
          { title: "Content", href: "#" },
        ]}
        active={0}
      />
      <Parallax
        ref={ParallaxRef}
        pages={5}
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
        }}
      >
        <ParallaxLayer speed={0.8}>
          <Image
            src={"/vector/Parallax/Background.svg"}
            style={{ objectFit: "cover" }}
            alt="Parallax Background"
            draggable={false}
            priority
            fill
          />
        </ParallaxLayer>
        <ParallaxLayer speed={0.7}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              top: "140px",
            }}
          >
            <b>Click for your journey</b>
          </div>
        </ParallaxLayer>
        <ParallaxLayer speed={0.7}>
          <Image
            src={"/vector/Parallax/1.svg"}
            style={{ objectFit: "cover" }}
            alt="Parallax Layer 1"
            priority
            draggable={false}
            fill
          />
        </ParallaxLayer>
        <ParallaxLayer speed={0.6}>
          <Image
            src={"/vector/Parallax/2.svg"}
            style={{ objectFit: "cover" }}
            alt="Parallax Layer 2"
            priority
            draggable={false}
            fill
          />
        </ParallaxLayer>
        <ParallaxLayer speed={0.5}>
          <Image
            src={"/vector/Parallax/3.svg"}
            style={{ objectFit: "cover" }}
            priority
            alt="Parallax Layer 3"
            fill
          />
        </ParallaxLayer>
        <ParallaxLayer speed={0.4}>
          <Image
            src={"/vector/Parallax/4.svg"}
            style={{ objectFit: "cover" }}
            alt="Parallax Layer 4"
            priority
            draggable={false}
            fill
          />
        </ParallaxLayer>
        <ParallaxLayer speed={0.3}>
          <Image
            src={"/vector/Parallax/5.svg"}
            style={{ objectFit: "cover" }}
            alt="Parallax Layer 5"
            priority
            draggable={false}
            fill
          />
        </ParallaxLayer>
        <ParallaxLayer speed={0.2}>
          <Image
            src={"/vector/Parallax/6.svg"}
            style={{ objectFit: "cover" }}
            alt="Parallax Layer 6"
            priority
            draggable={false}
            fill
          />
        </ParallaxLayer>
        <ParallaxLayer speed={0.01}>
          <div
            style={{
              position: "absolute",
              color: "black",
              top: "41%",
              width: "100%",
            }}
          >
            <Container
              css={{
                margin: "auto",
                fontWeight: "bold",
                fontSize: "2em",
                "@xs": {
                  fontSize: "2em",
                  display: "grid",
                  gridTemplateColumns: "1fr",
                },
                "@sm": {
                  fontSize: "2.5em",
                  display: "flex",
                  justifyContent: "center",
                },
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                For a
              </div>
              <style jsx global>
                {`
                  @media (max-width: 960px) {
                    .Typewriter {
                      margin: auto;
                      width: fit-content;
                    }
                  }
                `}
              </style>
              <Typewriter
                options={{
                  strings: [
                    " <b style='color: #fff;'>more sustainable<b/>",
                    " <b style='color: #fff;'>greener<b/>",
                    " <b style='color: #fff;'>more efficient<b/>",
                    " <b style='color: #fff;'>smarter<b/>",
                    " <b style='color: #fff;'>modern<b/>",
                    " <b style='color: #fff;'>digitized<b/>",
                    " <b style='color: #fff;'>more connected<b/>",
                  ],
                  cursor: "|",
                  autoStart: true,
                  loop: true,
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                ‏future
              </div>
            </Container>
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          speed={0.1}
          onClick={() => ParallaxRef.current?.scrollTo(0.95)}
        >
          <Image
            src={"/vector/Parallax/7.svg"}
            style={{ objectFit: "cover" }}
            alt="Parallax Layer 7"
            priority
            draggable={false}
            fill
          />
        </ParallaxLayer>
        <ParallaxLayer
          speed={0.1}
          sticky={{ end: 3.3, start: 0.7 }}
          style={{
            zIndex: -10000,
          }}
        >
          <Text
            ref={LogoTextRef}
            css={{
              fontSize: "5em",
              textAlign: "center",
              alignItems: "center",
              display: "grid",
              letterSpacing: "-3.112px",
              fontWeight: "bold",
              color: "white",
              height: "100vh",
              transform: "translateX(-50%)",
              left: "50%",
              position: "absolute",
              "@md": {
                fontSize: "15em",
                letterSpacing: "-12.112px",
              },
            }}
          >
            SilverBack
          </Text>
        </ParallaxLayer>
        <ParallaxLayer
          speed={0.32}
          offset={1}
          className="waves"
          style={{
            zIndex: 10000,
          }}
        >
          <Container
            fluid
            css={{
              position: "absolute",
              alignItems: "center",
              display: "grid",
              p: "$0",
              mt: "-$5",
              "@md": {
                mt: "-150px",
              },
            }}
          >
            <style jsx global>
              {`
                @media (max-width: 650px) {
                  .waves {
                    margin-top: -180px;
                  }
                }
              `}
            </style>
            <svg
              width="100%"
              id="svg"
              style={{
                minWidth: "1440px",
                margin: "0 auto 70px",
              }}
              viewBox="0 0 1440 390"
              xmlns="http://www.w3.org/2000/svg"
              className="transition duration-300 ease-in-out delay-150"
            >
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    '\n      @media (max-width: 650px){ \n  .path-0{ \n    minWidth: 200px; \n height: 100px  } \n }        .path-0{\n            animation:pathAnim-0 40s;\n            animation-timing-function: linear;\n            animation-iteration-count: infinite;\n          }\n          @keyframes pathAnim-0{\n            0%{\n              d: path("M 0,400 C 0,400 0,200 0,200 C 113.38755980861242,191.56937799043064 226.77511961722485,183.13875598086128 331,183 C 435.22488038277515,182.86124401913872 530.2870813397129,191.01435406698562 623,182 C 715.7129186602871,172.98564593301438 806.0765550239234,146.80382775119617 881,145 C 955.9234449760766,143.19617224880383 1015.4066985645934,165.7703349282297 1106,179 C 1196.5933014354066,192.2296650717703 1318.2966507177034,196.11483253588517 1440,200 C 1440,200 1440,400 1440,400 Z");\n            }\n            25%{\n              d: path("M 0,400 C 0,400 0,200 0,200 C 90.74641148325358,243.07177033492823 181.49282296650716,286.14354066985646 281,269 C 380.50717703349284,251.85645933014354 488.77511961722485,174.49760765550238 586,172 C 683.2248803827752,169.50239234449762 769.4066985645934,241.86602870813397 856,246 C 942.5933014354066,250.13397129186603 1029.5980861244018,186.03827751196172 1127,167 C 1224.4019138755982,147.96172248803828 1332.2009569377992,173.98086124401914 1440,200 C 1440,200 1440,400 1440,400 Z");\n            }\n            50%{\n              d: path("M 0,400 C 0,400 0,200 0,200 C 85.97129186602871,184.47846889952154 171.94258373205741,168.95693779904306 276,170 C 380.0574162679426,171.04306220095694 502.200956937799,188.6507177033493 591,211 C 679.799043062201,233.3492822966507 735.2535885167465,260.4401913875598 831,268 C 926.7464114832535,275.5598086124402 1062.7846889952152,263.5885167464115 1171,249 C 1279.2153110047848,234.4114832535885 1359.6076555023924,217.20574162679424 1440,200 C 1440,200 1440,400 1440,400 Z");\n            }\n            75%{\n              d: path("M 0,400 C 0,400 0,200 0,200 C 114.01913875598089,233.54066985645935 228.03827751196178,267.0813397129187 324,265 C 419.9617224880382,262.9186602870813 497.86602870813385,225.2153110047847 587,209 C 676.1339712918661,192.7846889952153 776.4976076555025,198.05741626794256 875,212 C 973.5023923444975,225.94258373205744 1070.1435406698565,248.55502392344502 1164,248 C 1257.8564593301435,247.44497607655498 1348.9282296650717,223.7224880382775 1440,200 C 1440,200 1440,400 1440,400 Z");\n            }\n            100%{\n              d: path("M 0,400 C 0,400 0,200 0,200 C 113.38755980861242,191.56937799043064 226.77511961722485,183.13875598086128 331,183 C 435.22488038277515,182.86124401913872 530.2870813397129,191.01435406698562 623,182 C 715.7129186602871,172.98564593301438 806.0765550239234,146.80382775119617 881,145 C 955.9234449760766,143.19617224880383 1015.4066985645934,165.7703349282297 1106,179 C 1196.5933014354066,192.2296650717703 1318.2966507177034,196.11483253588517 1440,200 C 1440,200 1440,400 1440,400 Z");\n            }\n          }',
                }}
              />
              <path
                d="M 0,400 C 0,400 0,200 0,200 C 113.38755980861242,191.56937799043064 226.77511961722485,183.13875598086128 331,183 C 435.22488038277515,182.86124401913872 530.2870813397129,191.01435406698562 623,182 C 715.7129186602871,172.98564593301438 806.0765550239234,146.80382775119617 881,145 C 955.9234449760766,143.19617224880383 1015.4066985645934,165.7703349282297 1106,179 C 1196.5933014354066,192.2296650717703 1318.2966507177034,196.11483253588517 1440,200 C 1440,200 1440,400 1440,400 Z"
                stroke="none"
                strokeWidth={0}
                fill="#fff"
                fillOpacity={1}
                className="transition-all duration-300 ease-in-out delay-150 path-0"
              />
            </svg>
            <svg
              style={{
                marginTop: -180,
                minWidth: "1440px",
                margin: "-180px auto auto",
              }}
              id="svg"
              viewBox="0 0 1440 300"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="100%"
                height="100%"
                fill="#ffffff"
                fillOpacity={1}
              ></rect>
            </svg>
            <svg
              style={{
                rotate: "180deg",
                minWidth: "1440px",
                margin: "-10px auto auto",
              }}
              width="100%"
              id="svg"
              viewBox="0 0 1440 590"
              xmlns="http://www.w3.org/2000/svg"
              className="transition duration-300 ease-in-out delay-150"
            >
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    '\n @media (max-width: 650px){ \n  .path-1{ \n    minWidth: 200px; \n height: 100px } \n }  .path-1{\nanimation:pathAnim-1 44s;\nanimation-timing-function: linear;\nanimation-iteration-count: infinite;\n}\n@keyframes pathAnim-1{\n0%{\nd: path("M 0,600 C 0,600 0,300 0,300 C 69.62820512820514,239.95128205128205 139.25641025641028,179.9025641025641 211,211 C 282.7435897435897,242.0974358974359 356.6025641025641,364.3410256410256 439,384 C 521.3974358974359,403.6589743589744 612.3333333333334,320.7333333333333 709,315 C 805.6666666666666,309.2666666666667 908.0641025641023,380.72564102564104 982,357 C 1055.9358974358977,333.27435897435896 1101.4102564102566,214.36410256410258 1173,189 C 1244.5897435897434,163.63589743589742 1342.2948717948716,231.8179487179487 1440,300 C 1440,300 1440,600 1440,600 Z");\n}\n25%{\nd: path("M 0,600 C 0,600 0,300 0,300 C 72.58717948717953,260.8666666666667 145.17435897435905,221.73333333333335 223,203 C 300.82564102564095,184.26666666666665 383.8897435897435,185.9333333333333 471,188 C 558.1102564102565,190.0666666666667 649.2666666666667,192.53333333333336 730,245 C 810.7333333333333,297.46666666666664 881.0435897435896,399.93333333333334 955,397 C 1028.9564102564104,394.06666666666666 1106.5589743589744,285.73333333333335 1188,252 C 1269.4410256410256,218.26666666666668 1354.7205128205128,259.1333333333333 1440,300 C 1440,300 1440,600 1440,600 Z");\n}\n50%{\nd: path("M 0,600 C 0,600 0,300 0,300 C 82.81538461538463,266.4230769230769 165.63076923076926,232.84615384615387 236,259 C 306.36923076923074,285.15384615384613 364.2923076923076,371.03846153846155 435,411 C 505.7076923076924,450.96153846153845 589.2000000000002,445 682,399 C 774.7999999999998,353 876.9076923076921,266.96153846153845 968,251 C 1059.092307692308,235.03846153846155 1139.1692307692308,289.15384615384613 1216,309 C 1292.8307692307692,328.84615384615387 1366.4153846153845,314.4230769230769 1440,300 C 1440,300 1440,600 1440,600 Z");\n}\n75%{\nd: path("M 0,600 C 0,600 0,300 0,300 C 66.5,291.525641025641 133,283.05128205128204 206,293 C 279,302.94871794871796 358.5,331.3205128205129 447,367 C 535.5,402.6794871794871 632.9999999999999,445.66666666666663 707,408 C 781.0000000000001,370.33333333333337 831.5000000000001,252.01282051282053 923,214 C 1014.4999999999999,175.98717948717947 1146.9999999999998,218.28205128205127 1240,246 C 1333.0000000000002,273.71794871794873 1386.5,286.85897435897436 1440,300 C 1440,300 1440,600 1440,600 Z");\n}\n100%{\nd: path("M 0,600 C 0,600 0,300 0,300 C 69.62820512820514,239.95128205128205 139.25641025641028,179.9025641025641 211,211 C 282.7435897435897,242.0974358974359 356.6025641025641,364.3410256410256 439,384 C 521.3974358974359,403.6589743589744 612.3333333333334,320.7333333333333 709,315 C 805.6666666666666,309.2666666666667 908.0641025641023,380.72564102564104 982,357 C 1055.9358974358977,333.27435897435896 1101.4102564102566,214.36410256410258 1173,189 C 1244.5897435897434,163.63589743589742 1342.2948717948716,231.8179487179487 1440,300 C 1440,300 1440,600 1440,600 Z");\n}\n}',
                }}
              />
              <path
                d="M 0,600 C 0,600 0,300 0,300 C 69.62820512820514,239.95128205128205 139.25641025641028,179.9025641025641 211,211 C 282.7435897435897,242.0974358974359 356.6025641025641,364.3410256410256 439,384 C 521.3974358974359,403.6589743589744 612.3333333333334,320.7333333333333 709,315 C 805.6666666666666,309.2666666666667 908.0641025641023,380.72564102564104 982,357 C 1055.9358974358977,333.27435897435896 1101.4102564102566,214.36410256410258 1173,189 C 1244.5897435897434,163.63589743589742 1342.2948717948716,231.8179487179487 1440,300 C 1440,300 1440,600 1440,600 Z"
                stroke="none"
                strokeWidth={0}
                fill="#ffffff"
                fillOpacity={1}
                className="transition-all duration-300 ease-in-out delay-150 path-1"
              />
            </svg>
          </Container>
        </ParallaxLayer>
        <ParallaxLayer
          speed={0.32}
          offset={1}
          style={{
            zIndex: 10000,
          }}
          onClick={() => ParallaxRef.current?.scrollTo(1.9)}
        >
          <Container
            lg
            css={{
              p: 0,
            }}
          >
            <Grid.Container
              css={{
                height: "100%",
                p: "$11",
              }}
            >
              <Grid xs={12} md={3.5} alignItems="center">
                <Text
                  color="black"
                  css={{
                    fontWeight: "600",
                    lineHeight: "$xs",
                    fontSize: "1.7em",
                    "@sm": {
                      m: "0 0 0 36px",
                      fontSize: "4rem",
                      fontWeight: "600",
                      lineHeight: "$xs",
                      letterSpacing: "-3.112px",
                    },
                  }}
                >
                  We together for a better future in Europe
                </Text>
              </Grid>
              <Grid xs={12} md={8.5}>
                <Grid.Container
                  gap={6}
                  md={12}
                  css={{
                    my: "0",
                    p: 10,
                    "@md": {
                      my: "$15 !important",
                      p: "var(--nextui--gridGapUnit) !important",
                    },
                  }}
                >
                  <Grid
                    xs={12}
                    sm={6}
                    ref={sideInfoComprehensiveServicesRef}
                    css={{
                      p: 10,
                      "@md": {
                        p: "var(--nextui--gridGapUnit) !important",
                      },
                    }}
                  >
                    <Card
                      variant="bordered"
                      isHoverable
                      css={{
                        bg: "$white",
                        borderColor: "rgb(0 0 0 / 15%)",
                        color: "$black",
                      }}
                    >
                      <Card.Body
                        css={{
                          p: 10,
                          "@md": {
                            p: "var(--nextui-space-lg) var(--nextui-space-sm) !important",
                          },
                        }}
                      >
                        <Grid.Container gap={1}>
                          <Grid
                            xs={0}
                            md={1.25}
                            justify="center"
                            alignItems="center"
                          >
                            <Building2 size={"30px"} />
                          </Grid>
                          <Grid xs={12} md={10.5}>
                            <Text
                              color="black"
                              css={{
                                fontSize: "1.3rem",
                                fontWeight: "600",
                                lineHeight: "10px",
                                letterSpacing: "-1.112px",
                                "@md": {
                                  fontSize: "1.5rem",
                                  lineHeight: "$xs",
                                },
                              }}
                            >
                              Comprehensive services
                            </Text>
                          </Grid>
                          <Grid xs={12}>
                            <Text color="black" showIn={"md"}>
                              We provide comprehensive in-house services for
                              logistics, project management, accounting, IT, and
                              human resources.
                            </Text>
                            <Text
                              color="black"
                              css={{
                                fontSize: "$lg",
                                textAlign: "left",
                                "@md": {
                                  px: 10,
                                },
                              }}
                              hideIn={"md"}
                            >
                              We, SilverBack provide a full-service experience
                              for clients with in-house departments for
                              logistics, project management, finance and
                              accounting, IT and human resources, ensuring that
                              all aspects of the project are covered.
                            </Text>
                          </Grid>
                        </Grid.Container>
                      </Card.Body>
                    </Card>
                  </Grid>
                  <Grid
                    xs={12}
                    sm={6}
                    ref={sideInfoExpertiseAndInnovationRef}
                    css={{
                      p: 10,
                      "@md": {
                        p: "var(--nextui--gridGapUnit) !important",
                      },
                    }}
                  >
                    <Card
                      variant="bordered"
                      isHoverable
                      css={{
                        bg: "$white",
                        borderColor: "rgb(0 0 0 / 15%)",
                        color: "$black",
                      }}
                    >
                      <Card.Body
                        css={{
                          p: 10,
                          "@md": {
                            p: "var(--nextui-space-lg) var(--nextui-space-sm) !important",
                          },
                        }}
                      >
                        <Grid.Container gap={1}>
                          <Grid
                            xs={0}
                            md={1.25}
                            justify="center"
                            alignItems="center"
                          >
                            <Lightbulb size={"30px"} />
                          </Grid>
                          <Grid xs={12} md={10.5}>
                            <Text
                              color="black"
                              css={{
                                fontSize: "1.3rem",
                                fontWeight: "600",
                                lineHeight: "10px",
                                letterSpacing: "-1.112px",
                                "@md": {
                                  fontSize: "1.5rem",
                                  lineHeight: "$xs",
                                },
                              }}
                            >
                              Expertise & innovation
                            </Text>
                          </Grid>
                          <Grid xs={12}>
                            <Text color="black" showIn={"md"}>
                              Our professionals are experienced in innovative
                              solutions and technologies for green construction.
                            </Text>
                            <Text
                              color="black"
                              css={{
                                fontSize: "$lg",
                                textAlign: "left",
                                "@md": {
                                  px: 10,
                                },
                              }}
                              hideIn={"md"}
                            >
                              Our team of professionals is experienced in
                              cutting-edge technologies for data center, battery
                              factory construction etc., providing innovative
                              solutions for our partners and clients.
                            </Text>
                          </Grid>
                        </Grid.Container>
                      </Card.Body>
                    </Card>
                  </Grid>
                  <Grid
                    xs={12}
                    sm={6}
                    ref={sideInfoMultilingualAndCommunicationFocusedRef}
                    css={{
                      p: 10,
                      "@md": {
                        p: "var(--nextui--gridGapUnit) !important",
                      },
                    }}
                  >
                    <Card
                      variant="bordered"
                      isHoverable
                      css={{
                        bg: "$white",
                        borderColor: "rgb(0 0 0 / 15%)",
                        color: "$black",
                      }}
                    >
                      <Card.Body
                        css={{
                          p: 10,
                          "@md": {
                            p: "var(--nextui-space-lg) var(--nextui-space-sm) !important",
                          },
                        }}
                      >
                        <Grid.Container gap={1}>
                          <Grid
                            xs={0}
                            md={1.25}
                            justify="center"
                            alignItems="center"
                          >
                            <MessagesSquare size={"30px"} />
                          </Grid>
                          <Grid xs={12} md={10.5}>
                            <Text
                              color="black"
                              css={{
                                fontSize: "1.3rem",
                                fontWeight: "600",
                                lineHeight: "10px",
                                letterSpacing: "-1.112px",
                                "@md": {
                                  fontSize: "1.5rem",
                                  lineHeight: "$xs",
                                },
                              }}
                              showIn={"md"}
                            >
                              Multilingual & commn.-focused
                            </Text>
                            <Text
                              color="black"
                              css={{
                                fontSize: "1.5rem",
                                fontWeight: "600",
                                lineHeight: "$xs",
                                letterSpacing: "-1.112px",
                              }}
                              hideIn={"md"}
                            >
                              Multilingual and communication-focused
                            </Text>
                          </Grid>
                          <Grid xs={12}>
                            <Text color="black" showIn={"md"}>
                              With our multilingual team, we ensure
                              communication with anybody to build strong
                              relationships.
                            </Text>
                            <Text
                              color="black"
                              css={{
                                fontSize: "$lg",
                                textAlign: "left",
                                "@md": {
                                  px: 10,
                                },
                              }}
                              hideIn={"md"}
                            >
                              With a team that speaks six different languages,
                              we ensures that we communicate effectively with
                              anybody to build strong relationships with our
                              partners, clients and employees.
                            </Text>
                          </Grid>
                        </Grid.Container>
                      </Card.Body>
                    </Card>
                  </Grid>
                  <Grid
                    xs={12}
                    sm={6}
                    ref={sideInfoGlobalPresenceRef}
                    css={{
                      p: 10,
                      "@md": {
                        p: "var(--nextui--gridGapUnit) !important",
                      },
                    }}
                  >
                    <Card
                      variant="bordered"
                      isHoverable
                      css={{
                        bg: "$white",
                        borderColor: "rgb(0 0 0 / 15%)",
                        color: "$black",
                      }}
                    >
                      <Card.Body
                        css={{
                          p: 10,
                          "@md": {
                            p: "var(--nextui-space-lg) var(--nextui-space-sm) !important",
                          },
                        }}
                      >
                        <Grid.Container gap={1}>
                          <Grid
                            xs={0}
                            md={1.25}
                            justify="center"
                            alignItems="center"
                          >
                            <Globe2 size={"30px"} />
                          </Grid>
                          <Grid xs={12} md={10.5}>
                            <Text
                              color="black"
                              css={{
                                fontSize: "1.3rem",
                                fontWeight: "600",
                                lineHeight: "10px",
                                letterSpacing: "-1.112px",
                                "@md": {
                                  fontSize: "1.5rem",
                                  lineHeight: "$xs",
                                },
                              }}
                            >
                              Global presence
                            </Text>
                          </Grid>
                          <Grid xs={12}>
                            <Text color="black" showIn={"md"}>
                              With a presence in 8 countries, we provide local
                              expertise and support to our clients and employees
                              worldwide.
                            </Text>
                            <Text
                              color="black"
                              css={{
                                fontSize: "$lg",
                                textAlign: "left",
                                "@md": {
                                  px: 10,
                                },
                              }}
                              hideIn={"md"}
                            >
                              With a presence in 8 countries, we provide local
                              expertise and support to our clients worldwide
                              while maintaining consistent quality and service.
                            </Text>
                          </Grid>
                        </Grid.Container>
                      </Card.Body>
                    </Card>
                  </Grid>
                </Grid.Container>
              </Grid>
            </Grid.Container>
          </Container>
        </ParallaxLayer>
        <ParallaxLayer
          offset={2}
          speed={0.32}
          style={{
            zIndex: 10000,
          }}
        >
          <Container
            fluid
            css={{
              alignItems: "center",
              display: "grid",
              p: "$0",
              mt: "-400px",
              "@md": {
                mt: "-320px !important",
              },
            }}
          >
            <svg
              width="100%"
              id="svg"
              style={{
                minWidth: "1440px",
                margin: "0 auto 70px",
              }}
              viewBox="0 0 1440 690"
              xmlns="http://www.w3.org/2000/svg"
              className="transition duration-300 ease-in-out delay-150"
            >
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    '\n.path-2{\nanimation:pathAnim-2 34s;\nanimation-timing-function: linear;\nanimation-iteration-count: infinite;\n}\n@keyframes pathAnim-2{\n0%{\nd: path("M 0,700 C 0,700 0,350 0,350 C 65.96172248803825,393.9425837320574 131.9234449760765,437.8851674641149 240,409 C 348.0765550239235,380.1148325358851 498.2679425837322,278.4019138755981 598,264 C 697.7320574162678,249.59808612440193 747.0047846889952,322.50717703349284 826,370 C 904.9952153110048,417.49282296650716 1013.712918660287,439.5693779904306 1121,432 C 1228.287081339713,424.4306220095694 1334.1435406698565,387.21531100478467 1440,350 C 1440,350 1440,700 1440,700 Z");\n}\n25%{\nd: path("M 0,700 C 0,700 0,350 0,350 C 115.8851674641148,392.3540669856459 231.7703349282296,434.70813397129183 312,408 C 392.2296650717704,381.29186602870817 436.8038277511963,285.5215311004785 539,298 C 641.1961722488037,310.4784688995215 801.0143540669857,431.20574162679424 902,450 C 1002.9856459330143,468.79425837320576 1045.1387559808613,385.65550239234454 1125,352 C 1204.8612440191387,318.34449760765546 1322.4306220095693,334.17224880382776 1440,350 C 1440,350 1440,700 1440,700 Z");\n}\n50%{\nd: path("M 0,700 C 0,700 0,350 0,350 C 132.1531100478469,361.9712918660287 264.3062200956938,373.9425837320574 340,364 C 415.6937799043062,354.0574162679426 434.92822966507185,322.200956937799 523,337 C 611.0717703349281,351.799043062201 767.980861244019,413.25358851674645 875,407 C 982.019138755981,400.74641148325355 1039.1483253588517,326.7846889952153 1125,306 C 1210.8516746411483,285.2153110047847 1325.4258373205741,317.6076555023924 1440,350 C 1440,350 1440,700 1440,700 Z");\n}\n75%{\nd: path("M 0,700 C 0,700 0,350 0,350 C 94.42105263157893,315.74162679425837 188.84210526315786,281.48325358851673 286,275 C 383.15789473684214,268.51674641148327 483.0526315789474,289.8086124401914 579,283 C 674.9473684210526,276.1913875598086 766.9473684210525,241.28229665071768 874,256 C 981.0526315789475,270.7177033492823 1103.1578947368423,335.06220095693783 1200,359 C 1296.8421052631577,382.93779904306217 1368.4210526315787,366.46889952153106 1440,350 C 1440,350 1440,700 1440,700 Z");\n}\n100%{\nd: path("M 0,700 C 0,700 0,350 0,350 C 65.96172248803825,393.9425837320574 131.9234449760765,437.8851674641149 240,409 C 348.0765550239235,380.1148325358851 498.2679425837322,278.4019138755981 598,264 C 697.7320574162678,249.59808612440193 747.0047846889952,322.50717703349284 826,370 C 904.9952153110048,417.49282296650716 1013.712918660287,439.5693779904306 1121,432 C 1228.287081339713,424.4306220095694 1334.1435406698565,387.21531100478467 1440,350 C 1440,350 1440,700 1440,700 Z");\n}\n}',
                }}
              />
              <path
                d="M 0,700 C 0,700 0,350 0,350 C 65.96172248803825,393.9425837320574 131.9234449760765,437.8851674641149 240,409 C 348.0765550239235,380.1148325358851 498.2679425837322,278.4019138755981 598,264 C 697.7320574162678,249.59808612440193 747.0047846889952,322.50717703349284 826,370 C 904.9952153110048,417.49282296650716 1013.712918660287,439.5693779904306 1121,432 C 1228.287081339713,424.4306220095694 1334.1435406698565,387.21531100478467 1440,350 C 1440,350 1440,700 1440,700 Z"
                stroke="none"
                strokeWidth={0}
                fill="#aba6a2"
                fillOpacity={1}
                className="transition-all duration-300 ease-in-out delay-150 path-2"
              />
            </svg>
            <svg
              style={{
                marginTop: -180,
                minWidth: "1440px",
                margin: "-100px auto auto",
              }}
              id="svg"
              viewBox="0 0 1440 405"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="100%"
                height="100%"
                fill="#aba6a2"
                fillOpacity={1}
              ></rect>
            </svg>
            <svg
              width="100%"
              id="svg"
              style={{
                minWidth: "1440px",
                margin: "-5px auto 70px",
              }}
              viewBox="0 0 1440 690"
              xmlns="http://www.w3.org/2000/svg"
              className="transition duration-300 ease-in-out delay-150"
            >
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    '\n.path-3{\nanimation:pathAnim-3 24s;\nanimation-timing-function: linear;\nanimation-iteration-count: infinite;\n}\n@keyframes pathAnim-3{\n0%{\nd: path("M 0,700 C 0,700 0,350 0,350 C 170.40000000000003,399.4666666666667 340.80000000000007,448.93333333333334 477,431 C 613.1999999999999,413.06666666666666 715.2,327.73333333333335 870,303 C 1024.8,278.26666666666665 1232.4,314.1333333333333 1440,350 C 1440,350 1440,700 1440,700 Z");\n}\n25%{\nd: path("M 0,700 C 0,700 0,350 0,350 C 143.7333333333333,348.93333333333334 287.4666666666666,347.8666666666667 448,355 C 608.5333333333334,362.1333333333333 785.8666666666666,377.46666666666664 954,378 C 1122.1333333333334,378.53333333333336 1281.0666666666666,364.26666666666665 1440,350 C 1440,350 1440,700 1440,700 Z");\n}\n50%{\nd: path("M 0,700 C 0,700 0,350 0,350 C 156.13333333333333,310.6666666666667 312.26666666666665,271.33333333333337 469,252 C 625.7333333333333,232.66666666666666 783.0666666666666,233.33333333333331 945,253 C 1106.9333333333334,272.6666666666667 1273.4666666666667,311.33333333333337 1440,350 C 1440,350 1440,700 1440,700 Z");\n}\n75%{\nd: path("M 0,700 C 0,700 0,350 0,350 C 116.66666666666669,372.26666666666665 233.33333333333337,394.5333333333333 413,380 C 592.6666666666666,365.4666666666667 835.3333333333333,314.1333333333334 1017,303 C 1198.6666666666667,291.8666666666666 1319.3333333333335,320.9333333333333 1440,350 C 1440,350 1440,700 1440,700 Z");\n}\n100%{\nd: path("M 0,700 C 0,700 0,350 0,350 C 170.40000000000003,399.4666666666667 340.80000000000007,448.93333333333334 477,431 C 613.1999999999999,413.06666666666666 715.2,327.73333333333335 870,303 C 1024.8,278.26666666666665 1232.4,314.1333333333333 1440,350 C 1440,350 1440,700 1440,700 Z");\n}\n}',
                }}
              />
              <path
                d="M 0,700 C 0,700 0,350 0,350 C 170.40000000000003,399.4666666666667 340.80000000000007,448.93333333333334 477,431 C 613.1999999999999,413.06666666666666 715.2,327.73333333333335 870,303 C 1024.8,278.26666666666665 1232.4,314.1333333333333 1440,350 C 1440,350 1440,700 1440,700 Z"
                stroke="none"
                strokeWidth={0}
                fill="#aba6a2"
                fillOpacity={1}
                className="transition-all duration-300 ease-in-out delay-150 path-3"
                transform="rotate(-180 720 350)"
              />
            </svg>
          </Container>
        </ParallaxLayer>
        <ParallaxLayer
          offset={2}
          speed={0.52}
          style={{
            zIndex: 10000,
          }}
          onClick={() => ParallaxRef.current?.scrollTo(2.4)}
        >
          <Container
            lg
            css={{
              p: 0,
            }}
          >
            <Grid.Container
              css={{
                mt: 30,
                px: 0,
                "@sm": {
                  px: "64px !important",
                  mt: "140px !important",
                },
              }}
              wrap="wrap"
            >
              <Grid xs={12}>
                <Text
                  css={{
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    lineHeight: "10px",
                    letterSpacing: "-1.112px",
                    textAlign: "right",
                    width: "calc(100% - $11)",
                    color: "$white",
                    "@md": {
                      fontSize: "3rem",
                      lineHeight: "$xs",
                    },
                  }}
                >
                  Specified on your ideas and plans
                </Text>
              </Grid>
              <Grid>
                <Grid.Container
                  gap={2}
                  css={{
                    mt: 10,
                    "@smMax": {
                      px: 30,
                    },
                    "@sm": {
                      mt: "$10 !important",
                    },
                  }}
                  justify="space-evenly"
                >
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<BatteryCharging color="black" size={"25px"} />}
                      name="Battery Factories"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<ServerCog color="black" size={"25px"} />}
                      name="Data Centres"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Sofa color="black" size={"25px"} />}
                      name="Apartments"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Car color="black" size={"25px"} />}
                      name="Bridges"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Factory color="black" size={"25px"} />}
                      name="Factories"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Siren color="black" size={"25px"} />}
                      name="Hospitals"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Shovel color="black" size={"25px"} />}
                      name="Mines"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Gem color="black" size={"25px"} />}
                      name="Museum"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Scroll color="black" size={"25px"} />}
                      name="Paper Mills"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<ToyBrick color="black" size={"25px"} />}
                      name="Pre-Cast Factories"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Train color="black" size={"25px"} />}
                      name="Railway"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<BookCopy color="black" size={"25px"} />}
                      name="Schools"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Store color="black" size={"25px"} />}
                      name="Shopping Centres"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<UtilityPole color="black" size={"25px"} />}
                      name="Substations"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<CloudSun color="black" size={"25px"} />}
                      name="Windfarms"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Satellite color="black" size={"25px"} />}
                      name="and more..."
                    />
                  </Grid>
                </Grid.Container>
              </Grid>
            </Grid.Container>
          </Container>
        </ParallaxLayer>
        <ParallaxLayer
          offset={2.6}
          speed={0.12}
          style={{
            zIndex: 10000,
          }}
          onClick={() => ParallaxRef.current?.scrollTo(4)}
        >
          <Container
            lg
            css={{
              p: 0,
            }}
          >
            <Grid.Container
              css={{
                mt: 30,
                px: 0,
                "@sm": {
                  px: "64px !important",
                  mt: "140px !important",
                },
              }}
              wrap="wrap"
            >
              <Grid xs={12}>
                <Text
                  css={{
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    lineHeight: "10px",
                    letterSpacing: "-1.112px",
                    textAlign: "left",
                    width: "calc(100% - $11)",
                    color: "$white",
                    ml: "$11",
                    "@md": {
                      fontSize: "3rem",
                      lineHeight: "$xs",
                    },
                  }}
                >
                  Specified on your career
                </Text>
              </Grid>
              <Grid>
                <Grid.Container
                  gap={2}
                  css={{
                    mt: 10,
                    "@smMax": {
                      px: 30,
                    },
                    "@sm": {
                      mt: "$10 !important",
                    },
                  }}
                  justify="space-evenly"
                >
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Brush color="black" size={"25px"} />}
                      name="Architect"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Unplug color="black" size={"25px"} />}
                      name="Cable Joiner"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<KeySquare color="black" size={"25px"} />}
                      name="Carpenter"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Eraser color="black" size={"25px"} />}
                      name="Cleaner"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Cpu color="black" size={"25px"} />}
                      name="Commissioning Technician"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Footprints color="black" size={"25px"} />}
                      name="Concrete Worker"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Joystick color="black" size={"25px"} />}
                      name="Crane Operator"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<HardHat color="black" size={"25px"} />}
                      name="CSA Site Manager"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<ToyBrick color="black" size={"25px"} />}
                      name="Dryliner"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Wind color="black" size={"25px"} />}
                      name="Duct Fitter"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Wrench color="black" size={"25px"} />}
                      name="Fitter"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Hammer color="black" size={"25px"} />}
                      name="General Operative"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<SunSnow color="black" size={"25px"} />}
                      name="HVAC Installer"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Satellite color="black" size={"25px"} />}
                      name="Mechanical"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Droplets color="black" size={"25px"} />}
                      name="Plumber"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<ClipboardList color="black" size={"25px"} />}
                      name="QA/QC CX Manager"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<TowerControl color="black" size={"25px"} />}
                      name="Site Administrator"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Forklift color="black" size={"25px"} />}
                      name="Teleporter Operator"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Box color="black" size={"25px"} />}
                      name="White Wall Installer"
                    />
                  </Grid>
                  <Grid
                    css={{
                      "@smMax": {
                        p: 5,
                      },
                    }}
                  >
                    <ProjectCard
                      icon={<Glasses color="black" size={"25px"} />}
                      name="and more..."
                    />
                  </Grid>
                </Grid.Container>
              </Grid>
            </Grid.Container>
          </Container>
        </ParallaxLayer>
        <ParallaxLayer offset={4}></ParallaxLayer>
        <ParallaxLayer offset={4}>
          <Container
            lg
            css={{
              p: 0,
              position: "relative",
              "@sm": {
                mt: 200,
              },
            }}
          >
            <Container
              css={{
                maxW: 600,
                margin: "100px auto",
                bottom: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                <Text
                  hideIn={"sm"}
                  css={{
                    fontWeight: "bold",
                    fontSize: "2em",
                    lineHeight: "$sm",
                  }}
                >
                  Embrace Success with 
                </Text>
                <Text
                  css={{
                    fontWeight: "bold",
                    fontSize: "2em",
                    lineHeight: "$sm",
                  }}
                >
                  Team SilverBack:
                </Text>
              </div>
              <Text
                css={{
                  fontWeight: "bold",
                  fontSize: "2em",
                  lineHeight: "$sm",
                }}
              >
                Shaping Futures Together!
              </Text>
              <Text
                css={{
                  fontWeight: "bold",
                  fontSize: "2.5em",
                  "@smMax": {
                    fontSize: "2em",
                  },
                  lineHeight: "$sm",
                  mt: 20,
                }}
              >
                Get in touch
              </Text>
              <div
                style={{
                  display: "flex",
                }}
              >
                <Text hideIn={"sm"}>Fill out the form or </Text>
                <Text>
                  contact us directly via{" "}
                  <a href="mailto:mail@silverback-group.eu?subject=Request%20sent%20through%20the%20website.&body=Hey%20Team%20SilverBack%2C%0D%0A%0D%0AI'm%20interested%20to%20work%20with%20you.%0D%0A%0D%0ARegards%2C">
                    mail@silverback.ie
                  </a>
                </Text>
              </div>
              <Grid.Container
                gap={2}
                css={{
                  px: 90,
                  "@smMax": {
                    px: "30px !important",
                    py: "20px !important",
                  },
                  py: 40,
                }}
              >
                <Grid xs={12}>
                  <div
                    style={{
                      width: "100%",
                      padding: "10px 0",
                      borderRadius: 10,
                      border: "1px solid var(--nextui-colors-border)",
                      display: "flex",
                      justifyContent: "space-between",
                      paddingRight: 20,
                    }}
                  >
                    <User
                      name="I have a project"
                      description="Work with us and be a partner"
                    />
                    <Checkbox
                      isRounded
                      color="secondary"
                      aria-label="Project"
                    />
                  </div>
                </Grid>
                <Grid xs={12}>
                  <div
                    style={{
                      width: "100%",
                      padding: "10px 0",
                      borderRadius: 10,
                      border: "1px solid var(--nextui-colors-border)",
                      display: "flex",
                      justifyContent: "space-between",
                      paddingRight: 20,
                    }}
                  >
                    <User
                      name="I want to support"
                      description="Work for us and you the team"
                    />
                    <Checkbox isRounded color="secondary" aria-label="Job" />
                  </div>
                </Grid>
                <Grid xs={12} justify="flex-end">
                  <Button size="sm" ghost color={"default"}>
                    Next Step
                  </Button>
                </Grid>
              </Grid.Container>
              <div
                style={{
                  justifyContent: "center",
                  width: "100%",
                  display: "flex",
                }}
              >
                <Pagination
                  total={3}
                  onlyDots
                  page={1}
                  bordered
                  controls={false}
                  css={{
                    m: "auto",
                    "@smMax": {
                      display: "none",
                    },
                  }}
                />
              </div>
            </Container>
          </Container>
          <Footer />
        </ParallaxLayer>
      </Parallax>
      {/*
          <ParallaxLayer speed={0.5} offset={4}>
            <Text h1>About us</Text>
            <Text>
              Welcome to SilverBack Group, where we are dedicated to creating a
              greener and more sustainable future through our construction and
              contracting services. We are a full-service, vertically integrated
              company that offers a wide range of services, including staffing,
              project management, finance and accounting, and logistics. Our
              goal is to make the future easy, green, and productive for our
              clients, and we believe that innovation and technology are key to
              achieving that goal.
              <br />
              <br />
              Our team of professionals has extensive experience in data center
              construction, contracting, and battery factory construction, which
              enables us to provide our clients with the latest technologies and
              practices to improve their operations. We are committed to staying
              up-to-date with the latest advancements in our industry to ensure
              that we are always providing cutting-edge solutions to our
              clients.
              <br />
              <br />
              At SilverBack, we are proud to offer easy accessibility to both
              white-collar and blue-collar professionals who are experts in
              their respective fields. Our team of professionals speaks six
              different languages, ensuring that our clients can communicate
              with us easily and effectively. We believe that communication is
              key to building strong relationships with our clients and
              delivering successful projects.
              <br />
              <br />
              We are committed to providing a full-service experience for our
              clients, which is why we have in-house departments for logistics,
              project management, finance and accounting, and human resources.
              Our logistics department ensures that our clients' projects are
              delivered on time and within budget, while our project management
              department oversees every aspect of the project from start to
              finish. Our finance and accounting department ensures that our
              clients' financial needs are met, and our human resources
              department ensures that our clients have access to the best talent
              in the industry.
              <br />
              <br />
              As a global company with a team of around 50 professionals working
              across 8 different countries, we are able to provide our clients
              with local expertise and support, no matter where they are in the
              world. We are committed to delivering the same high level of
              service and quality to all of our clients, regardless of their
              location. Our diverse team of professionals brings a wealth of
              knowledge and expertise to every project we undertake, ensuring
              that our clients receive the best possible solutions for their
              unique needs.
              <br />
              <br />
              Thank you for considering SilverBack Group for your construction
              and contracting needs. We are passionate about creating a greener
              and more sustainable future, and we look forward to working with
              you to achieve that goal.
              <br />
              <br />
            </Text>
          </ParallaxLayer>
        </Parallax> */}
    </Fragment>
  );
}
