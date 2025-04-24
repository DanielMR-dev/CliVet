from fastapi import FastAPI
from mascotas.routes import crear_mascota, eliminar_mascota, listar_mascotas, modificar_mascota

app = FastAPI(title="API de Gestión de Clivet")

app.include_router(crear_mascota.router, prefix="/mascotas")
app.include_router(eliminar_mascota.router, prefix="/mascotas")
app.include_router(listar_mascotas.router, prefix="/mascotas")
app.include_router(modificar_mascota.router, prefix="/mascotas")

@app.get("/")
def home():
    return {"mensaje": "Bienvenido a la API de Clivet"}