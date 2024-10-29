import { Server } from "./server";
import { AppRouter } from "./router/AppRouter";
import { enviroments } from './config/envs'
import { DB } from "./config/DB.config";
import { RabbitMQSubscriber } from "./events/ProductEventListener";




(
    async () => {
        const db = new DB({
            mongoUrl: enviroments.MONGO_URL!,
            dbName: enviroments.DB_NAME!
        });
        const server = new Server({
            port: enviroments.PORT,
            routes: AppRouter.routes
        });

        const rabbitMQSubscriber = new RabbitMQSubscriber();

        await db.connect();

        server.start();


    }
)()