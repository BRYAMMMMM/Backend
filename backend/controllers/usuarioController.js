const fs = require('fs');
const path = require('path');
const { Pool } = require('pg'); // Usaremos pg para interactuar con PostgreSQL

// Configura la conexión con PostgreSQL
const pool = new Pool({
  user: 'postgres', // Cambia si es necesario
  host: '192.168.26.146',
  database: 'adminuser_db',
  password: '5432', // Cambia si es necesario
  port: 5432,
});

exports.getUsuarios = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios;")
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener usuarios: ", error);
    res.status(500).json({ message: "error al obtener los usuarios: ", error});
   }
};

// Crear un usuario y guardar el archivo
exports.createUsuario = async (req, res) => {
  try {
    const { nombre, apellido, direccion } = req.body;
    const filePath = req.file ? req.file.path : null; // Ruta del archivo en 'uploads'

    // Guardar datos en PostgreSQL
    const query = `
      INSERT INTO usuarios (nombre, apellido, direccion, file_path)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [nombre, apellido, direccion, filePath];
    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'Usuario creado con éxito',
      usuario: result.rows[0],
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error al crear usuario', error });
  }
};

// Descargar un archivo asociado a un usuario
exports.downloadFile = async (req, res) => {
  try {
    const { id } = req.params;

    // Obtener la ruta del archivo desde PostgreSQL
    const query = 'SELECT file_path FROM usuarios WHERE id = $1;';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0 || !result.rows[0].file_path) {
      return res.status(404).json({ message: 'Archivo no encontrado' });
    }

    const filePath = result.rows[0].file_path;
    res.download(path.resolve(filePath)); // Enviar archivo al cliente
  } catch (error) {
    console.error('Error al descargar archivo:', error);
    res.status(500).json({ message: 'Error al descargar archivo', error });
  }
};
