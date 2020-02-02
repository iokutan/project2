import {AllowNull, Column, DataType, HasOne, ForeignKey, BelongsTo,
     Table, HasMany, Default, PrimaryKey, IsUUID} from 'sequelize-typescript';
import {BaseModel} from "./BaseModel";
import { Address } from './Address';
import { OrderItem } from './OrderItem';
import { User } from './User';
import { AddressController } from 'controllers/AddressController';

@Table
export class Order extends BaseModel<Order> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    order_id: string;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    discount: number;

    @AllowNull(false)
    @Column
    total: number;

    @AllowNull(true)
    @Column
    due_date: number;

    @AllowNull(false)
    @Column
    status: number;

    @HasMany(() => OrderItem)
    order_items: OrderItem[];

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => User)
    @Column
    buyer_id: string;

    @ForeignKey(() => Address)
    @Column
    delivery_address: string;

    @ForeignKey(() => Address)
    @Column
    payment_address: string;
 
}