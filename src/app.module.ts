import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './USER/user.module';
import { AuthModule } from './JWT/auth.module';
import { PasswordResetTokenModule } from './PassworResetToken/pres.module';
import { AwsModule } from './AWS/aws.module';
import { OAuthModule } from './OAuthGoogle/OAuth.module';


@Module({
  imports: [
    UserModule, 
    AuthModule,
    PasswordResetTokenModule,
    AwsModule,
    OAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
