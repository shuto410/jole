import { createContext } from 'react';

type UiContextValue = {
  isSignUpPopupOpen: boolean;
  setIsSignUpPopupOpen: (isOpen: boolean) => void;
};
export const UiContext = createContext<UiContextValue>({
  isSignUpPopupOpen: false,
  setIsSignUpPopupOpen: () => undefined,
});
