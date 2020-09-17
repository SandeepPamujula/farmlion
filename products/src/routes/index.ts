import { Application, Request, Response } from "express";
import { ProductRoutes } from "./product";
import { FarmerRoutes } from "./farmer";
export class Routes {
  public productRoutes: ProductRoutes = new ProductRoutes();
  public farmerRoutes: FarmerRoutes = new FarmerRoutes();

  public routes(app: Application): void {
    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({
        message: "Welcome to the awesome api.. :)!!",
      });
    });
    this.productRoutes.routes(app);
    this.farmerRoutes.routes(app);
  }
}
