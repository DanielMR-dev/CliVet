import {
    useQuery,
    useMutation,
    useQueryClient,
    UseQueryResult,
    UseMutationResult
} from "@tanstack/react-query";
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
    return useQuery<Mascota[], Error>({
        queryKey: ["mascotas", token],
        queryFn: () => listarMascotas(token)
    });
}

export function useMascotasPorUsuario(id: number, token: string): UseQueryResult<Mascota[], Error> {
    return useQuery<Mascota[], Error>({
        queryKey: ["mascotas-usuario", id, token],
        queryFn: () => listarMascotasPorUsuario(id, token)
    });
}

export function useMascota(id: number, token: string): UseQueryResult<Mascota, Error> {
    return useQuery<Mascota, Error>({
        queryKey: ["mascota", id, token],
        queryFn: () => obtenerMascotaPorId(id, token)
    });
}

export function useCrearMascota(): UseMutationResult<Mascota, Error, CrearMascotaDTO> {
    const qc = useQueryClient();
    return useMutation<Mascota, Error, CrearMascotaDTO>({
        mutationFn: (dto: CrearMascotaDTO) => crearMascota(dto),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["mascotas"] });
        }
    });
}

export function useActualizarMascota(): UseMutationResult<Mascota, Error, CrearMascotaDTO> {
    const qc = useQueryClient();
    return useMutation<Mascota, Error, CrearMascotaDTO>({
        mutationFn: (dto: CrearMascotaDTO) => actualizarMascota(dto),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["mascotas"] });
        }
    });
}

export function useEliminarMascota(): UseMutationResult<void, Error, { id: number; token: string }> {
    const qc = useQueryClient();
    return useMutation<void, Error, { id: number; token: string }>({
        mutationFn: ({ id, token }) => eliminarMascota(id, token),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["mascotas"] });
        }
    });
}
