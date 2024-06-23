// Oauth.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/JWT/auth.service';
import { OAuthService } from './OAuth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('GoogleAuth')
@Controller('Oauth')
export class OAuthController {
    constructor(private readonly authService: OAuthService) {}
  

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res) {

    const token = await this.authService.generateToken({ sud: req.user.id, aud: req.user.username, });
  
    res.redirect(`https://geotagger-7ksdmj90b-matej-krivecs-projects.vercel.app/Signin?token=${token}`);
  }
}
