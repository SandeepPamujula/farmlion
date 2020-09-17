import { Request, Response, NextFunction } from "express";

import { CartItemDocument, CartItem } from "../models/CartItem";

export const addCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cartItem = new CartItem({
    userId: req.body.userId,
    productId: req.body.productId,
    productName: req.body.productName,
    productCost: req.body.productCost,
    quantity: req.body.quantity,
  });
  cartItem.save((err: any) => {
    if (err) {
      return next(err);
    }
    res.header("Access-Control-Allow-Origin", "http://localhost:3000").send({
      cartId: cartItem._id,
    });
  });
};
export const getCartItems = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  CartItem.find({ userId: req.params.userId }, (err: any, existingItems) => {
    if (err) {
      return next(err);
    }
    res
      .header("Access-Control-Allow-Origin", "http://localhost:3000")
      .send(JSON.stringify(existingItems));
  });
};

export const updateCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await CartItem.findOneAndUpdate(
    { productId: req.body.productId, userId: req.body.userId },
    { quantity: req.body.quantity },
    {
      new: true,
    }
  );
  if (result != null) {
    res
      .header("Access-Control-Allow-Origin", "http://localhost:3000")
      .send({ cartId: result._id });
  }
};

export const deleteCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await CartItem.findOneAndDelete({
    productId: req.body.productId,
    userId: req.body.userId,
  });
  res
    .header("Access-Control-Allow-Origin", "http://localhost:3000")
    .send(result);
};
