'use server';

import {
  LoginFormSchema,
  LoginFormState,
  SignupFormSchema,
  SignupFormState,
} from '@/lib/definitions';
import apiFetcher from '@/utils/fetcher';
import { LoginReturn } from '@repo/api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signup(
  _state: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  const response = await apiFetcher('/api/auth/signup', 'POST', {
    name,
    email,
    password,
  });

  if (!response.ok) {
    const status = response.status;
    let message = 'Failed to sign up';
    switch (status) {
      case 401:
        message = 'Unauthorized';
        break;
      case 409:
        message = 'User already exists';
        break;
    }

    return {
      message,
      errors: {
        api: true,
      },
    };
  }

  const token: LoginReturn = await response.json();

  const cookieStore = await cookies();

  cookieStore.set('access_token', token.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  });

  redirect('/');
}

export async function login(
  _state: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const response = await apiFetcher('/api/auth/login', 'POST', {
    email,
    password,
  });

  if (!response.ok) {
    return {
      message: 'Something went wrong, please try again.',
      errors: {
        api: true,
      },
    };
  }

  const token: LoginReturn = await response.json();

  const cookieStore = await cookies();

  cookieStore.set('access_token', token.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 14, //14 days
    path: '/',
  });

  redirect('/');
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete('access_token');

  redirect('/login');
}
