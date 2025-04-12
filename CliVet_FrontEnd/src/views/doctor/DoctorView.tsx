import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import SidebarDoctor from "@/views/doctor/components/SidebarDoctor";
import ServicesTab from "./components/services/ServicesTab";

export default function DoctorView() {
    const [activeTab, setActiveTab] = useState("Servicios"); // Estado de los tabs
        const [isSidebarOpen, setSidebarOpen] = useState(true); // Estado del sidebar
        const renderTabContent = () => {
            switch (activeTab) {
                case "Mascotas":
                    return <PetsTab />;
                case "Servicios":
                    return <ServicesTab />;
                default:
                    return <ServicesTab />;
            }
        };
        return (
            <div className="flex h-screen">
                <SidebarDoctor activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
                
                <div className="flex-1 flex flex-col p-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold">Panel de Control</h2>
                        <Link to={'/'} className="text-red-600 text-2xl hover:text-red-800 transition duration-300">
                            <FiLogOut />
                        </Link>
                    </div>
                    {renderTabContent()}
                </div>
            </div>
        );
};
