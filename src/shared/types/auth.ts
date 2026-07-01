

export interface LoginRequest {
  user: {
    email: string;
    password: string;
  };
}

export interface User {
  email: string;
  username: string;
  bio: string;
  image: string;
  token: string;
}

export interface LoginResponse {
  user: User;
}
