import { Button } from "./Button";
import Logo from "../public/assets/logo.svg";
import Gourmet from "../public/assets/Gourmet.svg";
import Cart from "../public/assets/cart.svg";
import Heart from "../public/assets/Heart.svg";
import Profile from "../public/assets/Profile.svg";
import Link from "next/link";
import Image from "next/image";


interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: () => void,
    onSignout: () => void
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    // return <div className="flex justify-between border-b px-4">
    //     <div className="text-lg flex flex-col justify-center">
    //         PayTM
    //     </div>
    //     <div className="flex flex-col justify-center pt-2">
    //         <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
    //     </div>
    // </div>
    return (
        <div className="bg-white flex flex-wrap items-center justify-between p-4  2xl:px-20 lg:px-4 lg:flex">
            <Link href={'/'}><div className="flex items-center gap-4 ">
                <Image src={Logo} alt="lOGO" />
                <Image src={Gourmet} alt="Gourmet" />
            </div></Link>

            <form action="" className="w-[650px] md:w-[300px] lg:w-[400px] xl:w-[650px]">
                <div className="relative flex items-center  text-gray-400  mt-4 rounded-2xl focus-within:text-gray-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-auto absolute ml-3  pointer-events-none"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>

                    <input
                        type="text"
                        name="search"
                        placeholder="Hey, looking for something?"
                        autoComplete="off"
                        aria-label="Hey, looking for something?"
                        className="w-full h-16 pr-3 pl-12 py-4 font-normal bg-gray-200 placeholder-gray-500 text-gray-700  rounded-2xl border-none text-2xl "
                    />
                </div>

            </form>

            {/* Additional content for the right side of the navbar */}
            <div className="flex ">
                <Image src={Cart} className="mr-12" alt="cart" />
                <Image src={Heart} className="mr-12" alt="heart" />
                <Image src={Profile} className="mr-12" alt="Profile" />
                <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
            </div>
        </div>
    )
}