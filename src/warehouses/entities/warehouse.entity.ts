import { Product } from "src/products/entities/product.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Warehouse {
    @PrimaryGeneratedColumn()
    warehouse_id: number;

    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({type: 'varchar', length: 100})
    location: string;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;

    @OneToMany(() => Product, (product) => product.warehouse_id)
    products: Product[];
}
