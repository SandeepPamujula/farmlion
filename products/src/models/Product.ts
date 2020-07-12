import mongoose from "mongoose";

export type ProductDocument = mongoose.Document & {
  productName: String;
  productType: String;
  description: String;
  numberInStock: Number;
  price: Number;
};

const productSchema = new mongoose.Schema({
  productName: String,
  productType: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  numberInStock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Product = mongoose.model<ProductDocument>(
  "Product",
  productSchema
);
