import { Request, Response } from "express";
import { CustomError } from "../errors/custom.errors";
import { IProductService } from "../interface/products.interface";

export class ProductController {
    constructor(private productService: IProductService) { }

    handleErrors(error: any, res: Response) {
        if (error.code === 11000) return res.status(409).json({ error: 'Resource already exists' });

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        } else {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    getAllProducts = async (req: Request, res: Response) => {
        try {
            const products = await this.productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            this.handleErrors(error, res);
        }
    };


    getProductById = async (req: Request, res: Response) => {
        try {
            const product = await this.productService.getProductById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            this.handleErrors(error, res);
        }
    };

};
