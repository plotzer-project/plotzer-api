import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const PaymentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    payment: {//pagamento parcelado, a vista
        type: String,
        required: true
    },
    situation: { //aprovado, negado, em analise
        type: String,
        default: "Em Análise"
    }
},
    { timestamps: true },
);

export default model("Payment", PaymentSchema);