
export default function InfoCardModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30" onClick={onClose}>
            <div className="bg-white p-6 rounded shadow-lg w-1/2 relative" onClick={(e) => e.stopPropagation()}>
                <button 
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl" 
                    onClick={onClose}
                >
                    &times;
                </button>
                <h3 className="text-lg font-bold border-b pb-2">Información del proceso</h3>
                <div className="mt-4">
                    <label className="block font-semibold">Información No. Proceso:</label>
                    <input type="text" className="w-full border p-2 rounded mt-1" />
                    <label className="block font-semibold mt-2">Nombre proceso:</label>
                    <input type="text" className="w-full border p-2 rounded mt-1" />
                    <label className="block font-semibold mt-2">Descripción:</label>
                    <textarea className="w-full border p-2 rounded mt-1" rows={3}></textarea>
                    <label className="block font-semibold mt-2">Precio:</label>
                    <input type="text" className="w-full border p-2 rounded mt-1" />
                </div>
            </div>
        </div>
    );
}
