import { callGateway } from "@/services/apiGateway";
import { Servicio, ServicioArraySchema } from "@/types/servicio";

/**
 * Lista todos los servicios que ofrece la clínica.
 * @param token  Access token del empleado/admin
 */
export async function listarServicios(token: string): Promise<Servicio[]> {
    const res = await callGateway<{ access_token: string }, unknown>(
        "listar_servicios",
        { access_token: token }
    );
    return ServicioArraySchema.parse(res);
}
