
export default function PetsTab() {
    return (
        <div className="flex-1 flex flex-col">
            <div className="flex justify-start mt-4">
                <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Agregar mascota</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="border p-4 bg-white rounded shadow-md">
                        <h3 className="font-semibold border-b pb-2">Información</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};
