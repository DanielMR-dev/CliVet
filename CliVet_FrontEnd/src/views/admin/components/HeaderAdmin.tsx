import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function HeaderAdmin() {
    return (
        <div>
            <header className="bg-white shadow-sm w-full">
                <div className="max-w-6xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <Link
                        to={'/'} 
                        className="text-3xl font-bold text-blue-600"
                    >CliVet</Link>
                    <Link
                        to={'/'}
                        className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-300"
                    ><FiLogOut /></Link>
                </div>
            </header>
        </div>
    );
};
