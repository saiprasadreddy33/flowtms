import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { JwtPayload, LoginResponse } from './auth.types';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(username: string, password: string): Promise<LoginResponse>;
    validateToken(token: string): Promise<JwtPayload>;
}
