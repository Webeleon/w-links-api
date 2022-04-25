import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { LinksType } from '../links-type.enum';

export class UpdateLinkDto {
  @IsUrl()
  @IsOptional()
  target?: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsEnum(LinksType)
  @IsOptional()
  type?: LinksType;
}
