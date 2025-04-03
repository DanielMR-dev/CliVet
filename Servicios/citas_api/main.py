from fastapi import FastAPI
from citas.routes import crear_cita, eliminar_cita, listar_citas, modificar_cita

app = FastAPI(title="API de Gestión de citas de Clivet")

app.include_router(crear_cita.router, prefix="/citas")
app.include_router(eliminar_cita.router, prefix="/citas")
app.include_router(listar_citas.router, prefix="/citas")
app.include_router(modificar_cita.router, prefix="/citas")

@app.get("/")
def home():
    return {"mensaje": "Bienvenido a la API de citas de Clivet"}