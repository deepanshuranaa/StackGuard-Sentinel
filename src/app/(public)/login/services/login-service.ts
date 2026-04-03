import type { LoginFormInputs, LoginResponse } from '../types/login';

/**
 * Mock login service
 * In production, this would call a real backend API
 */
export async function mockLoginService(
  credentials: LoginFormInputs
): Promise<LoginResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock validation: reject if email/password don't match expected format
  // In real app, backend validates credentials
  if (credentials.email === 'admin@stackguard.io' && credentials.password === 'password123') {
    return {
      success: true,
      message: 'Login successful',
    };
  }

  // Any other credentials fail
  return {
    success: false,
    message: 'Invalid email or password',
  };
}
