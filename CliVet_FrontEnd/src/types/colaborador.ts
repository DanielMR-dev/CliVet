import { z } from "zod";

export const CrearColaboradorSchema = z.object({
    id:              z.number(),
    nombre_completo: z.string().min(1),
    id_tipo:         z.number(),
    email:           z.string().email(),
    telefono:        z.string().min(7),
    direccion:       z.string(),
    access_token:    z.string(),
});

export const ColaboradorSchema = z.object({
    id:              z.number(),
    nombre_completo: z.string(),
    id_tipo:         z.number(),
    email:           z.string(),
    telefono:        z.string(),
    direccion:       z.string(),
});

export const ColaboradorArraySchema = z.array(ColaboradorSchema);

export type CrearColaboradorDTO = z.infer<typeof CrearColaboradorSchema>;
export type Colaborador        = z.infer<typeof ColaboradorSchema>;
export type ColaboradorList    = z.infer<typeof ColaboradorArraySchema>;
