import mongoose from 'mongoose';
const { Schema, model, types } = mongoose;

const MemberSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: String,
  email: String,
  photo: String,
  position: {
    type: String,
    default: "Funcionário"
  },
  reputation: {
    type: Number,
    default: 100
  },
  team_accepted: {
    type: Boolean,
    default: false
  },
  member_accepted: {
    type: Boolean,
    default: false
  }
})

const TeamSchema = new Schema({
  cnpj: {
    type: String
  },
  team_name: {
    type: String,
    required: true,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    unique: true,
    ref: "User",
    required: true
  },
  plan: String,
  members: Array(MemberSchema)
},
{ timestamps: true },
);

export default model("Team", TeamSchema);