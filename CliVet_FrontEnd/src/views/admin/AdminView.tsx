// src/views/admin/AdminView.tsx

import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import HeaderAdmin from "./components/HeaderAdmin";
import InfoCardModal from "./components/InfoCardModal";
import AddCollaboratorModal from "./components/AddCollaboratorModal";
import { useAuth } from "@/context/AuthContext";
import { useProcesos } from "@/hooks/useProcesos";
import { useColaboradores } from "@/hooks/useColaboradores";
import { useMascotas } from "@/hooks/useMascotas";
import type { Proceso, Colaborador, Mascota, Cita } from "@/types/index";
import { useCitas } from "@/hooks/useCitas";

export default function AdminView() {
    // 1) Obtenemos token y setToken desde el contexto global de Auth
    const { token, setToken } = useAuth();

    // 2) Estados para controlar modales y pestaña activa
    const [infoCardModalOpen, setInfoCardModalOpen] = useState<boolean>(false);
    const [addCollaboratorModalOpen, setAddCollaboratorModalOpen] = useState<boolean>(false);
    const [activeTab, setActiveTab] =
        useState<"Procesos" | "Colaboradores" | "Mascotas" | "Servicios">("Procesos");

    // 3) Generar access_token aleatorio la primera vez que se monte
    useEffect(() => {
        if (!token) {
            const nuevoToken = crypto.randomUUID();
            setToken(nuevoToken);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // 4) Invocamos los hooks: 
    //    Gracias a { enabled: Boolean(token) } dentro de cada hook,
    //    NO se disparará la petición hasta que `token` NO sea cadena vacía.
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
        data: citas,
        isLoading: loadingCitas,
        isError: errorCitas
    } = useCitas(token);

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <HeaderAdmin />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <section className="text-center mt-4">
                    <h2 className="text-2xl font-semibold">Panel de control</h2>
                </section>

                {/* ─── Pestañas ─────────────────────────────────────────── */}
                <div className="flex justify-center space-x-2 mt-4">
                    {["Procesos", "Colaboradores", "Mascotas", "Servicios"].map(tab => (
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

                {/* ─── Barra de búsqueda y botón Agregar ───────────────── */}
                <div
                    className={`flex mt-4 ${
                        activeTab === "Procesos" ? "justify-end" : "justify-between"
                    }`}
                >
                    {activeTab !== "Procesos" && (
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

                {/* ─── Contenido de cada pestaña ────────────────────────── */}
                {activeTab === "Procesos" && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                        {loadingProcesos ? (
                            <div className="col-span-4 flex justify-center items-center">
                                <svg
                                    className="animate-spin h-8 w-8 text-blue-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                                <span className="ml-2 text-gray-700">Cargando procesos…</span>
                            </div>
                        ) : errorProcesos ? (
                            <div className="col-span-4 text-center text-red-600">
                                ❌ Error al cargar procesos
                            </div>
                        ) : (
                            procesos?.map((p: Proceso) => (
                                <div
                                    key={p.id}
                                    className="border p-4 bg-white rounded shadow-md hover:bg-gray-50 transition cursor-pointer"
                                    onClick={() => setInfoCardModalOpen(true)}
                                >
                                    <h3 className="font-semibold border-b pb-2">{p.nombre}</h3>
                                    <p className="mt-2 text-gray-600">{p.descripcion}</p>
                                    <p className="mt-1 text-gray-600">
                                        <span className="font-bold">Precio:</span> {p.precios}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === "Colaboradores" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        {loadingColaboradores ? (
                            <div className="col-span-3 text-center text-gray-700">
                                <svg
                                    className="animate-spin h-8 w-8 text-blue-600 mx-auto"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                                <span className="ml-2">Cargando colaboradores…</span>
                            </div>
                        ) : errorColaboradores ? (
                            <div className="col-span-3 text-center text-red-600">
                                ❌ Error al cargar colaboradores
                            </div>
                        ) : (
                            colaboradores?.map((c: Colaborador) => (
                                <div
                                    key={c.id}
                                    className="border p-4 bg-white rounded shadow-md hover:bg-gray-50 transition cursor-pointer"
                                    onClick={() => setInfoCardModalOpen(true)}
                                >
                                    <h3 className="font-semibold border-b pb-2">
                                        {c.nombre_completo}
                                    </h3>
                                    <p className="mt-2 text-gray-600">Email: {c.email}</p>
                                    <p className="mt-1 text-gray-600">Tel: {c.telefono}</p>
                                    <p className="mt-1 text-gray-600">Dirección: {c.direccion}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === "Mascotas" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        {loadingMascotas ? (
                            <div className="col-span-3 text-center text-gray-700">
                                <svg
                                    className="animate-spin h-8 w-8 text-blue-600 mx-auto"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                                <span className="ml-2">Cargando mascotas…</span>
                            </div>
                        ) : errorMascotas ? (
                            <div className="col-span-3 text-center text-red-600">
                                ❌ Error al cargar mascotas
                            </div>
                        ) : (
                            mascotas?.map((m: Mascota) => (
                                <div
                                    key={m.id}
                                    className="border p-4 bg-white rounded shadow-md hover:bg-gray-50 transition cursor-pointer"
                                    onClick={() => setInfoCardModalOpen(true)}
                                >
                                    <h3 className="font-semibold border-b pb-2">
                                        {m.nombre}
                                    </h3>
                                    <p className="mt-2 text-gray-600">Edad: {m.edad}</p>
                                    <p className="mt-1 text-gray-600">Agresividad: {m.agresividad}</p>
                                    <p className="mt-1 text-gray-600">Peso: {m.peso}</p>
                                    <p className="mt-1 text-gray-600">Dirección: {m.direccion}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === "Servicios" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        {loadingCitas ? (
                            <div className="col-span-3 text-center text-gray-700">
                                <svg
                                    className="animate-spin h-8 w-8 text-blue-600 mx-auto"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                                <span className="ml-2">Cargando servicios…</span>
                            </div>
                        ) : errorCitas ? (
                            <div className="col-span-3 text-center text-red-600">
                                ❌ Error al cargar servicios
                            </div>
                        ) : (
                            // citas?.map((ci: Cita) => (
                            //     <div
                            //         key={ci.id}
                            //         className="border p-4 bg-white rounded shadow-md hover:bg-gray-50 transition cursor-pointer"
                            //         onClick={() => setInfoCardModalOpen(true)}
                            //     >
                            //         <h3 className="font-semibold border-b pb-2">
                            //             {ci.nombre}
                            //         </h3>
                            //         <p className="mt-2 text-gray-600">
                            //             {ci.descripcion}
                            //         </p>
                            //         <p className="mt-1 text-sm text-gray-500">
                            //             Precio: {ci.precios}
                            //         </p>
                            //     </div>
                            // ))
                            <h1>To Do</h1>
                        )}
                    </div>
                )}

                {/* ─── Modales ─────────────────────────────────────────────── */}
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
