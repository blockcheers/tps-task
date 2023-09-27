import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TransactionEntity } from "../transaction/transaction.entity";

@Entity({ name: "videos" })
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  url: string;

  @ManyToOne(() => TransactionEntity, (transaction) => transaction.videos)
  transaction: TransactionEntity;
}
