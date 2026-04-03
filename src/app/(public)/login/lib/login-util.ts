/**
 * Login utility functions
 */

/**
 * Toggle password visibility
 * Simple utility to manage password field type switching
 */
export const togglePasswordVisibility = (currentType: string): 'password' | 'text' => {
  return currentType === 'password' ? 'text' : 'password';
};
