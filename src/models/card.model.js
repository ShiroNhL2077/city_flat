import mongoose from "mongoose";
const { Schema, model } = mongoose;



const CardSchema = new Schema({
    number: { type: String, required: false },
    exp_month: { type: String, required: false },
    exp_year: { type: String, required: false },
    cvc: { type: String, required: false }

   
    
    
},
{ timestamps: true }
);



export default model("Card", CardSchema);
