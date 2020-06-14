import mongoose from "mongoose";

export type ProductDocument = mongoose.Document & {
    productName: String;
    productType:String;
};


const productSchema = new mongoose.Schema({
    productName: String,
    productType:String
} );

export const Product = mongoose.model<ProductDocument>("Product", productSchema);
