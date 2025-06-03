// src/views/admin/components/mascota/AddMascotaModal.tsx
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import type { CrearMascotaDTO } from "@/types/mascota";
import { useCrearMascota } from "@/hooks/useMascotas";

interface AddMascotaModalProps {
    isOpen: boolean;
    onClose: () => void;
    token: string;
}

export default function AddMascotaModal({
    isOpen,
    onClose,
    token
}: AddMascotaModalProps) {
    const crearMut = useCrearMascota();

    // Formulario local
    const [form, setForm] = useState<Omit<CrearMascotaDTO, "id" | "access_token">>({
        nombre: "",
        edad: 0,
        raza: "",
        sexo: ""
    });

    const handleSubmit = async () => {
        if (!token) return;

        await crearMut.mutateAsync({
            id: 0, // se ignora en creación
            nombre: form.nombre,
            edad: form.edad,
            raza: form.raza,
            sexo: form.sexo,
            access_token: token
        });

        onClose();
        setForm({ nombre: "", edad: 0, raza: "", sexo: "" });
    };

    // React Query v5: para saber si está cargando, usamos status === "loading"
    const cargando = crearMut.status === "loading";

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
                        <div className="fixed inset-0 bg-gray-800/50 transition-opacity" />
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
                                        Agregar Mascota
                                    </Dialog.Title>
                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Nombre
                                            </label>
                                            <input
                                                type="text"
                                                value={form.nombre}
                                                onChange={(e) =>
                                                    setForm(prev => ({
                                                        ...prev,
                                                        nombre: e.target.value
                                                    }))
                                                }
                                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Edad
                                            </label>
                                            <input
                                                type="number"
                                                value={form.edad}
                                                onChange={(e) =>
                                                    setForm(prev => ({
                                                        ...prev,
                                                        edad: Number(e.target.value)
                                                    }))
                                                }
                                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Raza
                                            </label>
                                            <input
                                                type="text"
                                                value={form.raza}
                                                onChange={(e) =>
                                                    setForm(prev => ({
                                                        ...prev,
                                                        raza: e.target.value
                                                    }))
                                                }
                                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Sexo
                                            </label>
                                            <input
                                                type="text"
                                                value={form.sexo}
                                                onChange={(e) =>
                                                    setForm(prev => ({
                                                        ...prev,
                                                        sexo: e.target.value
                                                    }))
                                                }
                                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    disabled={cargando}
                                    onClick={handleSubmit}
                                    className={`w-full inline-flex justify-center rounded-md border border-transparent
                                               shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700
                                               focus:outline-none sm:ml-3 sm:w-auto sm:text-sm ${
                                                   cargando ? "opacity-50 cursor-not-allowed" : ""
                                               }`}
                                >
                                    {cargando ? "Guardando…" : "Guardar"}
                                </button>
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
