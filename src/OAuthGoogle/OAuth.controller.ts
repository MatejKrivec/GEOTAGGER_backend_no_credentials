// Oauth.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/JWT/auth.service';
import { OAuthService } from './OAuth.service';


@Controller('Oauth')
export class OAuthController {
    constructor(private readonly authService: OAuthService) {}
  

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res) {
    //console.log(req.user)

    const token = await this.authService.generateToken({ sub: req.user.id, aud: req.user.username, });

    //console.log("redirectingggggggg")

    res.redirect(`http://localhost:5173/Signin?token=${token}`);
  }
}
