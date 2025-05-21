import { z } from "zod";

export const CrearRecordatorioSchema = z.object({
    fecha:         z.string(),  // ISO 8601
    metodo_envio:  z.number(),
    id_cita:       z.number(),
    access_token:  z.string(),
});

export const RecordatorioSchema = z.object({
    id:            z.number(),
    fecha:         z.string(),
    metodo_envio:  z.number(),
    id_cita:       z.number(),
});

export const RecordatorioArraySchema = z.array(RecordatorioSchema);

export type CrearRecordatorioDTO = z.infer<typeof CrearRecordatorioSchema>;
export type Recordatorio        = z.infer<typeof RecordatorioSchema>;
export type RecordatorioList    = z.infer<typeof RecordatorioArraySchema>;
