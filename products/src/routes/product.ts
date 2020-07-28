import { ProductDocument, Product } from "../models/Product";
import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import axios from "axios";
import app from "../app";
export class ProductRoutes {
  private isAuthorized(req: Request, res: Response, next: NextFunction): void {
    console.log(req.header("x-auth-token"));
    axios
      .get("http://localhost:5001/auth", {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": req.header("x-auth-token"),
        },
      })
      .then((response: any) => {
        res.status(response.status);
        console.log(response.status);
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
        await Product.find((err: any, existingProducts: ProductDocument) => {
          if (err) {
            return err;
          }
          if (existingProducts) {
            console.log("productsList are " + JSON.stringify(existingProducts));
            return res
              .header("Access-Control-Allow-Origin", "http://localhost:3000")
              .send(JSON.stringify(existingProducts));
          }
        });
      }
    );
    app.post("/product", async (req: Request, res: Response) => {
      console.log(req.body);
      const product = new Product({
        productName: req.body.productName,
        productType: req.body.variety,
        price: req.body.price,

        numberInStock: req.body.quantity,
        farmerName: req.body.farmerName,
        farmingType: req.body.farmingType,
        location: req.body.location,
      });
      console.log("product1", product);
      await Product.find(
        { productName: req.body.productName, farmerName: req.body.farmerName },
        (err: any, existingProducts: any) => {
          if (err) {
            res.send(err);
          }
          console.log(existingProducts);
          if (existingProducts[0]) {
            console.log(existingProducts);
            return res.send({ msg: "product already exists" });
          }
          console.log("product2", product);
          product.save((err: any) => {
            if (err) res.send(err);
            console.log("product", product);
            res.send(product);
          });
        }
      );
    });
    app.get(
      "/products/:id",
      this.isAuthorized,
      async (req: Request, res: Response) => {
        console.log(req.body);
        await Product.find(
          { _id: req.body.params.id },
          (err: any, existingProducts: ProductDocument) => {
            if (err) {
              return err;
            }
            if (existingProducts) {
              console.log("product is " + JSON.stringify(existingProducts));
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
