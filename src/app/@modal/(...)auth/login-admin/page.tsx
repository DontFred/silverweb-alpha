"use client";

import SignWithOTP from "@/app/auth/login-admin/signWithOTP";
import SignWithWebAuthN from "@/app/auth/login-admin/signWithWebAuthN";
import { Button, Checkbox, Grid, Modal, Text, User } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function LoginAdmin() {
  const [selectedAuthMethod, setSelectedAuthMethod] = useState<string>("");
  const router = useRouter();

  const [showAuthMethod, setShowAuthMethod] = useState<boolean>(false);

  function handleAuthMethod() {
    if (selectedAuthMethod === "") {
      return;
    }
    if (selectedAuthMethod === "webauthn" || selectedAuthMethod === "otp") {
      setShowAuthMethod(true);
      return;
    }
  }

  return (
    <Modal open={true} onClose={() => router.back()}>
      <Modal.Body>
        {!showAuthMethod ? (
          <Grid.Container
            css={{
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
                    />
                  </div>
                </Grid>
              </Grid.Container>
            </Grid>
            <Grid xs={12} justify="center">
              <Button
                size="sm"
                onPress={handleAuthMethod}
                ghost
                color={"default"}
              >
                Log In
              </Button>
            </Grid>
          </Grid.Container>
        ) : selectedAuthMethod === "webauthn" ? (
          <SignWithWebAuthN inModal />
        ) : (
          selectedAuthMethod === "otp" && <SignWithOTP inModal />
        )}
      </Modal.Body>
    </Modal>
  );
}
