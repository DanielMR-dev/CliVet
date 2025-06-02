import { callGateway } from "@/services/apiGateway";
import { Cita, CitaArraySchema } from "@/types/citas";

interface GatewayResponse<T> {
    data: T;
    status: number;
}

/**
 * Lista todas las citas de la clínica.
 * @param access_token  Access token del empleado/admin
 */

export async function listarCitas(
    access_token: string 
): Promise<Cita[]> {
    const res = await callGateway<
        { access_token: string },
        GatewayResponse<unknown[]>
    >(
        "listar_citas",
        { access_token: access_token }
    );
    return CitaArraySchema.parse(res.data);
}