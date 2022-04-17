import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsUrl()
  @IsNotEmpty()
  target: string;

  @IsString()
  @IsOptional()
  displayName?: string;
}
