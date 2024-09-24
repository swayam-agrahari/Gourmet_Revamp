
import CredentialsProvider from "next-auth/providers/credentials"


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            // TODO: User credentials type from next-aut
            async authorize(credentials) {
                // Hardcoded dummy user
                const dummyUser = {
                    id: '1', // The id must be a string as per the User type expected by NextAuth
                    name: 'J Smith',
                    email: 'jsmith@example.com',
                    phone: '1234567890',
                    password: 'password123' // Dummy password
                };

                // Validate the credentials
                if (credentials?.phone === dummyUser.phone && credentials?.password === dummyUser.password) {
                    // Return the user object if credentials are valid
                    return {
                        id: dummyUser.id, // Ensure this is a string
                        name: dummyUser.name,
                        email: dummyUser.email
                    };
                }

                // Return null if the credentials are invalid
                return null;
            }
        })
    ],


}
