// src/services/mascotaService.ts
import { callGateway } from "./apiGateway";
import { Mascota, MascotaArraySchema, CrearMascotaDTO, MascotaSchema } from "@/types/mascota";

interface GatewayResponse<T> {
    datos: T;
    status: number;
}

/**
 * Lista todas las mascotas.
 * @param access_token  Access token del empleado/admin
 */
export async function listarMascotas(
    access_token: string
): Promise<Mascota[]> {
    const res = await callGateway<
        { access_token: string },
        GatewayResponse<unknown[]>
    >(
        "listar_mascotas",
        { access_token }
    );
    return MascotaArraySchema.parse(res.datos);
}

/**
 * Obtiene una mascota por su ID.
 */
export async function obtenerMascotaPorId(
    id: number,
    access_token: string
): Promise<Mascota> {
    const res = await callGateway<
        { id: number; access_token: string },
        GatewayResponse<unknown>
    >(
        "listar_mascota_id",
        { id, access_token }
    );
    return MascotaArraySchema.parse([res.datos])[0];
}

/**
 * Crea una nueva mascota.
 */
export async function crearMascota(
    dto: CrearMascotaDTO
): Promise<Mascota> {
    // El gateway ignora el campo `id` en creación
    const res = await callGateway<CrearMascotaDTO, unknown>(
        "crear_mascota",
        dto
    );
    return MascotaSchema.parse(res);
}

/**
 * Actualiza una mascota existente.
 */
export async function actualizarMascota(
    dto: CrearMascotaDTO
): Promise<Mascota> {
    const res = await callGateway<CrearMascotaDTO, unknown>(
        "actualizar_mascota",
        dto
    );
    return MascotaSchema.parse(res);
}

/**
 * Elimina una mascota por ID.
 */
export async function eliminarMascota(
    id: number,
    access_token: string
): Promise<void> {
    await callGateway<{ id: number; access_token: string }, unknown>(
        "eliminar_mascota",
        { id, access_token }
    );
}
