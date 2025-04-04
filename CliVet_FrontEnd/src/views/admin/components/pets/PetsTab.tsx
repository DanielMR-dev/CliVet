import { FiBook, FiSearch } from "react-icons/fi";

export default function PetsTab() {
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

                        {/* Botones de editar y eliminar */}
                        <div className="flex justify-between mt-4 space-x-2">
                            <button className="p-2 bg-gray-200 rounded hover:bg-gray-300">
                                <FiBook className="text-gray-700" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
