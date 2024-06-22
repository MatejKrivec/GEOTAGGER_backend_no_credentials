import { UserService } from "./user.service";
import { USER } from "@prisma/client";
import { ValidatePasswordDto } from './validatePassword.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    login(username: string, password: string): Promise<USER | null>;
    getUser(ID: string): Promise<USER>;
    getAllUsers(): Promise<USER[]>;
    validatePassword(id: string, validatePasswordDto: ValidatePasswordDto): Promise<boolean>;
    createUser(userData: USER): Promise<USER>;
    posodobitevUser(id: string, userData: USER): Promise<USER>;
    updatePassword(id: string, validatePasswordDto: ValidatePasswordDto): Promise<void>;
    updateUserPoints(id: string, data: {
        points: number;
    }): Promise<void>;
    addUserPoints(id: string, data: {
        points: number;
    }): Promise<void>;
}
