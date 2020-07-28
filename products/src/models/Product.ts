import mongoose from "mongoose";

export type ProductDocument = mongoose.Document & {
  productName: String;
  productType: String;
  numberInStock: Number;
  price: Number;
  farmerName: String;
  farmingType: string;
  location: String;
};

const productSchema = new mongoose.Schema({
  productName: String,
  productType: {
    type: String,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  farmerName: {
    type: String,
    required: true,
  },
  farmingType: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

export const Product = mongoose.model<ProductDocument>(
  "Product",
  productSchema
);
