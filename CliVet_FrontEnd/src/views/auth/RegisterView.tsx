import { Link } from "react-router-dom";

export default function RegisterView() {

    const hadleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Crea una nueva cuenta
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full max-w-4xl">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6 grid grid-cols-2" onSubmit={hadleSubmit}>
                        {/* Name Section */}
                        <div className="mr-5">
                            <label
                                className="block text-l font-medium text-gray-700"
                            >Nombre completo</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        {/* Birth Section */}
                        <div className="mr-5">
                            <label
                                className="block text-l font-medium text-gray-700"
                            >Fecha de nacimiento</label>
                            <input
                                id="birthDate"
                                name="birthDate"
                                type="date"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        {/* ID Section */}
                        <div className="mr-5">
                            <label
                                className="block text-l font-medium text-gray-700"
                            >Número de identificación</label>
                            <input
                                id="idNumber"
                                name="idNumber"
                                type="text"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        {/* Email Section */}
                        <div className="mr-5">
                            <label
                                className="block text-l font-medium text-gray-700"
                            >Correo electrónico</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        {/* Address Section */}
                        <div className="mr-5">
                            <label
                                className="block text-l font-medium text-gray-700"
                            >Dirección</label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        {/* Password Section */}
                        <div className="mr-5">
                            <label
                                className="block text-l font-medium text-gray-700"
                            >Contraseña</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        {/* Phone Section */}
                        <div className="mr-5">
                            <label
                                className="block text-l font-medium text-gray-700"
                            >Número telefónico</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        {/* Confirm Password Section */}
                        <div className="mr-5">
                            <label
                                className="block text-l font-medium text-gray-700"
                            >Confirmar Contraseña</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <input
                            type="submit"
                            value='Crear Cuenta'
                            className="col-span-2 w-full flex justify-center py-2 border border-transparent rounded-md shadow-sm text-l font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:cursor-pointer"
                        />
                    </form>      
                    <div className="relative mt-5">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                ¿Ya tienes cuenta?
                            </span>
                        </div>
                    </div>
                    <div className="mt-5">
                        <Link
                            to={'/auth/login'}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >Inicia Sesión</Link>
                    </div>        
                </div>
            </div>
        </div>
    );
};
