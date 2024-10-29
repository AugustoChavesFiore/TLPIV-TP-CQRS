import amqp from 'amqplib';

export class RabbitMQPublisher {
    private channel!: amqp.Channel;

    constructor(
    ) {
        this.connect();
    };

    private async connect() {
        const connection = await amqp.connect('amqp://user:password@localhost:5672');
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
