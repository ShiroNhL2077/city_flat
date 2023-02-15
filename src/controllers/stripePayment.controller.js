import Stripe from 'stripe';
import User from '../models/user.model.js';
import Card from '../models/card.model.js';
import dotenv from 'dotenv';

/* Accessing .env content */
dotenv.config();

const stripe = new Stripe("sk_test_51MZauqFlpJLwRbEx8TSXStilf8bmdDyJaI1WEQsDA0dbswiKB8VDn838lRoYZcL0Ax8b1e6txTB6Hvlb4qgBl5hm00x6SpHhZW", {
  apiVersion: '2020-08-27',
});

export async function createCustomer(userId, email) {
  const customer = await stripe.customers.create({
    email: email,
    metadata: {
      userId: userId,
    },
  });
  return customer;
}

export async function addCard(customerId, token) {
  const card = await stripe.customers.createSource(customerId, {
    source: token,
  });
  const newCard = await Card.create({
    customerId: customerId,
    cardId: card.id,
  });
  return newCard;
}

export async function createPaymentIntent(amount, customerId, metadata) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    customer: customerId,
    metadata: metadata,
  });
  return paymentIntent;
}

export async function httpMakePayment(req, res, amount, customerId, reservationId) {
   // const cardId = req.body.cardId;
  
    try {
     // const card = await Card.findById(cardId);
      const customer = await stripe.customers.retrieve(customerId);
  
      const paymentIntent = await createPaymentIntent(
        amount * 100, // Stripe requires the amount to be in cents
        customer.id,
        {
          reservationId: reservationId,
        }
      );
  
      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error(error);
      //res.status(500).json({ error: error.message });
    }
  }