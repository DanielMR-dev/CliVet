from fastapi import FastAPI, Request
from sqlalchemy import create_engine, MetaData, Table, insert, select
import os
from dotenv import load_dotenv
load_dotenv()


DATABASE_URL = os.getenv("DATABASE_URL")
'''
CODIGO ENFOCADO AL SERVICIO DE CREAR COLABORADORES

FUNCIONALIDADES
    1. Recibir un JSON con la información de un nuevo colaborador y añadirlo a base de datos
    2. Recibir un JSON con las credenciales de un médico para añadirlo a base de datos

'''

# Conexión a la base de datos (ajustar URL)
# DATABASE_URL = "postgresql://postgres:admin@localhost:5432/clivet"
engine = create_engine(DATABASE_URL)

# Cargar metadatos sin definir modelos
metadata = MetaData()
metadata.reflect(bind=engine)  # Reflejar todas las tablas existentes

app = FastAPI()

@app.post("/crear_colaborador")
async def crear_colaborador(request: Request):
    try:
        # Se selecciona la tabla de colaboradores
        colaboradores = Table("colaborador", metadata, autoload_with=engine)

        # Recuperar los datos como un json
        data = await request.json()

        # Crear la sentencia insert
        query = insert(colaboradores).values(
            id=data.get("id"),
            nombre_completo=data.get("nombre_completo"),
            id_tipo=data.get("id_tipo"),
            email=data.get("email"),
            telefono=data.get("telefono"),
            direccion=data.get("direccion")
        )

        # Ejecutar la consulta
        with engine.connect() as connection:
            connection.execute(query)
            connection.commit()

        return {"mensaje": "Colaborador registrado correctamente"} # Cambiar 

    except Exception as e:
        return {"error": f"Error al registrar al colaborador: {str(e)}"} # Cambiar 



@app.post("/crear_medico")
async def crear_medico(request: Request):
    try:
        # Seleccionar la tabla de empleados
        empleados = Table("empleados", metadata, autoload_with=engine)

        # Recuperar los datos como un json
        data = await request.json()

        # Crear la sentencia insert
        query = insert(empleados).values(
            id=data.get("id"),
            nombre_completo=data.get("nombre_completo"),
            clave=data.get("clave").encode(),
            id_rol=data.get("id_rol")
        )

        # Ejecutar la consulta
        with engine.connect() as connection:
            connection.execute(query)
            connection.commit()

        return {"mensaje": "Medico registrada correctamente"} # Cambiar 

    except Exception as e:
        return {"error": f"Error al registrar al medico: {str(e)}"} # Cambiar 
