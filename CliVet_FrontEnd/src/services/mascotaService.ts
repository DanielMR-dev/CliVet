import { callGateway } from "./apiGateway";
import {
    CrearMascotaDTO,
    Mascota,
    MascotaArraySchema,
    MascotaSchema
} from "@/types/index";

export async function listarMascotas(
    access_token: string
): Promise<Mascota[]> {
    const res = await callGateway<{ access_token: string }, unknown>(
        "listar_mascotas",
        { access_token }
    );
    return MascotaArraySchema.parse(res);
}

export async function obtenerMascotaPorId(
    id: number,
    access_token: string
): Promise<Mascota> {
    const res = await callGateway<{ id: number; access_token: string }, unknown>(
        "listar_mascota_id",
        { id, access_token }
    );
    return MascotaSchema.parse(res);
}

export async function listarMascotasPorUsuario(
    id: number,
    access_token: string
): Promise<Mascota[]> {
    const res = await callGateway<{ id: number; access_token: string }, unknown>(
        "listar_mascota_id_usuario",
        { id, access_token }
    );
    return MascotaArraySchema.parse(res);
}

export async function crearMascota(
    dto: CrearMascotaDTO
): Promise<Mascota> {
    const res = await callGateway<CrearMascotaDTO, unknown>(
        "crear_mascota",
        dto
    );
    return MascotaSchema.parse(res);
}

export async function actualizarMascota(
    dto: CrearMascotaDTO
): Promise<Mascota> {
    const res = await callGateway<CrearMascotaDTO, unknown>(
        "actualizar_mascota",
        dto
    );
    return MascotaSchema.parse(res);
}

export async function eliminarMascota(
    id: number,
    access_token: string
): Promise<void> {
    await callGateway<{ id: number; access_token: string }, unknown>(
        "eliminar_mascota",
        { id, access_token }
    );
}
