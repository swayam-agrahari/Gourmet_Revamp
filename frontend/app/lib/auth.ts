
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import db from "@/app/lib/db"



export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "User Credentials",
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
                        role: user.role,
                        createdAt: user.createdAt,

                    })
                } catch (error) {
                    console.log(error)
                    return null
                }


            }
        }),
        CredentialsProvider({
            name: "Shopkeeper Credentials",
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
                            name: credentials.name
                        }
                    });
                    return ({
                        id: user.shopkeeper_id.toString(),
                        contact_info: user.contact_info,
                        name: user?.name
                    })
                } catch (error) {
                    console.log(error)
                    return null
                }


            }
        })
    ],


    secret: process.env.JWT_SECRET || "secret",

}

