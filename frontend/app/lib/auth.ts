
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import db from "@/app/lib/db"
import { User, Session } from "next-auth";
import { JWT } from "next-auth/jwt";


export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@gmail.com", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing email or password')
                }
                const hashedPass = await bcrypt.hash(credentials.password, 10)
                const existingUser = await db.user.findFirst({
                    where: {
                        email: credentials?.email
                    }
                })

                if (existingUser) {
                    const validation = await bcrypt.compare(credentials?.password, existingUser.password);
                    if (validation) {
                        return {
                            id: existingUser.id.toString(),
                            email: existingUser.email,
                            name: existingUser?.name,
                            role: existingUser.role,
                            createdAt: existingUser.createdAt
                        }
                    }
                    return null
                }

                try {
                    const user = await db.user.create({
                        data: {
                            email: credentials.email,
                            password: hashedPass

                        }
                    });
                    return ({
                        id: user.id.toString(),
                        email: user.email,
                        name: user?.name,
                        role: "User",
                        createdAt: user.createdAt,

                    })
                } catch (error) {
                    console.log(error)
                    return null
                }


            }
        }),
        CredentialsProvider({
            id: "credentials-shopkeeper",
            name: "credentials-shopkeeper",
            credentials: {
                name: { label: "Name", type: "name", placeholder: "Ashley", required: true },
                contactInfo: { label: "Phone Number", type: "phone", placeholder: "9876543210", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials) {
                if (!credentials?.contactInfo || !credentials?.password) {
                    throw new Error('Missing phone number or password')
                }
                const hashedPass = await bcrypt.hash(credentials.password, 10)
                const existingUser = await db.shopKeeper.findFirst({
                    where: {
                        contact_info: credentials?.contactInfo
                    }
                })

                if (existingUser) {
                    const validation = await bcrypt.compare(credentials?.password, existingUser.password);
                    if (validation) {
                        return {
                            id: existingUser.shopkeeper_id.toString(),
                            contact_info: existingUser.contact_info,
                            name: existingUser?.name,
                            role: existingUser.role,
                        }
                    }
                    return null
                }

                try {
                    const user = await db.shopKeeper.create({
                        data: {
                            contact_info: credentials.contactInfo,
                            password: hashedPass,
                            managed_shops: 0,
                            name: credentials.name,

                        }
                    });
                    return ({
                        id: user.shopkeeper_id.toString(),
                        contact_info: user.contact_info,
                        name: user?.name,
                        role: "Seller"
                    })
                } catch (error) {
                    console.log(error)
                    return null
                }


            }
        })
    ],
    pages: {
        signIn: '/login',
        signOut: '/',
    },

    callbacks: {
        async session({ session, token }: { session: Session, token: JWT }): Promise<Session> {
            // Attach the role and id from the token to the session
            if (token) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
        async jwt({ token, user }: { token: JWT, user?: User }): Promise<JWT> {
            // Attach user details (id, role) to the JWT token
            if (user) {
                console.log("User in JWT callback: ", user);
                token.id = user.id as string;
                token.role = user.role as string;
            }
            return token;
        },
    },
    secret: process.env.JWT_SECRET || "secret",
};