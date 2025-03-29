import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/views/LandingPage";
import LoginView from "@/views/auth/LoginView";
import RegisterView from "@/views/auth/RegisterView";
import AdminView from "@/views/admin/AdminView";
import DoctorView from "@/views/doctor/DoctorView";
import ClientView from "@/views/client/ClientView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>}/> 
                <Route path="/auth/login" element={<LoginView/>}/> 
                <Route path="/auth/register" element={<RegisterView/>}/> 
                <Route path="/admin" element={<AdminView/>}/>
                <Route path="/doctor" element={<DoctorView/>}/>
                <Route path="/client" element={<ClientView/>}/>
            </Routes>
        </BrowserRouter>
    );
};

