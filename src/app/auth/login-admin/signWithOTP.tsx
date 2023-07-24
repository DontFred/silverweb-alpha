import { trpc } from "@/lib/trpc/csTRPC";
import { Button, Grid, Input, Loading, Text } from "@nextui-org/react";
import React, { Fragment, useRef, useState } from "react";
import { useWebAuthn } from "react-hook-webauthn";

export default function SignWithOTP() {
  const OTP1Ref = useRef<HTMLInputElement>(null);
  const OTP2Ref = useRef<HTMLInputElement>(null);
  const OTP3Ref = useRef<HTMLInputElement>(null);
  const OTP4Ref = useRef<HTMLInputElement>(null);

  const [ registerState, setRegisterState ] = useState<string>("");

  const [secretAndWebAuth, setSecretAndWebAuth] = useState<{
    otp: Array<string>;
    secret: string;
  }>({ otp: new Array(6).fill(""), secret: "" });

  const rpOptions = {
    rpId: process.env.NEXT_PUBLIC_HOST_RAW_DOMAIN + "",
    rpName: "SilverWeb",
  };

  const { getCredential } = useWebAuthn(rpOptions);
  const checkOTP = trpc.getWebAuthnBySecretKey.useMutation();
  const registerWebAuthN = trpc.registerWebAuthN.useMutation();
  async function handleRegister() {
    const credentials = await checkOTP.mutateAsync({
      otp: secretAndWebAuth.otp.join(""),
      secret: secretAndWebAuth.secret,
    });
    if(!credentials){
      throw new Error("Credentials got rejected");
    }
    const auth = await getCredential({
      challenge: credentials.webauthnChallenge,
      userDisplayName: credentials.User.name,
      userId: credentials.User.id,
      userName: credentials.User.email,
    })
    console.log(auth)
    if(!auth){
      throw new Error("WebAuthN got rejected");
    }
    const setupWebAuthN = await registerWebAuthN.mutateAsync({
      id: credentials.id,
      secret: auth.id,
    })

    if(setupWebAuthN.webauthnSecret){
      setRegisterState("success");
    }
  }

  return (
    <Fragment>
      <style jsx global>
        {`
          input[type="number"]::-webkit-inner-spin-button {
            display: none;
          }
          input[type="number"] {
            -moz-appearance: textfield;
          }
          input[aria-controls="OTP"] {
            font-size: 15px;
            margin: 4px !important;
            text-align: center;
          }
        `}
      </style>
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
            Sign in with OTP.
          </Text>
        </Grid>
        <Grid xs={12}>
          <Text
            css={{
              lh: "$xs",
            }}
          >
            Please enter your ID and the OTP,
            <br /> and register WebAuthN
          </Text>
        </Grid>
        <Grid xs={12}>
          <Grid.Container
            gap={2}
            css={{
              px: 40,
              py: 40,
            }}
          >
            <Grid xs={12}>
              <div
                style={{
                  width: "100%",
                  padding: "20px 20px 20px 20px",
                  borderRadius: 10,
                  border: "1px solid var(--nextui-colors-border)",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Input
                  bordered
                  value={secretAndWebAuth.secret}
                  aria-label="CredentialsID"
                  fullWidth
                  placeholder="Security ID"
                  onChange={(e) =>
                    setSecretAndWebAuth({
                      secret: e.target.value as string,
                      otp: secretAndWebAuth.otp,
                    })
                  }
                />
              </div>
            </Grid>
            <Grid xs={12}>
              <div
                style={{
                  width: "100%",
                  padding: "20px 20px",
                  borderRadius: 10,
                  border: "1px solid var(--nextui-colors-border)",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Input
                  placeholder="0"
                  value={secretAndWebAuth.otp[0]}
                  ref={OTP1Ref}
                  onChange={(e) => {
                    e.target.value = e.target.value.slice(0, 1);
                    if (e.target.value != "") {
                      OTP2Ref.current?.focus();
                    }
                    const newOTP = [...secretAndWebAuth.otp];
                    newOTP[0] = e.target.value;
                    setSecretAndWebAuth({
                      otp: newOTP,
                      secret: secretAndWebAuth.secret,
                    });
                  }}
                  aria-controls="OTP"
                  aria-label="OTP-1"
                  bordered
                  type="number"
                  inputMode="numeric"
                  css={{
                    width: 40,
                  }}
                />
                <Input
                  placeholder="0"
                  ref={OTP2Ref}
                  value={secretAndWebAuth.otp[1]}
                  onChange={(e) => {
                    e.target.value = e.target.value.slice(0, 1);
                    if (e.target.value != "") {
                      OTP3Ref.current?.focus();
                    }
                    const newOTP = [...secretAndWebAuth.otp];
                    newOTP[1] = e.target.value;
                    setSecretAndWebAuth({
                      otp: newOTP,
                      secret: secretAndWebAuth.secret,
                    });
                  }}
                  aria-controls="OTP"
                  aria-label="OTP-2"
                  bordered
                  type="number"
                  inputMode="numeric"
                  css={{
                    width: 40,
                  }}
                />
                <Input
                  placeholder="0"
                  ref={OTP3Ref}
                  value={secretAndWebAuth.otp[2]}
                  onChange={(e) => {
                    e.target.value = e.target.value.slice(0, 1);
                    if (e.target.value != "") {
                      OTP4Ref.current?.focus();
                    }
                    const newOTP = [...secretAndWebAuth.otp];
                    newOTP[2] = e.target.value;
                    setSecretAndWebAuth({
                      otp: newOTP,
                      secret: secretAndWebAuth.secret,
                    });
                  }}
                  aria-controls="OTP"
                  aria-label="OTP-3"
                  bordered
                  type="number"
                  inputMode="numeric"
                  css={{
                    width: 40,
                  }}
                />
                <Input
                  placeholder="0"
                  ref={OTP4Ref}
                  value={secretAndWebAuth.otp[3]}
                  onChange={(e) => {
                    e.target.value = e.target.value.slice(0, 1);
                    if (e.target.value != "") {
                      OTP1Ref.current?.focus();
                    }
                    const newOTP = [...secretAndWebAuth.otp];
                    newOTP[3] = e.target.value;
                    setSecretAndWebAuth({
                      otp: newOTP,
                      secret: secretAndWebAuth.secret,
                    });
                  }}
                  aria-controls="OTP"
                  aria-label="OTP-4"
                  bordered
                  type="number"
                  inputMode="numeric"
                  css={{
                    width: 40,
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
          <Button
            onPress={async()=> {
              try {
                setRegisterState("loading");
                await handleRegister();
                setRegisterState("success");
              } catch (error) {
                console.error(error);
                setRegisterState("error");
              }
            }}
            disabled={registerState == "loading"}
            size="sm"
            ghost
            color={registerState == "error" ? "error" : registerState == "success" ? "success" : "default"}
          >
            {registerState == "error" ? "Error" : registerState == "loading" ?  <Loading color="currentColor" size="xs" /> : "Register"}
          </Button>
        </Grid>
      </Grid.Container>
    </Fragment>
  );
}
