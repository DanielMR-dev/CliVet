import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { listarServicios } from "@/services/servicioService";
import type { Servicio } from "@/types/index";

export function useServicios(token: string): UseQueryResult<Servicio[], Error> {
    return useQuery<Servicio[], Error>({
        queryKey: ["servicios", token],
        queryFn: () => listarServicios(token)
    });
}
