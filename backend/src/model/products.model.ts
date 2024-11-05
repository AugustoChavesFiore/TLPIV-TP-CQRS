import { Table, Column, Model, Default, PrimaryKey, DataType } from 'sequelize-typescript';
import { IProductCreate, IProduct } from "../interface/products.interface";

@Table({
    tableName: 'products',
    timestamps: true
})
export default class ProductModel extends Model<IProduct, IProductCreate> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID,
        field: "id"
    })
    declare id: string;
    @Column
    declare name: string;

    @Column
    declare price: number;

    @Column
    declare description: string;

    @Column
    declare quantity: number;
};