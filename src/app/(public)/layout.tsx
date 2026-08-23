'use client';

import React from 'react';
import { Header } from '@/modules/public/components/Header';
import { Footer } from '@/modules/public/components/Footer';
import { LoginModal } from '@/modules/auth/components/LoginModal';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      <Footer />
      <LoginModal />
    </>
  );
}
