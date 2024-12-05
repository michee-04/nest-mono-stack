import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class accessDto {
  @IsEnum(['admins', 'managers'], {
    message: 'Valid groups required',
  })
  groups: string;

  @IsEnum(['admin', 'editor'], {
    message: 'Valid roles required',
  })
  roles: string;
}
export class CreateRequestFormDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  components: Record<string, any>[];

  @ValidateNested()
  @Type(() => accessDto)
  access: accessDto;

  @IsString()
  @IsOptional()
  display: string;

  @IsInt()
  @IsNotEmpty()
  version: number;
}
