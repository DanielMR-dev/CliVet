
export default function Sidebar({ activeTab, setActiveTab, isOpen }) {
    return (
        <div className={`fixed md:relative w-64 bg-gray-200 h-full transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
            <nav className="flex flex-col p-4">
                {["Servicios", "Mascotas", "Perfil"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`w-full text-left p-2 rounded ${activeTab === tab ? 'bg-black text-white' : 'bg-gray-100'}`}
                    >
                        {tab}
                    </button>
                ))}
            </nav>
        </div>
    );
}
