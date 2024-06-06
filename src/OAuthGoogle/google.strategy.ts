// google.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { PrismaService } from 'src/PRISMA/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly prisma: PrismaService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
      callbackURL: 'http://localhost:3000/Oauth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    const { displayName, emails, photos } = profile;

    const existingUser = await this.prisma.uSER.findUnique({
        where: {
            email: emails[0].value,
        },
    });

    if (existingUser) {
        return existingUser;
    } else {
        
        const newUser = await this.prisma.uSER.create({
            data: {
                username: displayName, 
                email: emails[0].value,
                password: null,
                profilePic: "https://geotagger.s3.eu-north-1.amazonaws.com/UserImages/default_user_pic.jpg"
            },
        });
        
        return newUser;
    }
}

}
