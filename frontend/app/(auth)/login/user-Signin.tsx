import { Button } from "@/components/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const UserSignIn = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Router = useRouter();

    async function handleSubmit() {
        const result = await signIn('credentials', {
            name,
            email,
            password,
            callbackUrl: "/dashboard"
        })

        if (result?.error) {
            console.log("Error signing in as user", result.error)
        }
        else {
            Router.push("/dashboard")
        }


    }

    return (
        <div>
            <p>
                Are you a user?
            </p>
            <div>
                <input type="text" placeholder="Jhon Doe" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="123@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button onClick={() => handleSubmit()} >Submit</Button>

        </div>
    )
}
export default UserSignIn;