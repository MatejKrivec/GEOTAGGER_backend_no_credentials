import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
@ApiProperty()
  userID: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  photo: string;

  @ApiProperty()
  date: Date;
}
