import requests

CITAS_API = 4003
USUARIO_API = 4002
MASCOTAS_API = 4001
ADMIN_API = 4000
HOST = 'http://host.docker.internal:'

def registrar_usuario(data):
    required = ["id", "nombre_completo", "fecha_nacimiento",
                "clave", "email", "telefono", "direccion"]
    for key in required:
        if key not in data:
            return {
                "error" : "Campos faltantes para crear usuario",
                "status" : 400
            }
    url = f'{HOST}{USUARIO_API}/usuarios/registrar'
    return requests.post(url, json=data).json()


def login_cliente(data):
    required = ["id", "clave"]
    for key in required:
        if key not in data:
            return {
                "error" : "Campos incompletos para login",
                "status" : 400
            }
    url = f'{HOST}{USUARIO_API}/usuarios/ingresar/cliente'
    return requests.post(url, json=data).json()


def login_empleado(data):
    required = ["id", "clave"]
    for key in required:
        if key not in data:
            return {
                "error" : "Campos incompletos para login",
                "status" : 400
            }
    url = f'{HOST}{USUARIO_API}/usuarios/ingresar/empleado'
    return requests.post(url, json=data).json()