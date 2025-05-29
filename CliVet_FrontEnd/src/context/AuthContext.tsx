import { createContext, useContext, useState, ReactNode } from "react";

interface AuthCtx {
    token: string;
    setToken: (t: string) => void;
}

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setTokenState] = useState(() =>
        localStorage.getItem("access_token") || ""
    );
    const setToken = (t: string) => {
        localStorage.setItem("access_token", t);
        setTokenState(t);
    };
    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return ctx;
}
