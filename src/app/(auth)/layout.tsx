import '../globals.css';
import { Header } from '@/components/header';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='overflow-hidden h-screen bg-jole-blue'>
      <Header />
      <div>{children}</div>
    </div>
  );
}
