import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class formResponseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  label: string;
}
