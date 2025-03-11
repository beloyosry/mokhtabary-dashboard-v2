import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's ID. */
      id: string;
      /** The user's role. */
      role: string;
      /** The user's phone number. */
      phone: string;
      /** The user's profile image. */
      image?: string | null;
      /** The country code. */
      code?: string;
      /** The user's account type. */
      accountType?: string;
      /** The user status. */
      status?: string;
      /** When the phone was verified. */
      phoneVerifiedAt?: string;
      /** The user's account details. */
      account?: any;
    } & DefaultSession["user"];
    /** The user's access token. */
    accessToken?: string;
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    /** The user's ID. */
    id: string;
    /** The user's name. */
    name?: string;
    /** The user's email. */
    email?: string;
    /** The user's profile image. */
    image?: string | null;
    /** The user's role. */
    role: string;
    /** The user's phone number. */
    phone: string;
    /** The user's access token. */
    accessToken: string;
    /** The country code. */
    code?: string;
    /** The user's account type. */
    accountType?: string;
    /** The user status. */
    status?: string;
    /** When the phone was verified. */
    phoneVerifiedAt?: string;
    /** The user's account details. */
    account?: any;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** The user's ID. */
    id: string;
    /** The user's role. */
    role: string;
    /** The user's phone number. */
    phone: string;
    /** The user's profile image. */
    image?: string | null;
    /** The user's access token. */
    accessToken: string;
    /** The country code. */
    code?: string; 
    /** The user's account type. */
    accountType?: string;
    /** The user status. */
    status?: string;
    /** When the phone was verified. */
    phoneVerifiedAt?: string;
    /** The user's account details. */
    account?: any;
  }
}
