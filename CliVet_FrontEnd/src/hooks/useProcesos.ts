import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { listarProcesos } from "@/services/procesoService";
import type { Proceso } from "@/types/index";

export function useProcesos(token: string): UseQueryResult<Proceso[], Error> {
    return useQuery<Proceso[], Error>({
        queryKey: ["procesos", token],
        queryFn: () => listarProcesos(token),
        enabled: Boolean(token),           
        refetchOnWindowFocus: false,       
        refetchOnMount: false,             
        refetchOnReconnect: false,         
        staleTime: Infinity,               
    });
}
