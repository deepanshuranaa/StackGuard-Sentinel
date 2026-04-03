'use client';

import React from 'react';
import type { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { LoginFormSchema } from '../../types/validation';
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

  return (
    <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center px-6 md:px-12 py-12 md:py-0">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-2xl font-bold text-neutral-900 mb-2">
            Let&apos;s login you first to your StackGuard account
          </h2>
          <p className="text-neutral-500 text-sm">
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
                type="password"
                placeholder="••••••••••••••••"
                disabled={isSubmitting}
                className={`bg-blue-50 border-neutral-200 focus:bg-white transition-colors ${
                  errors.password ? 'border-red-500' : ''
                }`}
              />
              {password && !errors.password && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
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
            className="w-full bg-purple-700 hover:bg-purple-800 text-white h-10 font-semibold rounded-md transition-colors"
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
        <div className="mt-6 text-center text-sm text-neutral-600">
          Don&apos;t have an account?{' '}
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
