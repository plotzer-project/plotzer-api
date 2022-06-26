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
  plan: {
    type: String,
    default: "Free"
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  password: String,
  photo: String
});

export default model("User", UserSchema);