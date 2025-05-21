// src/hooks/useColaboradores.ts
import { useQuery, useMutation, useQueryClient, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import {
    listarColaboradores,
    obtenerColaboradorPorId,
    crearColaborador,
    actualizarColaborador,
    eliminarColaborador
} from "@/services/colaboradorService";
import { Colaborador, CrearColaboradorDTO } from "@/types/index";

export function useColaboradores(token: string): UseQueryResult<Colaborador[], Error> {
    return useQuery<Colaborador[], Error>(
        ["colaboradores", token],
        () => listarColaboradores(token)
    );
}

export function useColaborador(id: number, token: string): UseQueryResult<Colaborador, Error> {
    return useQuery<Colaborador, Error>(
        ["colaborador", id, token],
        () => obtenerColaboradorPorId(id, token)
    );
}

export function useCrearColaborador(): UseMutationResult<Colaborador, Error, CrearColaboradorDTO> {
    const qc = useQueryClient();
    return useMutation<Colaborador, Error, CrearColaboradorDTO>(
        (dto: CrearColaboradorDTO) => crearColaborador(dto),
        {
            onSuccess: () => {
                qc.invalidateQueries(["colaboradores"]);
            }
        }
    );
}

export function useActualizarColaborador(): UseMutationResult<Colaborador, Error, CrearColaboradorDTO> {
    const qc = useQueryClient();
    return useMutation<Colaborador, Error, CrearColaboradorDTO>(
        (dto: CrearColaboradorDTO) => actualizarColaborador(dto),
        {
            onSuccess: () => {
                qc.invalidateQueries(["colaboradores"]);
            }
        }
    );
}

export function useEliminarColaborador(): UseMutationResult<void, Error, { id: number; token: string }> {
    const qc = useQueryClient();
    return useMutation<void, Error, { id: number; token: string }>(
        ({ id, token }) => eliminarColaborador(id, token),
        {
            onSuccess: () => {
                qc.invalidateQueries(["colaboradores"]);
            }
        }
    );
}
