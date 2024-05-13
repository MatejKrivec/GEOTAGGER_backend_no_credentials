import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus, Query, Patch } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { PasswordResetService } from './pres.service';
import { EmailDto } from './email.dto';
import { TokenDto } from './token.dto';
import { CreatePasswordResetTokenDto } from './createToken.dto';

@ApiTags('ResetPassword')
@Controller('ResetPassword')
export class PasswordResetController {

    constructor(private readonly passwordResetService: PasswordResetService) {}

    @Post('/request')
    @ApiBody({ type: EmailDto })
    async requestPasswordReset(@Body('email') email: string): Promise<{ resetToken: string; userId: string }> {
      return await this.passwordResetService.requestPasswordReset(email);
    }

    @Post('/validate-token')
    @ApiBody({ type: TokenDto })
    async validateToken(@Body() body: { token: string }): Promise<{ userId: string }> {
      const token = body.token;
      return await this.passwordResetService.validateToken(token);
    }


    @Post()
    async create(@Body() createPasswordResetTokenDto: CreatePasswordResetTokenDto) {
      return this.passwordResetService.create(createPasswordResetTokenDto);
    }
    

}