import { Button1 } from "@/components/Button";
import DropDown from "@/components/DropDown";
import SerachBar from "@/components/SearchBar";
import { DollarSign } from "lucide-react";

export default function Page() {
    return (
        <div>
            <div className="flex rounded-sm gap-8 items-center justify-center  ">
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
            <div className="mt-8 w-full h-fit border border-gray-200 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]  p-4">
                <div className="flex px-4 items-center justify-between ">
                    <div className="text-xl font-medium">Products</div>
                    <Button1>Add Products</Button1>
                </div>
                <div className="flex items-center justify-start gap-4  px-4 mt-4  w-full h-fit ">
                    <SerachBar>Search Products...</SerachBar>
                    <DropDown title="Catergory" options={["All Categories", "Clothing", "Elcetronics"]}></DropDown>
                </div>
                <div></div>
            </div>
            <div></div>
        </div>
    )
}