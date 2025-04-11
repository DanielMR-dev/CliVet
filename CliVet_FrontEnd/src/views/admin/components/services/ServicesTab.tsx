import { useState } from "react";
import { FiClock, FiEdit, FiSearch, FiTrash } from "react-icons/fi";
import ScheduleAppointmentModal from "./ScheduleAppointmentModal";
import EditAppointmentModal from "./EditAppointmentModal";
import DeleteAppointmentModal from "./DeleteAppointmentModal";
import ReminderModal from "./ReminderModal";
import AddDaycareModal from "./AddDaycareModal";

export default function ServicesTab() {
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [editAppointmentOpen, setEditAppointmentOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [reminderModalOpen, setReminderModalOpen] = useState(false);
    const [daycareModalOpen, setDaycareModalOpen] = useState(false);

    return (
        <div className="mt-4">
            {/* Barra de búsqueda y botones de agregar */}
            <div className="flex justify-between items-center mb-4">
                <div className="relative w-1/3">
                    <input 
                        type="text" 
                        placeholder="Buscar..." 
                        className="border p-2 rounded w-full pr-10"
                    />
                    <FiSearch className="absolute right-3 top-3 text-gray-500" />
                </div>

                {/* Botones de agregar */}
                <div className="flex space-x-2">
                    <button 
                        className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 hover:cursor-pointer"
                        onClick={() => setDaycareModalOpen(true)} // Abre el modal de guardería
                    >
                        Agregar guardería
                    </button>
                    <button 
                        className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 hover:cursor-pointer"
                        onClick={() => setIsScheduleModalOpen(true)} // Abre el modal de agendar cita
                    >
                        Agregar cita
                    </button>
                </div>
            </div>

            {/* Tarjetas de Información */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                {[...Array(4)].map((_, index) => (
                    <div 
                        key={index} 
                        className="relative border p-4 bg-white rounded shadow-md"
                    >
                        <h3 className="font-semibold border-b pb-2">Información</h3>
                        <p className="mt-2 text-gray-600">Contenido relevante...</p>

                        {/* Botones de acciones */}
                        <div className="flex justify-between mt-4">
                            <div className="flex space-x-2">
                                <button 
                                    className="p-2 bg-gray-200 rounded hover:bg-gray-300 hover:cursor-pointer"
                                    onClick={() => setEditAppointmentOpen(true)}
                                >
                                    <FiEdit className="text-gray-700" />
                                </button>
                                <button 
                                    className="p-2 bg-gray-200 rounded hover:bg-gray-300 hover:cursor-pointer"
                                    onClick={() => setReminderModalOpen(true)}
                                >
                                    <FiClock className="text-gray-700" />
                                </button>
                            </div>
                            <button 
                                className="p-2 bg-gray-200 rounded hover:bg-red-300 hover:cursor-pointer"
                                onClick={() => setDeleteModalOpen(true)}
                            >
                                <FiTrash className="text-red-600" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de agendar cita */}
            <ScheduleAppointmentModal 
                isOpen={isScheduleModalOpen} 
                onClose={() => setIsScheduleModalOpen(false)}
                onSave={(data) => console.log("Nueva cita agendada:", data)}
            />

            {/* Modal de edición de cita */}
            <EditAppointmentModal 
                isOpen={editAppointmentOpen} 
                onClose={() => setEditAppointmentOpen(false)}
                onSave={(data) => console.log("Datos guardados:", data)}
            />

            {/* Modal de confirmación de eliminación */}
            <DeleteAppointmentModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => {
                    console.log("Cita eliminada");
                    setDeleteModalOpen(false);
                }}
            />

            {/* Modal de programar recordatorio */}
            <ReminderModal
                isOpen={reminderModalOpen}
                onClose={() => setReminderModalOpen(false)}
                onConfirm={(date, time) => {
                    console.log(`Recordatorio programado para: ${date} a las ${time}`);
                    setReminderModalOpen(false);
                }}
            />

            {/* Modal de agregar guardería */}
            <AddDaycareModal
                isOpen={daycareModalOpen}
                onClose={() => setDaycareModalOpen(false)}
                onSave={(data) => {
                    console.log("Guardería agregada:", data);
                    setDaycareModalOpen(false);
                }}
            />
        </div>
    );
}
