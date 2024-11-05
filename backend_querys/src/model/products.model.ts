import { Schema, model } from "mongoose";
import { IProduct } from "../interface/products.interface";


export const ProductSchema = new Schema<IProduct>({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export const ProductModel = model("Product", ProductSchema);