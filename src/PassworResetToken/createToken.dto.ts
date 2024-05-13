import { ApiProperty } from "@nestjs/swagger";

export class CreatePasswordResetTokenDto {
    @ApiProperty()
    userId: number;
  }