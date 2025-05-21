// src/hooks/useCitas.ts
import { useQuery, useMutation, useQueryClient, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import {
    listarCitas,
    crearCita,
    actualizarCita,
    eliminarCita
} from "@/services/citaService";
import { Cita, CrearCitaDTO } from "@/types/index";

export function useCitas(token: string): UseQueryResult<Cita[], Error> {
    return useQuery<Cita[], Error>(
        ["citas", token],
        () => listarCitas(token)
    );
}

export function useCrearCita(): UseMutationResult<Cita, Error, CrearCitaDTO> {
    const qc = useQueryClient();
    return useMutation<Cita, Error, CrearCitaDTO>(
        (dto: CrearCitaDTO) => crearCita(dto),
        {
            onSuccess: () => {
                qc.invalidateQueries(["citas"]);
            }
        }
    );
}

export function useActualizarCita(): UseMutationResult<Cita, Error, CrearCitaDTO> {
    const qc = useQueryClient();
    return useMutation<Cita, Error, CrearCitaDTO>(
        (dto: CrearCitaDTO) => actualizarCita(dto),
        {
            onSuccess: () => {
                qc.invalidateQueries(["citas"]);
            }
        }
    );
}

export function useEliminarCita(): UseMutationResult<void, Error, { id: number; token: string }> {
    const qc = useQueryClient();
    return useMutation<void, Error, { id: number; token: string }>(
        ({ id, token }) => eliminarCita(id, token),
        {
            onSuccess: () => {
                qc.invalidateQueries(["citas"]);
            }
        }
    );
}
