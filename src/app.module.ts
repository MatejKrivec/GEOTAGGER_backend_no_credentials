import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './USER/user.module';
import { AuthModule } from './JWT/auth.module';
import { PasswordResetTokenModule } from './PassworResetToken/pres.module';
import { AwsModule } from './AWS/aws.module';
import { OAuthModule } from './OAuthGoogle/OAuth.module';
import { LocationModule } from './LOCATION/location.module';
import { GuessModule } from './GUESS/guess.module';
import { UserActivityModule } from './UserActivity/userActivity.module';



@Module({
  imports: [
    UserModule, 
    AuthModule,
    PasswordResetTokenModule,
    AwsModule,
    OAuthModule,
    LocationModule,
    GuessModule,
    UserActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
