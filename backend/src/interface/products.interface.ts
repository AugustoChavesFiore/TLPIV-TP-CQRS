import { Optional } from "sequelize";


export interface IProduct {
    id?: string;
    _id?: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
};


export interface IProductService {
    createProduct: (product: IProduct) => Promise<IProduct>;
    updateProduct: (id: string, product: IProduct) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
};

export interface IProductCreate extends Optional<IProduct, 'id'> { };