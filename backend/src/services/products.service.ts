import { IProduct, IProductService } from "../interface/products.interface";
import { ProductModel } from "../model/products.model";
import { CustomError } from "../errors/custom.errors";
import { RabbitMQPublisher } from "../config/rabbitmq";


export class ProductsService implements IProductService {
    private rabbitMQPublisher: RabbitMQPublisher;

    constructor() {
        this.rabbitMQPublisher = new RabbitMQPublisher();
    };
    async createProduct(product: IProduct): Promise<IProduct> {
        const newProduct = new ProductModel(product);
        await newProduct.save();
        this.rabbitMQPublisher.publish('product.created', newProduct);
        return newProduct;

    };

    async updateProduct(id: string, product: IProduct): Promise<void> {
        const updatedProduct = await ProductModel.updateOne({ _id: id }, product);
        if (updatedProduct.modifiedCount === 0) throw CustomError.NotFound("Product not found");
        this.rabbitMQPublisher.publish('product.updated', { _id: id, product });
    };

    async deleteProduct(id: string): Promise<void> {
        const deletedProduct = await ProductModel.deleteOne({ _id: id });
        if (deletedProduct.deletedCount === 0) throw CustomError.NotFound("Product not found");
        this.rabbitMQPublisher.publish('product.deleted', { _id: id });
    };
};