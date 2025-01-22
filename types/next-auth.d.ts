import NextAuth from "next-auth";
declare module "next-auth" {
    interface User {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        userName: string;
    }
  
    interface Session {
      user: User;
    }

  }