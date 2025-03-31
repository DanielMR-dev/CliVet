from fastapi import FastAPI
from sqlalchemy import create_engine, MetaData, Table, delete
import os
from dotenv import load_dotenv
load_dotenv()


DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

metadata = MetaData()
metadata.reflect(bind=engine)  # Reflejar todas las tablas existentes

app = FastAPI()

@app.delete("/{cita_id}")
async def eliminar_colaborador(cita_id: int):
    try:
        cita = Table("cita", metadata, autoload_with=engine)        

        # Crear la consulta DELETE
        query = delete(cita).where(cita.c.id == cita_id)

        # Ejecutar la consulta
        with engine.connect() as connection:
            result = connection.execute(query)
            connection.commit()

        if result.rowcount == 0:
            return {"error": "Cita no encontrada"}
        
        return {"mensaje": "cita eliminada correctamente"}

    except Exception as e:
        return {"error": f"Error al eliminar la cita: {str(e)}"}