import {AllowNull, Column, DataType, HasOne, HasMany, Table, Unique, Default, PrimaryKey, IsUUID} from 'sequelize-typescript';
import {BaseModel} from "./BaseModel";
import {ProductModel} from "./ProductModel";


@Table
export class ProductCategory extends BaseModel<ProductCategory> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    category_id: string;

    @AllowNull(false)
    @Column
    category_name: string;

    @AllowNull(true)
    @Column
    imageUrl: string;

    @HasMany(() => ProductModel)
    models: ProductModel[];
}