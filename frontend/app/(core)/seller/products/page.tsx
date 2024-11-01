import { Button1 } from "@/components/Button";
import DropDown from "@/components/DropDown";
import SerachBar from "@/components/SearchBar";
import { DollarSign, Star, TrendingUp } from "lucide-react";
import { headers } from "next/headers";

enum Availability {
    Available = "Available",
    Out_of_stock = "Out_of_stock"
}


interface Products {
    pid: string;
    name: string;
    description: string;
    category: string;
    price: number;
    image: string;
    status: Availability;
    rating: number;


}

async function getProducts() {
    try {
        const response = await fetch("http://localhost:3000/api/seller/products", {
            headers: headers()
        })
        const data = await response.json();
        if (!data) return ("No products found")
        console.log("data", data)
        return data?.topProducts || []

    }
    catch (e) {
        console.log("Error is here", e)
    }
}

export default async function Page() {
    let topProducts: Products[] = []
    topProducts = await getProducts()
    return (
        <div>
            <div className="flex rounded-sm gap-8 items-center justify-center ">
                <div className="w-1/3 rounded-lg bg-white h-auto border border-gray-200 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] aspect-auto p-4 ">
                    <div className="flex justify-between px-4 items-center">
                        <div className="font-medium  text-lg  mt-2">Total Revenue</div>
                        <div><DollarSign size={16} color="#999797" /></div>
                    </div>
                    <div className="px-4 mt-2">
                        <div className="font-extrabold text-2xl">$45,231.89</div>
                        <div className="text-gray-500 mt-2">+20.1% from last month</div>
                    </div>
                </div>

                <div className="w-1/3 rounded-lg bg-white h-auto border border-gray-200 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] aspect-auto p-4 ">
                    <div className="flex justify-between px-4 items-center">
                        <div className="font-medium text-lg  mt-2">Sales</div>
                        <div><DollarSign size={16} color="#999797" /></div>
                    </div>
                    <div className="px-4 mt-2">
                        <div className="font-extrabold text-2xl">+2350</div>
                        <div className="text-gray-500 mt-2">+180.1% from last month</div>
                    </div>
                </div>

                <div className="w-1/3 rounded-lg bg-white h-auto border border-gray-200 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] aspect-auto p-4 ">
                    <div className="flex justify-between items-center px-4">
                        <div className="font-medium  text-lg  mt-2">Active Products</div>
                        <div><DollarSign size={16} color="#999797" /></div>
                    </div>
                    <div className="px-4 mt-2">
                        <div className="font-extrabold text-2xl">456</div>
                        <div className="text-gray-500 mt-2">+19 new products added</div>
                    </div>
                </div>


            </div>
            <div className="bg-white mt-8 w-full h-fit border border-gray-200 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]  p-4">
                <div className="flex px-4 items-center justify-between ">
                    <div className="text-xl font-medium">Products</div>
                    <Button1>Add Products</Button1>
                </div>
                <div className="flex items-center justify-between gap-4  px-4 mt-4  w-full h-fit ">
                    <div className="flex items-center justify-start gap-4" >
                        <SerachBar>Search Products...</SerachBar>
                        <DropDown title="Catergory" options={["All Categories", "Clothing", "Elcetronics"]}></DropDown>
                    </div>
                    <div className="flex items-center justify-start gap-4">
                        <span>Sort by:</span>
                        <DropDown title="Catergory" options={["Newest", "Price: Low to High", "Price: High to Low", "Best Selling"]}></DropDown>
                    </div>
                </div>
                <div className="w-full h-fit p-4 mt-4">
                    <table className="w-full h-full">
                        <thead className="">

                            <tr className="text-gray-500 ">

                                <th className="px-3 py-5 text-center font-medium  ">
                                    <input type="checkbox" />

                                </th>
                                <th className="px-3 py-5 text-start font-medium  ">
                                    Product
                                </th>
                                <th className="px-3 py-5 text-center font-medium  ">
                                    Price
                                </th>
                                <th className="px-3 py-5 text-center font-medium  ">
                                    Stock
                                </th>
                                <th className="px-3 py-5 text-center font-medium  ">
                                    Sales
                                </th>
                                <th className="px-3 py-5 text-center font-medium  ">
                                    Ratings
                                </th>
                                <th className="px-3 py-5 text-center font-medium ">
                                    Actions
                                </th>

                            </tr>
                        </thead>
                        <tbody className=" ">
                            {topProducts?.map((prod) => (
                                <tr className="w-full text-gray-800 border-t  border-gray-200 " key={prod.pid}>
                                    <td className="px-3 py-5 text-center "><input type="checkbox" id="title" name={prod.name} className="" />
                                    </td>
                                    <td className=" px-3 py-5 text-start ">{prod.name}</td>
                                    <td className=" px-3 py-5 text-center " >${prod.price}</td>
                                    <td className=" px-3 py-5 text-center ">200</td>
                                    <td className=" px-3 py-5 text-center ">140</td>
                                    <td className=" px-3 py-5 text-center  ">
                                        <div className="flex    justify-center  gap-2">
                                            <div>

                                                <Star color="#fff700" />
                                            </div>
                                            <div>

                                                {prod.rating == 0 ? "0.0" : prod.rating}
                                            </div>


                                        </div>
                                    </td>
                                    <td className=" px-3 py-5 text-center  flex  items-center justify-center">
                                        <p> <TrendingUp className="text-gray-600 cursor-pointer" /></p></td>

                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div></div>
        </div>
    )
}