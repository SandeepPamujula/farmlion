import mongoose from "mongoose";

export  type CartItemDocument = mongoose.Document & {
    userId: string;
    productId: string;
    productName: string;
    productCost: number;
    quantity: number;
};

const cartItemSchema = new mongoose.Schema({
    userId:String,
    productId: String,
    productName: String,
    productCost: Number,
    quantity: Number,
});

export const CartItem = mongoose.model<CartItemDocument>("CartItem", cartItemSchema);
