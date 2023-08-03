export { default } from "next-auth/middleware"

export const config = { 
    matcher: ["/((?!api/auth|auth|api/trpc/checkWebAuthN|api/trpc/submitOrderForm|api/trpc/getOrderFormById|api/trpc/getOrderById|api/trpc/getWebAuthnByEmail|api/trpc/getWebAuthnBySecretKey|api/trpc/registerWebAuthN|flags|cp|font|icon|svg|vector).*)(.+)"]
};

