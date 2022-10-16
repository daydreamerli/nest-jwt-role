/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}
  public async create(createCarDto: CreateCarDto) {
    const existingCar = await getConnection()
      .createQueryBuilder(Car, 'car')
      .where('car.moduleName= :carName', { carName: createCarDto.moduleName })
      .andWhere('car.driveTrain= :driveTrain', {
        driveTrain: createCarDto.driveTrain,
      })
      .getOne();
    if (existingCar) {
      return existingCar;
    }
    const newCar = await this.carRepository.create(createCarDto);
    await this.carRepository.save(newCar);
    return newCar;
  }

  public async findAll() {
    return await this.carRepository.find();
  }

  public async findDiscountOnes() {
    const discountCars = await getConnection()
      .createQueryBuilder(Car, 'car')
      .where('car.discount = :discount', { discount: true })
      .getMany();
    return discountCars;
  }

  public async findHatchBack(){
    const hatchBack = await getConnection()
      .createQueryBuilder(Car, 'car')
      .where('car.category = :category', { category: 'HatchBack' })
      .getMany();
    return hatchBack;
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
