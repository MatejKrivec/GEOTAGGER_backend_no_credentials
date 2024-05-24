// your-controller.ts
import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiBody, ApiCreatedResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './login.dto';
import { JwtPayload } from 'jsonwebtoken';

@ApiTags('JWT')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDto})
  async login(@Request() req) {
    const { email, password } = req.body;

    const user = await this.authService.findOneByUsernameAndPassword(email, password);
    if (!user) {
      return { error: 'Invalid credentials' };
    }
    const token = await this.authService.generateToken({ sud: user.id, aud: user.username, role: user.role });
    return { token };
  }

 /*@Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protectedRoute() {

    return { route: 'Home' };
  }*/

  @Get('protected')
  async protectedRoute(@Req() req) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error('Authorization header missing');
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = this.authService.verifyToken(token) as JwtPayload;

      let role = 'Home'
      if (decoded.role === 'admin') {
        role = 'Admin'
      }

      return { route: role };

    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  @Get('verify-token')
  async verifyToken(@Request() req) {
    const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

    try {
      const decodedToken = this.authService.verifyToken(token);
      return { valid: true, decodedToken };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }
}
