import {AllowNull, Column, DataType, HasOne, ForeignKey,BelongsTo,
     Table, HasMany, Default, PrimaryKey, IsUUID} from 'sequelize-typescript';
import {BaseModel} from "./BaseModel";
import { Order } from './Order';
import { User } from './User';
import { Product } from './Product';
import { ProductService } from './ProductService';

@Table
export class OrderItem extends BaseModel<OrderItem> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    orderItem_id: string;

    @AllowNull(true)
    @Column
    discount: number;

    @AllowNull(false)
    @Column
    piece: number;

    @ForeignKey(() => Order)
    @Column
    order_id: string;

    
    @ForeignKey(() => Product)
    @Column
    product_id: string;

    @BelongsTo(() => Product)
    product: Product;

    @ForeignKey(() => ProductService)
    @Column
    service_id: string;

    @BelongsTo(() => ProductService)
    service: ProductService;
}