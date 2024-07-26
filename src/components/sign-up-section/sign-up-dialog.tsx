import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UserProfileForm } from '../user-profile-form';
import { useContext } from 'react';
import { UiContext } from '@/contexts/ui-context';
import { useRouter } from 'next/navigation';
import { useAuthentication } from '@/hooks/useAuthentication';

export function SignUpPopup({ userId }: SignUpPopupProps) {
  const { logout } = useAuthentication();
  const { isSignUpPopupOpen, setIsSignUpPopupOpen } = useContext(UiContext);
  const router = useRouter();

  if (!userId) return null;

  const handleOnSignupSuccess = () => {
    router.refresh();
    setIsSignUpPopupOpen(false);
  };

  const handleOnOpenChange = (open: boolean) => {
    setIsSignUpPopupOpen(open);
    if (!open) {
      logout(false);
    }
  };

  return (
    <Dialog open={isSignUpPopupOpen} onOpenChange={handleOnOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogDescription>
            Sign up now to get your own account!
          </DialogDescription>
        </DialogHeader>
        <UserProfileForm
          userId={userId}
          submitButtonText='Complete'
          onSuccess={handleOnSignupSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}

export type SignUpPopupProps = {
  userId: string | null;
};
