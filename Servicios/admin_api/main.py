from fastapi import FastAPI
from administrador.routes import colaboradores, medicos, procesos

app = FastAPI(title="API de Gestión de Clivet")

app.include_router(colaboradores.router, prefix="/admin")
app.include_router(medicos.router, prefix="/admin")
app.include_router(procesos.router, prefix="/admin")

@app.get("/")
def home():
    return {"mensaje": "Bienvenido a la API de Clivet"}
