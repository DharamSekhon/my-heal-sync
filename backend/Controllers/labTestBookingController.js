import User from "../models/UserSchema.js";
import LabTest from "../models/LabTestSchema.js";
import TestBooking from "../models/TestBookingSchema.js";
import Stripe from "stripe";

export const getLabCheckoutSession = async (req, res) => {
  try {
    console.log("User ID:", req.userId);
    
    const labTest = await LabTest.findById(req.params.labTestid);
    
    const user = await User.findById(req.userId);
    

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      success_url: `https://heal-sync-frontend.vercel.app/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/labs/${labTest.id}`,
      customer_email: user.email,
      //   billing_address_collection: "required",

      client_reference_id: req.params.labTestid,
      line_items: [
        {
          price_data: {
            currency: "usd",

            unit_amount: labTest.price * 100,
            product_data: {
              name: labTest.name,
              description: labTest.bio,
            },
          },
          quantity: 1,
        },
      ],
    });

    //create new booking
    const booking = new TestBooking({
      labTest: labTest._id,
      testname: labTest.name,
      user: user._id,
      price: labTest.price,
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
