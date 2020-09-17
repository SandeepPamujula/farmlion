import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { ProductDocument, Product } from "../models/Product";
import { FarmerDocument, Farmer } from "../models/Farmer";
import app from "../app";
//import { try } from "bluebird";
export class ProductRoutes {
  private isAuthorized(req: Request, res: Response, next: NextFunction): void {
    axios
      .get("http://localhost:5001/auth", {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": req.header("x-auth-token"),
        },
      })
      .then((response: any) => {
        res.status(response.status);
        if (response.status == 200) next();
        /*else{
                response.text().then( (text:string) =>{
                    // do something with the text response
                    console.log(text); 
                    res.send(JSON.parse(text));
                  })
            }*/
      })
      .catch((err: any) => console.log(err));
  }
  public routes(app: any): void {
    app.get(
      "/products",
      this.isAuthorized,
      async (req: Request, res: Response) => {
        try {
          const products = await Product.aggregate([
            {
              $lookup: {
                from: Farmer.collection.name,
                localField: "farmerMobileNum",
                foreignField: "mobileNum",
                as: "FarmerData",
              },
            },
          ]).exec();
          if (products) {
            return res
              .header("Access-Control-Allow-Origin", "http://localhost:3000")
              .send(products);
          }
        } catch (e) {
          console.log("exception", e);
        }
      }
    );
    app.post("/product", async (req: Request, res: Response) => {
      const product = new Product({
        productName: req.body.productName,
        productType: req.body.variety,
        price: req.body.price,
        numberInStock: req.body.quantity,
        farmerMobileNum: req.body.farmerMobileNum,
      });

      await Product.find(
        {
          productName: req.body.productName,
          farmerMobileNum: req.body.farmerMobileNum,
        },
        (err: any, existingProducts: any) => {
          if (err) {
            res.send(err);
          }
          if (existingProducts[0]) {
            return res.send({ msg: "product already exists" });
          }
          product.save((err: any) => {
            if (err) res.send(err);
            res.send(product);
          });
        }
      );
    });
    app.get(
      "/products/:id",
      this.isAuthorized,
      async (req: Request, res: Response) => {
        await Product.find(
          { _id: req.body.params.id },
          (err: any, existingProducts: ProductDocument) => {
            if (err) {
              return err;
            }
            if (existingProducts) {
              return res
                .header("Access-Control-Allow-Origin", "http://localhost:3000")
                .send(JSON.stringify(existingProducts));
            }
          }
        );
      }
    );
  }
}
