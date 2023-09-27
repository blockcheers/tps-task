import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TransactionEntity } from "../transaction/transaction.entity";

@Entity({ name: "images" })
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => TransactionEntity, (transaction) => transaction.images)
  transaction: TransactionEntity;
}
