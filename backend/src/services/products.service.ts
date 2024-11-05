import { IProduct, IProductService } from "../interface/products.interface";
import ProductModel from "../model/products.model";
import { CustomError } from "../errors/custom.errors";
import { RabbitMQPublisher } from "../config/rabbitmq";


export class ProductsService implements IProductService {
    private rabbitMQPublisher: RabbitMQPublisher;

    constructor() {
        this.rabbitMQPublisher = new RabbitMQPublisher();
    };
    async createProduct(product: IProduct): Promise<IProduct> {
        const newProduct = await ProductModel.create(product);
        if (!newProduct) throw CustomError.BadRequest("Product not created");
        const productData = newProduct.toJSON();
        this.rabbitMQPublisher.publish('product.created', { _id: productData.id, ...productData });
        return {
            ...productData,
            _id: productData.id
        };

    };

    async updateProduct(id: string, product: IProduct): Promise<void> {
        const updatedProduct = await ProductModel.update(product, { where: { id } });
        console.log(updatedProduct);
        if (updatedProduct[0] === 0) throw CustomError.NotFound("Product not found");
        this.rabbitMQPublisher.publish('product.updated', { _id: id, product });
    };

    async deleteProduct(id: string): Promise<void> {
        const deletedProduct = await ProductModel.destroy({ where: { id } });
        if (deletedProduct === 0) throw CustomError.NotFound("Product not found");
        this.rabbitMQPublisher.publish('product.deleted', { _id: id });
    };
};