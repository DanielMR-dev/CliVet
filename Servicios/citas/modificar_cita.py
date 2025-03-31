from fastapi import FastAPI, Request
from sqlalchemy import create_engine, MetaData, Table, update
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

# Cargar metadatos sin definir modelos
metadata = MetaData()
metadata.reflect(bind=engine)  # Reflejar todas las tablas existentes

app = FastAPI()

@app.put("/citas/{id}")
async def actualizar_cita(id: int, request: Request):
    try:
        # Obtener la tabla
        cita = Table("cita", metadata, autoload_with=engine)

        # Recuperar los datos del JSON
        data = await request.json()

        # Remover 'id' si está en los datos (no se debe actualizar)
        data.pop("id", None)

        # Si no hay datos para actualizar, devolver error
        if not data:
            return {"error": "No se enviaron datos para actualizar"}

        # Crear la consulta de actualización con solo los valores presentes
        query = update(cita).where(cita.c.id == id).values(**data)

        # Ejecutar la consulta
        with engine.connect() as connection:
            result = connection.execute(query)
            connection.commit()

        if result.rowcount == 0:
            return {"error": "Cita no encontrada"}

        return {"mensaje": "Cita actualizada correctamente"}

    except Exception as e:
        return {"error": f"Error al actualizar la cita: {str(e)}"}
