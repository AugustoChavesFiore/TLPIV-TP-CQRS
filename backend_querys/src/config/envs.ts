
import 'dotenv/config';


export const enviroments = {
    PORT: +process.env.PORT_QUERY!,
    MONGO_URL: process.env.MONGO_URL_QUERY!,
    DB_NAME: process.env.DB_NAME_QUERY!,
    RABBITMQ_URL: process.env.RABBITMQ_URL!
} as const; 