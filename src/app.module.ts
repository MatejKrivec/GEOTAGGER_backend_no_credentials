import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './USER/user.module';
import { AuthModule } from './JWT/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PasswordResetTokenModule } from './PassworResetToken/pres.module';


@Module({
  imports: [
    UserModule, 
    AuthModule,
    PasswordResetTokenModule,
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'matej krivec',
          pass: 'mailtrap321', // replace with your Mailtrap password
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
