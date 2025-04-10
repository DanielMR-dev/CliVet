import { useState } from "react";
import { FiX, FiCalendar } from "react-icons/fi";

interface DaycareModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DaycareModal({ isOpen, onClose }: DaycareModalProps) {
    if (!isOpen) return null;

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [pet, setPet] = useState("");
    const [observations, setObservations] = useState("");

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
                <h2 className="text-lg font-semibold text-center mb-4">Agregar Guardería</h2>

                {/* Fecha y Hora de Ingreso */}
                <div className="mb-4">
                    <label className="block font-semibold">Fecha y hora de ingreso:</label>
                    <div className="relative">
                        <input 
                            type="datetime-local" 
                            className="border w-full p-2 rounded"
                            onChange={(e) => setCheckIn(e.target.value)}
                        />
                        <FiCalendar className="absolute right-3 top-3 text-gray-500" />
                    </div>
                </div>

                {/* Fecha y Hora de Salida */}
                <div className="mb-4">
                    <label className="block font-semibold">Fecha y hora de salida:</label>
                    <div className="relative">
                        <input 
                            type="datetime-local" 
                            className="border w-full p-2 rounded"
                            onChange={(e) => setCheckOut(e.target.value)}
                        />
                        <FiCalendar className="absolute right-3 top-3 text-gray-500" />
                    </div>
                </div>

                {/* Mascota */}
                <div className="mb-4">
                    <label className="block font-semibold">Mascota:</label>
                    <input 
                        type="text" 
                        className="border w-full p-2 rounded"
                        onChange={(e) => setPet(e.target.value)}
                    />
                </div>

                {/* Observaciones */}
                <div className="mb-4">
                    <label className="block font-semibold">Observaciones:</label>
                    <textarea 
                        className="border w-full p-2 rounded resize-none"
                        rows={3}
                        onChange={(e) => setObservations(e.target.value)}
                    />
                </div>

                {/* Botón para agregar */}
                <div className="text-center">
                    <button 
                        className="bg-blue-600 px-6 py-2 text-white rounded hover:bg-blue-700"
                        onClick={onClose}
                    >
                        Agregar guardería
                    </button>
                </div>
            </div>
        </div>
    );
}
