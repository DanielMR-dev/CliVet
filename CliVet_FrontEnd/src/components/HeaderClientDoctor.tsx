import { Link } from "react-router-dom";
import { FiLogOut, FiMenu } from "react-icons/fi";

export default function HeaderClientDoctor({ toggleSidebar }) {
    return (
        <header className="bg-white shadow-sm w-full flex justify-between items-center p-4">
            <button onClick={toggleSidebar} className="text-2xl md:hidden">
                <FiMenu />
            </button>
            <Link
                to={'/'} 
                className="text-3xl font-bold text-blue-600"
            >CliVet</Link>
            <Link to={'/'} className="text-red-600 text-2xl hover:text-red-800 transition duration-300">
                <FiLogOut />
            </Link>
        </header>
    );
}
