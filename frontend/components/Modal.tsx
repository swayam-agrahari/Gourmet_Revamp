"use client";
import { X } from "lucide-react";
import { Button, Button1 } from "./Button";
import { FormEvent, useState } from "react";
import { createShop } from "@/app/(core)/api/seller/shops/shopActions";

export default function Modal() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append("Name", name);
        formData.append("Address", address);
        formData.append("Contact", contact);

        const response = await createShop(formData);
        setMessage(response.message);

        if (response.message === "Success") {
            setName("");
            setAddress("");
            setContact("");
            setIsOpen(false);
        }
    };

    function toggleModal() {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <Button onClick={toggleModal}>Add  Shop</Button>
            {isOpen && <div className="fixed inset-0 z-10 flex justify-center items-center backdrop-blur-sm">
                <div className=" opacity-50 inset-0 bg-black z-0 absolute" onClick={() => setIsOpen(false)}></div>
                <div className=" border border-gray-50  z-20 bg-white rounded-md text-black w-1/4 h-1/3 shadow-lg" >
                    <div className="flex justify-between items-center p-2">
                        <div className="flex justify-center items-center ">
                            <Button1>Add Shops</Button1>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="cursor-pointer -mt-4"><X /></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2 items-start">
                            <div>
                                <label htmlFor="Name" className="mx-2">Name</label>
                                <input type="text" placeholder="Name" id="Name" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="Address" className="mx-2">Address</label>
                                <input type="text" placeholder="Address" id="Address" onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="Contact" className="mx-2">Contact</label>
                                <input type="text" placeholder="Contact" id="Contact" onChange={(e) => setContact(e.target.value)} />
                            </div>
                        </div>
                        {message && <p>{message}</p>} {/* Display message */}
                        <button type="submit" className="mt-4">Submit</button>
                    </form>
                </div>
            </div>}
        </>
    );
}
