import './globals.css';

export const metadata = {
  title: 'Kodex — ROI Report',
  description: '3D book preview',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
