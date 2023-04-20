const { Stripe } = require('stripe');
const { buffer } = require('micro/types/src/lib');

const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let event;

    try {
      const rawBody = await buffer(req);
      const signature = req.header['stripe-signature'];

      event = stripe.webhooks.constructEvent(
        rawBody.toString(),
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.log(`Error message: ${error.message}`);
      res.status(400).send(`Webhook Error: ${error.message}`);
      return;
    }

    console.log('Success: ', event.id);

    if (event.type === 'checkout.session.completed') {
      console.log('Payment received!');
    } else {
      console.warn(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
