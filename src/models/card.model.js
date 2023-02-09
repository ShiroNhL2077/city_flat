import mongoose from "mongoose";
const { Schema, model } = mongoose;



const CardSchema = new Schema({
    cardName:{
        type: String,
        required: false
    },
   

    cardNumber:{
        type: String,
        required: true,
        unique:true
    },
   
    cardExpYear: { type: String, 
        required: true},

        cardExpMonth: { type: String, 
            required: true},

    cardCVC: {type: String, 
        required:true,
        },

    customerId:{
        type: String,
        
        required:true
    },
   
    cardId: {
        type: String,
        
        required:true

    }

   
    
    
},
{ timestamps: true }
);



export default model("CustomerCards", CardSchema);
