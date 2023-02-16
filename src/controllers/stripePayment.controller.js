import Stripe from 'stripe';
import User from '../models/user.model.js';
import Card from '../models/card.model.js';
import dotenv from 'dotenv';

/* Accessing .env content */
dotenv.config();

const stripe = new Stripe(process.env.SECRET_KEY, {
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

export async function createPaymentIntent(amount, customerId, paymentMethod, metadata) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      customer: customerId,
      payment_method: paymentMethod,
      metadata: metadata,
    });
    return paymentIntent;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}

export async function httpMakePayment(req, res, amount, customerId, reservationId,tokenid) {
 

  try {
    const paymentIntent = await createPaymentIntent(
      amount * 100, // Stripe requires the amount to be in cents
      customerId,
      String(tokenid),
      {
        reservationId: reservationId,
      }
    );

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      
    });
    return paymentIntent;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}


export async function createCheckoutSession(
  customerId,
  reservation,
  paymentAmount
) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer: customerId,
      client_reference_id: String(reservation._id),
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Reservation for ${reservation.appartment.name}`,
            },
            unit_amount: paymentAmount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });

    return session;
  } catch (error) {
    console.error(error.message);
    throw new Error(error);
  }
}