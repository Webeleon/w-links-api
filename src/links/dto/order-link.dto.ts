import { IsInt, IsUUID } from 'class-validator';

export class OrderLinkDto {
  @IsUUID()
  uuid: string;

  @IsInt()
  order: number;
}
