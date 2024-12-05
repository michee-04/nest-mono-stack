/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsJsonString, IsXmlString } from 'src/shared/validation';

class schemasDto {
  @IsXmlString({ message: 'The xml field must contain valid XML' })
  @IsOptional()
  xml: string;

  @IsJsonString({ message: 'The json field must contain valid JSON' })
  @IsOptional()
  json: string;
}

class accessDto {
  @IsEnum(["admins", "managers"], {
    message: 'Valid groups required'
  })
  groups: string;

  @IsEnum(["admin", "editor"], {
    message: 'Valid roles required'
  })
  roles: string;
}

export class CreateRequestWorkflowDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  service: string;

  @IsString()
  description: string;

  @ValidateNested()
  @Type(() => schemasDto)
  schemas: schemasDto;

  @ValidateNested()
  @Type(() => accessDto)
  access: accessDto;

  @IsBoolean()
  active: boolean;

  @IsNumber()
  version: number;

  @IsString()
  @IsEnum(["approval", "finance"], {
    message: 'Valid tags required'
  })
  tags: string;

  @IsString()
  @IsEnum(["active", "inactive"], {
    message: 'Valid status required'
  })
  status: string;
}
