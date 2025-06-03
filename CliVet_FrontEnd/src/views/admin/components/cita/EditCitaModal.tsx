// src/views/admin/components/cita/EditCitaModal.tsx
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import type { Cita, CrearCitaDTO } from "@/types/cita";
import { useActualizarCita, useEliminarCita } from "@/hooks/useCitas";

interface EditCitaModalProps {
    isOpen: boolean;
    onClose: () => void;
    cita: Cita | null;
    token: string;
}

export default function EditCitaModal({
    isOpen,
    onClose,
    cita,
    token
}: EditCitaModalProps) {
    const actualizarMut = useActualizarCita();
    const eliminarMut = useEliminarCita();

    // Formulario local
    const [form, setForm] = useState<Omit<CrearCitaDTO, "id" | "access_token">>({
        id_mascota: 0,
        id_servicio: 0,
        fecha: "",
        precio: 0
    });

    // Cuando cambia la cita seleccionada, rellenamos el formulario
    useEffect(() => {
        if (cita) {
            setForm({
                id_mascota: cita.id_mascota,
                id_servicio: cita.id_servicio,
                fecha: cita.fecha.slice(0, 10), // asumimos ISO
                precio: cita.precio ?? 0
            });
        }
    }, [cita]);

    const handleUpdate = async () => {
        if (!token || !cita) return;
        await actualizarMut.mutateAsync({
            id: cita.id,
            id_mascota: form.id_mascota,
            id_servicio: form.id_servicio,
            fecha: form.fecha,
            precio: form.precio,
            access_token: token
        });
        onClose();
    };

    const handleDelete = async () => {
        if (!token || !cita) return;
        await eliminarMut.mutateAsync({ id: cita.id, access_token: token });
        onClose();
    };

    // React Query v5
    const guardandoCambios = actualizarMut.status === "pending";
    const eliminando = eliminarMut.status === "pending";

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={onClose}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    {/* Fondo semitransparente */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity" />
                    </Transition.Child>

                    {/* Hack de centrado vertical */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left
                                        overflow-hidden shadow-xl transform transition-all
                                        sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg leading-6 font-medium text-gray-900"
                                    >
                                        {cita ? "Editar Cita" : "Sin cita seleccionada"}
                                    </Dialog.Title>
                                    {cita && (
                                        <div className="mt-4 space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    ID Mascota
                                                </label>
                                                <input
                                                    type="number"
                                                    value={form.id_mascota}
                                                    onChange={(e) =>
                                                        setForm(prev => ({
                                                            ...prev,
                                                            id_mascota: Number(e.target.value)
                                                        }))
                                                    }
                                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    ID Servicio
                                                </label>
                                                <input
                                                    type="number"
                                                    value={form.id_servicio}
                                                    onChange={(e) =>
                                                        setForm(prev => ({
                                                            ...prev,
                                                            id_servicio: Number(e.target.value)
                                                        }))
                                                    }
                                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Fecha (YYYY-MM-DD)
                                                </label>
                                                <input
                                                    type="date"
                                                    value={form.fecha}
                                                    onChange={(e) =>
                                                        setForm(prev => ({
                                                            ...prev,
                                                            fecha: e.target.value
                                                        }))
                                                    }
                                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Precio
                                                </label>
                                                <input
                                                    type="number"
                                                    value={form.precio}
                                                    onChange={(e) =>
                                                        setForm(prev => ({
                                                            ...prev,
                                                            precio: Number(e.target.value)
                                                        }))
                                                    }
                                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse space-x-2 space-x-reverse">
                                {/* Guardar Cambios */}
                                <button
                                    type="button"
                                    disabled={guardandoCambios}
                                    onClick={handleUpdate}
                                    className={`w-full inline-flex justify-center rounded-md border border-transparent
                                               shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700
                                               focus:outline-none sm:ml-3 sm:w-auto sm:text-sm ${
                                                   guardandoCambios ? "opacity-50 cursor-not-allowed" : ""
                                               }`}
                                >
                                    {guardandoCambios ? "Guardando…" : "Guardar Cambios"}
                                </button>

                                {/* Eliminar */}
                                <button
                                    type="button"
                                    disabled={eliminando}
                                    onClick={handleDelete}
                                    className={`w-full inline-flex justify-center rounded-md:border border-transparent
                                               shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700
                                               focus:outline-none sm:ml-3 sm:w-auto sm:text-sm ${
                                                   eliminando ? "opacity-50 cursor-not-allowed" : ""
                                               }`}
                                >
                                    {eliminando ? "Eliminando…" : "Eliminar"}
                                </button>

                                {/* Cancelar */}
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300
                                               shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50
                                               focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
