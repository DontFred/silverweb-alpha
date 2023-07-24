"use client";

import { Button, Checkbox, Grid, Text, User } from "@nextui-org/react";
import { Fragment, useState } from "react";
import SignWithOTP from "./signWithOTP";
import SignWithWebAuthN from "./signWithWebAuthN";

export default function LoginAdmin() {
  const [selectedAuthMethod, setSelectedAuthMethod] = useState<string>("");

  const [showAuthMethod, setShowAuthMethod] = useState<boolean>(false);

  function handleAuthMethod() {
    if(selectedAuthMethod === "") {
      return;
    }
    if(selectedAuthMethod === "webauthn" || selectedAuthMethod === "otp") {
      setShowAuthMethod(true);
      return
    }
  }

  return (
    <Fragment>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          position: "absolute",
          overflow: "hidden",
        }}
      >
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          width="1000px"
          id="blobSvg"
          filter="blur(0px)"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          transform="rotate(0)"
        >
          <path id="blob" fill="#fff" style={{ opacity: 1 }}>
            <animate
              attributeName="d"
              dur="25s"
              repeatCount="indefinite"
              values="M449.66467,329.57458Q409.14917,409.14917,329.57458,407.97733Q250,406.80549,191.3735,387.02924Q132.74701,367.25299,77.06026,308.6265Q21.3735,250,49.05191,163.36516Q76.73032,76.73032,163.36516,85.537Q250,94.34367,322.00775,100.16408Q394.01551,105.98449,442.09784,177.99225Q490.18018,250,449.66467,329.57458Z;M409.06419,322.5266Q395.0532,395.0532,322.5266,445.11739Q250,495.18159,163.51944,459.07135Q77.03888,422.96112,82.39949,336.48056Q87.7601,250,115.64271,196.76266Q143.52532,143.52532,196.76266,76.83657Q250,10.14783,323.24578,56.82813Q396.49156,103.50844,409.78338,176.75422Q423.07519,250,409.06419,322.5266Z;M418.08664,320.33435Q390.6687,390.6687,320.33435,427.91946Q250,465.17023,188.27506,419.31005Q126.55013,373.44987,106.38448,311.72494Q86.21883,250,84.09726,165.98785Q81.9757,81.9757,165.98785,53.98938Q250,26.00305,311.1687,76.83282Q372.3374,127.6626,408.92099,188.8313Q445.50458,250,418.08664,320.33435Z;M449.66467,329.57458Q409.14917,409.14917,329.57458,407.97733Q250,406.80549,191.3735,387.02924Q132.74701,367.25299,77.06026,308.6265Q21.3735,250,49.05191,163.36516Q76.73032,76.73032,163.36516,85.537Q250,94.34367,322.00775,100.16408Q394.01551,105.98449,442.09784,177.99225Q490.18018,250,449.66467,329.57458Z"
            />
          </path>
        </svg>
          {!showAuthMethod ? (
                    <Grid.Container
                    css={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      maxW: 350,
                      filter: "invert(1)",
                      py: 20,
                    }}
                  >
                    <Grid xs={12}>
                      <Text
                        h2
                        css={{
                          mb: 0,
                        }}
                      >
                        Welcome back.
                      </Text>
                    </Grid>
                    <Grid xs={12}>
                      <Text>Sign in into the SilverWeb</Text>
                    </Grid>
                    <Grid xs={12}>
                      <Grid.Container
                        gap={2}
                        css={{
                          px: 20,
                          "@smMax": {
                            px: "30px !important",
                            py: "20px !important",
                          },
                          py: 40,
                        }}
                      >
                        <Grid xs={12}>
                          <div
                            onClick={() => {
                              setSelectedAuthMethod("webauthn");
                            }}
                            style={{
                              width: "100%",
                              padding: "10px 0",
                              borderRadius: 10,
                              border: "1px solid var(--nextui-colors-border)",
                              display: "flex",
                              justifyContent: "space-between",
                              paddingRight: 20,
                              cursor: "pointer",
                            }}
                          >
                            <User
                              src="data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 11H12C11.4477 11 11 11.4477 11 12V15C11 15.5523 11.4477 16 12 16H15C15.5523 16 16 15.5523 16 15V12C16 11.4477 15.5523 11 15 11Z' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M28 11H25C24.4477 11 24 11.4477 24 12V15C24 15.5523 24.4477 16 25 16H28C28.5523 16 29 15.5523 29 15V12C29 11.4477 28.5523 11 28 11Z' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M15 24H12C11.4477 24 11 24.4477 11 25V28C11 28.5523 11.4477 29 12 29H15C15.5523 29 16 28.5523 16 28V25C16 24.4477 15.5523 24 15 24Z' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M29 24H26C25.4696 24 24.9609 24.2107 24.5858 24.5858C24.2107 24.9609 24 25.4696 24 26V29' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M29 29V29.0091' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M20 15V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H15' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M11 20H11.0091' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M20 11H20.0091' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M20 24V24.0091' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M24 20H25' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M29 20V20.0091' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M20 29V28' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A"
                              name="Sign In with WebAuthN"
                              description="If not registered, select OTP."
                            />
                            <Checkbox
                              isSelected={selectedAuthMethod === "webauthn"}
                              value="webauthn"
                              isRounded
                              color="secondary"
                              aria-label="WebAuthN"
                              css={{
                                filter: "invert(1)",
                              }}
                            />
                          </div>
                        </Grid>
                        <Grid xs={12}>
                          <div
                            onClick={() => {
                              setSelectedAuthMethod("otp");
                            }}
                            style={{
                              width: "100%",
                              padding: "10px 0",
                              borderRadius: 10,
                              border: "1px solid var(--nextui-colors-border)",
                              display: "flex",
                              justifyContent: "space-between",
                              paddingRight: 20,
                              cursor: "pointer",
                            }}
                          >
                            <User
                              src="data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 26.0011V29.0011C10 29.6011 10.4 30.0011 11 30.0011H15V27.0011H18V24.0011H20L21.4 22.6011C22.7898 23.0853 24.3028 23.0834 25.6915 22.5959C27.0801 22.1083 28.2622 21.164 29.0444 19.9173C29.8265 18.6706 30.1624 17.1953 29.9971 15.7329C29.8318 14.2704 29.1751 12.9074 28.1344 11.8667C27.0937 10.826 25.7307 10.1693 24.2683 10.004C22.8058 9.83873 21.3306 10.1746 20.0839 10.9568C18.8372 11.7389 17.8928 12.921 17.4052 14.3097C16.9177 15.6983 16.9159 17.2113 17.4 18.6011L10 26.0011Z' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M24.5 16C24.7761 16 25 15.7761 25 15.5C25 15.2239 24.7761 15 24.5 15C24.2239 15 24 15.2239 24 15.5C24 15.7761 24.2239 16 24.5 16Z' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A"
                              name="Sign Up with One-Time-Pass"
                              description="If not sent, contact you Manager."
                            />
                            <Checkbox
                              isSelected={selectedAuthMethod == "otp"}
                              value="otp"
                              isRounded
                              color="secondary"
                              aria-label="One-Time-Password"
                              css={{
                                filter: "invert(1)",
                              }}
                            />
                          </div>
                        </Grid>
                      </Grid.Container>
                    </Grid>
                        <Grid
                          xs={12}
                          justify="center"
                          css={{
                            filter: "invert(1)",
                          }}
                        >
                          <Button size="sm" onPress={handleAuthMethod} ghost color={"default"}>
                            Log In
                          </Button>
                        </Grid>
                  </Grid.Container>
          ): (
            selectedAuthMethod === "webauthn" ? (
              <SignWithWebAuthN />
            ) : selectedAuthMethod === "otp" && (
              <SignWithOTP />
            )
          )}
      </div>
    </Fragment>
  );
}
