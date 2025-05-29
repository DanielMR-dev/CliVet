import { callGateway } from "@/services/apiGateway";
import { Proceso, ProcesoArraySchema } from "@/types/proceso";

/**
 * Lista todos los procesos internos de la clínica.
 * @param token  Access token del empleado/admin
 */
export async function listarProcesos(token: string): Promise<Proceso[]> {
    const res = await callGateway<{ access_token: string }, unknown>(
        "listar_procesos",
        { access_token: token }
    );
    return ProcesoArraySchema.parse(res);
}
