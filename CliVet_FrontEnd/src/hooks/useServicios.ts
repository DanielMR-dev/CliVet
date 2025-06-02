import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { listarServicios } from "@/services/servicioService";
import type { Servicio } from "@/types/index";

export function useServicios(
    token: string
): UseQueryResult<Servicio[], Error> {
    return useQuery<Servicio[], Error>({
        queryKey: ["servicios", token],
        queryFn: () => listarServicios(token),
        enabled: Boolean(token),           // Sólo ejecuta la query si token !== ""
        refetchOnWindowFocus: false,       // Desactiva re-fetch al enfocar la ventana
        refetchOnMount: false,             // No volver a fetch al volver a montar el componente
        refetchOnReconnect: false,         // No volver a fetch al reconectarse a la red
        staleTime: Infinity,               // Marca el resultado como “siempre fresco” (opcional)
    });
}
