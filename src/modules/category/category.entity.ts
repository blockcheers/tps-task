import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TransactionEntity } from "../transaction/transaction.entity";

@Entity({ name: "category" })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => TransactionEntity, (transaction) => transaction.categories)
  transaction: TransactionEntity;
}
