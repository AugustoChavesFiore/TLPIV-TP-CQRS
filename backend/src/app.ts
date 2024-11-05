import { Server } from "./server";
import { AppRouter } from "./router/AppRouter";
import { enviroments } from './config/envs'
import { DB } from "./config/DB.config";
import { RabbitMQPublisher } from "./config/rabbitmq";




(
    async () => {
        const db = DB.getInstance(enviroments.DB);

        db.sync();
        const server = new Server({
            port: enviroments.PORT,
            routes: AppRouter.routes
        });
        RabbitMQPublisher
        await db.connect();
        server.start();

    }
)()