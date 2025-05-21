import { callGateway } from "./apiGateway";
import {
    CrearRecordatorioDTO,
    Recordatorio,
    RecordatorioSchema
} from "@/types/index";

export async function crearRecordatorio(
    dto: CrearRecordatorioDTO
): Promise<Recordatorio> {
    const res = await callGateway<CrearRecordatorioDTO, unknown>(
        "crear_recordatorio",
        dto
    );
    return RecordatorioSchema.parse(res);
}
