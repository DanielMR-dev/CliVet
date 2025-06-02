import { callGateway } from "@/services/apiGateway";
import { ProcesoArraySchema } from "@/types/proceso";
import type { Proceso } from "@/types/proceso";

interface GatewayResponse<T> {
    data: T;
    status: number;
}

/**
 * Lista todos los procesos internos de la clínica.
 * @param id   ID del proceso a obtener (opcional, si se quiere un proceso específico)
 * @param access_token  Access token del empleado/admin
 */

export async function listarProcesos(
    access_token: string
): Promise<Proceso[]> {
    const res = await callGateway<
        { access_token: string },
        GatewayResponse<unknown[]>
    >(
        "listar_procesos",
        { access_token: access_token }
    );
    return ProcesoArraySchema.parse(res.data);
}


export async function obtenerProcesoPorId(
    id: number,
    access_token: string
): Promise<Proceso[]> {
    const res = await callGateway<
        { id: number; access_token: string }, 
        GatewayResponse<unknown[]>
    >(
        "listar_proceso_id",
        { id, access_token }
    );
    return ProcesoArraySchema.parse(res.data);
}