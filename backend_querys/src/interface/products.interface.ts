

export interface IProduct {
    id: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
};


export interface IProductService {
    getAllProducts: () => Promise<IProduct[]>;
    getProductById: (id: string) => Promise<IProduct>;
    createProduct: (product: IProduct) => Promise<IProduct>;
    updateProduct: (id: string, product: IProduct) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
};

