import requests

'''url = "http://127.0.0.1:8000/colaboradores/10023766"
data = {
    "id": 10023765,
    "nombre_completo": "Santiago Garcia Henao",
    "id_tipo": 3,
    "email": "santiago@gmail.com",
    "telefono": "310700674",
    "direccion": "La Virginia, Risaralda"
}

response = requests.put(url, json=data)
print(response.json())'''

'''url = "http://127.0.0.1:8000/10023765"
response = requests.delete(url)
print(response.json())'''

# url = "http://127.0.0.1:8000/crear_medico"
# data = {
#     "id": 1007455046,
#     "nombre_completo": "Nicolas Osorio Galvis",
#     "id_rol": 1,
#     "clave": "123456"
# }
# response = requests.post(url, json=data)
# print(response.json())


# url = "http://127.0.0.1:8000/usuarios/10023765"
# data = {
#     "nombre_completo": "Santiago Garcia Henao",
#     "email": "garciaHenao@gmail.com"
# }

# response = requests.put(url, json=data)
# print(response.json())

'''
url = "http://127.0.0.1:8002/10023765"
response = requests.delete(url)
print(response.json())'''

# url = "http://127.0.0.1:8000/mascotas/2"
# data = {
# "nombre": "Eustaquio Fernando",
# "edad": 15
# }

# response = requests.put(url, json=data)
# print(response.json())

'''url = "http://127.0.0.1:8000/1"
response = requests.delete(url)
print(response.json())'''




##!! Crear un colaborador
# url = 'http://127.0.0.1:8002/crear_colaborador'
# data = {
# "id": 2,
# "nombre_completo": 'Mira Restrepo',
# "id_tipo": 1,
# "email": "daniel@clivet.com",
# "telefono": "310700674",
# "direccion": 'calle 32x 10-20'
# }
# response = requests.post(url, json=data)
# print(response.json())

##?? PRUEBAS DE CITAS

##!! Crear una cita
# url = 'http://127.0.0.1:8000/crear_cita'
# data = {
# "id": 5,
# "id_tipo": 3,
# "id_mascota": 2,
# "id_colaborador": 2,
# "fecha_hora": "2023-11-20 15:30:00",
# "modificable_por_usuario": 1
# }
# response = requests.post(url, json=data)
# print(response.json())

#!! Modificar una cita ( Permite solo entregar los datos que se desean modificar)
# url = 'http://127.0.0.1:8000/citas/1'
# data = {
# "fecha_hora": "2023-05-20 15:30:00"
# }
# response = requests.put(url, json=data)
# print(response.json())

#!! Elimnar Cita
# url = 'http://127.0.0.1:8000/1'

# response = requests.delete(url)
# print(response.json())


##!! Listar todas las citas
# url = 'http://127.0.0.1:8000/citas'

# response = requests.get(url)
# print(response.json())

##!! Listar citas por fecha y tipo
# url = 'http://127.0.0.1:8000/citas/por-fecha-tipo?fecha=2023-10-20&id_tipo=1'

# response = requests.get(url)
# print(response.json())

##!! Listar citas por tipo
# url = 'http://127.0.0.1:8000/citas/por-tipo?id_tipo=2'

# response = requests.get(url)
# print(response.json())

##!! Listar citas por colaborador
# url = 'http://127.0.0.1:8000/citas/por-colaborador?id_colaborador=1'

# response = requests.get(url)
# print(response.json())

###!! Listar citas por cliente
# url = 'http://127.0.0.1:8000/citas/por-cliente?id_cliente=10023765'

# response = requests.get(url)
# print(response.json())


###!! Listar citas por mascota
# url = 'http://127.0.0.1:8000/citas/por-mascota?id_mascota=2'

# response = requests.get(url)
# print(response.json())

##!! Iniciar sesion 
# url = "http://127.0.0.1:8000/iniciar_sesion"
# data = {
# "id": 10023765,
# "clave": "asdfawerver"
# }

# response = requests.get(url, json=data)
# print(response.json())

##!! Listar citas disponibles por fecha y tipo
# url = "http://localhost:8000/citas/disponibles/2025-04-01/2"

# response = requests.get(url)
# print(response.json())

url = "http://localhost:8000/crear_estadia_guarderia"
data = {
"fecha_ingreso": "2025-04-01 14",
"fecha_recogida": "2025-04-02 14",
"id_mascota": 2,
"observaciones": "Darle un dulce todas las mañanas"
}
response = requests.post(url, json=data)
print(response.json())