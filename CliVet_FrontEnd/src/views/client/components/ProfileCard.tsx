
export default function ProfileCard() {
    return (
        <div className="p-6 bg-white rounded shadow-md w-full max-w-3xl mx-auto mt-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-gray-600 text-sm">Nombre completo</label>
                    <input type="text" value="John Doe" disabled className="w-full border p-2 rounded bg-gray-100" />
                </div>
                <div>
                    <label className="text-gray-600 text-sm">Fecha de nacimiento</label>
                    <input type="text" value="xx / xx / xxxx" disabled className="w-full border p-2 rounded bg-gray-100" />
                </div>
                <div>
                    <label className="text-gray-600 text-sm">Número de identificación</label>
                    <input type="text" value="0000000000" disabled className="w-full border p-2 rounded bg-gray-100" />
                </div>
                <div>
                    <label className="text-gray-600 text-sm">Correo electrónico</label>
                    <input type="email" className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="text-gray-600 text-sm font-bold">Dirección</label>
                    <input type="text" className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="text-gray-600 text-sm font-bold">Contraseña</label>
                    <input type="password" className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="text-gray-600 text-sm font-bold">Número telefónico</label>
                    <input type="text" className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="text-gray-600 text-sm font-bold">Confirmar contraseña</label>
                    <input type="password" className="w-full border p-2 rounded" />
                </div>
            </div>
            <div className="flex justify-between mt-6">
                <button className="px-4 py-2 bg-blue-600 text-white rounded">Guardar Cambios</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded">Eliminar Cuenta</button>
            </div>
        </div>
    );
}
