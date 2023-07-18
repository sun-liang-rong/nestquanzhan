import { IsString, IsInt, IsBoolean } from 'class-validator';
export class RegisterCatDto {
  @IsString()
  name: string;
  @IsString()
  password: string;
}

export class GetCatDto {
  @IsString()
  name: string;
  @IsString()
  age: boolean;
  @IsString()
  sex: string;
}
export class PermissionDto {
  @IsString()
  name: string;
  @IsString()
  desc: string;
}
