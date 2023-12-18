import '../globals.css';
import { Menu } from '@/components/menu';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Menu />
      <div>{children}</div>
    </>
  );
}
