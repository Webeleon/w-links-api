export class UserDto {
  uuid: string;
  username: string;
  email?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
