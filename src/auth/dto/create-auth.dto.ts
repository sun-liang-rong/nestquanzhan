import {IsString} from 'class-validator'
export class CreateAuthDto {}
export class LoginAuthDto {
  @IsString()
  name: string;

  @IsString()
  password: string;
}
