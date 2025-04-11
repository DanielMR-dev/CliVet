import { FiX } from "react-icons/fi";

interface DeleteAppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteAppointmentModal({ isOpen, onClose, onConfirm }: DeleteAppointmentModalProps) {
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
                <h2 className="text-lg font-semibold text-center mb-4">¿Estás seguro de cancelar la cita?</h2>

                {/* Botón de confirmar */}
                <div className="text-center mt-4">
                    <button 
                        className="bg-red-600 px-6 py-2 text-white rounded hover:bg-red-700 hover:cursor-pointer"
                        onClick={onConfirm}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}
