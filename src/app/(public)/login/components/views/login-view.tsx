'use client';

import React from 'react';
import type { FieldErrors, UseFormRegister, UseFormWatch, UseFormHandleSubmit } from 'react-hook-form';
import { LoginFormSchema } from '../../types/validation';
import { LeftPanel } from '../helpers/left-panel';
import { RightPanel } from '../helpers/right-panel';

interface LoginViewProps {
  isLoading: boolean;
  isSubmitting: boolean;
  errors: FieldErrors<LoginFormSchema>;
  register: UseFormRegister<LoginFormSchema>;
  watch: UseFormWatch<LoginFormSchema>;
  handleSubmit: UseFormHandleSubmit<LoginFormSchema>;
  onSubmit: (data: LoginFormSchema) => Promise<void>;
  generalError?: string;
}

/**
 * LoginView - Orchestrates the split-screen login layout
 * Composed of LeftPanel (branding) and RightPanel (form)
 */
export function LoginView({
  isLoading,
  isSubmitting,
  errors,
  register,
  watch,
  handleSubmit,
  onSubmit,
  generalError,
}: LoginViewProps) {
  return (
    <div className="flex w-full min-h-screen bg-white md:bg-neutral-50">
      {/* Left Panel - Branding (hidden on mobile) */}
      <LeftPanel />

      {/* Right Panel - Form */}
      <RightPanel
        isLoading={isLoading}
        isSubmitting={isSubmitting}
        errors={errors}
        register={register}
        watch={watch}
        onSubmit={handleSubmit(onSubmit)}
        generalError={generalError}
      />
    </div>
  );
}
