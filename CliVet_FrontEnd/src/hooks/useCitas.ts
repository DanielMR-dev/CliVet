import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { listarCitas } from "@/services/citasService";
import type { Cita } from "@/types/index";

export function useCitas(
    token: string
): UseQueryResult<Cita[], Error> {
    return useQuery<Cita[], Error>({
        queryKey: ["citas", token],
        queryFn: () => listarCitas(token),
        enabled: Boolean(token),           // Sólo ejecuta la query si token !== ""
        refetchOnWindowFocus: false,       // Desactiva re-fetch al enfocar la ventana
        refetchOnMount: false,             // No volver a fetch al volver a montar el componente
        refetchOnReconnect: false,         // No volver a fetch al reconectarse a la red
        staleTime: Infinity,               // Marca el resultado como “siempre fresco” (opcional)
    });
}

