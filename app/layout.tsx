import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Our Wedding Story',
  description: 'A beautiful journey of love and togetherness',
  icons: {
    icon: '/images/favicon.ico'
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 