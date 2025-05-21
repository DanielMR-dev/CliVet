import { z } from "zod";

export const CrearCitaSchema = z.object({
    id:                     z.number(),
    id_tipo:                z.number(),
    id_mascota:             z.number(),
    id_colaborador:         z.number(),
    fecha_hora:             z.string(),  // ISO 8601
    modificable_por_usuario:z.number(),  // 0 ó 1
    access_token:           z.string(),
});

export const CitaSchema = z.object({
    id:                     z.number(),
    id_tipo:                z.number(),
    id_mascota:             z.number(),
    id_colaborador:         z.number(),
    fecha_hora:             z.string(),
    modificable_por_usuario:z.number(),
});

export const CitaArraySchema = z.array(CitaSchema);

export type CrearCitaDTO = z.infer<typeof CrearCitaSchema>;
export type Cita          = z.infer<typeof CitaSchema>;
export type CitaList      = z.infer<typeof CitaArraySchema>;
