export interface RegisterDto {
  login: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface VerifyEmailDto {
  email: string;
  code: string;
}

export interface ResendCodeDto {
  email: string;
}

// Ответ register и resend-code: токенов нет, только срок жизни кода (ISO)
export interface RegisterResponse {
  email: string;
  code_expires_at: string;
}

export interface AuthTokenResponse {
  access_token: string;
}

export interface LogoutResponse {
  message: string;
}
