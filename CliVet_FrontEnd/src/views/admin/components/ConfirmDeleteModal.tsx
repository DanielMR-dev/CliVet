// src/views/admin/components/ConfirmDeleteModal.tsx
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    onConfirm: () => void;
}

export default function ConfirmDeleteModal({
    isOpen,
    onClose,
    title,
    description,
    onConfirm
}: ConfirmDeleteModalProps) {
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
                                        {title}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">{description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse space-x-2 space-x-reverse">
                                <button
                                    type="button"
                                    onClick={onConfirm}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent
                                               shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700
                                               focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Eliminar
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
