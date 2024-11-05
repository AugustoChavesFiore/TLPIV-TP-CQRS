
import 'dotenv/config';


export const enviroments = {
    PORT: +process.env.PORT!,
    DB: {
        database: process.env.DB_NAME!,
        username: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        host: process.env.DB_HOST!,
        dialect: process.env.DB_DIALECT! as 'mysql' | 'mariadb' | 'postgres' | 'mssql'
    },
    RABBITMQ_URL: process.env.RABBITMQ_URL!
} as const; 