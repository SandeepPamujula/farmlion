import { Application,Request, Response } from 'express';
import { ProductRoutes } from './product';
export class Routes {
    public productRoutes: ProductRoutes = new ProductRoutes();

    public routes(app:Application): void {
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: "Welcome to the awesome api.. :)!!"
            });
        });
        this.productRoutes.routes(app);    
    }
}