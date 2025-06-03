// src/hooks/useColaboradores.ts

import {
    useQuery,
    useMutation,
    useQueryClient,
    UseQueryResult,
    UseMutationResult
} from "@tanstack/react-query";
import {
    listarColaboradores,
    obtenerColaboradorPorId,
    crearColaborador,
    actualizarColaborador,
    eliminarColaborador
} from "@/services/colaboradorService";
import type { Colaborador, CrearColaboradorDTO } from "@/types/colaborador";

/**
 * Hook para listar todos los colaboradores (array).
 */
export function useColaboradores(token: string): UseQueryResult<Colaborador[], Error> {
    return useQuery<Colaborador[], Error>({
        queryKey: ["colaboradores", token],
        queryFn: () => listarColaboradores(token),
        enabled: Boolean(token),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    });
}

/**
 * Hook para obtener un colaborador por ID.
 */
export function useColaborador(
    id: number,
    token: string
): UseQueryResult<Colaborador, Error> {
    return useQuery<Colaborador, Error>({
        queryKey: ["colaborador", id, token],
        queryFn: () => obtenerColaboradorPorId(id, token),
        enabled: Boolean(token),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    });
}

/**
 * Hook para crear un colaborador.
 * El DTO que recibe debe incluir el access_token:
 *   { id: number; nombre_completo: string; id_tipo: number;
 *     email: string; telefono: string; direccion: string; access_token: string }
 */
export function useCrearColaborador(): UseMutationResult<
    void,
    Error,
    CrearColaboradorDTO & { access_token: string }
> {
    const qc = useQueryClient();

    return useMutation<void, Error, CrearColaboradorDTO & { access_token: string }>({
        mutationFn: (dto) => crearColaborador(dto),
        onSuccess: (_, dto) => {
            // Invalidamos la query de "colaboradores" con la misma clave
            qc.invalidateQueries({
                queryKey: ["colaboradores", dto.access_token]
            });
        }
    });
}

/**
 * Hook para actualizar un colaborador.
 * El DTO que recibe debe incluir { id, access_token, ...camposActualizados }
 */
export function useActualizarColaborador(): UseMutationResult<
    void,
    Error,
    Partial<Omit<CrearColaboradorDTO, "id">> & {
        id: number;
        access_token: string;
    }
> {
    const qc = useQueryClient();

    return useMutation<
        void,
        Error,
        Partial<Omit<CrearColaboradorDTO, "id">> & { id: number; access_token: string }
    >({
        mutationFn: (dto) => actualizarColaborador(dto),
        onSuccess: (_, dto) => {
            // Invalidamos la lista de colaboradores
            qc.invalidateQueries({
                queryKey: ["colaboradores", dto.access_token]
            });
            // Invalidamos el detalle del colaborador que acabamos de actualizar
            qc.invalidateQueries({
                queryKey: ["colaborador", dto.id, dto.access_token]
            });
        }
    });
}

/**
 * Hook para eliminar un colaborador por ID.
 * Recibe { id: number; access_token: string }
 */
export function useEliminarColaborador(): UseMutationResult<
    void,
    Error,
    { id: number; access_token: string }
> {
    const qc = useQueryClient();

    return useMutation<void, Error, { id: number; access_token: string }>({
        mutationFn: ({ id, access_token }) => eliminarColaborador(id, access_token),
        onSuccess: (_, dto) => {
            // Invalidamos la lista de colaboradores nuevamente
            qc.invalidateQueries({
                queryKey: ["colaboradores", dto.access_token]
            });
        }
    });
}
