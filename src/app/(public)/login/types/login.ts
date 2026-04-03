export type LoginFormInputs = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message?: string;
};

export type LoginError = {
  field: 'email' | 'password' | 'general';
  message: string;
};
