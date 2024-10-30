"use server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createShop(formData: FormData) {
    const name = formData.get("Name");
    const address = formData.get("Address");
    const contact = formData.get("Contact");
    const headersObject: Record<string, string> = {};

    headers().forEach((value, key) => {
        headersObject[key] = value;
    });

    // Set the Content-Type header for JSON requests
    headersObject['Content-Type'] = 'application/json';
    console.log(headersObject)

    try {
        const response = await fetch("http://localhost:3000/api/seller/shops", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                address: address,
                contact_info: contact
            }),
            headers: {
                "cookie": headersObject.cookie
            }
        });

        const data = await response.json();
        console.log(data)
        revalidatePath("http://localhost:3000/api/seller/shops");
        return {
            message: data ? "Success" : "Unsuccessful"
        };
    } catch (e) {
        console.error("Error:", e);
        return { message: "Failed to create shop" };
    }
}
