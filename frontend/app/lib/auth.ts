
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import db from "@/app/lib/db"



export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
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
                            name: existingUser?.name
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

