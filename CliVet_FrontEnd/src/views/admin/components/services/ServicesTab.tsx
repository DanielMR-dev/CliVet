import { FiClock, FiEdit, FiSearch, FiTrash } from "react-icons/fi";

export default function ServicesTab() {
    return (
        <div className="mt-4">
            {/* Barra de búsqueda y botón agregar */}
            <div className="flex justify-between items-center mb-4">
                <div className="relative w-1/3">
                    <input 
                        type="text" 
                        placeholder="Buscar..." 
                        className="border p-2 rounded w-full pr-10"
                    />
                    <FiSearch className="absolute right-3 top-3 text-gray-500" />
                </div>
                {/* Botones de agregar */}
                <div className="flex space-x-2">
                    <button className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400">
                        Agregar guardería
                    </button>
                    <button className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 ml-2">
                        Agregar cita
                    </button>
                </div>
            </div>

            {/* Tarjetas de Información */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                {[...Array(4)].map((_, index) => (
                    <div 
                        key={index} 
                        className="relative border p-4 bg-white rounded shadow-md"
                    >
                        <h3 className="font-semibold border-b pb-2">Información</h3>
                        <p className="mt-2 text-gray-600">Contenido relevante...</p>

                        {/* Botones de acciones */}
                        <div className="flex justify-between mt-4">
                            <div className="flex space-x-2">
                                {/* Botón de editar */}
                                <button className="p-2 bg-gray-200 rounded hover:bg-gray-300">
                                    <FiEdit className="text-gray-700" />
                                </button>
                                {/* Botón de reloj */}
                                <button className="p-2 bg-gray-200 rounded hover:bg-gray-300">
                                    <FiClock className="text-gray-700" />
                                </button>
                            </div>
                            {/* Botón de eliminar */}
                            <button className="p-2 bg-gray-200 rounded hover:bg-red-300">
                                <FiTrash className="text-red-600" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
