import {AllowNull, Column, DataType, BelongsTo, ForeignKey, HasMany, Table, Unique, Default, PrimaryKey, IsUUID} from 'sequelize-typescript';
import {Product} from "./Product";
import {ProductCategory} from "./ProductCategory";
import {BaseModel} from "./BaseModel";


@Table
export class ProductModel extends BaseModel<ProductModel> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    model_id: string;

    @AllowNull(false)
    @Column
    model_name: string;

    @AllowNull(true)
    @Column
    imageUrl: string;

    @HasMany(() => Product)
    product: Product[];

    @ForeignKey(() => ProductCategory)
    @Column
    category_id: string;

    @BelongsTo(() => ProductCategory)
    category: ProductCategory;
}