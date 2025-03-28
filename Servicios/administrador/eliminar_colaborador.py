from fastapi import FastAPI
from sqlalchemy import create_engine, MetaData, Table, delete

'''
CODIGO ENFOCADO AL SERVICIO DE LISTAR COLABORADORES

FUNCIONALIDADES
    1. Eliminar a un colaborador por ID

'''

# Conexión a la base de datos (ajustar URL)
DATABASE_URL = "postgresql://postgres:admin@localhost:5432/clivet"
engine = create_engine(DATABASE_URL)

# Cargar metadatos sin definir modelos
metadata = MetaData()
metadata.reflect(bind=engine)  # Reflejar todas las tablas existentes

app = FastAPI()

@app.delete("/{colaborador_id}")
async def eliminar_colaborador(colaborador_id: int):
    try:
        colaboradores = Table("colaborador", metadata, autoload_with=engine)        

        # Crear la consulta DELETE
        query = delete(colaboradores).where(colaboradores.c.id == colaborador_id)

        # Ejecutar la consulta
        with engine.connect() as connection:
            result = connection.execute(query)
            connection.commit()

        if result.rowcount == 0:
            return {"error": "Colaborador no encontrado"}
        
        return {"mensaje": "Colaborador eliminado correctamente"}

    except Exception as e:
        return {"error": f"Error al eliminar el colaborador: {str(e)}"}