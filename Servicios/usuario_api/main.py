from fastapi import FastAPI
from usuarios.routes import eliminar_usuario, registrar_usuario, modificar_usuario

app = FastAPI(title="API de Gestión de Clivet")

app.include_router(modificar_usuario.router, prefix="/usuarios")
app.include_router(eliminar_usuario.router, prefix="/usuarios")
app.include_router(registrar_usuario.router, prefix="/usuarios")

@app.get("/")
def home():
    return {"mensaje": "Bienvenido a la API de Clivet"}