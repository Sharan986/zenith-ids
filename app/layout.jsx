import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Layout from '@/components/Layout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Vouch — Campus to Careers',
  description: 'The career readiness platform that bridges the gap between campus learning and industry hiring. Build real skills, complete projects, get hired.',
  keywords: ['career readiness', 'campus to careers', 'internships', 'jobs', 'skills', 'portfolio'],
  openGraph: {
    title: 'Vouch — Campus to Careers',
    description: 'Build real skills. Complete projects. Get hired.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
