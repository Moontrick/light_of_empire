export interface UserMenuProps {
  login: string;
  email: string;
  loggingOut: boolean;
  onLogout: () => void;
}
