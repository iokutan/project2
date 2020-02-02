import {AllowNull, Column, DataType, HasOne, ForeignKey,BelongsTo,
    Table, Unique, Default, PrimaryKey, IsUUID} from 'sequelize-typescript';
import {BaseModel} from "./BaseModel";
import {User} from "./User";
import { Order } from './Order';

@Table
export class Address extends BaseModel<Address> {

   @IsUUID(4)
   @PrimaryKey
   @Default(DataType.UUIDV4)
   @Column(DataType.UUID)
   address_id: string;

   @AllowNull(false)
   @Column
   street: string;

   @AllowNull(false)
   @Column
   city: string;

   @AllowNull(false)
   @Column
   country: string;

   @AllowNull(false)
   @Column
   zip: number;

   @ForeignKey(() => User)
   @Column
   userId: string;

   @BelongsTo(() => User)
   addresses: User;
}