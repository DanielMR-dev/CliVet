import { callGateway } from "./apiGateway";
import {
    CrearCitaDTO,
    Cita,
    CitaArraySchema,
    CitaSchema
} from "@/types/index";

export async function listarCitas(
    access_token: string
): Promise<Cita[]> {
    const res = await callGateway<{ access_token: string }, unknown>(
        "listar_citas",
        { access_token }
    );
    return CitaArraySchema.parse(res);
}

export async function crearCita(
    dto: CrearCitaDTO
): Promise<Cita> {
    const res = await callGateway<CrearCitaDTO, unknown>(
        "crear_cita",
        dto
    );
    return CitaSchema.parse(res);
}

export async function actualizarCita(
    dto: CrearCitaDTO
): Promise<Cita> {
    const res = await callGateway<CrearCitaDTO, unknown>(
        "actualizar_cita",
        dto
    );
    return CitaSchema.parse(res);
}

export async function eliminarCita(
    id: number,
    access_token: string
): Promise<void> {
    await callGateway<{ id: number; access_token: string }, unknown>(
        "eliminar_cita",
        { id, access_token }
    );
}
