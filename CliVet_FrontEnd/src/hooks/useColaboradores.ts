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
import { Colaborador, CrearColaboradorDTO } from "@/types/index";

export function useColaboradores(
    token: string
): UseQueryResult<Colaborador[], Error> {
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

export function useColaborador(id: number, token: string): UseQueryResult<Colaborador, Error> {
    return useQuery<Colaborador, Error>({
        queryKey: ["colaborador", id, token],
        queryFn: () => obtenerColaboradorPorId(id, token)
    });
}

export function useCrearColaborador(): UseMutationResult<Colaborador, Error, CrearColaboradorDTO> {
    const qc = useQueryClient();
    return useMutation<Colaborador, Error, CrearColaboradorDTO>({
        mutationFn: (dto: CrearColaboradorDTO) => crearColaborador(dto),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["colaboradores"] });
        }
    });
}

export function useActualizarColaborador(): UseMutationResult<Colaborador, Error, CrearColaboradorDTO> {
    const qc = useQueryClient();
    return useMutation<Colaborador, Error, CrearColaboradorDTO>({
        mutationFn: (dto: CrearColaboradorDTO) => actualizarColaborador(dto),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["colaboradores"] });
        }
    });
}

export function useEliminarColaborador(): UseMutationResult<void, Error, { id: number; token: string }> {
    const qc = useQueryClient();
    return useMutation<void, Error, { id: number; token: string }>({
        mutationFn: ({ id, token }) => eliminarColaborador(id, token),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["colaboradores"] });
        }
    });
}
