const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'El email no es válido'],
    },
    username: {
      type: String,
      trim: true,
      default: '',
    },
    name: {
      firstname: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
      },
      lastname: {
        type: String,
        trim: true,
        default: '',
      },
    },
    address: {
      city: {
        type: String,
        required: [true, 'La ciudad es obligatoria'],
        trim: true,
      },
      street: {
        type: String,
        trim: true,
        default: '',
      },
      number: {
        type: String,
        trim: true,
        default: '',
      },
      zipcode: {
        type: String,
        trim: true,
        default: '',
      },
    },
    phone: {
      type: String,
      required: [true, 'El teléfono es obligatorio'],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

clienteSchema.set('toJSON', {
  transform: (_documento, objeto) => {
    objeto.id = objeto._id.toString();

    delete objeto._id;
    delete objeto.__v;

    return objeto;
  },
});

module.exports = mongoose.model('Cliente', clienteSchema);