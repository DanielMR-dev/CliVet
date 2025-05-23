// src/hooks/useUsuarios.ts
import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import {
    registrarUsuario,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
} from "@/services/usuarioService";
import { RegistroUsuarioDTO, Usuario } from "@/types/index";

export function useUsuario(id: number, token: string): UseQueryResult<Usuario, Error> {
    return useQuery<Usuario, Error>({
        queryKey: ["usuario", id, token],
        queryFn: () => obtenerUsuarioPorId(id, token)
    });
}

export function useRegistrarUsuario(): UseMutationResult<Usuario, Error, RegistroUsuarioDTO> {
    return useMutation<Usuario, Error, RegistroUsuarioDTO>({
        mutationFn: dto => registrarUsuario(dto)
    });
}

export function useActualizarUsuario(): UseMutationResult<Usuario, Error, RegistroUsuarioDTO & { access_token: string }> {
    const qc = useQueryClient();
    return useMutation<Usuario, Error, RegistroUsuarioDTO & { access_token: string }>({
        mutationFn: dto => actualizarUsuario(dto),
        onSuccess: () => qc.invalidateQueries({ predicate: q => q.queryKey[0] === "usuario" })
    });
}

export function useEliminarUsuario(): UseMutationResult<void, Error, { id: number; token: string }> {
    const qc = useQueryClient();
    return useMutation<void, Error, { id: number; token: string }>({
        mutationFn: ({ id, token }) => eliminarUsuario(id, token),
        onSuccess: () => qc.invalidateQueries({ predicate: q => q.queryKey[0] === "usuario" })
    });
}
