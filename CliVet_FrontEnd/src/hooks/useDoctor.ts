import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { crearRecordatorio } from "@/services/doctorService";
import { CrearRecordatorioDTO, Recordatorio } from "@/types/index";

export function useCrearRecordatorio(): UseMutationResult<Recordatorio, Error, CrearRecordatorioDTO> {
    const qc = useQueryClient();
    return useMutation<Recordatorio, Error, CrearRecordatorioDTO>(
        (dto: CrearRecordatorioDTO) => crearRecordatorio(dto),
        {
            onSuccess: () => {
                qc.invalidateQueries(["recordatorios"]);
            }
        }
    );
}
