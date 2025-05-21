import { callGateway } from "@/services/apiGateway";

export type LoginCreds = { id: number; clave: string };
export type LoginRes   = { access_token: string };

export function loginCliente(cred: LoginCreds): Promise<LoginRes> {
    return callGateway<LoginCreds, LoginRes>("login_cliente", cred);
}

export function loginEmpleado(cred: LoginCreds): Promise<LoginRes> {
    return callGateway<LoginCreds, LoginRes>("login_empleado", cred);
}
