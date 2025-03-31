import { z } from "zod";

// Enum para los roles
export const UserRoleEnum = z.enum(["ADMIN", "MEDICO", "CLIENTE"]);

// Esquema base para todos los usuarios
export const UserSchema = z.object({
    id: z.number(),
    nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    email: z.string().email("Correo electrónico inválido"),
    telefono: z.string().optional(), // Puede ser opcional
    role: UserRoleEnum,
});

// Esquema específico para Clientes
export const ClientSchema = UserSchema.extend({
    role: z.literal("CLIENTE"), // Restringe este esquema al rol "CLIENTE"
    direccion: z.string().min(5, "La dirección debe ser válida"),
    fechaNacimiento: z.string().refine(
      (fecha) => !isNaN(Date.parse(fecha)),
      "Debe ser una fecha válida"
    ),
});

// Esquema específico para Administradores
export const AdminSchema = UserSchema.extend({
    role: z.literal("ADMIN"), // Restringe este esquema al rol "ADMIN"
    permisos: z.array(z.string()).nonempty("Debe tener al menos un permiso"),
});

// Extraer los tipos en TypeScript
export type User = z.infer<typeof UserSchema>;
export type Client = z.infer<typeof ClientSchema>;
export type Admin = z.infer<typeof AdminSchema>;