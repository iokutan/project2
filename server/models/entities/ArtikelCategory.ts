import {AllowNull, Column, DataType, HasOne, HasMany, Table, Unique, Default, PrimaryKey, IsUUID} from 'sequelize-typescript';
import {BaseModel} from "./BaseModel";
import { Artikel } from './Artikel';


@Table
export class ArtikelCategory extends BaseModel<ArtikelCategory> {

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

    @HasMany(() => Artikel)
    artikels: Artikel[];
}