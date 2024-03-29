const { Stripe } = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = JSON.parse(req.body);
    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: data ?? [],
        success_url: `${req.headers.origin}/payment-success?session_id={CHECKOUT_SEESION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
      });

      res.status(200).json(session);
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
