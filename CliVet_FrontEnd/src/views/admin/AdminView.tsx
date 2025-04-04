import { useState } from "react";
import { FiEdit, FiSearch, FiTrash } from "react-icons/fi";
import HeaderAdmin from "./components/HeaderAdmin";
import InfoCardModal from "./components/processes/InfoProcessCardModal";
import AddCollaboratorModal from "./components/collaborator/AddCollaboratorModal";
import ProcessesTab from "./components/processes/ProcessesTab";
import CollaboratorsTab from "./components/collaborator/CollaboratorsTab";
import PetsTab from "./components/pets/PetsTab";
import ServicesTab from "./components/services/ServicesTab";

export default function AdminView() {
    const [infoCardModalOpen, setInfoCardModalOpen] = useState<boolean>(false); // Saber si el modal de cada Card está abierto
    const [addCollaboratorModalOpen, setAddCollaboratorModalOpen] = useState<boolean>(false); // Modal para agregar colaborador
    const [activeTab, setActiveTab] = useState("Procesos"); // Saber qué tab está activo

    const renderTabContent = () => {
        switch (activeTab) {
            case "Procesos":
                return <ProcessesTab />;
            case "Colaboradores":
                return <CollaboratorsTab onAdd={() => setAddCollaboratorModalOpen(true)} />;
            case "Mascotas":
                return <PetsTab />;
            case "Servicios":
                return <ServicesTab />;
            default:
                return <ProcessesTab />;
        }
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
                    {["Procesos", "Colaboradores", "Mascotas", "Servicios"].map((tab) => (
                        <button 
                            key={tab} 
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-blue-300'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="mt-6">
                    {renderTabContent()}
                </div>
                
            </main>
        </div>
    );
};
