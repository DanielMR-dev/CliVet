import axios, { AxiosResponse } from "axios";

const api = axios.create({
    baseURL:    import.meta.env.VITE_API_GATEWAY_URL,
    headers:   { "Content-Type": "application/json" },
});

export async function callGateway<Req,Res>(
    servicio: string,
    datos:    Req
): Promise<Res> {
    const { data } = await api.post<Res,AxiosResponse<Res>>(
        "",
        { servicio, datos }
    );
    return data;
}
