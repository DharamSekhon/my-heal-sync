import User from "../models/UserSchema.js";
import Product from "../models/ProductSchema.js";
import ProductBooking from "../models/ProductBookingSchema.js";
import Stripe from "stripe";

export const getProductCheckoutSession = async (req, res) => {
  try {
    //get currently booked doctor
    const product = await Product.findById(req.params.productid);
    const user = await User.findById(req.userId);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);




    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      success_url: `https://heal-sync-frontend.vercel.app/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/products/${product.id}`,
      customer_email: user.email,
      // billing_address_collection: "required",
      client_reference_id: req.params.productId,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: product.price * 100,
            product_data: {
              name: product.title, // Include the name of the product
              description: product.description,
              // images: [product.photo],
            },
          },
          quantity: 1,
        },
      ],
    });

    //create new booking
    const booking = new ProductBooking({
      product: product._id,
      productname: product.title,
      user: user._id,
      price: product.price,
      session: session.id,
    });

    await booking.save();

    res
      .status(200)
      .json({ success: true, message: "Successfully paid", session });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error creating checkout session" });
  }
};
