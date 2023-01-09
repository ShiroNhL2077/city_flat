import mongoose from "mongoose";
const { Schema, model } = mongoose;

const serviceSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description: { type: String, required: true},

    pricePerNight: {
        type: Number,
        required: true
    },
  

})







export default model("Service", serviceSchema);