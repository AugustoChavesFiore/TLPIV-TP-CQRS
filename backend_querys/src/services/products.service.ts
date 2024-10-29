import { IProduct, IProductService } from "../interface/products.interface";
import { ProductModel } from "../model/products.model";
import { CustomError } from "../errors/custom.errors";
;

export class ProductsService implements IProductService {


    async getAllProducts() {

        const products = await ProductModel.find();
        if (!products) throw CustomError.NotFound("Products not found");
        return products;
    };

    async getProductById(id: string): Promise<IProduct> {

        const product = await ProductModel.findOne({ _id: id });
        if (!product) throw CustomError.NotFound("Product not found");
        return product;
    };

    async createProduct(product: IProduct): Promise<IProduct> {
        const newProduct = new ProductModel(product);
        await newProduct.save();
        return newProduct;

    };

    async updateProduct(id: string, product: IProduct): Promise<void> {
        const updatedProduct = await ProductModel.updateOne({ _id: id }, product);
        if (updatedProduct.modifiedCount === 0) throw CustomError.NotFound("Product not found");

    };

    async deleteProduct(id: string): Promise<void> {

        const deletedProduct = await ProductModel.deleteOne({ _id: id });
        if (deletedProduct.deletedCount === 0) throw CustomError.NotFound("Product not found");
    };
};