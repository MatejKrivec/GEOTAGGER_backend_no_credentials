// auth.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should return a token when valid credentials are provided', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123',
        },
      };

      jest.spyOn(authService, 'findOneByUsernameAndPassword').mockImplementation(() => Promise.resolve({ 
        id: 1, 
        username: 'test', 
        email: 'test@example.com', 
        password: 'password123', 
        profilePic: 'pic.jpg', 
        points: 100, 
        role: 'user' 
      }));
      
      jest.spyOn(authService, 'generateToken').mockImplementation(() => Promise.resolve('token'));

      expect(await authController.login(req)).toEqual({ token: 'token' });
    });
  });

  describe('protectedRoute', () => {
    it('should return a route based on the role in the token', async () => {
      const req = {
        headers: {
          authorization: 'Bearer token',
        },
      };

      jest.spyOn(authService, 'verifyToken').mockImplementation(() => ({ sud: 1, aud: 'test', role: 'admin' }));

      expect(await authController.protectedRoute(req)).toEqual({ route: 'Admin' });
    });
  });

  describe('verifyToken', () => {
    it('should return valid: true when the token is valid', async () => {
      const req = {
        headers: {
          authorization: 'Bearer token',
        },
      };

      jest.spyOn(authService, 'verifyToken').mockImplementation(() => ({ sud: 1, aud: 'test', role: 'admin' }));

      expect(await authController.verifyToken(req)).toEqual({ valid: true, decodedToken: { sud: 1, aud: 'test', role: 'admin' } });
    });
  });
});
