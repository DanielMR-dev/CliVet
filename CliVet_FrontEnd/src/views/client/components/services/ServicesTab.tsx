import { useState } from "react";
import ScheduleAppointmentModal from "./ScheduleAppointmentModal";

export default function ServicesTab() {
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

    return (
        <div className="flex-1 flex flex-col">
            <div className="flex justify-start space-x-2 mt-4">
                {/* Botón para abrir modal de Agendar Cita */}
                <button 
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() => setIsScheduleModalOpen(true)}
                >
                    Agregar cita
                </button>
                
                {/* Botón para agregar guardería (sin funcionalidad) */}
                <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                    Agregar guardería
                </button>
            </div>

            {/* Tarjetas de información */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="border p-4 bg-white rounded shadow-md">
                        <h3 className="font-semibold border-b pb-2">Información</h3>
                    </div>
                ))}
            </div>

            {/* Modal de Agendar Cita */}
            <ScheduleAppointmentModal 
                isOpen={isScheduleModalOpen} 
                onClose={() => setIsScheduleModalOpen(false)}
            />
        </div>
    );
};
