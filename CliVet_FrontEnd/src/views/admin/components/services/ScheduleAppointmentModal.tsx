import { FiX, FiCalendar, FiList, FiMail } from "react-icons/fi";

interface ScheduleAppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { pet: string; type: string; date: string; available: string }) => void;
}

export default function ScheduleAppointmentModal({ isOpen, onClose, onSave }: ScheduleAppointmentModalProps) {
    if (!isOpen) return null;

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
                <h2 className="text-lg font-semibold text-center mb-4">Agendar cita</h2>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold">Mascota:</label>
                        <input className="border w-full p-2 rounded" type="text" />
                    </div>
                    <div>
                        <label className="block font-semibold">Tipo:</label>
                        <div className="relative">
                            <input className="border w-full p-2 rounded pr-8" type="text" />
                            <FiList className="absolute right-3 top-3 text-gray-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block font-semibold">Fecha y hora:</label>
                        <div className="relative">
                            <input className="border w-full p-2 rounded pr-8" type="text" />
                            <FiCalendar className="absolute right-3 top-3 text-gray-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block font-semibold">Citas disponibles:</label>
                        <div className="relative">
                            <input className="border w-full p-2 rounded pr-8" type="text" />
                            <FiMail className="absolute right-3 top-3 text-gray-500" />
                        </div>
                    </div>
                </div>

                {/* Botón para agendar */}
                <div className="text-center mt-6">
                    <button 
                        className="bg-blue-600 px-6 py-2 text-white rounded hover:bg-blue-700"
                        onClick={() => onSave({ pet: "", type: "", date: "", available: "" })}
                    >
                        Agendar cita
                    </button>
                </div>
            </div>
        </div>
    );
}
