import { callGateway } from "./apiGateway";
import {
    CrearColaboradorDTO,
    Colaborador,
    ColaboradorArraySchema,
    ColaboradorSchema
} from "@/types/index";

export async function listarColaboradores(
    access_token: string
): Promise<Colaborador[]> {
    const res = await callGateway<{ access_token: string }, unknown>(
        "listar_colaboradores",
        { access_token }
    );
    return ColaboradorArraySchema.parse(res);
}

export async function obtenerColaboradorPorId(
    id: number,
    access_token: string
): Promise<Colaborador> {
    const res = await callGateway<{ id: number; access_token: string }, unknown>(
        "listar_colaborador_id",
        { id, access_token }
    );
    return ColaboradorSchema.parse(res);
}

export async function crearColaborador(
    dto: CrearColaboradorDTO
): Promise<Colaborador> {
    const res = await callGateway<CrearColaboradorDTO, unknown>(
        "crear_colaborador",
        dto
    );
    return ColaboradorSchema.parse(res);
}

export async function actualizarColaborador(
    dto: CrearColaboradorDTO
): Promise<Colaborador> {
    const res = await callGateway<CrearColaboradorDTO, unknown>(
        "actualizar_colaborador",
        dto
    );
    return ColaboradorSchema.parse(res);
}

export async function eliminarColaborador(
    id: number,
    access_token: string
): Promise<void> {
    await callGateway<{ id: number; access_token: string }, unknown>(
        "eliminar_colaborador",
        { id, access_token }
    );
}
