import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { listarProcesos } from "@/services/procesoService";
import type { Proceso } from "@/types/index";

export function useProcesos(
    token: string
): UseQueryResult<Proceso[], Error> {
    return useQuery<Proceso[], Error>({
        queryKey: ["procesos", token],
        queryFn: () => listarProcesos(token),
        enabled: Boolean(token),           // Sólo ejecuta la query si token !== ""
        refetchOnWindowFocus: false,       // Desactiva re-fetch al enfocar la ventana
        refetchOnMount: false,             // No volver a fetch al volver a montar el componente
        refetchOnReconnect: false,         // No volver a fetch al reconectarse a la red
        staleTime: Infinity,               // Marca el resultado como “siempre fresco” (opcional)
    });
}
