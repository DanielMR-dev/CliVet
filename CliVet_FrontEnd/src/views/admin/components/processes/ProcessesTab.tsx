import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import InfoProcessCardModal from "./InfoProcessCardModal";

export default function ProcessesTab() {
    const [infoCardModalOpen, setInfoCardModalOpen] = useState<boolean>(false); // Saber si el modal de cada Card está abierto
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                {[...Array(4)].map((_, index) => (
                    <div 
                        key={index} 
                        className="border p-4 bg-white rounded shadow-md cursor-pointer"
                        onClick={() => setInfoCardModalOpen(true)}
                    >
                        <h3 className="font-semibold border-b pb-2">Información</h3>
                        <p className="mt-2 text-gray-600">Contenido relevante...</p>
                    </div>
                ))}
            
            </div>
            <InfoProcessCardModal isOpen={infoCardModalOpen} onClose={() => setInfoCardModalOpen(false)} />
        </>
        
    );
};
