import { IsNumber, IsString } from 'class-validator';

export class CreateCarDto {
  @IsString()
  readonly moduleName: string;

  @IsString()
  readonly category: string;

  @IsString()
  readonly year: string;

  @IsNumber()
  readonly dailyPrice: number;

  @IsNumber()
  readonly monthlyPrice: number;

  @IsString()
  readonly mileage: string;

  @IsString()
  readonly fuel: string;

  @IsString()
  readonly driveTrain: string;

  @IsString()
  readonly thumbnailUrl: string;
}
