export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'employee';
}

export interface JwtPayload {
  sub: string;
  username: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}
