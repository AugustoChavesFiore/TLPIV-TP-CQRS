import { Sequelize } from "sequelize-typescript";

interface IConfiguration {
    database: string;
    username: string;
    password: string;
    host: string;
    dialect: 'mysql' | 'mariadb' | 'postgres' | 'mssql';
}
export class DB {
    private static instance: DB;
    private sequelize: Sequelize;

    private constructor({ database, username, password, host, dialect }: IConfiguration) {
        this.sequelize = new Sequelize(database, username, password, {
            host: host,
            dialect: dialect,
            models: [__dirname + '/../model/*.model.*']
        });
    }

    public static getInstance(config: IConfiguration): DB {
        if (!DB.instance) {
            DB.instance = new DB(config);
        }
        return DB.instance;
    }

    public static getSequelizeInstance(): Sequelize {
        if (!DB.instance) {
            throw new Error('Database instance not initialized. Call getInstance(config) first.');
        }
        return DB.instance.sequelize;
    }

    public async connect() {
        try {
            await this.sequelize.authenticate();
            console.log('Database connected');
        } catch (error) {
            console.error('Database connection failed', error);
        }
    }

    public async sync() {
        try {
            await this.sequelize.sync();
            console.log('Database synchronized');
        } catch (error) {
            console.error('Database synchronization failed', error);
        }
    }

    public async close() {
        try {
            await this.sequelize.close();
            console.log('Database connection closed');
        } catch (error) {
            console.error('Database connection closing failed', error);
        }
    }

    public getSequelize(): Sequelize {
        return this.sequelize;
    }
}