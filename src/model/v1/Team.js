import mongoose from 'mongoose';
const { Schema, model, types } = mongoose;

const TeamSchema = new Schema({
  cnpj: {
    type: String
  },
  team_name: {
      type: String,
      required: true,
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: String,
  ownerId: String, /**tenho que lembrar de converter dps de objectid para string! */
  plan: String
});

export default model("Team", TeamSchema);