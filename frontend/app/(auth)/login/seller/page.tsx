"use client"
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SellerSignIn = () => {
    const [name, setName] = useState("")
    const [contactInfo, setContactInfo] = useState("");
    const [password, setPassword] = useState("");
    const Router = useRouter();

    async function handleSubmit() {
        const result = await signIn('credentials-shopkeeper', {
            name,
            contactInfo,
            password,
            callbackUrl: "/dashboard"
        })

        if (result?.error) {
            console.log("Error while signin as seller", result.error);
        }
        else {
            Router.push("/dashboard")
        }
    }


    return (
        <div className="w-full h-screen flex flex-col text-center justify-center">
            <div>
                <div className="text-2xl p-8">Are you a seller?</div>

                <div className="flex flex-col gap-6 justify-center items-center">
                    <input className="p-4 bg-gray-200" type="text" placeholder="Ram" onChange={(e) => { setName(e.target.value) }} value={name} />
                    <input className="p-4 bg-gray-200" type="text" placeholder="9876543210" value={contactInfo} onChange={(e) => { setContactInfo(e.target.value) }} />
                    <input className="p-4 bg-gray-200" type="password" placeholder="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 m-4" onClick={() => { handleSubmit() }}>Register</button>
                <div >

                    <Link className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" href={"/login"}>Not a Seller?</Link>
                </div>
            </div>
        </div >
    )

}
export default SellerSignIn;