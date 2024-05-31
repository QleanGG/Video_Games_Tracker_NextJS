export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    oauthProvider?: string;
    oauthId?: string;
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    message: string;
    user: User;
  }
  