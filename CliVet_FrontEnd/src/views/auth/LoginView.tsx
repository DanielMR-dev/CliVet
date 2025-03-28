import { Link } from "react-router-dom";

export default function LoginView() {

    const hadleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Inicia Sesión con tu cuenta
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={hadleSubmit}>
                        <div>
                            <label htmlFor="userType" className="block text-l font-medium text-gray-700"
                            >Tipo de Usuario</label>
                            <select
                                id="userType" 
                                name="userType"
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            >
                                <option value="client">Cliente</option>
                                <option value="doctor">Médico</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label
                                className="block text-l font-medium text-gray-700"
                            >Correo Electrónico</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />    
                        </div>
                        <div className="flex flex-col">
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
                        <input
                            type="submit"
                            value='Iniciar Sesión'
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-l font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        />
                    </form>      
                    <div className="relative mt-5">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                ¿No tienes cuenta?
                            </span>
                        </div>
                    </div>
                    <div className="mt-5">
                        <Link
                            to={'/auth/register'}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >Registrarse</Link>
                    </div>        
                </div>
            </div>
        </div>
    );
};
