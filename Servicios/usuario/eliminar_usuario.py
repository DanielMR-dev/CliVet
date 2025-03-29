from fastapi import FastAPI
from sqlalchemy import create_engine, MetaData, Table, delete

'''
CODIGO ENFOCADO AL SERVICIO DE LISTAR COLABORADORES

FUNCIONALIDADES
    1. Eliminar a un usuario por ID

'''

# Conexión a la base de datos (ajustar URL)
DATABASE_URL = "postgresql://postgres:admin@localhost:5432/clivet"
engine = create_engine(DATABASE_URL)

# Cargar metadatos sin definir modelos
metadata = MetaData()
metadata.reflect(bind=engine)  # Reflejar todas las tablas existentes

app = FastAPI()

@app.delete("/{cliente_id}")
async def eliminar_colaborador(cliente_id: int):
    try:
        clientes = Table("cliente", metadata, autoload_with=engine)        

        # Crear la consulta DELETE
        query = delete(clientes).where(clientes.c.id == cliente_id)

        # Ejecutar la consulta
        with engine.connect() as connection:
            result = connection.execute(query)
            connection.commit()

        if result.rowcount == 0:
            return {"error": "Cliente no encontrado"}
        
        return {"mensaje": "Cliente eliminado correctamente"}

    except Exception as e:
        return {"error": f"Error al eliminar al cliente: {str(e)}"}