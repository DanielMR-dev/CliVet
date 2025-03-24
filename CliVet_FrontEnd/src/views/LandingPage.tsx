import heroImage from "../assets/images/hero-image.jpg";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="max-w-6xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-blue-600">CliVet</h1>
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    >Iniciar Sesión</button>
                </div>
            </header>
            <main>
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="md:w-1/2 mb-10 md:mb-0 mr-1.5">
                                <h2 className="text-4xl md:text-5xl font-bold mb-4">Cuidado experto para tu mejor amigo</h2>
                                <p className="text-xl mb-8">CliVet ofrece atención veterinaria de primera clase con un enfoque compasivo y personalizado.</p>
                                <button
                                    className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300"
                                >Comienza Ahora</button>
                            </div>
                            <div className="md:w-1/2">
                                <img
                                    src={heroImage}
                                    alt="Veterinario cuidando a un perro"
                                    className="rounded-lg shadow-xl"
                                />
                            </div>
                        </div>

                    </div>
                </section>
            </main>
        </div>
    );
};
