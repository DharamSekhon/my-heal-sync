import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import Product from "../models/ProductSchema.js";

export const updateProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const updateProduct = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "successfully updated",
      data: updateProduct,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to updated" });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    await Product.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Product Successfully Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to delete" });
  }
};

export const getSingleProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);

    res
      .status(200)
      .json({ success: true, message: "Product found", data: product });
  } catch (err) {
    res.status(404).json({ success: false, message: "no product found" });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const { query } = req.query;
    let product;

    if (query) {
      product = await Product.find({
        $or: [{ title: { $regex: query, $options: "i" } }],
      });
    } else {
      product = await Product.find();
    }

    res
      .status(200)
      .json({ success: true, message: "product found", data: product });
  } catch (err) {
    res.status(404).json({ success: false, message: "not found" });
  }
};

export const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();

    res.status(200).json({
      success: true,
      message: "created",
      data: savedProduct,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
