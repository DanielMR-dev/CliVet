import { useState } from "react";
import ScheduleAppointmentModal from "./ScheduleAppointmentModal";
import DaycareModal from "./DaycareModal";

export default function ServicesTab() {
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [isDaycareModalOpen, setIsDaycareModalOpen] = useState(false);

    return (
        <div className="flex-1 flex flex-col">
            <div className="flex justify-start space-x-2 mt-4">
                {/* Botón para abrir modal de Agendar Cita */}
                <button 
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 hover:cursor-pointer"
                    onClick={() => setIsScheduleModalOpen(true)}
                >
                    Agregar cita
                </button>
                
                {/* Botón para abrir modal de Agregar Guardería */}
                <button 
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 hover:cursor-pointer"
                    onClick={() => setIsDaycareModalOpen(true)}
                >
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

            {/* Modales */}
            <ScheduleAppointmentModal 
                isOpen={isScheduleModalOpen} 
                onClose={() => setIsScheduleModalOpen(false)}
            />

            <DaycareModal 
                isOpen={isDaycareModalOpen} 
                onClose={() => setIsDaycareModalOpen(false)}
            />
        </div>
    );
};
