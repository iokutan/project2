import {AllowNull, Column, DataType, BelongsTo, ForeignKey, HasMany, Table, Unique, Default, PrimaryKey, IsUUID} from 'sequelize-typescript';
import {Product} from "./Product";
import {ProductCategory} from "./ProductCategory";
import {BaseModel} from "./BaseModel";


@Table
export class ProductService extends BaseModel<ProductService> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    service_id: string;

    @AllowNull(false)
    @Column
    service_name: string;

    @AllowNull(false)
    @Column
    price: number;

    @AllowNull(true)
    @Column
    discount: number;

    @ForeignKey(() => Product)
    @Column
    product_id: string;

    @BelongsTo(() => Product)
    product: Product;
}