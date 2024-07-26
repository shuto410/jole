import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoginButton } from '../buttons/login-button';

export function SignUpSection() {
  return (
    <>
      <Card className='bg-sky-100'>
        <CardHeader>
          <CardTitle>New to Jole?</CardTitle>
          <CardDescription>
            Sign up now to get your own account!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginButton />
        </CardContent>
        <CardFooter>
          <p className='text-sm'>
            By signing up, you agree to the Terms of Service and Privacy Policy,
            including Cookie Use.
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
