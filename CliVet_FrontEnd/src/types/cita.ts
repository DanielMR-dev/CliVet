// src/types/cita.ts
import { z } from "zod";

export const CitaSchema = z.object({
    id: z.number(),
    id_mascota: z.number(),
    id_servicio: z.number(),
    fecha: z.string(),
    precio: z.number()
});
export type Cita = z.infer<typeof CitaSchema>;
export const CitaArraySchema = z.array(CitaSchema);

export interface CrearCitaDTO {
    id: number;
    id_mascota: number;
    id_servicio: number;
    fecha: string;
    precio: number;
    access_token: string;
}
