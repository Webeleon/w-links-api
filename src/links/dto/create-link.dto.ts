import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { LinksType } from '../links-type.enum';

export class CreateLinkDto {
  @IsUrl()
  @IsNotEmpty()
  target: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsEnum(LinksType)
  @IsOptional()
  linkType?: LinksType;
}
