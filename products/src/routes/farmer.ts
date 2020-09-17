import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { ProductDocument, Product } from "../models/Product";
import { FarmerDocument, Farmer } from "../models/Farmer";
import app from "../app";
export class FarmerRoutes {
  public routes(app: any): void {
    app.get("/farmers", async (req: Request, res: Response) => {
      await Farmer.find((err: any, existingFarmers: FarmerDocument) => {
        if (err) {
          return err;
        }
        if (existingFarmers) {
          console.log("existingFarmers are " + JSON.stringify(existingFarmers));
          return res
            .header("Access-Control-Allow-Origin", "http://localhost:3000")
            .send(existingFarmers);
        }
      });
    });
    app.post("/farmer", async (req: Request, res: Response) => {
      console.log(req.body);
      const farmer = new Farmer({
        farmerName: req.body.farmerName,
        farmingType: req.body.farmingType,
        mobileNum: req.body.farmerMobileNum,
        location: req.body.location,
      });
      await Farmer.find(
        { mobileNum: req.body.farmerMobileNum },
        (err: any, existingFarmer: any) => {
          if (err) {
            res.send(err);
          }
          console.log(existingFarmer);
          if (existingFarmer[0]) {
            console.log(existingFarmer);
            return res.send({ msg: "Farmer already exists" });
          }
          farmer.save((err: any) => {
            if (err) res.send(err);
            console.log("farmer", farmer);
            res.send(farmer);
          });
        }
      );
    });
    app.get(
      "/farmers/:farmerMobileNum",
      async (req: Request, res: Response) => {
        console.log(req.body);
        await Product.find(
          { mobileNum: req.body.params.farmerMobileNum },
          (err: any, existingFarmer: FarmerDocument) => {
            if (err) {
              return err;
            }
            if (existingFarmer) {
              console.log(
                "existingFarmer is " + JSON.stringify(existingFarmer)
              );
              return res
                .header("Access-Control-Allow-Origin", "http://localhost:3000")
                .send(JSON.stringify(existingFarmer));
            }
          }
        );
      }
    );
  }
}
