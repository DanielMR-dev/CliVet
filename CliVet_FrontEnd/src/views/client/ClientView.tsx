import SidebarClient from "@/views/client/SidebarClient";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";

export default function ClientView() {
    const [activeTab, setActiveTab] = useState("Servicios"); // Estado de los tabs
    const [isSidebarOpen, setSidebarOpen] = useState(true); // Estado del sidebar
    return (
        <div className="flex h-screen">
            <SidebarClient activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
            
            <div className="flex-1 flex flex-col p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Panel de Control</h2>
                    <Link to={'/'} className="text-red-600 text-2xl hover:text-red-800 transition duration-300">
                        <FiLogOut />
                    </Link>
                </div>
                {activeTab === "Servicios" && (
                    <div className="flex justify-start space-x-2 mt-4">
                        <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Agregar cita</button>
                        <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Agregar guardería</button>
                    </div>
                )}
                {activeTab === "Mascotas" && (
                    <div className="flex justify-start mt-4">
                        <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Agregar mascota</button>
                    </div>
                )}
                {activeTab === "Perfil" && <ProfileCard />}
                {activeTab !== "Perfil" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="border p-4 bg-white rounded shadow-md">
                                <h3 className="font-semibold border-b pb-2">Información</h3>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
