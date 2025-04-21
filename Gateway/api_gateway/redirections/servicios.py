import requests

CITAS_API = 4003
USUARIO_API = 4002
MASCOTAS_API = 4001
ADMIN_API = 4000
HOST = 'http://host.docker.internal:'


def crear_colaborador(data):
    required = ['id', 'nombre_completo', 'id_tipo',
                'email', 'telefono', 'direccion']
    for campo in required:
        if campo not in data:
            return {
                "error" : "Campos faltantes",
                "status" : 400
            }
    url = f'{HOST}{ADMIN_API}/admin/colaborador'
    return requests.post(url, json=data).json()


def listar_colaboradores(data):
    url = f'{HOST}{ADMIN_API}/admin/colaboradores'
    response = requests.get(url)
    return {
        'datos' : response.json(),
        'status' : 200
    }


def listar_colaborador_id(data):
    url = f'{HOST}{ADMIN_API}/admin/colaboradores/{data["id"]}'
    response = requests.get(url)
    if response.json():
        return {
            'datos' : response.json(),
            'status' : 200
        }
    else:
        return {
            'error' : "ID de usuario no existente",
            'status' : 404
        }


def actualizar_colaborador(data):
    required = ['nombre_completo', 'id_tipo',
                'email', 'telefono', 'direccion']
    update_data = {}
    valid = False
    for key in required:
        if key in data:
            valid = True
            update_data[key] = data[key]
    if valid:
        url = f'{HOST}{ADMIN_API}/admin/colaboradores/{data["id"]}'
        return requests.put(url, json=update_data).json()
    

def eliminar_colaborador(data):
    url = f'{HOST}{ADMIN_API}/admin/colaboradores/{data["id"]}'
    return requests.delete(url).json()


def crear_medico(data):
    required = ["id", "nombre_completo", "clave", "id_rol"]
    for key in required:
        if key not in data:
            return {
                "error" : "Campos incompletos para registro",
                "status" : 400
            }
    url = f'{HOST}{ADMIN_API}/admin/medico'
    return requests.post(url, json=data).json()


def listar_procesos(data):
    url = f'{HOST}{ADMIN_API}/admin/procesos'
    response = requests.get(url)
    return {
        "data" : response.json(),
        "status" : 200
    }


def listar_proceso_id(data):
    url = f'{HOST}{ADMIN_API}/admin/procesos/{data["id"]}'
    response = requests.get(url)
    if response.json():
        return {
            'datos' : response.json(),
            'status' : 200
        }
    else:
        return {
            'error' : "ID de proceso no existente",
            'status' : 404
        }


def listar_citas(data):
    url = f'{HOST}{CITAS_API}/citas'
    response = requests.get(url)
    return {
        "data" : response.json(),
        "status" : 200
    }


def crear_cita(data):
    required = ["id", "id_tipo", "id_mascota", "id_colaborador",
                "fecha_hora", "modificable_por_usuario"]
    for key in required:
        if key not in data:
            return {
                "error" : "Información incompleta para creación de cita",
                "status" : 400
            }
    url = f'{HOST}{CITAS_API}/citas'
    return requests.post(url, json=data).json()


def actualizar_cita(data):
    required = ["id_tipo", "id_mascota", "id_colaborador",
                "fecha_hora", "modificable_por_usuario"]
    update_info = {}
    for key in required:
        if key in data:
            update_info[key] = data[key]
    url = f'{HOST}{CITAS_API}/citas/{data["id"]}'
    return requests.put(url, json=update_info).json()


def eliminar_cita(data):
    url = f'{HOST}{CITAS_API}/citas/{data["id"]}'
    return requests.delete(url).json()


def calcular_precio_guarderia(data):
    url = f"{HOST}{CITAS_API}/citas/guarderia"
    params = {
        "fecha_hora_inicio" : data["fecha_hora_inicio"],
        "fecha_hora_fin" : data["fecha_hora_fin"],
        "peso_mascota" : data["peso_mascota"]
    }
    return requests.get(url, params=params).json()


def citas_fechaTipo(data):
    url = f"{HOST}{CITAS_API}/citas/fechaTipo"
    params = {
        "fecha" : data["fecha"],
        "id_tipo" : data["id_tipo"]
    }
    response = requests.get(url, params=params)
    return {
        "data" : response.json(),
        "status" : 200
    }


