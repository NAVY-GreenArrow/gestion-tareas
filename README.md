#INSTALACION

1- Para instalar el gestor de tarea se debe ejecutar el codigo sql que se encuentra en la raiz del proyecto

2- Configurar las credenciales de la api para acceder a la base de datos APIs-Service/plugins/db.js

3- en la raiz tanto de la web como de la api hay que ejecutar npm install para los paquetes

#EJECUCION

1- ir a la raiz del proyecto y ejecuta 'npm run dev' para que vite.js levante el servicio de la web

2- acceder a la carpeta APIs-Service/ y dentro abrir la terminal y ejecutar node index.js

#VERIFICACION

- acceder mediante el navegador a http://localhost:5173/

#CARACTERISTICAS

-Integracion de temas con MUI, tiene tema claro y oscuro

-Identificacion de usuario mediante uuid (en las pruebas se pueden abrir varios navegadores y cada uno tendra y gestionara su propia lista de tareas)

#MEJORAS

-se puede agregar un sistema de verificacion mas robusto a la api para modificar anuncios que no solamente sea por id sino que verifique si el uuid es el propietario de esa tarea.

-creacion de cookies seguras para evitar ataques de Cross-Site Request Forgery (CSRF)

-abandonar las cookies y usar la base de datos local del navegador para mayor persistencia de datos y si tiene los permisos adecuados garantizar que los datos no sean borrados

-encriptar la comunicacion entre la api y el frontend

-usar JWT para autenticar usuarios