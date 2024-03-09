'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoginButton } from '../buttons/login-button';
import { SignUpDialog } from './sign-up-dialog';
import { useContext, useState } from 'react';
import { toast } from '../ui/use-toast';
import { UserAuthContext } from '@/contexts/user-auth-context';

export function SignUpSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { userId, setUserId } = useContext(UserAuthContext);

  const mockHandleLogin = () => {
    setIsDialogOpen(true);
  };
  const handleLogin = (userId: string) => {
    setUserId(userId);
    toast({
      title: 'You already have an account!',
    });
  };
  const handleSignUp = (userId: string) => {
    setIsDialogOpen(true);
    setUserId(userId);
  };
  return (
    <>
      <Card className='bg-slate-100'>
        <CardHeader>
          <CardTitle>New to Jole?</CardTitle>
          <CardDescription>
            Sign up now to get your own account!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginButton onLogin={handleLogin} onSignUp={handleSignUp} />
          {/* <Button onClick={mockHandleLogin}>sign up</Button> */}
        </CardContent>
        <CardFooter>
          <p className='text-sm'>
            By signing up, you agree to the Terms of Service and Privacy Policy,
            including Cookie Use.
          </p>
        </CardFooter>
      </Card>
      <SignUpDialog
        isOpen={isDialogOpen}
        userId={userId}
        onSignUpSuccess={() => setIsDialogOpen(false)}
      />
    </>
  );
}
