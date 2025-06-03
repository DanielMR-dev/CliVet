// src/services/citaService.ts
import { callGateway } from "./apiGateway";
import { CitaSchema, CitaArraySchema, CrearCitaDTO, Cita } from "@/types/cita";

interface GatewayResponse<T> {
    datos: T;
    status: number;
}

export async function listarCitas(access_token: string): Promise<Cita[]> {
    const res = await callGateway<{ access_token: string }, GatewayResponse<unknown[]>>(
        "listar_citas",
        { access_token }
    );
    return CitaArraySchema.parse(res.datos);
}

export async function obtenerCitaPorId(id: number, access_token: string): Promise<Cita> {
    const res = await callGateway<{ id: number; access_token: string }, GatewayResponse<unknown>>(
        "listar_cita_id",
        { id, access_token }
    );
    return CitaSchema.parse(res.datos);
}

export async function crearCita(dto: CrearCitaDTO & { access_token: string }): Promise<Cita> {
    const res = await callGateway<CrearCitaDTO & { access_token: string }, GatewayResponse<unknown>>(
        "crear_cita",
        dto
    );
    return CitaSchema.parse(res.datos);
}

export async function actualizarCita(dto: { id: number; access_token: string } & Partial<Omit<CrearCitaDTO, "id">>): Promise<Cita> {
    const res = await callGateway<typeof dto, GatewayResponse<unknown>>(
        "actualizar_cita",
        dto
    );
    return CitaSchema.parse(res.datos);
}

export async function eliminarCita(id: number, access_token: string): Promise<void> {
    await callGateway<{ id: number; access_token: string }, unknown>(
        "eliminar_cita",
        { id, access_token }
    );
}
