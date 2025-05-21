import { z } from "zod";

export const RegistroUsuarioSchema = z.object({
    id:               z.number(),
    nombre_completo:  z.string().min(1),
    fecha_nacimiento: z.string(),          // ISO 8601
    clave:            z.string().min(6),
    email:            z.string().email(),
    telefono:         z.string().min(7),
    direccion:        z.string(),
});

export const UsuarioSchema = z.object({
    id:               z.number(),
    nombre_completo:  z.string(),
    fecha_nacimiento: z.string(),
    email:            z.string().email(),
    telefono:         z.string(),
    direccion:        z.string(),
});

export const UsuarioArraySchema = z.array(UsuarioSchema);

export type RegistroUsuarioDTO = z.infer<typeof RegistroUsuarioSchema>;
export type Usuario            = z.infer<typeof UsuarioSchema>;
export type UsuarioList        = z.infer<typeof UsuarioArraySchema>;
