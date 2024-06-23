// oauth.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { OAuthController } from './oauth.controller';
import { OAuthService } from './oauth.service';
import { AuthGuard } from '@nestjs/passport';

describe('OAuthController', () => {
  let oauthController: OAuthController;
  let oauthService: OAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OAuthController],
      providers: [OAuthService, { provide: AuthGuard('google'), useValue: { canActivate: jest.fn(() => true) } }],
    }).compile();

    oauthController = module.get<OAuthController>(OAuthController);
    oauthService = module.get<OAuthService>(OAuthService);
  });

  it('should be defined', () => {
    expect(oauthController).toBeDefined();
  });

  describe('googleLogin', () => {
    it('should return undefined', async () => {
      expect(await oauthController.googleLogin()).toBeUndefined();
    });
  });

  describe('googleLoginCallback', () => {
    it('should redirect to the Signin page with a token', async () => {
      const req = {
        user: {
          id: '1',
          username: 'test',
        },
      };
      const res = {
        redirect: jest.fn(),
      };

      jest.spyOn(oauthService, 'generateToken').mockImplementation(() => Promise.resolve('token'));

      await oauthController.googleLoginCallback(req, res);
      expect(res.redirect).toHaveBeenCalledWith('https://geotagger-7ksdmj90b-matej-krivecs-projects.vercel.app/Signin?token=token');
    });
  });
});
