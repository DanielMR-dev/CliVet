import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import type { Colaborador, CrearColaboradorDTO } from "@/types/colaborador";
import { useActualizarColaborador, useEliminarColaborador } from "@/hooks/useColaboradores";

interface EditCollaboratorModalProps {
    isOpen: boolean;
    onClose: () => void;
    colaborador: Colaborador | null;
    token: string;
}

/**
 * Al igual que en AddCollaboratorModal, en React Query la mutación
 * usa `status` con valores “idle” | “pending” | “error” | “success”.  
 * Por eso comparamos contra "pending" (no contra "loading").
 * También sustituimos Dialog.Overlay por <div>.
 */
export default function EditCollaboratorModal({
    isOpen,
    onClose,
    colaborador,
    token
}: EditCollaboratorModalProps) {
    const actualizarMut = useActualizarColaborador();
    const eliminarMut = useEliminarColaborador();

    // Estados locales para el formulario de edición
    const [form, setForm] = useState<Omit<CrearColaboradorDTO, "id" | "access_token">>({
        nombre_completo: "",
        id_tipo: 1,
        email: "",
        telefono: "",
        direccion: ""
    });

    // Cuando cambie `colaborador`, rellenamos el formulario
    useEffect(() => {
        if (colaborador) {
            setForm({
                nombre_completo: colaborador.nombre_completo,
                id_tipo: colaborador.id_tipo,
                email: colaborador.email,
                telefono: colaborador.telefono,
                direccion: colaborador.direccion
            });
        }
    }, [colaborador]);

    const handleUpdate = async () => {
        if (!token || !colaborador) return;

        await actualizarMut.mutateAsync({
            id: colaborador.id,
            ...form,
            access_token: token
        });
        onClose();
    };

    const handleDelete = async () => {
        if (!token || !colaborador) return;

        await eliminarMut.mutateAsync({
            id: colaborador.id,
            access_token: token
        });
        onClose();
    };

    // Revisamos si las mutaciones están en curso con status === "pending"
    const guardandoCambios = actualizarMut.status === "pending";
    const eliminando = eliminarMut.status === "pending";

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={onClose}>
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
                        <div className="fixed inset-0 bg-gray-500/50 transition-opacity" />
                    </Transition.Child>

                    {/* Centrado vertical */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
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
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                        {colaborador
                                            ? "Editar Colaborador"
                                            : "Sin colaborador seleccionado"}
                                    </Dialog.Title>
                                    {colaborador && (
                                        <div className="mt-4 space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Nombre completo
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.nombre_completo}
                                                    onChange={(e) =>
                                                        setForm(prev => ({
                                                            ...prev,
                                                            nombre_completo: e.target.value
                                                        }))
                                                    }
                                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    ID Tipo
                                                </label>
                                                <input
                                                    type="number"
                                                    value={form.id_tipo}
                                                    onChange={(e) =>
                                                        setForm(prev => ({
                                                            ...prev,
                                                            id_tipo: Number(e.target.value)
                                                        }))
                                                    }
                                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={form.email}
                                                    onChange={(e) =>
                                                        setForm(prev => ({
                                                            ...prev,
                                                            email: e.target.value
                                                        }))
                                                    }
                                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Teléfono
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.telefono}
                                                    onChange={(e) =>
                                                        setForm(prev => ({
                                                            ...prev,
                                                            telefono: e.target.value
                                                        }))
                                                    }
                                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Dirección
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.direccion}
                                                    onChange={(e) =>
                                                        setForm(prev => ({
                                                            ...prev,
                                                            direccion: e.target.value
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
                                {/* Botón Guardar Cambios */}
                                <button
                                    type="button"
                                    disabled={guardandoCambios}
                                    onClick={handleUpdate}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent
                                               shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700
                                               focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                                >
                                    {guardandoCambios ? "Guardando…" : "Guardar Cambios"}
                                </button>

                                {/* Botón Eliminar */}
                                <button
                                    type="button"
                                    disabled={eliminando}
                                    onClick={handleDelete}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent
                                               shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700
                                               focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                                >
                                    {eliminando ? "Eliminando…" : "Eliminar"}
                                </button>

                                {/* Botón Cancelar */}
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
