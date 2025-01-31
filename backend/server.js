const express = require('express');
const cors = require('cors');
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes');
const path = require('path');

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Authorization']
}));



// Servir archivos estáticos desde 'uploads'
app.use('/uploads', express.static('/mnt/images'));

// Usar las rutas
app.use('/api/usuarios', usuarioRoutes);

// Iniciar el servidor
app.listen(3000, '0.0.0.0', () => {
  console.log("servidor corriendo");
});
