'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/store';

export default function RootPage() {
  const { state } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (state.user?.onboardingComplete) {
      router.replace('/home');
    } else {
      router.replace('/onboarding');
    }
  }, [state.user, router]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <span style={{ fontSize: 32 }}>🏠</span>
    </div>
  );
}
