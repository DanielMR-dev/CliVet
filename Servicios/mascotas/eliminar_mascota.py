from fastapi import FastAPI
from sqlalchemy import create_engine, MetaData, Table, delete

'''
CODIGO ENFOCADO AL SERVICIO DE ELIMINAR MASCOTAS

FUNCIONALIDADES
    1. Eliminar a una mascota por ID

'''

# Conexión a la base de datos (ajustar URL)
DATABASE_URL = "postgresql://postgres:admin@localhost:5432/clivet"
engine = create_engine(DATABASE_URL)

# Cargar metadatos sin definir modelos
metadata = MetaData()
metadata.reflect(bind=engine)  # Reflejar todas las tablas existentes

app = FastAPI()

@app.delete("/{cliente_id}")
async def eliminar_mascota(cliente_id: int):
    try:
        mascotas = Table("mascota", metadata, autoload_with=engine)        

        # Crear la consulta DELETE
        query = delete(mascotas).where(mascotas.c.id == cliente_id)

        # Ejecutar la consulta
        with engine.connect() as connection:
            result = connection.execute(query)
            connection.commit()

        if result.rowcount == 0:
            return {"error": "Mascota no encontrada"}
        
        return {"mensaje": "Mascota eliminada correctamente"}

    except Exception as e:
        return {"error": f"Error al eliminar mascota: {str(e)}"}