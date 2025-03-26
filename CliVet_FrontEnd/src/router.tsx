import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginView from "@/views/auth/LoginView";
import RegisterView from "@/views/auth/RegisterView";
import AdminView from "@/views/admin/AdminView";
import DoctorView from "@/views/doctor/DoctorView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>}/> 
                <Route path="/auth/login" element={<LoginView/>}/> 
                <Route path="/auth/register" element={<RegisterView/>}/> 
                <Route path="/admin" element={<AdminView/>}/>
                <Route path="/doctor" element={<DoctorView/>}/>
                <Route path="/client" element={<AdminView/>}/>
            </Routes>
        </BrowserRouter>
    
    )
};

