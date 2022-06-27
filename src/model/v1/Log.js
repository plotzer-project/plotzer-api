import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const LogSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    id_user: {
        type: Schema.Types.ObjectId,
        ref: "User" //quem fez
    },
    id_team: {
        type: Schema.Types.ObjectId,
        ref: "Team" //quem recebeu
    }},
    { timestamps: true },
);

export default model("Log", LogSchema);