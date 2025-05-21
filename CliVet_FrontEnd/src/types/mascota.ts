import { z } from "zod";

export const CrearMascotaSchema = z.object({
    id:             z.number(),
    nombre:         z.string().min(1),
    edad:           z.number(),
    id_propietario: z.number(),
    agresividad:    z.string(),
    peso:           z.number(),
    direccion:      z.string(),
    id_especie:     z.number(),
    access_token:   z.string(),
});

export const MascotaSchema = z.object({
    id:             z.number(),
    nombre:         z.string(),
    edad:           z.number(),
    id_propietario: z.number(),
    agresividad:    z.string(),
    peso:           z.number(),
    direccion:      z.string(),
    id_especie:     z.number(),
});

export const MascotaArraySchema = z.array(MascotaSchema);

export type CrearMascotaDTO = z.infer<typeof CrearMascotaSchema>;
export type Mascota         = z.infer<typeof MascotaSchema>;
export type MascotaList     = z.infer<typeof MascotaArraySchema>;
