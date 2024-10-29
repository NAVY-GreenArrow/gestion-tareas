const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost', // Cambia esto si tu base de datos está en otro lugar
    user: 'root', // Tu usuario de MySQL
    password: '', // Tu contraseña de MySQL
    database: 'gestion_tareas',
});

module.exports = pool.promise();