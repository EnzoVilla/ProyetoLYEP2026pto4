const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      trim: true,
      unique: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'El email no es válido'],
    },
    passwordHash: {
      type: String,
      required: [true, 'La contraseña protegida es obligatoria'],
      select: false,
    },
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    sector: {
      type: String,
      required: [true, 'El sector es obligatorio'],
      enum: {
        values: ['Soporte', 'Gerencia'],
        message: 'El sector debe ser Soporte o Gerencia',
      },
    },
  },
  {
    timestamps: true,
  },
);

usuarioSchema.set('toJSON', {
  transform: (_documento, objeto) => {
    objeto.id = objeto._id.toString();

    delete objeto._id;
    delete objeto.__v;
    delete objeto.passwordHash;

    return objeto;
  },
});

module.exports = mongoose.model('Usuario', usuarioSchema);