// src/views/admin/AdminView.tsx
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import HeaderAdmin from "./components/HeaderAdmin";
import InfoCardModal from "./components/InfoCardModal";
import AddCollaboratorModal from "./components/collaborator/AddCollaboratorModal";
import EditCollaboratorModal from "./components/collaborator/EditCollaboratorModal";
import AddMascotaModal from "./components/mascota/AddMascotaModal";
import EditMascotaModal from "./components/mascota/EditMascotaModal";
import AddCitaModal from "./components/cita/AddCitaModal";
import EditCitaModal from "./components/cita/EditCitaModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import { useAuth } from "@/context/AuthContext";
import { useColaboradores } from "@/hooks/useColaboradores";
import { useProcesos } from "@/hooks/useProcesos";
import { useMascotas } from "@/hooks/useMascotas";
import { useCitas } from "@/hooks/useCitas";
import type { Colaborador } from "@/types/colaborador";
import type { Proceso } from "@/types/proceso";
import type { Mascota } from "@/types/mascota";
import type { Cita } from "@/types/cita";

export default function AdminView() {
    // 1) Token
    const { token, setToken } = useAuth();

    // 2) Estado pestañas + modales
    const [infoCardModalOpen, setInfoCardModalOpen] = useState(false);
    const [addCollaboratorModalOpen, setAddCollaboratorModalOpen] = useState(false);
    const [editCollaboratorModalOpen, setEditCollaboratorModalOpen] = useState(false);
    const [confirmDeleteCollaboratorOpen, setConfirmDeleteCollaboratorOpen] = useState(false);

    const [addMascotaModalOpen, setAddMascotaModalOpen] = useState(false);
    const [editMascotaModalOpen, setEditMascotaModalOpen] = useState(false);
    const [confirmDeleteMascotaOpen, setConfirmDeleteMascotaOpen] = useState(false);

    const [addCitaModalOpen, setAddCitaModalOpen] = useState(false);
    const [editCitaModalOpen, setEditCitaModalOpen] = useState(false);
    const [confirmDeleteCitaOpen, setConfirmDeleteCitaOpen] = useState(false);

    const [activeTab, setActiveTab] = useState<"Procesos" | "Colaboradores" | "Mascotas" | "Citas">("Procesos");

    // Elementos seleccionados
    const [selectedColaborador, setSelectedColaborador] = useState<Colaborador | null>(null);
    const [selectedMascota, setSelectedMascota] = useState<Mascota | null>(null);
    const [selectedCita, setSelectedCita] = useState<Cita | null>(null);

    // 3) Generar token al montar si no existe
    useEffect(() => {
        if (!token) {
            const nuevoToken = crypto.randomUUID();
            setToken(nuevoToken);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // 4) Hooks React Query
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
                {/* Título */}
                <section className="text-center mt-4">
                    <h2 className="text-2xl font-semibold">Panel de control</h2>
                </section>

                {/* Pestañas */}
                <div className="flex justify-center space-x-2 mt-4">
                    {["Procesos", "Colaboradores", "Mascotas", "Citas"].map(tab => (
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

                {/* Barra de búsqueda / botones Agregar */}
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

                    {/* Agregar Colaborador */}
                    {activeTab === "Colaboradores" && (
                        <button
                            className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            onClick={() => {
                                setSelectedColaborador(null);
                                setAddCollaboratorModalOpen(true);
                            }}
                        >
                            Agregar
                        </button>
                    )}

                    {/* Agregar Mascota */}
                    {activeTab === "Mascotas" && (
                        <button
                            className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            onClick={() => {
                                setSelectedMascota(null);
                                setAddMascotaModalOpen(true);
                            }}
                        >
                            Agregar
                        </button>
                    )}

                    {/* Agregar Cita */}
                    {activeTab === "Citas" && (
                        <button
                            className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            onClick={() => {
                                setSelectedCita(null);
                                setAddCitaModalOpen(true);
                            }}
                        >
                            Agregar
                        </button>
                    )}
                </div>

                {/* ─── Contenido por pestaña ────────────────────────────────── */}

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
                                    onClick={() => {
                                        // Como ejemplo, abro InfoCardModal con datos mínimos:
                                        setSelectedColaborador({
                                            id: p.id,
                                            nombre_completo: p.nombre,
                                            id_tipo: 0,
                                            email: "",
                                            telefono: "",
                                            direccion: ""
                                        } as Colaborador);
                                        setInfoCardModalOpen(true);
                                    }}
                                >
                                    <h3 className="font-semibold border-b pb-2">{p.nombre}</h3>
                                    <p className="mt-2 text-gray-600">{p.descripcion}</p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Precio: {p.precios}
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
                                    className="border p-4 bg-white rounded shadow-md hover:bg-gray-50 transition flex flex-col"
                                >
                                    <div
                                        className="flex-1"
                                        onClick={() => {
                                            setSelectedColaborador(c);
                                            setInfoCardModalOpen(true);
                                        }}
                                    >
                                        <h3 className="font-semibold border-b pb-2">
                                            {c.nombre_completo}
                                        </h3>
                                        <p className="mt-2 text-gray-600">{c.email}</p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Tel: {c.telefono}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Dirección: {c.direccion}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex justify-end space-x-2">
                                        <button
                                            onClick={() => {
                                                setSelectedColaborador(c);
                                                setEditCollaboratorModalOpen(true);
                                            }}
                                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedColaborador(c);
                                                setConfirmDeleteCollaboratorOpen(true);
                                            }}
                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
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
                                    className="border p-4 bg-white rounded shadow-md hover:bg-gray-50 transition flex flex-col"
                                >
                                    <div
                                        className="flex-1 cursor-pointer"
                                        onClick={() => {
                                            setSelectedMascota(m);
                                            setEditMascotaModalOpen(true);
                                        }}
                                    >
                                        <h3 className="font-semibold border-b pb-2">{m.nombre}</h3>
                                        <p className="mt-2 text-gray-600">Edad: {m.edad}</p>
                                        <p className="mt-1 text-sm text-gray-500">Raza: {m.raza}</p>
                                        <p className="mt-1 text-sm text-gray-500">Sexo: {m.sexo}</p>
                                    </div>
                                    <div className="mt-4 flex justify-end space-x-2">
                                        <button
                                            onClick={() => {
                                                setSelectedMascota(m);
                                                setEditMascotaModalOpen(true);
                                            }}
                                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedMascota(m);
                                                setConfirmDeleteMascotaOpen(true);
                                            }}
                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === "Citas" && (
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
                                <span className="ml-2">Cargando citas…</span>
                            </div>
                        ) : errorCitas ? (
                            <div className="col-span-3 text-center text-red-600">
                                ❌ Error al cargar citas
                            </div>
                        ) : (
                            citas?.map((ci: Cita) => (
                                <div
                                    key={ci.id}
                                    className="border p-4 bg-white rounded shadow-md hover:bg-gray-50 transition flex flex-col"
                                >
                                    <div
                                        className="flex-1 cursor-pointer"
                                        onClick={() => {
                                            setSelectedCita(ci);
                                            setEditCitaModalOpen(true);
                                        }}
                                    >
                                        <h3 className="font-semibold border-b pb-2">
                                            Cita #{ci.id}
                                        </h3>
                                        <p className="mt-2 text-gray-600">Mascota ID: {ci.id_mascota}</p>
                                        <p className="mt-1 text-sm text-gray-500">Servicio ID: {ci.id_servicio}</p>
                                        <p className="mt-1 text-sm text-gray-500">Fecha: {ci.fecha.slice(0, 10)}</p>
                                        <p className="mt-1 text-sm text-gray-500">Precio: {ci.precio}</p>
                                    </div>
                                    <div className="mt-4 flex justify-end space-x-2">
                                        <button
                                            onClick={() => {
                                                setSelectedCita(ci);
                                                setEditCitaModalOpen(true);
                                            }}
                                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedCita(ci);
                                                setConfirmDeleteCitaOpen(true);
                                            }}
                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </main>

            {/* ─── Modales ──────────────────────────────────── */}

            {/* InfoCardModal (para detalles sencillos) */}
            <InfoCardModal
                isOpen={infoCardModalOpen}
                onClose={() => setInfoCardModalOpen(false)}
                colaborador={selectedColaborador}
            />

            {/* Modales de Colaborador */}
            <AddCollaboratorModal
                isOpen={addCollaboratorModalOpen}
                onClose={() => setAddCollaboratorModalOpen(false)}
                token={token}
            />
            <EditCollaboratorModal
                isOpen={editCollaboratorModalOpen}
                onClose={() => setEditCollaboratorModalOpen(false)}
                colaborador={selectedColaborador}
                token={token}
            />
            <ConfirmDeleteModal
                isOpen={confirmDeleteCollaboratorOpen}
                onClose={() => setConfirmDeleteCollaboratorOpen(false)}
                title="¿Deseas eliminar al colaborador?"
                description={`Eliminar a ${selectedColaborador?.nombre_completo ?? ""} no se podrá deshacer.`}
                onConfirm={() => {
                    setConfirmDeleteCollaboratorOpen(false);
                    // Nota: la mutación de eliminación ya se dispara dentro de EditCollaboratorModal
                }}
            />

            {/* Modales de Mascota */}
            <AddMascotaModal
                isOpen={addMascotaModalOpen}
                onClose={() => setAddMascotaModalOpen(false)}
                token={token}
            />
            <EditMascotaModal
                isOpen={editMascotaModalOpen}
                onClose={() => setEditMascotaModalOpen(false)}
                mascota={selectedMascota}
                token={token}
            />
            <ConfirmDeleteModal
                isOpen={confirmDeleteMascotaOpen}
                onClose={() => setConfirmDeleteMascotaOpen(false)}
                title="¿Deseas eliminar la mascota?"
                description={`Eliminar a ${selectedMascota?.nombre ?? ""} no se podrá deshacer.`}
                onConfirm={() => {
                    setConfirmDeleteMascotaOpen(false);
                    // La mutación de eliminación ya se dispara dentro de EditMascotaModal
                }}
            />

            {/* Modales de Cita */}
            <AddCitaModal
                isOpen={addCitaModalOpen}
                onClose={() => setAddCitaModalOpen(false)}
                token={token}
            />
            <EditCitaModal
                isOpen={editCitaModalOpen}
                onClose={() => setEditCitaModalOpen(false)}
                cita={selectedCita}
                token={token}
            />
            <ConfirmDeleteModal
                isOpen={confirmDeleteCitaOpen}
                onClose={() => setConfirmDeleteCitaOpen(false)}
                title="¿Deseas eliminar la cita?"
                description={`Eliminar la cita #${selectedCita?.id ?? ""} no se podrá deshacer.`}
                onConfirm={() => {
                    setConfirmDeleteCitaOpen(false);
                    // La mutación de eliminación ya se dispara dentro de EditCitaModal
                }}
            />
        </div>
    );
}
