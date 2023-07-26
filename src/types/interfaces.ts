export interface User {
    id?: string;
    name?: string | null | undefined;
    email?: string | null | undefined;
    deptname?: string;
    avatar?: string;
    color?: "error" | "default" | "primary" | "secondary" | "success" | "warning" | "gradient";
}