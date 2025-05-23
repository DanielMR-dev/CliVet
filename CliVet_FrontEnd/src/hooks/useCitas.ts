import {
    useQuery,
    useMutation,
    useQueryClient,
    UseQueryResult,
    UseMutationResult
} from "@tanstack/react-query";
import {
    listarCitas,
    crearCita,
    actualizarCita,
    eliminarCita
} from "@/services/citaService";
import { Cita, CrearCitaDTO } from "@/types/index";

export function useCitas(token: string): UseQueryResult<Cita[], Error> {
    return useQuery<Cita[], Error>({
        queryKey: ["citas", token],
        queryFn: () => listarCitas(token)
    });
}

export function useCrearCita(): UseMutationResult<Cita, Error, CrearCitaDTO> {
    const qc = useQueryClient();
    return useMutation<Cita, Error, CrearCitaDTO>({
        mutationFn: (dto: CrearCitaDTO) => crearCita(dto),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["citas"] });
        }
    });
}

export function useActualizarCita(): UseMutationResult<Cita, Error, CrearCitaDTO> {
    const qc = useQueryClient();
    return useMutation<Cita, Error, CrearCitaDTO>({
        mutationFn: (dto: CrearCitaDTO) => actualizarCita(dto),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["citas"] });
        }
    });
}

export function useEliminarCita(): UseMutationResult<void, Error, { id: number; token: string }> {
    const qc = useQueryClient();
    return useMutation<void, Error, { id: number; token: string }>({
        mutationFn: ({ id, token }) => eliminarCita(id, token),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["citas"] });
        }
    });
}
