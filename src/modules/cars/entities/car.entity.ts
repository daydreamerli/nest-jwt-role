import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  moduleName: string;

  @Column()
  category: string; // or define a category enum

  @Column()
  year: string;

  @Column()
  dailyPrice: number;

  @Column({ nullable: true, default: false })
  discount: boolean;

  @Column({ nullable: true })
  discountValue: number;

  @Column()
  monthlyPrice: number;

  @Column()
  mileage: string;

  @Column()
  fuel: string;

  @Column()
  gearType: string;

  @Column()
  driveTrain: string; // 2wheel or 4x4

  @Column()
  thumbnailUrl: string; //
}
