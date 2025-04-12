import { useState } from "react";
import { FiX } from "react-icons/fi";

interface AddPetModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddPetModal({ isOpen, onClose }: AddPetModalProps) {
    if (!isOpen) return null;

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [aggressiveness, setAggressiveness] = useState("");
    const [weight, setWeight] = useState("");
    const [address, setAddress] = useState("");
    const [species, setSpecies] = useState("");

    return (
        <div 
            className="fixed inset-0 bg-black/30 flex justify-center items-center"
            onClick={onClose} // Cierra al hacer clic en el fondo
        >
            <div 
                className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative"
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
                <h2 className="text-lg font-semibold text-center mb-4">Agregar Mascota</h2>

                {/* Formulario */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Nombre completo */}
                    <div>
                        <label className="block font-semibold">Nombre completo</label>
                        <input 
                            type="text" 
                            className="border w-full p-2 rounded"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Edad */}
                    <div>
                        <label className="block font-semibold">Edad</label>
                        <input 
                            type="number" 
                            className="border w-full p-2 rounded"
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>

                    {/* Agresividad */}
                    <div>
                        <label className="block font-semibold">Agresividad</label>
                        <input 
                            type="text" 
                            className="border w-full p-2 rounded"
                            onChange={(e) => setAggressiveness(e.target.value)}
                        />
                    </div>

                    {/* Peso */}
                    <div>
                        <label className="block font-semibold">Peso</label>
                        <input 
                            type="number" 
                            className="border w-full p-2 rounded"
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>

                    {/* Dirección */}
                    <div>
                        <label className="block font-semibold">Dirección</label>
                        <input 
                            type="text" 
                            className="border w-full p-2 rounded"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    {/* Especie */}
                    <div>
                        <label className="block font-semibold">Especie</label>
                        <input 
                            type="text" 
                            className="border w-full p-2 rounded"
                            onChange={(e) => setSpecies(e.target.value)}
                        />
                    </div>
                </div>

                {/* Botón para agregar */}
                <div className="text-center mt-4">
                    <button 
                        className="bg-blue-600 px-6 py-2 text-white rounded hover:bg-blue-700 hover:cursor-pointer"
                        onClick={onClose}
                    >
                        Agregar Mascota
                    </button>
                </div>
            </div>
        </div>
    );
}
