import { Country } from "src/modules/country/entities/country.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('city')
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    city_name: string;

    @Column({
        type: 'decimal',
        precision: 9,
        scale: 6,
        nullable: false
    })
    latitude: number;

    @Column({
        type: 'decimal',
        precision: 9,
        scale: 6,
        nullable: false
    })
    longitude: number;

    @ManyToOne(() => Country, (country) => country.cities)
    @JoinColumn({ name: 'country_id' })
    country: Country;
}
