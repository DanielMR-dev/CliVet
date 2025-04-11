import { useState } from "react";
import { FiX, FiCalendar, FiMail } from "react-icons/fi";

interface ScheduleAppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ScheduleAppointmentModal({ isOpen, onClose }: ScheduleAppointmentModalProps) {
    if (!isOpen) return null;

    const [pet, setPet] = useState("");
    const [type, setType] = useState("");
    const [date, setDate] = useState("");
    const [availableSlot, setAvailableSlot] = useState("");

    return (
        <div 
            className="fixed inset-0 bg-black/30 flex justify-center items-center"
            onClick={onClose} // Cierra al hacer clic en el fondo
        >
            <div 
                className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
                onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic dentro
            >
                {/* Botón de cerrar */}
                <button 
                    className="absolute top-3 right-3 text-gray-600 hover:text-black"
                    onClick={onClose}
                >
                    <FiX size={24} />
                </button>

                {/* Contenido del Modal */}
                <h2 className="text-lg font-semibold text-center mb-4">Agendar Cita</h2>

                {/* Mascota */}
                <div className="mb-4">
                    <label className="block font-semibold">Mascota:</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            className="border w-full p-2 rounded"
                            onChange={(e) => setPet(e.target.value)}
                        />
                    </div>
                </div>

                {/* Tipo */}
                <div className="mb-4">
                    <label className="block font-semibold">Tipo:</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            className="border w-full p-2 rounded"
                            onChange={(e) => setType(e.target.value)}
                        />
                    </div>
                </div>

                {/* Fecha */}
                <div className="mb-4">
                    <label className="block font-semibold">Fecha:</label>
                    <div className="relative">
                        <input 
                            type="date" 
                            className="border w-full p-2 rounded"
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <FiCalendar className="absolute right-3 top-3 text-gray-500" />
                    </div>
                </div>

                {/* Citas disponibles */}
                <div className="mb-4">
                    <label className="block font-semibold">Citas disponibles:</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            className="border w-full p-2 rounded"
                            onChange={(e) => setAvailableSlot(e.target.value)}
                        />
                    </div>
                </div>

                {/* Botón para agendar */}
                <div className="text-center">
                    <button 
                        className="bg-blue-600 px-6 py-2 text-white rounded hover:bg-blue-700 hover:cursor-pointer"
                        onClick={onClose}
                    >
                        Agendar cita
                    </button>
                </div>
            </div>
        </div>
    );
}
