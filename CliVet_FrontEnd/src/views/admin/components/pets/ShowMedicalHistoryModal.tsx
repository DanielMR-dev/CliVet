import { FiX } from "react-icons/fi";

interface ShowMedicalHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    records: { date: string; responsible: string; description: string }[];
}

export default function ShowMedicalHistoryModal({ isOpen, onClose, records }: ShowMedicalHistoryModalProps) {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black/30"
            onClick={onClose}
        >
            <div 
                className="bg-white p-6 rounded shadow-lg w-3/4 max-h-[80vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón de cerrar */}
                <button 
                    className="absolute top-3 right-3 text-gray-600 hover:text-black"
                    onClick={onClose}
                >
                    <FiX size={24} />
                </button>

                {/* Contenido de la modal */}
                <h3 className="text-lg font-bold border-b pb-2">Historial de Registros</h3>

                <div className="mt-4 space-y-4">
                    {records.map((record, index) => (
                        <div key={index} className="border p-4 rounded">
                            <div className="flex justify-between font-bold">
                                <span>Fecha: {record.date}</span>
                                <span>Responsable: {record.responsible}</span>
                            </div>
                            <textarea
                                className="w-full border rounded mt-2 p-2"
                                value={record.description}
                                readOnly
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
