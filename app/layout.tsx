import './globals.css';
import localFont from 'next/font/local';

const nomixa = localFont({
  src: [
    { path: '../public/fonts/Nomixa-Regular.otf',  weight: '400', style: 'normal' },
    { path: '../public/fonts/Nomixa-Medium.otf',   weight: '500', style: 'normal' },
    { path: '../public/fonts/Nomixa-SemiBold.otf', weight: '600', style: 'normal' },
  ],
  variable: '--font-nomixa',
  display: 'swap',
});

const generalSans = localFont({
  src: [
    { path: '../public/fonts/GeneralSans-Light.otf',   weight: '300', style: 'normal' },
    { path: '../public/fonts/GeneralSans-Regular.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/GeneralSans-Medium.otf',  weight: '500', style: 'normal' },
  ],
  variable: '--font-general-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Kodex · ROI Report',
  description: '3D book preview',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nomixa.variable} ${generalSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
