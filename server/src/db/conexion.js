const mongoose = require('mongoose');
const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const conectarDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('Falta configurar MONGODB_URI en .env');
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Conexión a MongoDB Atlas establecida');
};

module.exports = conectarDB;