export interface AuthenticatedUser {
  id: number;

  username: string;

  roles: string[];

  permissions: string[];
}
