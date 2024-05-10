import { ApiProperty } from '@nestjs/swagger';

export class ValidatePasswordDto {
  @ApiProperty()
  password: string;
}