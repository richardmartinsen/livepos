
export enum AuthLevels {
  Dirigent = 20,
  Admin = 40,
  Superbruker = 60
}

export interface IPerson {
  $key?: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  authLevel: AuthLevels;
  uid: string;
}

export class Person implements IPerson {
  first_name = '';
  last_name = '';
  phone = '';
  email = '';
  authLevel = AuthLevels.Dirigent;
  uid = '';

  public static getAuthLevelName(authLevel: AuthLevels): string {
    switch (authLevel) {
      case AuthLevels.Dirigent:
        return 'Dirigent';
      case AuthLevels.Admin:
        return 'Admin';
      case AuthLevels.Superbruker:
        return 'Superbruker';
    }
  }

}
