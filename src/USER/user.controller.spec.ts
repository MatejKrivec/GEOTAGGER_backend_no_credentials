import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { USER } from '@prisma/client';
import { UpdateUserDto } from './updateUser.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    findOneByUsernameAndPassword: jest.fn((username, password) => Promise.resolve({ id: 1, username, password })),
    getUserById: jest.fn((id) => Promise.resolve({ id, username: 'Test User', email: 'test@example.com' })),
    getAllUsers: jest.fn(() => Promise.resolve([])),
    validatePassword: jest.fn((id, password) => Promise.resolve(true)),
    createUser: jest.fn((data) => Promise.resolve({ id: Date.now(), ...data })),
    posodobitevUser: jest.fn((options) => Promise.resolve({ id: options.where.id, ...options.data })),
    updatePassword: jest.fn((id, newPassword) => Promise.resolve()),
    updateUserPoints: jest.fn((id, points) => Promise.resolve()),
    uaddUserPoints: jest.fn((id, points) => Promise.resolve()),
    deleteUser: jest.fn((options) => Promise.resolve({ id: options.id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a user object if credentials are valid', async () => {
      const username = 'testuser';
      const password = 'testpass';
      const result = await controller.login(username, password);
      expect(result).toEqual(expect.objectContaining({ username, password }));
      expect(service.findOneByUsernameAndPassword).toHaveBeenCalledWith(username, password);
    });
  });

  describe('getUser', () => {
    it('should return a user by id', async () => {
      const id = '1';
      const result = await controller.getUser(id);
      expect(result).toEqual(expect.objectContaining({ id: parseInt(id, 10), username: 'Test User' }));
      expect(service.getUserById).toHaveBeenCalledWith(parseInt(id, 10));
    });
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const result = await controller.getAllUsers();
      expect(result).toEqual([]);
      expect(service.getAllUsers).toHaveBeenCalled();
    });
  });

  describe('validatePassword', () => {
    it('should validate the user password', async () => {
      const id = '1';
      const validatePasswordDto = { password: 'testpass' };
      const result = await controller.validatePassword(id, validatePasswordDto);
      expect(result).toBe(true);
      expect(service.validatePassword).toHaveBeenCalledWith(parseInt(id, 10), validatePasswordDto.password);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = { username: 'testuser', email: 'test@example.com', password: 'testpass' };
      const result = await controller.createUser(userData as USER);
      expect(result).toEqual(expect.objectContaining(userData));
      expect(service.createUser).toHaveBeenCalledWith(userData);
    });
  });

  describe('posodobitevUser', () => {
    it('should update an existing user', async () => {
      const id = '1';
      const updateUserDto: UpdateUserDto = {
        username: 'updateduser',
        email: 'updated@example.com',
        profilePic: 'newpic.png'
      };
      const result = await controller.posodobitevUser(id, updateUserDto as unknown as USER);
      expect(result).toEqual(expect.objectContaining(updateUserDto));
      expect(service.posodobitevUser).toHaveBeenCalledWith({
        where: { id: Number(id) },
        data: updateUserDto,
      });
    });
  });

  describe('updatePassword', () => {
    it('should update the user password', async () => {
      const id = '1';
      const validatePasswordDto = { password: 'newpassword' };
      await controller.updatePassword(id, validatePasswordDto);
      expect(service.updatePassword).toHaveBeenCalledWith(parseInt(id, 10), validatePasswordDto.password);
    });
  });

  describe('updateUserPoints', () => {
    it('should update user points', async () => {
      const id = '1';
      const points = 10;
      await controller.updateUserPoints(id, { points });
      expect(service.updateUserPoints).toHaveBeenCalledWith(id, points);
    });
  });

  describe('addUserPoints', () => {
    it('should add user points', async () => {
      const id = '1';
      const points = 10;
      await controller.addUserPoints(id, { points });
      expect(service.uaddUserPoints).toHaveBeenCalledWith(id, points);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const id = '1';
      const result = await controller.deleteUser(id);
      expect(result).toEqual(expect.objectContaining({ id: parseInt(id, 10) }));
      expect(service.deleteUser).toHaveBeenCalledWith({ id: Number(id) });
    });
  });
});
