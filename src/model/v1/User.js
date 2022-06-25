import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: {
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