import {AllowNull, Column, DataType, HasOne, IsEmail, Table, BeforeCreate,
     Unique, Default, PrimaryKey, IsUUID, HasMany, BeforeUpdate} from 'sequelize-typescript';
import {AccessToken} from "./AccessToken";
import {Address} from "./Address";
import {BaseModel} from "./BaseModel";
import { Utils } from '../../utils';


@Table
export class User extends BaseModel<User> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    userId: string;

    @AllowNull(false)
    @Column
    firstName: string;

    @AllowNull(false)
    @Column
    lastName: string;

    @AllowNull(true)
    @Column
    phone: string;

    @AllowNull(false)
    @IsEmail
    @Unique
    @Column
    email: string;

    @AllowNull(false)
    @Column
    password: string;

    @AllowNull(false)
    @Column
    isActive: boolean;

    @HasOne(() => AccessToken)
    accessToken: AccessToken;

    @HasMany(() => Address)
    addresses: Address[];

    @BeforeCreate
    @BeforeUpdate
    static encryptPassword(instance: User) {
      instance.password = Utils.encryptPassword(instance.password);
    }
}
