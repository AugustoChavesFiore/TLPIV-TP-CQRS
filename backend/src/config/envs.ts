
import 'dotenv/config';


export const enviroments = {
    PORT: +process.env.PORT!,
    MONGO_URL: process.env.MONGO_URL!,
    DB_NAME: process.env.DB_NAME!,
    RABBITMQ_URL: process.env.RABBITMQ_URL!
} as const; 