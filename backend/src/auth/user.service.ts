import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './auth.types';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: '1',
      username: 'admin',
      password: '',
      role: 'admin',
    },
    {
      id: '2',
      username: 'employee',
      password: '',
      role: 'employee',
    },
  ];

  async onModuleInit() {
    this.users[0].password = await bcrypt.hash('admin123', 10);
    this.users[1].password = await bcrypt.hash('employee123', 10);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
