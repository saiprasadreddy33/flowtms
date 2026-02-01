import { User } from './auth.types';
export declare class UserService {
    private users;
    onModuleInit(): Promise<void>;
    findByUsername(username: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    validateUser(username: string, password: string): Promise<User | null>;
}
