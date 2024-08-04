import { IsOptional } from "class-validator";

export class UserDto {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  password: string;

  @IsOptional()
  token: string;

  @IsOptional()
  expiryDate: string;
}
