// src/hooks/useMascotas.ts

import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import {
    listarMascotas,
    obtenerMascotaPorId,
    crearMascota,
    actualizarMascota,
    eliminarMascota
} from "@/services/mascotaService";
import type { Mascota, CrearMascotaDTO } from "@/types/mascota";

export function useMascotas(
    token: string
): UseQueryResult<Mascota[], Error> {
    return useQuery<Mascota[], Error>({
        queryKey: ["mascotas", token],
        queryFn: () => listarMascotas(token),
        enabled: Boolean(token),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    });
}

export function useMascota(
    id: number,
    token: string
): UseQueryResult<Mascota, Error> {
    return useQuery<Mascota, Error>({
        queryKey: ["mascota", id, token],
        queryFn: () => obtenerMascotaPorId(id, token),
        enabled: Boolean(token),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    });
}

export function useCrearMascota(): UseMutationResult<Mascota, Error, CrearMascotaDTO> {
    const qc = useQueryClient();
    return useMutation<Mascota, Error, CrearMascotaDTO>({
        mutationFn: (dto: CrearMascotaDTO) => crearMascota(dto),
        onSuccess: (_, dto) => {
            qc.invalidateQueries({ queryKey: ["mascotas", dto.access_token] });
        }
    });
}

export function useActualizarMascota(): UseMutationResult<Mascota, Error, CrearMascotaDTO> {
    const qc = useQueryClient();
    return useMutation<Mascota, Error, CrearMascotaDTO>({
        mutationFn: (dto: CrearMascotaDTO) => actualizarMascota(dto),
        onSuccess: (_, dto) => {
            qc.invalidateQueries({ queryKey: ["mascotas", dto.access_token] });
            qc.invalidateQueries({ queryKey: ["mascota", dto.id, dto.access_token] });
        }
    });
}

export function useEliminarMascota(): UseMutationResult<void, Error, { id: number; access_token: string }> {
    const qc = useQueryClient();
    return useMutation<void, Error, { id: number; access_token: string }>({
        mutationFn: ({ id, access_token }) => eliminarMascota(id, access_token),
        onSuccess: (_, dto) => {
            qc.invalidateQueries({ queryKey: ["mascotas", dto.access_token] });
        }
    });
}
