Los cambios que se realizaron fueron los siguientes.
- Cada servicio se encuentra dockerizado, con un puerto configurado, por lo tanto, si se tiene instalado
docker, solo basta con correr los siguientes comandos.

docker-compose build    #Para construir la imagen con el Dockerfile
docker-compose up -d    #Para correr el contenedor

Vale la pena aclarar que se corren ambos comandos parado en la ruta de cada servicio, por ejemplo:
CliVet\Servicios\usuario_api sería la ruta donde se correrían para ejecutar el contenedor de gestión
de usuarios

Al correr los dos comandos en cada una de las rutas de cada servicio inmediatamente quedaran los servicios
disponibles. 
La estructura de cada servicio es una carpeta principal dentro de la cual se encuentran el main.py desde
donde se cargan las rutas de la API y la lógica de los métodos, el archivo .env con la información de la
base de datos y los archivos de docker necesarios para generar el contenedor junto con el requirements.txt
para instalar las dependencias. Además de esto se encuentra la carpeta interna de la API con la carpeta rutas
donde se encuentra guardada la lógica y el archivo database.py desde el cual se inicializa la conexión con la BD.
Si se quieren agregar métodos adicionales, solo deben agregarse dentro de la carpeta routes y añadir dentro del main.py
estas rutas creadas.

Direcciones:    4000 -> Admin_API
                4001 -> Mascotas_API
                4002 -> Usuarios_API