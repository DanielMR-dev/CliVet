import { FiX } from "react-icons/fi";

interface AddCollaboratorModalProps {
    isOpen: boolean;
    onClose: () => void;
};

export default function AddCollaboratorModal({ isOpen, onClose } : AddCollaboratorModalProps) {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black/30" 
            onClick={onClose}
        >
            <div 
                className="bg-white p-6 rounded shadow-lg w-1/2 relative" 
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón de cerrar */}
                <button 
                    className="absolute top-3 right-3 text-gray-600 hover:text-black"
                    onClick={onClose}
                >
                    <FiX size={24} />
                </button>
                <h3 className="text-lg font-bold border-b pb-2">Agregar colaborador</h3>
                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold">No. Identificación:</label>
                        <input type="text" className="w-full border p-2 rounded mt-1" />
                    </div>
                    <div>
                        <label className="block font-semibold">Nombre completo:</label>
                        <input type="text" className="w-full border p-2 rounded mt-1" />
                    </div>
                    <div>
                        <label className="block font-semibold">Tipo colaborador:</label>
                        <input type="text" className="w-full border p-2 rounded mt-1" />
                    </div>
                    <div>
                        <label className="block font-semibold">Email:</label>
                        <input type="text" className="w-full border p-2 rounded mt-1" />
                    </div>
                    <div>
                        <label className="block font-semibold">Teléfono:</label>
                        <input type="text" className="w-full border p-2 rounded mt-1" />
                    </div>
                    <div>
                        <label className="block font-semibold">Dirección:</label>
                        <input type="text" className="w-full border p-2 rounded mt-1" />
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <button 
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer"
                    >Crear</button>
                </div>
            </div>
        </div>
    );
};
