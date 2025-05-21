import { callGateway } from "./apiGateway";
import {
    RegistroUsuarioDTO,
    Usuario,
    UsuarioSchema
} from "@/types/index";

export async function registrarUsuario(
    dto: RegistroUsuarioDTO
): Promise<Usuario> {
    const res = await callGateway<RegistroUsuarioDTO, unknown>(
        "registrar_usuario",
        dto
    );
    return UsuarioSchema.parse(res);
}

export async function obtenerUsuarioPorId(
    id: number,
    access_token: string
): Promise<Usuario> {
    const res = await callGateway<{ id: number; access_token: string }, unknown>(
        "listar_usuario_id",
        { id, access_token }
    );
    return UsuarioSchema.parse(res);
}

export async function actualizarUsuario(
    dto: RegistroUsuarioDTO & { access_token: string }
): Promise<Usuario> {
    const res = await callGateway<typeof dto, unknown>(
        "actualizar_usuario",
        dto
    );
    return UsuarioSchema.parse(res);
}

export async function eliminarUsuario(
    id: number,
    access_token: string
): Promise<void> {
    await callGateway<{ id: number; access_token: string }, unknown>(
        "eliminar_usuario",
        { id, access_token }
    );
}
