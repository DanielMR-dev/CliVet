import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminView() {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="w-full min-h-screen bg-gray-50">
            {/* Header Section */}
            <header className="bg-white shadow-sm w-full">
                <div className="max-w-6xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-blue-600">CliVet</h1>
                    <Link
                        to={'/'}
                        className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-300"
                    >Cerrar Sesión</Link>
                </div>
            </header>
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Panel de control */}
                <section className="text-center mt-4">
                    <h2 className="text-2xl font-semibold">Panel de control</h2>
                </section>
                {/* Tabs */}
                <div className="flex justify-center space-x-2 mt-4">
                    <button 
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >Procesos</button>
                    <button 
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-blue-300"
                    >Colaboradores</button>
                    <button 
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-blue-300"
                    >Mascotas</button>
                    <button 
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-blue-300"
                    >Servicios</button>
                </div>
                {/* Botón agregar */}
                <div className="flex justify-end mt-4">
                    <button 
                        className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >Agregar</button>
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
                {/* Modal */}
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
                                <textarea className="w-full border p-2 rounded mt-1" rows="3"></textarea>
                                <label className="block font-semibold mt-2">Precio:</label>
                                <input type="text" className="w-full border p-2 rounded mt-1" />
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
