import { IsHexColor } from 'class-validator';

export class UpdateThemeDto {
  @IsHexColor()
  backgroundColor: string;

  @IsHexColor()
  linkBackgroundColor: string;

  @IsHexColor()
  linkBorderColor: string;

  @IsHexColor()
  linkTextColor: string;
}
