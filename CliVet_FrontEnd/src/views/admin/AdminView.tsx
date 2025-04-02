import { useState } from "react";
import HeaderAdmin from "./components/HeaderAdmin";
import { FiSearch } from "react-icons/fi";

export default function AdminView() {
    const [modalOpen, setModalOpen] = useState(false); // Saber si el modal de cada Card está abierto
    const [addModalOpen, setAddModalOpen] = useState(false); // Modal para agregar colaborador
    const [activeTab, setActiveTab] = useState("Procesos"); // Saber qué tab está activo

    const tabContent = {
        "Procesos": "Información sobre los procesos en la clínica veterinaria.",
        "Colaboradores": "Lista y detalles de los colaboradores de la clínica.",
        "Mascotas": "Registro y datos de las mascotas atendidas.",
        "Servicios": "Servicios ofrecidos por la clínica y su disponibilidad."
    };
    return (
        <div className="w-full min-h-screen bg-gray-50">
            {/* Header Section */}
            <HeaderAdmin />
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Panel de control */}
                <section className="text-center mt-4">
                    <h2 className="text-2xl font-semibold">Panel de control</h2>
                </section>
                {/* Tabs */}
                <div className="flex justify-center space-x-2 mt-4">
                    {Object.keys(tabContent).map((tab) => (
                        <button 
                            key={tab} 
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-blue-300'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                {/* Barra de búsqueda y botón agregar */}
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
                            onClick={() => setAddModalOpen(true)}
                        >Agregar</button>
                    )}
                </div>
                {/* Tarjetas de información */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    {[...Array(4)].map((_, index) => (
                        <div 
                            key={index} 
                            className="border p-4 bg-white rounded shadow-md cursor-pointer"
                            onClick={() => setModalOpen(true)}
                        >
                            <h3 className="font-semibold border-b pb-2">Información</h3>
                            <p className="mt-2 text-gray-600">Contenido relevante...</p>
                        </div>
                    ))}
                </div>
                {/* Modal de Información */}
                {modalOpen && (
                    <div 
                        className="fixed inset-0 flex items-center justify-center bg-black/30" 
                        onClick={() => setModalOpen(false)}
                    >
                        <div className="bg-white p-6 rounded shadow-lg w-1/2 relative" onClick={(e) => e.stopPropagation()}>
                            <button 
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl" 
                                onClick={() => setModalOpen(false)}
                            >
                                &times;
                            </button>
                            <h3 className="text-lg font-bold border-b pb-2">Información del proceso</h3>
                            <div className="mt-4">
                                <label className="block font-semibold">No. Proceso:</label>
                                <input type="text" className="w-full border p-2 rounded mt-1" />
                                <label className="block font-semibold mt-2">Nombre proceso:</label>
                                <input type="text" className="w-full border p-2 rounded mt-1" />
                                <label className="block font-semibold mt-2">Descripción:</label>
                                <textarea className="w-full border p-2 rounded mt-1" rows={3}></textarea>
                                <label className="block font-semibold mt-2">Precio:</label>
                                <input type="text" className="w-full border p-2 rounded mt-1" />
                            </div>
                        </div>
                    </div>
                )}
                {/* Modal de Agregar Colaborador */}
                {addModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/30" onClick={() => setAddModalOpen(false)}>
                        <div className="bg-white p-6 rounded shadow-lg w-1/2 relative" onClick={(e) => e.stopPropagation()}>
                            <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl" onClick={() => setAddModalOpen(false)}>&times;</button>
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
                                <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Crear</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
