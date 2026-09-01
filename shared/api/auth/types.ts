export interface RegisterDto {
  login: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthTokenResponse {
  access_token: string;
}

export interface LogoutResponse {
  message: string;
}
