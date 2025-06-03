// src/services/colaboradorService.ts

import { callGateway } from "./apiGateway";
import {
    ColaboradorArraySchema,
    Colaborador,
    CrearColaboradorDTO
} from "@/types/colaborador";

/**
 * Interfaz que refleja la respuesta del gateway:
 * {
 *   "datos": T,
 *   "status": number
 * }
 */
interface GatewayResponse<T> {
    datos: T;
    status: number;
}

/**
 * listarColaboradores(access_token):
 *   → Llama a "listar_colaboradores" y retorna un array de Colaborador.
 */
export async function listarColaboradores(
    access_token: string
): Promise<Colaborador[]> {
    const res = await callGateway<
        { access_token: string },
        GatewayResponse<unknown[]>
    >(
        "listar_colaboradores",
        { access_token }
    );

    return ColaboradorArraySchema.parse(res.datos);
}

/**
 * obtenerColaboradorPorId(id, access_token):
 *   → Llama a "listar_colaborador_id" y retorna un solo Colaborador.
 */
export async function obtenerColaboradorPorId(
    id: number,
    access_token: string
): Promise<Colaborador> {
    const res = await callGateway<
        { id: number; access_token: string },
        GatewayResponse<unknown[]>
    >(
        "listar_colaborador_id",
        { id, access_token }
    );

    const arr = ColaboradorArraySchema.parse(res.datos);
    return arr[0];
}

/**
 * crearColaborador(dto con access_token):
 *   → Llama a "crear_colaborador". No retorna el objeto creado, solo mensaje + status.
 */
export async function crearColaborador(
    dto: CrearColaboradorDTO & { access_token: string }
): Promise<void> {
    await callGateway<CrearColaboradorDTO & { access_token: string }, unknown>(
        "crear_colaborador",
        dto
    );
}

/**
 * actualizarColaborador(dto con id y access_token):
 *   → Llama a "actualizar_colaborador". Tampoco retorna el objeto, solo mensaje + status.
 */
export async function actualizarColaborador(
    dto: Partial<Omit<CrearColaboradorDTO, "id">> & {
        id: number;
        access_token: string;
    }
): Promise<void> {
    await callGateway<
        Partial<Omit<CrearColaboradorDTO, "id">> & { id: number; access_token: string },
        unknown
    >(
        "actualizar_colaborador",
        dto
    );
}

/**
 * eliminarColaborador(id, access_token):
 *   → Llama a "eliminar_colaborador". No retorna datos de interés, solo mensaje + status.
 */
export async function eliminarColaborador(
    id: number,
    access_token: string
): Promise<void> {
    await callGateway<{ id: number; access_token: string }, unknown>(
        "eliminar_colaborador",
        { id, access_token }
    );
}
