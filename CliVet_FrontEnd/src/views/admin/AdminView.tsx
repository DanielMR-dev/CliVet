import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import HeaderAdmin from "./components/HeaderAdmin";
import InfoCardModal from "./components/InfoCardModal";
import AddCollaboratorModal from "./components/AddCollaboratorModal";

export default function AdminView() {
    const [infoCardModalOpen, setInfoCardModalOpen] = useState(false); // Saber si el modal de cada Card está abierto
    const [addCollaboratorModalOpen, setAddCollaboratorModalOpen] = useState<boolean>(false); // Modal para agregar colaborador
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
                            onClick={() => setAddCollaboratorModalOpen(true)}
                        >Agregar</button>
                    )}
                </div>
                {/* Tarjetas de información */}
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
                {/* Modal de Información */}
                {/* Modales */}
                <InfoCardModal isOpen={infoCardModalOpen} onClose={() => setInfoCardModalOpen(false)} />
                <AddCollaboratorModal isOpen={addCollaboratorModalOpen} onClose={() => setAddCollaboratorModalOpen(false)} />
            </main>
        </div>
    );
};
