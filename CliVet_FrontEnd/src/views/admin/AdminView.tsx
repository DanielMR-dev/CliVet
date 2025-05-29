import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import HeaderAdmin from "./components/HeaderAdmin";
import InfoCardModal from "./components/InfoCardModal";
import AddCollaboratorModal from "./components/AddCollaboratorModal";
import { useAuth } from "@/context/AuthContext";
import { useProcesos } from "@/hooks/useProcesos";
import { useColaboradores } from "@/hooks/useColaboradores";
import { useMascotas } from "@/hooks/useMascotas";
import { useServicios } from "@/hooks/useServicios";
import type { Proceso, Colaborador, Mascota, Servicio } from "@/types/index";

export default function AdminView() {
    const [infoCardModalOpen, setInfoCardModalOpen] = useState<boolean>(false);
    const [addCollaboratorModalOpen, setAddCollaboratorModalOpen] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<"Procesos"|"Colaboradores"|"Mascotas"|"Servicios">("Procesos");

    const { token } = useAuth();

    // Hooks para cada tab
    const {
        data: procesos,
        isLoading: loadingProcesos,
        isError: errorProcesos
    } = useProcesos(token);
    const {
        data: colaboradores,
        isLoading: loadingColaboradores,
        isError: errorColaboradores
    } = useColaboradores(token);
    const {
        data: mascotas,
        isLoading: loadingMascotas,
        isError: errorMascotas
    } = useMascotas(token);
    const {
        data: servicios,
        isLoading: loadingServicios,
        isError: errorServicios
    } = useServicios(token);

    const tabContent = {
        Procesos:      "Información sobre los procesos en la clínica veterinaria.",
        Colaboradores: "Lista y detalles de los colaboradores de la clínica.",
        Mascotas:      "Registro y datos de las mascotas atendidas.",
        Servicios:     "Servicios ofrecidos por la clínica y su disponibilidad."
    };

    useEffect(() => {
        // Si tus modales necesitan token, lo actualizas aquí
    }, [token]);

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <HeaderAdmin />
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <section className="text-center mt-4">
                    <h2 className="text-2xl font-semibold">Panel de control</h2>
                </section>

                {/* Pestañas */}
                <div className="flex justify-center space-x-2 mt-4">
                    {Object.keys(tabContent).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-4 py-2 rounded ${
                                activeTab === tab
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 hover:bg-blue-300"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Barra de búsqueda y botón Agregar */}
                <div className={`flex mt-4 ${activeTab === "Procesos" ? "justify-end" : "justify-between"}`}>
                    {(activeTab !== "Procesos") && (
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
                        >
                            Agregar
                        </button>
                    )}
                </div>

                {/* Tarjetas de información */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    {activeTab === "Procesos" ? (
                        loadingProcesos ? (
                            <div>🔄 Cargando procesos…</div>
                        ) : errorProcesos ? (
                            <div>❌ Error al cargar procesos</div>
                        ) : (
                            procesos?.map((p: Proceso) => (
                                <div
                                    key={p.id}
                                    className="border p-4 bg-white rounded shadow-md cursor-pointer"
                                    onClick={() => setInfoCardModalOpen(true)}
                                >
                                    <h3 className="font-semibold border-b pb-2">{p.nombre}</h3>
                                    <p className="mt-2 text-gray-600">{p.descripcion}</p>
                                </div>
                            ))
                        )
                    ) : activeTab === "Colaboradores" ? (
                        loadingColaboradores ? (
                            <div>🔄 Cargando colaboradores…</div>
                        ) : errorColaboradores ? (
                            <div>❌ Error al cargar colaboradores</div>
                        ) : (
                            colaboradores?.map((c: Colaborador) => (
                                <div
                                    key={c.id}
                                    className="border p-4 bg-white rounded shadow-md cursor-pointer"
                                    onClick={() => setInfoCardModalOpen(true)}
                                >
                                    <h3 className="font-semibold border-b pb-2">{c.nombre_completo}</h3>
                                    <p className="mt-2 text-gray-600">{c.email}</p>
                                </div>
                            ))
                        )
                    ) : activeTab === "Mascotas" ? (
                        loadingMascotas ? (
                            <div>🔄 Cargando mascotas…</div>
                        ) : errorMascotas ? (
                            <div>❌ Error al cargar mascotas</div>
                        ) : (
                            mascotas?.map((m: Mascota) => (
                                <div
                                    key={m.id}
                                    className="border p-4 bg-white rounded shadow-md cursor-pointer"
                                    onClick={() => setInfoCardModalOpen(true)}
                                >
                                    <h3 className="font-semibold border-b pb-2">{m.nombre}</h3>
                                    <p className="mt-2 text-gray-600">Edad: {m.edad}</p>
                                </div>
                            ))
                        )
                    ) : (
                        /* Servicios */
                        loadingServicios ? (
                            <div>🔄 Cargando servicios…</div>
                        ) : errorServicios ? (
                            <div>❌ Error al cargar servicios</div>
                        ) : (
                            servicios?.map((s: Servicio) => (
                                <div
                                    key={s.id}
                                    className="border p-4 bg-white rounded shadow-md cursor-pointer"
                                    onClick={() => setInfoCardModalOpen(true)}
                                >
                                    <h3 className="font-semibold border-b pb-2">{s.nombre}</h3>
                                    <p className="mt-2 text-gray-600">{s.descripcion}</p>
                                </div>
                            ))
                        )
                    )}
                </div>

                {/* Modales */}
                <InfoCardModal
                    isOpen={infoCardModalOpen}
                    onClose={() => setInfoCardModalOpen(false)}
                />
                <AddCollaboratorModal
                    isOpen={addCollaboratorModalOpen}
                    onClose={() => setAddCollaboratorModalOpen(false)}
                />
            </main>
        </div>
    );
}
