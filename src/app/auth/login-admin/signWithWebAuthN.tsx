import { trpc } from "@/lib/trpc/csTRPC";
import { Button, Grid, Input, Loading, Text } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { Fragment, useState } from "react";
import { useWebAuthn } from "react-hook-webauthn";

export default function SignWithWebAuthN({ inModal }: { inModal?: boolean }) {

    const rpOptions = {
        rpId: process.env.NEXT_PUBLIC_HOST_RAW_DOMAIN + "",
        rpName: "SilverWeb",
      };
    
      const { getAssertion } = useWebAuthn(rpOptions);

  const [signInState, setSignInState] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const checkWebAuthN = trpc.getWebAuthnByEmail.useMutation()

  async function handleSignIn() {
    const credentials = await checkWebAuthN.mutateAsync(email)
    if (!credentials || !credentials.WebAuthN) {
      throw new Error("Credentials got rejected");
    }
    const auth = await getAssertion({challenge: credentials.WebAuthN.webauthnChallenge})
    if (!auth) {
      throw new Error("Credentials got rejected");
    }
    const signinWebAuthN = await signIn("credentials", {
        email: email,
        secret: auth.id,
        redirect: true,
        callbackUrl: "/sw",
    })
    return
  }

  return (
    <Fragment>
      <Grid.Container
        {...(!inModal
          ? {
              css: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                maxW: 350,
                filter: "invert(1)",
                py: 20,
              },
            }
          : { css: { py: 20 } })}
      >
        <Grid xs={12}>
          <Text
            h2
            css={{
              mb: 0,
            }}
          >
            Sign in with WebAuthN.
          </Text>
        </Grid>
        <Grid xs={12}>
          <Text
            css={{
              lh: "$xs",
            }}
          >
            Please enter your email,
            <br /> and authenticate 
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
                  value={email}
                  aria-label="CredentialsEmail"
                  fullWidth
                  placeholder="Email"
                  onChange={(e) =>
                    setEmail(e.currentTarget.value as string)
                  }
                />
              </div>
            </Grid>
            <Grid xs={12}>

            </Grid>
          </Grid.Container>
        </Grid>
        <Grid
          xs={12}
          justify="center"
          {...(!inModal && {
            css: {
              filter: "invert(1)",
            },
          })}
        >
          <Button
            onPress={async () => {
              try {
                setSignInState("loading");
                await handleSignIn();
                setSignInState("");
              } catch (error) {
                console.error(error);
                setSignInState("error");
              }
            }}
            disabled={signInState == "loading"}
            size="sm"
            ghost
            color={
              signInState == "error"
                ? "error"
                : "default"
            }
          >
            {signInState == "error" ? (
              "Error"
            ) : signInState == "loading" ? (
              <Loading color="currentColor" size="xs" />
            ) : (
              "Authenticate"
            )}
          </Button>
        </Grid>
      </Grid.Container>
    </Fragment>
  );
}
