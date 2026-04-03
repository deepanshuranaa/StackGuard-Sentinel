'use client';

import React, { useState } from 'react';
import type { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { LoginFormSchema } from '../../types/validation';
import { togglePasswordVisibility } from '../../lib/login-util';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface RightPanelProps {
  isLoading: boolean;
  isSubmitting: boolean;
  errors: FieldErrors<LoginFormSchema>;
  register: UseFormRegister<LoginFormSchema>;
  watch: UseFormWatch<LoginFormSchema>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

/**
 * RightPanel - White form side of login page
 * Contains email/password form with validation
 */
export function RightPanel({
  isLoading,
  isSubmitting,
  errors,
  register,
  watch,
  onSubmit,
}: RightPanelProps) {
  const email = watch('email');
  const password = watch('password');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center px-6 md:px-12 py-12 md:py-0">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-2xl font-light  mb-2">
            Let&apos;s login you first to your StackGuard account
          </h2>
          <p className="text-neutral-500 text-muted-foreground font-extralight text-sm">
            Enter your credentials to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <div className="relative">
              <Input
                {...register('email')}
                type="email"
                placeholder="admin@stackguard.io"
                disabled={isSubmitting}
                className={`bg-blue-50 border-neutral-200 focus:bg-white transition-colors ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-600 mt-1.5">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="relative">
              <Input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••••••"
                disabled={isSubmitting}
                className={`bg-blue-50 border-neutral-200 focus:bg-white transition-colors pr-10 ${
                  errors.password ? 'border-red-500' : ''
                }`}
              />
              {password && (
                <button
                  type="button"
                  onClick={handlePasswordToggle}
                  disabled={isSubmitting}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 disabled:opacity-50 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>
            {errors.password && (
              <p className="text-xs text-red-600 mt-1.5">{errors.password.message}</p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              disabled={isSubmitting}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium disabled:opacity-50"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-md transition-colors"
          >
            {isSubmitting || isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              'Continue'
            )}
          </Button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-start text-sm">
          <span className="text-neutral-500">Don&apos;t have an account?</span>{' '}
          <button
            disabled={isSubmitting}
            className="text-purple-600 hover:text-purple-700 font-semibold disabled:opacity-50"
          >
            Sign up
          </button>
        </div>

        {/* Demo Credentials Hint (development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 pt-6 border-t border-neutral-200">
            <p className="text-xs text-neutral-500 text-center">
              Demo: admin@stackguard.io / password123
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
