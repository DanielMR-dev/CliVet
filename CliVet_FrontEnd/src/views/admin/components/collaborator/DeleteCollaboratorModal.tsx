import { FiX } from "react-icons/fi";

interface DeleteCollaboratorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteCollaboratorModal({ isOpen, onClose, onConfirm }: DeleteCollaboratorModalProps) {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black/30" 
            onClick={onClose}
        >
            <div 
                className="bg-white p-6 rounded shadow-lg w-1/3 relative text-center" 
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón de cerrar */}
                <button 
                    className="absolute top-3 right-3 text-gray-600 hover:text-black"
                    onClick={onClose}
                >
                    <FiX size={24} />
                </button>

                <h3 className="text-lg font-bold mb-4">¿Estás seguro de eliminar al colaborador?</h3>

                {/* Botón de confirmar */}
                <button 
                    className="px-6 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                    onClick={onConfirm}
                >
                    Confirmar
                </button>
            </div>
        </div>
    );
}
