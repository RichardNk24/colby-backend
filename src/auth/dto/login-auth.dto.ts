import { IsString } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
