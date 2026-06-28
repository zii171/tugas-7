import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'name harus berupa string' })
  @IsNotEmpty({ message: 'name tidak boleh kosong' })
  name: string;

  @IsNumber({}, { message: 'price harus berupa angka' })
  @Min(0, { message: 'price tidak boleh negatif' })
  price: number;

  @IsString({ message: 'category harus berupa string' })
  @IsNotEmpty({ message: 'category tidak boleh kosong' })
  category: string;

  @IsNumber({}, { message: 'stock harus berupa angka' })
  @Min(0, { message: 'stock tidak boleh negatif' })
  stock: number;

  @IsOptional()
  @IsBoolean({ message: 'isAvailable harus berupa boolean' })
  isAvailable?: boolean;
}
