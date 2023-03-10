import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({
    length: 100,
  })
  @Field(() => String)
  url: string;

  @Column()
  @Field(() => Boolean)
  isMain: boolean;

  @ManyToOne(() => Product)
  @Field(() => Product)
  product: Product;
}
