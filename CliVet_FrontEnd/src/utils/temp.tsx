import React from 'react'

export default function temp() {
    return (
        <div>
            {/* Barra de búsqueda y botones agregar */}
            <div className={`flex mt-4 ${activeTab === "Procesos" ? "justify-end" : "justify-between"}`}>
                    {(activeTab === "Colaboradores" || activeTab === "Mascotas" || activeTab === "Servicios") && (
                        <div className="relative w-1/3">
                            <input 
                                type="text" 
                                placeholder="Buscar..." 
                                className="border p-1.5 rounded w-full pr-10"
                            />
                            <FiSearch className="absolute right-3 top-3 text-gray-500" />
                        </div>
                    )}
                    {activeTab === "Colaboradores" && (
                        <button 
                            className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            onClick={() => setAddCollaboratorModalOpen(true)}
                        >Agregar</button>
                    )}
                    {activeTab === "Servicios" && (
                        <div className="flex space-x-2">
                            <button className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400">Agregar guardería</button>
                            <button className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400">Agregar cita</button>
                        </div>
                    )}
                </div>
                {/* Tarjetas de Información */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    {[...Array(4)].map((_, index) => (
                        <div 
                            key={index} 
                            className="border p-4 bg-white rounded shadow-md cursor-pointer"
                            onClick={() => setInfoCardModalOpen(true)}
                        >
                            <h3 className="font-semibold border-b pb-2">Información</h3>
                            <p className="mt-2 text-gray-600">Contenido relevante...</p>

                            {/* Botones de editar y eliminar */}
                            <div className="absolute bottom-2 right-2 flex space-x-2">
                                <button className="p-2 bg-gray-200 rounded hover:bg-gray-300">
                                    <FiEdit className="text-gray-700" />
                                </button>
                                <button className="p-2 bg-gray-200 rounded hover:bg-red-300">
                                    <FiTrash className="text-red-600" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Modal de Información */}
                {/* Modales */}
                <InfoCardModal isOpen={infoCardModalOpen} onClose={() => setInfoCardModalOpen(false)} />
                <AddCollaboratorModal isOpen={addCollaboratorModalOpen} onClose={() => setAddCollaboratorModalOpen(false)} />
        </div>
    )
}
