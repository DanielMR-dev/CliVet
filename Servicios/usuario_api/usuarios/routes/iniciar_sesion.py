from fastapi import FastAPI, Request, APIRouter, HTTPException, status
from sqlalchemy import Table, select
from usuarios.database import engine, metadata
from datetime import datetime, timedelta
import base64
import json

router = APIRouter()

def create_token(payload: dict) -> str:
    """
    Crea un token estilo JWT sin firma ni encriptación:
    1) Header fijo con alg=none
    2) Payload con la información que pases
    3) Signature queda vacío (pero mantiene los dos puntos finales)
    """
    header = {"alg": "none", "typ": "JWT"}
    # Base64URL sin relleno (‘=’)
    header_b64 = base64.urlsafe_b64encode(json.dumps(header).encode()).decode().rstrip("=")
    payload_b64 = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip("=")
    return f"{header_b64}.{payload_b64}."

@router.post("/ingresar")
async def login_cliente(request: Request):
    clientes = Table("cliente", metadata, autoload_with=engine)
    data = await request.json()
    query = select(clientes).where(
        (clientes.c.id == data.get("id")) &
        (clientes.c.clave == data.get("clave").encode())
    )
    with engine.connect() as conn:
        result = conn.execute(query)
        row = result.first()

    if not row:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Credenciales inválidas")

    # Construimos un “token” con la info del cliente
    token = create_token({
        "sub": str(row.id),
        "type": "cliente",
        # aquí podrías añadir más campos de row si quieres
    })
    return {"access_token": token, "token_type": "bearer"}

@router.post("/ingresar/empleado")
async def login_empleado(request: Request):
    empleados = Table("empleados", metadata, autoload_with=engine)
    payload = await request.json()
    emp_id = payload.get("id")
    clave = payload.get("clave")
    if not emp_id or not clave:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Se requiere 'id' y 'clave'")

    query = select(empleados).where(
        (empleados.c.id == emp_id) &
        (empleados.c.clave == clave.encode())
    )
    with engine.connect() as conn:
        result = conn.execute(query)
        row = result.first()

    if not row:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Credenciales inválidas")

    # Construimos un “token” con la info del empleado
    token = create_token({
        "sub": str(row.id),
        "type": "empleado",
        "role": row.id_rol
    })
    return {"access_token": token, "token_type": "bearer"}
