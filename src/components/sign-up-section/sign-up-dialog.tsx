import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UserProfileForm } from '../user-profile-form';

export function SignUpDialog({
  isOpen,
  userId,
  onSignUpSuccess,
}: SignUpDialogProps) {
  if (!userId) return null;
  return (
    <Dialog open={isOpen}>
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
          onSuccess={onSignUpSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}

export type SignUpDialogProps = {
  isOpen: boolean;
  userId: string | null;
  onSignUpSuccess?: () => void;
};
