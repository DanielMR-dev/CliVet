// src/hooks/useUsuarios.ts
import { useQuery, useMutation, useQueryClient, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import {
    registrarUsuario,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
} from "@/services/usuarioService";
import { RegistroUsuarioDTO, Usuario } from "@/types/index";

export function useRegistrarUsuario(): UseMutationResult<Usuario, Error, RegistroUsuarioDTO> {
    return useMutation<Usuario, Error, RegistroUsuarioDTO>(
        (dto: RegistroUsuarioDTO) => registrarUsuario(dto)
    );
}

export function useUsuario(id: number, token: string): UseQueryResult<Usuario, Error> {
    return useQuery<Usuario, Error>(
        ["usuario", id, token],
        () => obtenerUsuarioPorId(id, token)
    );
}

export function useActualizarUsuario(): UseMutationResult<Usuario, Error, RegistroUsuarioDTO & { access_token: string }> {
    const qc = useQueryClient();
    return useMutation<Usuario, Error, RegistroUsuarioDTO & { access_token: string }>(
        (dto) => actualizarUsuario(dto),
        {
            onSuccess: () => {
                qc.invalidateQueries({ predicate: query => query.queryKey[0] === "usuario" });
            }
        }
    );
}

export function useEliminarUsuario(): UseMutationResult<void, Error, { id: number; token: string }> {
    const qc = useQueryClient();
    return useMutation<void, Error, { id: number; token: string }>(
        ({ id, token }) => eliminarUsuario(id, token),
        {
            onSuccess: () => {
                qc.invalidateQueries({ predicate: query => query.queryKey[0] === "usuario" });
            }
        }
    );
}
