import { City } from "src/modules/city/entities/city.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('country')
export class Country {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    country_name: string;

    @Column({
        type: 'char',
        length: 2
    })
    country_code: string;

    @Column({
        type: 'char',
        length: 3
    })
    currency_code: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 7,
        nullable: false
    })
    latitude: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 7,
        nullable: false
    })
    longitude: number;

    @OneToMany(() => City, (city) => city.country)
    cities: City[];
}
