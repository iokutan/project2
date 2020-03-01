import {AllowNull, Column, DataType, HasOne, ForeignKey,
     Table, Unique, Default, PrimaryKey, IsUUID, BelongsTo} from 'sequelize-typescript';
import {BaseModel} from "./BaseModel";
import { DataTypes, Deferrable } from 'sequelize';
import { ProductModel } from './ProductModel';

@Table
export class Product extends BaseModel<Product> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    product_id: string;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(true)
    @Column
    discount: number;

    @AllowNull(true)
    @Column
    available: boolean;

    @AllowNull(true)
    @Column
    price: number;

    @AllowNull(true)
    @Column
    size: number;

    @AllowNull(true)
    @Column
    color: string;

    @AllowNull(true)
    @Column
    imageUrl: string;

    @ForeignKey(() => ProductModel)
    @Column
    category_id: string;

    @BelongsTo(() => ProductModel)
    model: ProductModel;
}