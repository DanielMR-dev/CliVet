// src/types/mascota.ts

import { z } from "zod";

/**
 * Schema Zod para una Mascota.
 * Asumimos que el gateway devuelve, como mínimo, estas propiedades.
 */
export const MascotaSchema = z.object({
    id:       z.number(),
    nombre:   z.string(),
    edad:     z.number(),
    raza:     z.string().optional().default(""),
    sexo:     z.string().optional().default(""),
    // Cualquier otro campo que necesites agregar (ej. id_propietario, etc.)
});

export const MascotaArraySchema = z.array(MascotaSchema);

export type Mascota = z.infer<typeof MascotaSchema>;
export type MascotaList = z.infer<typeof MascotaArraySchema>;

/**
 * DTO para crear/actualizar Mascota.
 * Cuando creamos una mascota, no necesitamos `id` (el gateway lo ignora).
 * Para actualizar, sí mandamos `id`.
 */
export interface CrearMascotaDTO {
    id?:       number;      // opcional en creación, requerido en actualización
    nombre:    string;
    edad:      number;
    raza:      string;
    sexo:      string;
    access_token: string;
}
