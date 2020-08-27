import mongoose from "mongoose";

export type ProductDocument = mongoose.Document & {
  productName: String;
  productType: String;
  numberInStock: Number;
  price: Number;
  farmerMobileNum: String;
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
  farmerMobileNum: String,
});

export const Product = mongoose.model<ProductDocument>(
  "Product",
  productSchema
);
