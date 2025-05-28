import { Category } from "src/categories/entities/category.entity";
import { Supplier } from "src/suppliers/entities/supplier.entity";
import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Product {

    @PrimaryGeneratedColumn()
    product_id: number;
    
    @Column({ type: 'varchar', length: 255 })
    name: string;
    
    @Column({ type: 'varchar', length: 255 })
    description: string;
    
    @Column({ type: 'int', unique: true })
    sku: number;
    
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @ManyToOne(() => Category, (category) => category.category_id, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    category_id: Category;

    @ManyToOne(() => Supplier, (supplier) => supplier.supplier_id, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    supplier_id: Supplier;
}
