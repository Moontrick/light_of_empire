export interface UserMenuProps {
  login: string;
  email: string;
  avatarUrl: string | null;
  loggingOut: boolean;
  onLogout: () => void;
}
