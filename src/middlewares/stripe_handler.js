import stripe from 'stripe';
import dotenv from 'dotenv';

/* Accessing .env content */
dotenv.config();

const stripeSecretKey ="sk_test_51MZauqFlpJLwRbEx8TSXStilf8bmdDyJaI1WEQsDA0dbswiKB8VDn838lRoYZcL0Ax8b1e6txTB6Hvlb4qgBl5hm00x6SpHhZW"
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripeClient = stripe(stripeSecretKey);

export const stripeWebhookMiddleware = (req, res, next) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripeClient.webhooks.constructEvent(
      req.rawBody,
      sig,
      stripeWebhookSecret
    );
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }

  req.stripeEvent = event;

  next();
};