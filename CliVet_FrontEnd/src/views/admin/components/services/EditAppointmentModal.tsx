import { FiX, FiCalendar, FiMail } from "react-icons/fi";

interface EditAppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { pet: string; date: string; responsible: string; reschedule: string }) => void;
    initialData?: { pet: string; date: string; responsible: string; reschedule: string };
}

export default function EditAppointmentModal({ isOpen, onClose, onSave, initialData }: EditAppointmentModalProps) {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black/30"
            onClick={onClose}
        >
            <div 
                className="bg-white p-6 rounded shadow-lg w-[500px] max-h-[80vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón de cerrar */}
                <button 
                    className="absolute top-3 right-3 text-gray-600 hover:text-black"
                    onClick={onClose}
                >
                    <FiX size={24} />
                </button>

                {/* Formulario */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Mascota */}
                    <div>
                        <label className="block font-semibold">Mascota:</label>
                        <input 
                            type="text" 
                            defaultValue={initialData?.pet || ""}
                            className="border p-2 rounded w-full"
                        />
                    </div>

                    {/* Fecha */}
                    <div>
                        <label className="block font-semibold">Fecha:</label>
                        <div className="relative">
                            <input 
                                type="date" 
                                defaultValue={initialData?.date || ""}
                                className="border p-2 rounded w-full"
                            />
                            <FiCalendar className="absolute right-3 top-3 text-gray-500" />
                        </div>
                    </div>

                    {/* Encargado */}
                    <div>
                        <label className="block font-semibold">Encargado:</label>
                        <input 
                            type="text" 
                            defaultValue={initialData?.responsible || ""}
                            className="border p-2 rounded w-full"
                        />
                    </div>

                    {/* Citas para reprogramar */}
                    <div>
                        <label className="block font-semibold">Citas para reprogramar:</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                defaultValue={initialData?.reschedule || ""}
                                className="border p-2 rounded w-full"
                            />
                            <FiMail className="absolute right-3 top-3 text-gray-500" />
                        </div>
                    </div>
                </div>

                {/* Botón de guardar cambios */}
                <div className="mt-4 flex justify-center">
                    <button 
                        className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 hover:cursor-pointer"
                        onClick={() => onSave({
                            pet: initialData?.pet || "",
                            date: initialData?.date || "",
                            responsible: initialData?.responsible || "",
                            reschedule: initialData?.reschedule || ""
                        })}
                    >
                        Guardar cambios
                    </button>
                </div>
            </div>
        </div>
    );
}
