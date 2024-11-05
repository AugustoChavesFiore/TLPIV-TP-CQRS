import amqp from 'amqplib';
import { ProductsService } from '../services/products.service';
import { enviroments } from '../config/envs';

export class RabbitMQSubscriber {
    private channel!: amqp.Channel;

    constructor(
        private productService: ProductsService = new ProductsService(),
    ) {
        this.connect();
    }

    private async connect() {
        const connection = await amqp.connect(enviroments.RABBITMQ_URL);
        console.log('Connected to RabbitMQ');
        this.channel = await connection.createChannel();
        await this.channel.assertExchange('product_exchange', 'topic', { durable: true });
        const queue = await this.channel.assertQueue('', { exclusive: true });

        this.channel.bindQueue(queue.queue, 'product_exchange', 'product.*');
        this.channel.consume(queue.queue, (msg) => {
            if (msg) {
                const content = JSON.parse(msg.content.toString());
                this.handleEvent(msg.fields.routingKey, content);
            }
        });
    }

    private async handleEvent(eventType: string, data: any) {
        switch (eventType) {
            case 'product.created':
                console.log(data);
                await this.productService.createProduct(data);
                break;
            case 'product.updated':
                await this.productService.updateProduct(data._id, data.product);
                break;
            case 'product.deleted':
                await this.productService.deleteProduct(data._id);
                break;
        }
    }
}
