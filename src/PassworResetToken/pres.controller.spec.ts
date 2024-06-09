import { Test, TestingModule } from '@nestjs/testing';
import { PasswordResetController } from './pres.controller';
import { PasswordResetService } from './pres.service';
import { CreatePasswordResetTokenDto } from './createToken.dto';
import { EmailDto } from './email.dto';
import { UserService } from '../USER/user.service';

describe('PasswordResetController', () => {
  let controller: PasswordResetController;
  let passwordResetService: PasswordResetService;
  let userService: UserService;

  const mockPasswordResetService = {
    requestPasswordReset: jest.fn((email) => Promise.resolve({ resetToken: 'resetToken123', userId: 'user123' })),
    validateToken: jest.fn((token) => Promise.resolve({ userId: 'user123' })),
    create: jest.fn((dto) => Promise.resolve({ ...dto, id: 1, token: 'token123', expiryTime: new Date() })),
  };

  const mockUserService = {
    updatePassword: jest.fn((id, newPassword) => Promise.resolve()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasswordResetController],
      providers: [
        {
          provide: PasswordResetService,
          useValue: mockPasswordResetService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<PasswordResetController>(PasswordResetController);
    passwordResetService = module.get<PasswordResetService>(PasswordResetService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('requestPasswordReset', () => {
    it('should return a reset token and userId', async () => {
      const email = 'test@example.com';
      const result = await controller.requestPasswordReset(email);
      expect(result).toEqual({ resetToken: 'resetToken123', userId: 'user123' });
      expect(passwordResetService.requestPasswordReset).toHaveBeenCalledWith(email);
    });
  });

  describe('validateToken', () => {
    it('should return a userId', async () => {
      const body = { token: 'validToken123', newPassword: 'newPassword123' };
      const result = await controller.validateToken(body);
      expect(result).toEqual({ userId: 'user123' });
      expect(passwordResetService.validateToken).toHaveBeenCalledWith(body.token);
      expect(userService.updatePassword).toHaveBeenCalledWith(parseInt('user123'), body.newPassword);
    });
  });

  describe('create', () => {
    it('should create a password reset token', async () => {
      const createPasswordResetTokenDto: CreatePasswordResetTokenDto = { userId: 1 };
      const result = await controller.create(createPasswordResetTokenDto);
      expect(result).toEqual(expect.objectContaining(createPasswordResetTokenDto));
      expect(passwordResetService.create).toHaveBeenCalledWith(createPasswordResetTokenDto);
    });
  });
});
