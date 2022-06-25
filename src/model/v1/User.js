import mongoose from 'mongoose';
const { Schema, model, types } = mongoose;

const UserSchema = new Schema({
  user: {
      type: String,
      required: true,
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: String,
  team: String, /**tenho que lembrar de converter dps de objectid para string! */
  plan: {
    type: String,
    default: "Gratuito"
  }
});

export default model("User", UserSchema);