import { Test, TestingModule } from '@nestjs/testing';
import { PasswordResetController } from './pres.controller';
import { PasswordResetService } from './pres.service';
import { CreatePasswordResetTokenDto } from './createToken.dto';
import { EmailDto } from './email.dto';
import { TokenDto } from './token.dto';

describe('PasswordResetController', () => {
  let controller: PasswordResetController;
  let service: PasswordResetService;

  const mockPasswordResetService = {
    requestPasswordReset: jest.fn((email) => Promise.resolve({ resetToken: 'resetToken123', userId: 'user123' })),
    validateToken: jest.fn((token) => Promise.resolve({ userId: 'user123' })),
    create: jest.fn((dto) => Promise.resolve({ ...dto, id: 1, token: 'token123', expiryTime: new Date() })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasswordResetController],
      providers: [
        {
          provide: PasswordResetService,
          useValue: mockPasswordResetService,
        },
      ],
    }).compile();

    controller = module.get<PasswordResetController>(PasswordResetController);
    service = module.get<PasswordResetService>(PasswordResetService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('requestPasswordReset', () => {
    it('should return a reset token and userId', async () => {
      const email = 'test@example.com';
      const result = await controller.requestPasswordReset(email);
      expect(result).toEqual({ resetToken: 'resetToken123', userId: 'user123' });
      expect(service.requestPasswordReset).toHaveBeenCalledWith(email);
    });
  });

  describe('validateToken', () => {
    it('should return a userId', async () => {
      const tokenDto: TokenDto = { token: 'validToken123' };
      const result = await controller.validateToken(tokenDto);
      expect(result).toEqual({ userId: 'user123' });
      expect(service.validateToken).toHaveBeenCalledWith(tokenDto.token);
    });
  });

  describe('create', () => {
    it('should create a password reset token', async () => {
      const createPasswordResetTokenDto: CreatePasswordResetTokenDto = { userId: 1 };
      const result = await controller.create(createPasswordResetTokenDto);
      expect(result).toEqual(expect.objectContaining(createPasswordResetTokenDto));
      expect(service.create).toHaveBeenCalledWith(createPasswordResetTokenDto);
    });
  });
});
