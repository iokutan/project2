import {AllowNull, Column, DataType, HasOne, ForeignKey,
     Table, Unique, Default, PrimaryKey, IsUUID, BelongsTo} from 'sequelize-typescript';
import {BaseModel} from "./BaseModel";
import { ArtikelCategory } from './ArtikelCategory';

@Table
export class Artikel extends BaseModel<Artikel> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    artikel_id: string;

    @AllowNull(false)
    @Column
    title: string;

    @AllowNull(true)
    @Column
    body: string;

    @AllowNull(true)
    @Column
    image_url: string;

    @ForeignKey(() => ArtikelCategory)
    @Column
    category_id: string;

    @BelongsTo(() => ArtikelCategory)
    category: ArtikelCategory;
}