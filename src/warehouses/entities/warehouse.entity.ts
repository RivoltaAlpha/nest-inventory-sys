import { Inventory } from 'src/inventories/entities/inventory.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Warehouse {
  @PrimaryGeneratedColumn()
  warehouse_id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  location: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Inventory, (inventory) => inventory.warehouse)
  inventories: Inventory[];
}
