from fastapi import FastAPI, Request
from sqlalchemy import create_engine, MetaData, Table, insert, select
from datetime import datetime

'''
CODIGO ENFOCADO AL SERVICIO DE CREAR UNA MASCOTA

FUNCIONALIDADES
    1. Recibir un JSON con la información de una nueva mascota y añadirla a base de datos
    2. Recibir un ID de mascota y retornar si esta mascota existe o no en base de datos

'''

# Conexión a la base de datos (ajustar URL)
DATABASE_URL = "postgresql://postgres:admin@localhost:5432/clivet"
engine = create_engine(DATABASE_URL)

# Cargar metadatos sin definir modelos
metadata = MetaData()
metadata.reflect(bind=engine)  # Reflejar todas las tablas existentes

app = FastAPI()

@app.post("/registrar_mascota")
async def registrar_mascota(request: Request):
    try:
        # Se selecciona la tabla de colaboradores
        mascotas = Table("mascota", metadata, autoload_with=engine)

        # Recuperar los datos como un json
        data = await request.json()

        # Crear la sentencia insert
        query = insert(mascotas).values(
            id=data.get("id"),
            nombre=data.get("nombre"),
            edad=data.get("edad"),
            id_propietario=data.get("id_propietario"),
            agresividad=data.get("agresividad"),
            peso=data.get("peso"),
            direccion=data.get("direccion"),
            id_especie=data.get("id_especie")
        )

        # Ejecutar la consulta
        with engine.connect() as connection:
            connection.execute(query)
            connection.commit()

        return {"mensaje": "Mascota registrada correctamente"} # Cambiar 

    except Exception as e:
        return {"error": f"Error al registrar la mascota: {str(e)}"} # Cambiar 
    


@app.get("/{mascota_id}")
async def buscar_mascota(mascota_id: int):
    try:
        mascotas = Table("mascota", metadata, autoload_with=engine)    

        # Crear la consulta DELETE
        query = select(mascotas).where(mascotas.c.id == mascota_id)

        # Ejecutar la consulta
        with engine.connect() as connection:
            result = connection.execute(query)
            connection.commit()

        if result.rowcount == 0:
            return {"error": "Mascota no encontrada"}
        
        rows = result.fetchall()
        return [dict(row._mapping) for row in rows]

    except Exception as e:
        return {"error": f"Error al buscar mascota: {str(e)}"}