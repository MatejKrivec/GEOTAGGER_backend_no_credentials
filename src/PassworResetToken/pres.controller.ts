import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus, Query, Patch } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { PasswordResetService } from './pres.service';
import { EmailDto } from './email.dto';
import { TokenDto } from './token.dto';
import { CreatePasswordResetTokenDto } from './createToken.dto';
import { UserService } from '../USER/user.service';

@ApiTags('ResetPassword')
@Controller('ResetPassword')
export class PasswordResetController {

  constructor(
    private readonly passwordResetService: PasswordResetService,
    private readonly userService: UserService
  ) {}

    @Post('/request')
    @ApiBody({ type: EmailDto })
    async requestPasswordReset(@Body('email') email: string): Promise<{ resetToken: string; userId: string }> {
      return await this.passwordResetService.requestPasswordReset(email);
    }

    @Post('/validate-token')
    @ApiBody({ type: TokenDto })
    async validateToken(@Body() body: { token: string; newPassword: string }): Promise<{ userId: string }> {
        const token = body.token;
        const newPassword = body.newPassword;

        const { userId } = await this.passwordResetService.validateToken(token);

        if (userId) {
            const id = parseInt(userId);
            await this.userService.updatePassword(id, newPassword);
        }

        return { userId };
    }

    @Post()
    async create(@Body() createPasswordResetTokenDto: CreatePasswordResetTokenDto) {
      return this.passwordResetService.create(createPasswordResetTokenDto);
    }
    

}