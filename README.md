Esto se ejecuta en un Windows Terminal, abren una nueva pestaña y eligen el WSL (Ubuntu)

1. Clonar el repositorio

´´´bash
# git clone <url_github>
$ git clone git@github.com:Yaidi/DB_PRISMA.git 
´´´

2. Instalar dependencias
´´´bash
cd DB_PRISMA # para entrar a la carpeta
npm install
´´´

3. Iniciar el servicio de base de datos
Asegurarse de que Docker Desktop en windows esté ejecutándose.

´´´bash
docker run -p 5432:5432 -d postgres:12.1
´´´
Verifiquen que se está ejecutando correctamente, ´docker ps´ debería dar dos líneas
de output.

4. Crear las bases de datos necesarias

- Abrir Azure data studio
- Presionar, ´Ctrl + Shift + P´
- Buscar "Installar Extensiones" / "Install extensions"
- Buscar PostgreSQL
- Click en "instalar/install"
- Reiniciar Azure Data Studio
- Clic derecho en el menú lateral de servidores.
- Elegir "New Query / Nueva consulta"
- En la parte superior hacer clic en "Connect / Conectar"
- Llenar así:
    - Connection Type: PostgreSQL
    - Server Name: localhost
    - Authentication Type: Password
    - Username: postgres
    - Password:
- Dar clic en Conectar / Connect
- Ingresar ´SELECT 1´ y F5 o clic en Run / Ejectuar para verificar que la conexión es correcta.
- Ingresar ´CREATE DATABASE gp_dev; CREATE DATABASE gp_test´

5. Crear la estructura de base de datos.
´´´bash
 npm run db:migrate && NODE_ENV=test npm run db:migrate
´´´

6. Ejectuar el servidor
´´´bash
npm run debug
´´´

En una ventana de navegador ir a [http://localhost:3000](http://localhost:3000)







