// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NextAuthOptions, User } from 'next-auth';

// Extend the default User type to include custom fields like `role`
declare module 'next-auth' {
    interface User {
        id: string;
        role: string;
        contact_info?: string;  // Add contact_info if necessary for the seller
    }

    export interface Session {
        user: {
            id: string;
            role: string;
            contact_info?: string;
            
        };
    }
}
