"use client"


import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
            Router.push("/login")
        }


    }

    return (
        <div className="h-screen flex flex-col justify-center text-center  w-full">
            <div>
                <div className="text-2xl p-8 ">
                    Are you a user ?
                </div >
                <div className="flex flex-col justify-center items-center gap-8 ">
                    <input className="p-4 bg-gray-200" type="text" placeholder="Jhon Doe" value={name} onChange={(e) => setName(e.target.value)} />
                    <input className="p-4 bg-gray-200" type="email" placeholder="123@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className="p-4 bg-gray-200" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 m-4" onClick={() => handleSubmit()} >Submit</button>
                <div>

                    <Link className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" href={"/login/seller"}>are you a selller?</Link>
                </div>
            </div >
        </div >
    )
}
export default UserSignIn;