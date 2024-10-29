import amqp from 'amqplib';
import { enviroments } from './envs';

export class RabbitMQPublisher {
    private channel!: amqp.Channel;

    constructor(
    ) {
        this.connect();
    };

    private async connect() {
        const connection = await amqp.connect(enviroments.RABBITMQ_URL);
        console.log('RabbitMQ Publisher connected');
        this.channel = await connection.createChannel();
        await this.channel.assertExchange('product_exchange', 'topic', { durable: true });
    }

    async publish(eventType: string, data: any) {
        this.channel.publish(
            'product_exchange',
            eventType,
            Buffer.from(JSON.stringify(data))
        );
    }
}
