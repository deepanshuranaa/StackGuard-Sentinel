'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/lib/hooks/use-auth';
import { loginFormSchema, type LoginFormSchema } from '../../types/validation';
import { mockLoginService } from '../../services/login-service';
import { LoginView } from '../views/login-view';

/**
 * LoginContainer - Handles all form logic, validation, and authentication
 * Manages state and orchestrates the login flow
 */
export function LoginContainer() {
  const router = useRouter();
  const { login } = useAuth();
  const [generalError, setGeneralError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  // React Hook Form setup with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange', // Real-time validation
  });

  /**
   * Handle form submission
   * 1. Validate form (react-hook-form + zod)
   * 2. Call mock auth service
   * 3. Update global auth context
   * 4. Redirect to dashboard
   */
  const onSubmit = async (data: LoginFormSchema) => {
    setGeneralError(undefined);
    setIsLoading(true);

    try {
      // Call mock login service
      const response = await mockLoginService(data);

      if (!response.success) {
        // Show general error (invalid credentials)
        setGeneralError(response.message || 'Login failed. Please try again.');
        return;
      }

      // Update global auth state
      await login(data.email, data.password);

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      setGeneralError('An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginView
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      errors={errors}
      register={register}
      watch={watch}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      generalError={generalError}
    />
  );
}
