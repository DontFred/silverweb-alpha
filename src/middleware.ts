export { default } from "next-auth/middleware"

export const config = { 
    matcher: ["/((?!api/auth|auth|api/trpc/checkWebAuthN|api/trpc/getWebAuthnByEmail|api/trpc/getWebAuthnBySecretKey|api/trpc/registerWebAuthN|cp|font|icon|svg|vector).*)(.+)"]
};

