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

    createProduct = async (req: Request, res: Response) => {
        try {
            const product = await this.productService.createProduct(req.body);
            res.status(201).json({ product });
        } catch (error) {
            this.handleErrors(error, res);
        }
    };


    updateProduct = async (req: Request, res: Response) => {
        try {
            await this.productService.updateProduct(req.params.id, req.body);
            res.status(204).json({ message: 'Product update initiated' });
        } catch (error) {
            this.handleErrors(error, res);
        }
    };

    deleteProduct = async (req: Request, res: Response) => {
        try {
            await this.productService.deleteProduct(req.params.id);
            res.status(204).json({ message: 'Product deletion initiated' });
        } catch (error) {
            this.handleErrors(error, res);
        }
    };
}
