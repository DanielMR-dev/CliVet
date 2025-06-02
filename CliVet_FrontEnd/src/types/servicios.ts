import { z } from "zod";

// Schema para un Servicio
export const ServicioSchema = z.object({
    id:          z.number(),
    nombre:      z.string(),
    descripcion: z.string(),
    precios:     z.string()
});

export const ServicioArraySchema = z.array(ServicioSchema);

export type Servicio     = z.infer<typeof ServicioSchema>;
export type ServicioList = z.infer<typeof ServicioArraySchema>;