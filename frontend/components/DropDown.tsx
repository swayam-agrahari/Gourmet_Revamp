interface DropDownProps {
    title: string;
    options: string[]
}

export default function DropDown({ title, options }: DropDownProps) {
    return (
        <div className="">
            <select className="border border-gray-200 p-2 rounded-md  bg-white  cursor-pointer " name={title}>
                {options.map((option, i) => {
                    return (
                        <option className="bg-gray-700 text-white" key={i} value={option} > {option}</option>
                    )
                })}
            </select>
        </div >

    )
}