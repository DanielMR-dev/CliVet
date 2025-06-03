// src/hooks/useCitas.ts

import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import {
    listarCitas,
    obtenerCitaPorId,
    crearCita,
    actualizarCita,
    eliminarCita
} from "@/services/citaService";
import type { Cita, CrearCitaDTO } from "@/types/cita";

export function useCitas(
    token: string
): UseQueryResult<Cita[], Error> {
    return useQuery<Cita[], Error>({
        queryKey: ["citas", token],
        queryFn: () => listarCitas(token),
        enabled: Boolean(token),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    });
}

export function useCita(
    id: number,
    token: string
): UseQueryResult<Cita, Error> {
    return useQuery<Cita, Error>({
        queryKey: ["cita", id, token],
        queryFn: () => obtenerCitaPorId(id, token),
        enabled: Boolean(token),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    });
}

export function useCrearCita(): UseMutationResult<Cita, Error, CrearCitaDTO> {
    const qc = useQueryClient();
    return useMutation<Cita, Error, CrearCitaDTO>({
        mutationFn: (dto: CrearCitaDTO) => crearCita(dto),
        onSuccess: (_, dto) => {
            qc.invalidateQueries({ queryKey: ["citas", dto.access_token] });
        }
    });
}

export function useActualizarCita(): UseMutationResult<Cita, Error, CrearCitaDTO> {
    const qc = useQueryClient();
    return useMutation<Cita, Error, CrearCitaDTO>({
        mutationFn: (dto: CrearCitaDTO) => actualizarCita(dto),
        onSuccess: (_, dto) => {
            qc.invalidateQueries({ queryKey: ["citas", dto.access_token] });
            qc.invalidateQueries({ queryKey: ["cita", dto.id, dto.access_token] });
        }
    });
}

export function useEliminarCita(): UseMutationResult<void, Error, { id: number; access_token: string }> {
    const qc = useQueryClient();
    return useMutation<void, Error, { id: number; access_token: string }>({
        mutationFn: ({ id, access_token }) => eliminarCita(id, access_token),
        onSuccess: (_, dto) => {
            qc.invalidateQueries({ queryKey: ["citas", dto.access_token] });
        }
    });
}
