import { z } from "zod";

// Schema para un Proceso
export const ProcesoSchema = z.object({
    id:          z.number(),
    nombre:      z.string(),
    descripcion: z.string(),
});

export const ProcesoArraySchema = z.array(ProcesoSchema);

export type Proceso     = z.infer<typeof ProcesoSchema>;
export type ProcesoList = z.infer<typeof ProcesoArraySchema>;
