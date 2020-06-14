import { ProductDocument,Product } from '../models/Product';
import express ,{ Application ,Request,Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import axios from "axios";
import app from '../app';
export class ProductRoutes{
    private isAuthorized(req:Request,res:Response,next:NextFunction):void{
        console.log(req.headers.authorization);
        axios.get('http://localhost:5001/auth',{
            headers:{
                'Content-Type': 'application/json',
                'authorization':req.headers.authorization
            },
        })
        .then((response:any)=>{
            res.status(response.status);
            console.log(response.status);
            if(response.status == 200)
            next();
            /*else{
                response.text().then( (text:string) =>{
                    // do something with the text response
                    console.log(text); 
                    res.send(JSON.parse(text));
                  })
            }*/
            
        })
        .catch((err:any)=> console.log(err));
    }
    public routes(app:any):void{
        app.get('/products',this.isAuthorized,async (req:Request,res:Response)=>{
                await Product.find((err:any, existingProducts:ProductDocument) => {
                if (err) { return err; }
                if (existingProducts) {
                    console.log('productsList are '+JSON.stringify(existingProducts));
                    return res.send(existingProducts);
                }
            });
        });
        app.post('/product',async(req:Request,res:Response)=>{
            const product = new Product({
                productName: req.body.productName,
                productType:req.body.productType
            });
        
            await Product.find({ productName: req.body.productName }, (err:any, existingProducts:any) => {
                if (err) { return err; }
                if (existingProducts[0]) {
                    console.log(existingProducts);
                    return res.send({msg:"product already exists"});
                }
                product.save((err:any,product:ProductDocument) => {
                    console.log("product",product);
                    res.send({msg:"product saved"});
                });
                
            });
        });
    
    }
    
}