import { FiClipboard, FiMenu, FiUser } from "react-icons/fi";
import { FaPaw } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar({ activeTab, setActiveTab, isOpen, toggleSidebar }) {
    return (
        <div className={`fixed md:relative ${isOpen ? "w-64" : "w-20"} bg-gray-200 h-full transition-all`}> 
            <div className="flex justify-between items-center p-4">
                <Link to={'/'} className="text-3xl font-bold text-blue-600">{isOpen ? "CliVet" : "CV"}</Link>
                <button onClick={toggleSidebar} className="text-2xl">
                    <FiMenu />
                </button>
            </div>
            <nav className="flex flex-col p-4 space-y-2">
                {[{ name: "Servicios", icon: <FiClipboard /> }, { name: "Mascotas", icon: <FaPaw /> }, { name: "Perfil", icon: <FiUser /> }].map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`flex items-center space-x-2 w-full text-left p-2 rounded ${activeTab === tab.name ? 'bg-black text-white' : 'bg-gray-100'}`}
                    >
                        {tab.icon} {isOpen && <span>{tab.name}</span>}
                    </button>
                ))}
            </nav>
        </div>
    );
}
