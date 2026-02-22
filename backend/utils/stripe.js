/**
 * Stripe Payment Utilities
 * Handles Stripe API interactions
 */

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create payment intent
export const createPaymentIntent = async (amount, currency = 'usd') => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
    });
    return paymentIntent;
  } catch (error) {
    throw new Error(`Stripe payment error: ${error.message}`);
  }
};

// Create checkout session
export const createCheckoutSession = async (items, customerId) => {
  try {
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      customer: customerId,
    });

    return session;
  } catch (error) {
    throw new Error(`Checkout session error: ${error.message}`);
  }
};

// Retrieve session
export const getCheckoutSession = async (sessionId) => {
  return stripe.checkout.sessions.retrieve(sessionId);
};

export default stripe;
