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