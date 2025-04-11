import { FiX, FiCalendar } from "react-icons/fi";

interface ReminderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (date: string, time: string) => void;
}

export default function ReminderModal({ isOpen, onClose, onConfirm }: ReminderModalProps) {
    if (!isOpen) return null;

    let selectedDate = "";
    let selectedTime = "";

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
                <h2 className="text-lg font-semibold text-center mb-4">Programar recordatorio</h2>

                {/* Input de Fecha */}
                <div className="mb-4">
                    <label className="block font-semibold">Fecha:</label>
                    <div className="relative">
                        <input 
                            type="date" 
                            className="border w-full p-2 rounded"
                            onChange={(e) => selectedDate = e.target.value}
                        />
                        <FiCalendar className="absolute right-3 top-3 text-gray-500" />
                    </div>
                </div>

                {/* Input de Hora */}
                <div className="mb-4">
                    <label className="block font-semibold">Hora:</label>
                    <input 
                        type="time" 
                        className="border w-full p-2 rounded"
                        onChange={(e) => selectedTime = e.target.value}
                    />
                </div>

                {/* Botón para programar */}
                <div className="text-center">
                    <button 
                        className="bg-blue-600 px-6 py-2 text-white rounded hover:bg-blue-700 hover:cursor-pointer"
                        onClick={() => onConfirm(selectedDate, selectedTime)}
                    >
                        Programar recordatorio
                    </button>
                </div>
            </div>
        </div>
    );
};
