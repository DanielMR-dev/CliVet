import { Link } from "react-router-dom";

export default function AdminView() {
    return (
        <div className="w-full min-h-screen bg-gray-50">
            {/* Header Section */}
            <header className="bg-white shadow-sm w-full">
                <div className="max-w-6xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-blue-600">CliVet</h1>
                    <Link
                        to={'/'}
                        className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-300"
                    >Cerrar Sesión</Link>
                </div>
            </header>
            <main className="max-w-6xl">
                {/* Panel de control */}
                <section className="text-center mt-4">
                    <h2 className="text-xl font-semibold">Panel de control</h2>
                </section>
                
            </main>
        </div>
    )
};
