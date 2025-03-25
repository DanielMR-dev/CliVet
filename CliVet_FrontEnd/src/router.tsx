import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginView from "@/views/auth/LoginView";
import RegisterView from "@/views/auth/RegisterView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>}/> 
                <Route path="/auth/login" element={<LoginView/>}/> 
                <Route path="/auth/register" element={<RegisterView/>}/> 
            </Routes>
        </BrowserRouter>
    
    )
};

