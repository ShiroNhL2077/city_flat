import express from 'express';

import Stripe from 'stripe';

const stripe = Stripe(process.env.SECRET_KEY);

const stripeRouter = express.Router();


stripeRouter
.route("/payment")
.post((req,res)=>{
 
    // Moreover you can take more details from user
    // like Address, Name, etc from form
    stripe.customers.create({
        email:"elyes.kabous@gmail.com",
        source:"fzzkgklgllrlgr",
        name: 'Gourav Hammad',
        address: {
            line1: 'TC 9/4 Old MES colony',
            postal_code: '452331',
            city: 'Indore',
            state: 'Madhya Pradesh',
            country: 'India',
        }
    })
    .then((customer) => {
 
        return stripe.charges.create({
            amount: 2500,     // Charging Rs 25
            description: 'Web Development Product',
            currency: 'INR',
            customer: customer.id
        });
    })
    .then((charge) => {
        res.send("Success")  // If no error occurs
    })
    .catch((err) => {
        res.send(err)       // If some error occurs
    });
})

export {stripeRouter}