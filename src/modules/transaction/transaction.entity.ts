import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Image } from '../image/image.entity';
import { Video } from '../video/video.entity';
import { Category } from '../category/category.entity';

@Entity({ name: "transactions" })
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  qty: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  minPrice: number;

  @Column({ default: true })
  availableToBuy: boolean;

  @Column()
  thumbnail: string;

  @Column()
  coverImage: string;

  @OneToMany(() => Image, (image) => image.transaction)
  images: Image[];

  @Column()
  updated_at: string;

  @Column()
  release_date: string;

  @Column()
  region: string;

  @Column()
  developer: string;

  @Column()
  publisher: string;

  @Column()
  platform: string;

  @Column('jsonb')
  priceLimit: { max: number; min: number };

  @Column('jsonb')
  requirements: {
    minimal: {
      reqprocessor: string;
      reqgraphics: string;
      reqmemory: string;
      reqdiskspace: string;
      reqsystem: string;
      reqother: string;
    };
    recommended: {
      reqprocessor: string;
      reqgraphics: string;
      reqmemory: string;
      reqdiskspace: string;
      reqsystem: string;
      reqother: string;
    };
  };

  @OneToMany(() => Video, (video) => video.transaction)
  videos: Video[];

  @OneToMany(() => Category, (category) => category.transaction)
  categories: Category[];
}
