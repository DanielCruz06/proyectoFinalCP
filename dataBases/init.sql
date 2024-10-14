--Crear usuario para la aplicación
CREATE USER tienda_user WITH PASSWORD 'tienda_password';
/

--Otorgar permisos
ALTER USER tienda_user CREATEDB;
/

--Crear base de datos para los microservicios
CREATE DATABASE products_db;
CREATE DATABASE orders_db;
CREATE DATABASE users_db;
/

--Otorgar persmisos sobre las bases de datos al usuario tienda_user:
GRANT ALL PRIVILEGES ON DATABASE products_db TO tienda_user;
GRANT ALL PRIVILEGES ON DATABASE orders_db TO tienda_user;
GRANT ALL PRIVILEGES ON DATABASE users_db TO tienda_user;

