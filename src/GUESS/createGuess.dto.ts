import { ApiProperty } from '@nestjs/swagger';

export class CreateGuessDto {
  @ApiProperty()
  UserID: number;

  @ApiProperty()
  LocationID: number;

  @ApiProperty()
  guessedLocation: string;

  @ApiProperty()
  distance: number;

  @ApiProperty()
  date: Date;
}