def citas_tipo(data):
    url = f"{HOST}{CITAS_API}/citas/tipo"
    params = {"id_tipo" : data["id_tipo"]}
    response = requests.get(url, params=params)
    return {
        "data" : response.json(),
        "status" : 200
    }


def citas_colaborador(data):
    url = f"{HOST}{CITAS_API}/citas/colaborador/{data["id"]}"
    response = requests.get(url)
    return {
        "data" : response.json(),
        "status" : 200
    }


def citas_cliente(data):
    url = f"{HOST}{CITAS_API}/citas/cliente/{data["id"]}"
    response = requests.get(url)
    return {
        "data" : response.json(),
        "status" : 200
    }


def citas_mascota(data):
    url = f"{HOST}{CITAS_API}/citas/mascota/{data["id"]}"
    response = requests.get(url)
    return {
        "data" : response.json(),
        "status" : 200
    }


def citas_disponibles(data):
    url = f"{HOST}{CITAS_API}/citas/disponibles/{data["fecha"]}/{data["id_tipo"]}"
    return requests.get(url).json()


def crear_guarderia(data):
    required = ["fecha_ingreso", "fecha_recogida", "numero_horas",
                "id_mascota", "observaciones"]
    for key in required:
        if key not in data:
            return {
                "error" : "Campos faltantes para generar guardería",
                "status" : 400
            }
    url = f'{HOST}{CITAS_API}/citas/guarderia'
    return requests.post(url, json=data).json()


def crear_recordatorio(data):
    required = ["fecha", "metodo_envio", "id_cita"]
    for key in required:
        if key not in data:
            return {
                "error" : "Campos faltantes para generar recordatorio",
                "status" : 400
            }
    url = f'{HOST}{CITAS_API}/citas/recordatorio'
    return requests.post(url, json=data).json()


def listar_mascotas(data):
    url = f'{HOST}{MASCOTAS_API}/mascotas'
    response = requests.get(url)
    return {
        "data" : response.json(),
        "status" : 200
    }


def listar_mascota_id(data):
    url = f'{HOST}{MASCOTAS_API}/mascotas/{data["id"]}'
    response = requests.get(url)
    if response.json():
        return {
            'datos' : response.json(),
            'status' : 200
        }
    else:
        return {
            'error' : "ID de mascota no existente",
            'status' : 404
        }
    

def listar_mascota_id_usuario(data):
    url = f'{HOST}{MASCOTAS_API}/mascotas/usuario/{data["id"]}'
    response = requests.get(url)
    if response.json():
        return {
            'datos' : response.json(),
            'status' : 200
        }
    else:
        return {
            'error' : "ID de usuario no existente",
            'status' : 404
        }
    

def crear_mascota(data):
    required = ["id", "nombre", "edad", "id_propietario",
                "agresividad", "peso", "direccion", "id_especie"]
    for key in required:
        if key not in data:
            return {
                "error" : "Campos faltantes para crear mascota",
                "status" : 400
            }
    url = f'{HOST}{MASCOTAS_API}/mascotas'
    return requests.post(url, json=data).json()


def actualizar_mascota(data):
    required = ["nombre", "edad", "id_propietario",
                "agresividad", "peso", "direccion", "id_especie"]
    update_info = {}
    for key in required:
        if key in data:
            update_info[key] = data[key]
    url = f'{HOST}{MASCOTAS_API}/mascotas/{data["id"]}'
    return requests.put(url, json=update_info).json()


def eliminar_mascota(data):
    url = f'{HOST}{MASCOTAS_API}/mascotas/{data["id"]}'
    return requests.delete(url).json()


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


def listar_usuario_id(data):
    url = f'{HOST}{USUARIO_API}/usuarios/{data["id"]}'
    return requests.get(url).json()


def actualizar_usuario(data):
    required = ["nombre_completo", "fecha_nacimiento",
                "clave", "email", "telefono", "direccion"]
    update_info = {}
    for key in required:
        if key in data:
            update_info[key] = data[key]
    url = f'{HOST}{USUARIO_API}/usuarios/{data["id"]}'
    return requests.put(url, json=update_info).json()


def eliminar_usuario(data):
    url = f'{HOST}{USUARIO_API}/usuarios/{data["id"]}'
    return requests.delete(url).json()