'use client';

import { useContext, useEffect } from 'react';
import { UserProfileForm } from '../user-profile-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuthentication } from '@/hooks/useAuthentication';
import { UserAuthContext } from '@/contexts/user-auth-context';

export function UserProfileUpdatePopup({
  isOpen,
  setIsOpen,
}: UserProfileEditPopupProps) {
  const { userId, isUserLoggedIn } = useAuthentication(async (userId) => {
    // console.log('User ID in call back', userId);
    // const userProfile = await fetchPublicUserProfile(userId);
    // if (userProfile) setPublicUserProfile(userProfile);
  });
  // // const [publicUserProfile, setPublicUserProfile] = useState<
  // //   PublicUserProfile | undefined
  // >(undefined);
  const { userProfile } = useContext(UserAuthContext);

  useEffect(() => {
    // When this component is triggered from the Dropdown component,
    // there is an issue where pointer-events: none is added to <body/>
    // when closing this component. Therefore, we forcibly override it with this code.
    document.body.style.pointerEvents = 'auto';
  }, [isOpen]);

  return (
    isUserLoggedIn && (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <UserProfileForm
            userId={userId!}
            submitButtonText='Update'
            defaultValues={userProfile}
            onSuccess={() => setIsOpen(false)}
          />
        </DialogContent>
      </Dialog>
    )
  );
}

export interface UserProfileEditPopupProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
