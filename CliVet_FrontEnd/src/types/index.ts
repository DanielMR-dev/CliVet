import { z } from "zod";

// Enum para los roles
export const UserRoleEnum = z.enum(["ADMIN", "MEDICO", "CLIENTE"]);

// Esquema base para todos los usuarios
export const UsuarioSchema = z.object({
    id: z.number(),
    nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    email: z.string().email("Correo electrónico inválido"),
    telefono: z.string().optional(), // Puede ser opcional
    role: UserRoleEnum,
});

// Esquema específico para Clientes
export const ClienteSchema = UsuarioSchema.extend({
    role: z.literal("CLIENTE"), // Restringe este esquema al rol "CLIENTE"
    direccion: z.string().min(5, "La dirección debe ser válida"),
    fechaNacimiento: z.string().refine(
      (fecha) => !isNaN(Date.parse(fecha)),
      "Debe ser una fecha válida"
    ),
});