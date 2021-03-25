import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { stripe } from "../../services/stripe";

export default async (req: NextApiRequest, response: NextApiResponse) => {
  if (req.method === "POST") {
    const session = await getSession({ req });

    const stripeCustumer = await stripe.customers.create({
      email: session.user.email,
      name: session.user.name,
    });

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustumer.id,
      payment_method_types: ["card"],
      // billing_address_collection: "required",
      line_items: [{ price: "price_1IYUAvEO66ZMERDoB5HQjclY", quantity: 1 }],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return response.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    response.setHeader("Allow", "POST");
    response.status(405).end("Method not allowed");
  }
};
