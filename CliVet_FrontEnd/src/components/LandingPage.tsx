import { Stethoscope, Clock, Heart, Users, ChevronRight } from "lucide-react";
import heroImage from "@/assets/images/hero-image.jpg";
import Chatbot from "./Chatbot";

const Feature = ({ icon: Icon, title, description }) => (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
        <div className="bg-blue-100 p-3 rounded-full">
            <Icon className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="mt-4 text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
    </div>
);

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
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
                {/* Features Section */}
                <section className="py-15">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegir CliVet?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <Feature
                                icon={Stethoscope}
                                title="Atención Experta"
                                description="Nuestro equipo de veterinarios altamente calificados está listo para cuidar de tu mascota"
                            />
                            <Feature
                                icon={Clock}
                                title="Horario Flexible"
                                description="Ofrecemos horarios convenientes y servicio de emergencia 24/7."
                            />
                            <Feature
                                icon={Heart}
                                title="Cuidado Compasivo"
                                description="Tratamos a cada mascota con el amor y respeto que se merece."
                            />
                            <Feature
                                icon={Users}
                                title="Enfoque Familiar"
                                description="Consideramos a las mascotas y sus dueños como parte de nuestra familia CliVet."
                            />                     
                        </div>
                    </div>
                </section>
                {/* Testimonials Section */}
                <section className="bg-gray-100 py-15">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros clientes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                                    <p className="text-gray-600 mb-4">
                                        "CliVet ha sido increíble con nuestro perro Max. Su atención y cuidado son incomparables."
                                    </p>
                                    <p className="font-semibold">- Cliente Feliz {i}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* CTA Section */}
                <section className="bg-blue-600 text-white py-15">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold mb-4">¿Listo para darle a tu mascota el mejor cuidado?</h2>
                        <p className="text-xl mb-8">
                            Únete a la familia CliVet hoy y experimenta la diferencia en el cuidado veterinario.
                        </p>
                        <button
                            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300 inline-flex items-center"
                        >
                            Comienza Ahora <ChevronRight className="ml-2" />
                        </button>
                    </div>
                </section>
            </main>
            {/* Footer Section */}
            <footer className="bg-gray-800 text-white py-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">CliVet</h3>
                            <p>Cuidado veterinario de calidad para tus mascotas</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
                            <p>123 Calle Principal</p>
                            <p>Ciudad, País</p>
                            <p>Tel: (123) 456-7890</p>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                        <p>&copy; 2025 CliVet. Todos los derechos reservados.</p>
                    </div>
                </div> 
            
            </footer>
            <Chatbot />
        </div>
    );
};
