import { Router } from "express";
import { ProductController } from "../controller/products.controller";
import { ProductsService } from "../services/products.service";


export class ProductRoutes {

    static get routes(): Router {

        const router = Router();

        const controller = new ProductController(new ProductsService());

        router.get('/', controller.getAllProducts);
        router.get('/:id', controller.getProductById);

        return router;
    };

};