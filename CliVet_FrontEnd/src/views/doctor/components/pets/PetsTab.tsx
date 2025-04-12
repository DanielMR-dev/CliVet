import { useState } from "react";
import AddPetModal from "./AddPetModal";

export default function PetsTab() {
    const [isAddPetModalOpen, setIsAddPetModalOpen] = useState(false);

    return (
        <div className="flex-1 flex flex-col">
            <div className="flex justify-start mt-4">
                {/* Botón para abrir modal de Agregar Mascota */}
                <button 
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 hover:cursor-pointer"
                    onClick={() => setIsAddPetModalOpen(true)}
                >
                    Agregar mascota
                </button>
            </div>

            {/* Tarjetas de información */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="border p-4 bg-white rounded shadow-md">
                        <h3 className="font-semibold border-b pb-2">Información</h3>
                    </div>
                ))}
            </div>

            {/* Modal de Agregar Mascota */}
            <AddPetModal 
                isOpen={isAddPetModalOpen} 
                onClose={() => setIsAddPetModalOpen(false)}
            />
        </div>
    );
};
