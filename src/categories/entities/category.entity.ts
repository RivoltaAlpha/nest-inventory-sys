import { Product } from "src/products/entities/product.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Category {
    @PrimaryGeneratedColumn()
    category_id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @OneToMany(() => Product, (product) => product.category_id)
    products: Product[];
}
