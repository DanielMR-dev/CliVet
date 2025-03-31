import { z } from "zod";

// Enum para los roles
export const UserRoleEnum = z.enum(["ADMIN", "MEDICO", "CLIENTE"]);