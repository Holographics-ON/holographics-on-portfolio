import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Holographics-ON',
  description: 'Creative technologist',
  keywords:
    'web dev, 3D modelling, 3D sculpting, animation, creative, technologist, creative technologits, creative coder, artist',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
