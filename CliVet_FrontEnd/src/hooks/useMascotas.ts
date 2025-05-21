// src/hooks/useMascotas.ts
import { useQuery, useMutation, useQueryClient, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import {
    listarMascotas,
    obtenerMascotaPorId,
    listarMascotasPorUsuario,
    crearMascota,
    actualizarMascota,
    eliminarMascota
} from "@/services/mascotaService";
import { Mascota, CrearMascotaDTO } from "@/types/index";

export function useMascotas(token: string): UseQueryResult<Mascota[], Error> {
    return useQuery<Mascota[], Error>(
        ["mascotas", token],
        () => listarMascotas(token)
    );
}

export function useMascotasPorUsuario(id: number, token: string): UseQueryResult<Mascota[], Error> {
    return useQuery<Mascota[], Error>(
        ["mascotas-usuario", id, token],
        () => listarMascotasPorUsuario(id, token)
    );
}

export function useMascota(id: number, token: string): UseQueryResult<Mascota, Error> {
    return useQuery<Mascota, Error>(
        ["mascota", id, token],
        () => obtenerMascotaPorId(id, token)
    );
}

export function useCrearMascota(): UseMutationResult<Mascota, Error, CrearMascotaDTO> {
    const qc = useQueryClient();
    return useMutation<Mascota, Error, CrearMascotaDTO>(
        (dto: CrearMascotaDTO) => crearMascota(dto),
        {
            onSuccess: () => {
                qc.invalidateQueries(["mascotas"]);
            }
        }
    );
}

export function useActualizarMascota(): UseMutationResult<Mascota, Error, CrearMascotaDTO> {
    const qc = useQueryClient();
    return useMutation<Mascota, Error, CrearMascotaDTO>(
        (dto: CrearMascotaDTO) => actualizarMascota(dto),
        {
            onSuccess: () => {
                qc.invalidateQueries(["mascotas"]);
            }
        }
    );
}

export function useEliminarMascota(): UseMutationResult<void, Error, { id: number; token: string }> {
    const qc = useQueryClient();
    return useMutation<void, Error, { id: number; token: string }>(
        ({ id, token }) => eliminarMascota(id, token),
        {
            onSuccess: () => {
                qc.invalidateQueries(["mascotas"]);
            }
        }
    );
}
