// src/hooks/useAuth.ts
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { loginCliente, loginEmpleado, LoginCreds, LoginRes } from "@/services/authService";
import { useAuth as useAuthContext } from "@/context/AuthContext";

export function useLoginCliente(): UseMutationResult<LoginRes, Error, LoginCreds> {
    const { setToken } = useAuthContext();
    return useMutation<LoginRes, Error, LoginCreds>(
        (cred: LoginCreds) => loginCliente(cred),
        {
            onSuccess: (data: LoginRes) => {
                setToken(data.access_token);
            }
        }
    );
}

export function useLoginEmpleado(): UseMutationResult<LoginRes, Error, LoginCreds> {
    const { setToken } = useAuthContext();
    return useMutation<LoginRes, Error, LoginCreds>(
        (cred: LoginCreds) => loginEmpleado(cred),
        {
            onSuccess: (data: LoginRes) => {
                setToken(data.access_token);
            }
        }
    );
}

export function useLogout(): () => void {
    const { setToken } = useAuthContext();
    return () => {
        setToken("");
    };
}
