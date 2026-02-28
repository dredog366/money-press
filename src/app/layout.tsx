import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/store';
import Nav from '@/components/Nav';

export const metadata: Metadata = {
  title: 'PassFirst — Real Estate Exam Prep',
  description: 'Memory-first real estate exam prep. Mnemonics, micro-lessons, and spaced repetition — built for non-fast learners.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
          <Nav />
        </AppProvider>
      </body>
    </html>
  );
}
